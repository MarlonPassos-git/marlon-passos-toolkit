import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { after, before, describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = join(scriptDirectory, "..");
const pluginDirectory = join(
	repositoryRoot,
	"packages",
	"biome-config",
	"plugins",
);
const biomeBinPath = join(
	repositoryRoot,
	"node_modules",
	"@biomejs",
	"biome",
	"bin",
	"biome",
);

const pluginVariants = [
	{
		fileName: "prefer-direct-filter-callback.warn.grit",
		name: "warning",
		positiveStatus: 0,
	},
	{
		fileName: "prefer-direct-filter-callback.error.grit",
		name: "error",
		positiveStatus: 1,
	},
];

const positiveCases = [
	"const a = accounts.filter((account) => isSuccessfulAccount(account));",
	"const a = accounts.find(account => isSuccessfulAccount(account));",
	"const a = accounts.map((account: Account) => normalizeAccount(account));",
	"const a = accounts.some(function (account) { return isSuccessfulAccount(account); });",
	"const a = accounts.every(function (account: Account) { return isSuccessfulAccount(account); });",
];

const negativeCases = [
	"const a = accounts.filter(isSuccessfulAccount);",
	"const a = accounts.filter((account, index) => isSuccessfulAccount(account, index));",
	"const a = accounts.filter((account) => accountValidator.isSuccessfulAccount(account));",
	"const a = accounts.filter((account) => isSuccessfulAccount(account) && account.active);",
	"const a = accounts.filter((account) => isSuccessfulAccount(account, true));",
	"const a = accounts.filter((account) => isSuccessfulAccount(account.id));",
	"const a = accounts.filter(({ id }) => isValidId(id));",
	"const a = accounts.filter((account) => isSuccessfulAccount?.(account));",
	"const a = accounts.filter((account) => isSuccessfulAccount.call(null, account));",
	"const a = accounts.filter((account) => { return isSuccessfulAccount(account); });",
	"const a = accounts.filter(function (account) { log(account); return isSuccessfulAccount(account); });",
];

async function createTemporaryBiomeProject(pluginFileName) {
	const projectPath = await mkdtemp(
		join(tmpdir(), "prefer-direct-filter-callback-"),
	);
	const pluginPath = join(pluginDirectory, pluginFileName);
	const pluginSource = await readFile(pluginPath, "utf8");

	await writeFile(join(projectPath, pluginFileName), pluginSource);
	await writeFile(
		join(projectPath, "biome.json"),
		JSON.stringify(createBiomeConfig(pluginFileName)),
	);

	return projectPath;
}

function createBiomeConfig(pluginFileName) {
	return {
		plugins: [`./${pluginFileName}`],
		formatter: { enabled: false },
		linter: { enabled: true, rules: { recommended: false } },
	};
}

async function runBiomeForSource(projectPath, sourceText, caseName) {
	const sourcePath = join(projectPath, `${caseName}.ts`);

	await writeFile(sourcePath, sourceText);

	return runBiomeCheck(sourcePath, projectPath);
}

function runBiomeCheck(sourcePath, projectPath) {
	return new Promise((resolve, reject) => {
		const childProcess = createBiomeProcess(sourcePath, projectPath);
		const stdoutChunks = [];
		const stderrChunks = [];

		childProcess.stdout.on("data", (chunk) => stdoutChunks.push(chunk));
		childProcess.stderr.on("data", (chunk) => stderrChunks.push(chunk));
		childProcess.on("error", reject);
		childProcess.on("close", (status) => {
			resolve({
				status,
				stdout: Buffer.concat(stdoutChunks).toString("utf8"),
				stderr: Buffer.concat(stderrChunks).toString("utf8"),
			});
		});
	});
}

function createBiomeProcess(sourcePath, projectPath) {
	return spawn(
		process.execPath,
		[biomeBinPath, "check", sourcePath, "--config-path", projectPath],
		{ cwd: repositoryRoot },
	);
}

function hasPluginDiagnostic(result) {
	const outputText = `${result.stdout}\n${result.stderr}`;

	if (result.error) {
		throw new Error(`Biome failed to run: ${result.error.message}`);
	}

	return outputText.includes(" plugin ");
}

async function checkSource(projectPath, sourceText, caseName) {
	const result = await runBiomeForSource(projectPath, sourceText, caseName);

	return {
		hasDiagnostic: hasPluginDiagnostic(result),
		outputText: `${result.stdout}\n${result.stderr}`.trim(),
		status: result.status,
	};
}

describe("prefer-direct-filter-callback Biome plugin", {
	concurrency: true,
}, () => {
	for (const variant of pluginVariants) {
		describe(`${variant.name} severity variant`, { concurrency: true }, () => {
			let projectPath;

			before(async () => {
				projectPath = await createTemporaryBiomeProject(variant.fileName);
			});

			after(async () => {
				await rm(projectPath, { recursive: true, force: true });
			});

			for (const [index, sourceText] of positiveCases.entries()) {
				it(`reports redundant callback #${index + 1}`, {
					concurrency: true,
				}, async () => {
					const result = await checkSource(
						projectPath,
						sourceText,
						`${variant.name}-positive-${index + 1}`,
					);

					assert.equal(result.hasDiagnostic, true, result.outputText);
					assert.equal(
						result.status,
						variant.positiveStatus,
						result.outputText,
					);
				});
			}

			for (const [index, sourceText] of negativeCases.entries()) {
				it(`ignores safe callback #${index + 1}`, {
					concurrency: true,
				}, async () => {
					const result = await checkSource(
						projectPath,
						sourceText,
						`${variant.name}-negative-${index + 1}`,
					);

					assert.equal(result.hasDiagnostic, false, result.outputText);
					assert.equal(result.status, 0, result.outputText);
				});
			}
		});
	}
});
