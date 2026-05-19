function isEmptyObject(obj) {
    for (var key in obj) {
        if (Object.hasOwn(obj, key)) {
            return false;
        }
    }
    return true;
}

const objs = [{}, { a: 1 }, { b: 2 }, { c: 3 }, { d: 4 }];

const emptyObjs = objs.some(isEmptyObject);
