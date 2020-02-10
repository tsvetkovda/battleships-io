const cloneDeep = (arr: object[]): [] => JSON.parse(JSON.stringify(arr));

export default cloneDeep;
