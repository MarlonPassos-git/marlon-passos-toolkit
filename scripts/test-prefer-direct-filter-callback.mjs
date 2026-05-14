import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { after, before, describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = join(scriptDirectory, "..");
const pluginPath = join(
	repositoryRoot,
	"packages",
	"biome-config",
	"plugins",
	"prefer-direct-filter-callback.grit",
);

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

async function createTemporaryBiomeProject() {
	const projectPath = await mkdtemp(
		join(tmpdir(), "prefer-direct-filter-callback-"),
	);
	const pluginSource = await readFile(pluginPath, "utf8");

	await writeFile(
		join(projectPath, "prefer-direct-filter-callback.grit"),
		pluginSource,
	);
	await writeFile(
		join(projectPath, "biome.json"),
		JSON.stringify(createBiomeConfig()),
	);

	return projectPath;
}

function createBiomeConfig() {
	return {
		plugins: ["./prefer-direct-filter-callback.grit"],
		formatter: { enabled: false },
		linter: { enabled: true, rules: { recommended: false } },
	};
}

async function runBiomeForSource(projectPath, sourceText) {
	const sourcePath = join(projectPath, "case.ts");

	await writeFile(sourcePath, sourceText);

	return spawnSync(
		"pnpm",
		["exec", "biome", "check", sourcePath, "--config-path", projectPath],
		{
			cwd: repositoryRoot,
			encoding: "utf8",
		},
	);
}

function hasPluginDiagnostic(result) {
	const outputText = `${result.stdout}\n${result.stderr}`;

	if (result.error) {
		throw new Error(`Biome failed to run: ${result.error.message}`);
	}

	return outputText.includes(" plugin ");
}

async function checkSource(projectPath, sourceText) {
	const result = await runBiomeForSource(projectPath, sourceText);

	return {
		hasDiagnostic: hasPluginDiagnostic(result),
		outputText: `${result.stdout}\n${result.stderr}`.trim(),
	};
}

describe("prefer-direct-filter-callback Biome plugin", () => {
	let projectPath;

	before(async () => {
		projectPath = await createTemporaryBiomeProject();
	});

	after(async () => {
		await rm(projectPath, { recursive: true, force: true });
	});

	for (const [index, sourceText] of positiveCases.entries()) {
		it(`reports redundant callback #${index + 1}`, async () => {
			const result = await checkSource(projectPath, sourceText);

			assert.equal(result.hasDiagnostic, true, result.outputText);
		});
	}

	for (const [index, sourceText] of negativeCases.entries()) {
		it(`ignores safe callback #${index + 1}`, async () => {
			const result = await checkSource(projectPath, sourceText);

			assert.equal(result.hasDiagnostic, false, result.outputText);
		});
	}
});
