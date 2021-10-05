const exec = require('child_process').exec;
const fs = require('fs');
const path = require('path');

import {JsonFileRepository} from "../../../src/engine/dataStore/JsonFileRepository";

const testDataPath = path.resolve(__dirname, 'fileStoreTestData');
const removeTestDataCommand = `rm -rf ${testDataPath}`;
//console.log('===' + removeTestDataCommand);
exec(removeTestDataCommand);

describe('Filesystem side effects when using JsonFileRepository', () => {
    it('is initialized with a directory name, which it ensures exists', () => {
        const fileStore = new JsonFileRepository(testDataPath);
        expect(fs.existsSync(testDataPath)).toEqual(true);
    });

    it(`doesn't care if the directory already exists`, () => {
        const fileStore = new JsonFileRepository(testDataPath);
        expect(fs.existsSync(testDataPath)).toEqual(true);

        const fileStore2 = new JsonFileRepository(testDataPath);
        expect(fs.existsSync(testDataPath)).toEqual(true);
    });

    it('creates a directory for the given key when setting data', () => {
        const fileStore = new JsonFileRepository(testDataPath);
        fileStore.putDataFor('testId', {id: 'testId'});
        const testDirPath = path.resolve(testDataPath, 'testId');

        expect(fs.existsSync(testDirPath)).toEqual(true);
    });

    it('creates a file for the given data key when setting data', () => {
        const fileStore = new JsonFileRepository(testDataPath);
        fileStore.putDataFor('testId', {id: 'testKey'});
        const testFilePath = path.resolve(testDataPath, 'testId', 'testkey.json');

        expect(fs.existsSync(testFilePath)).toEqual(true);
    });

    it(`converts spaces to _ and removes special characters from filenames`, () => {
        const fileStore = new JsonFileRepository(testDataPath);
        fileStore.putDataFor('testId', {id: '?@/#$| [(key)]!'});
        const testFilePath = path.resolve(testDataPath, 'testId', '_key.json');

        expect(fs.existsSync(testFilePath)).toEqual(true);
    });
});

describe('Setting and getting data', () => {
    it(`handles getting data for a key that doesn't exist`, () => {
        const fileStore = new JsonFileRepository(testDataPath);
        expect(fileStore.getDataFor('testId', 'Nope')).toBeNull();
    });

    it('retrieves data at the same key that was used to set it', () => {
        const fileStore = new JsonFileRepository(testDataPath);
        fileStore.putDataFor('testId', {id: 'f1'});
        fileStore.putDataFor('testId', {id: 'Test String'});

        expect(fileStore.getDataFor('testId', 'f1')).toEqual({id: 'f1'});
        expect(fileStore.getDataFor('testId', 'Test String')).toEqual({id: 'Test String'});
    });

    it('persists across object instances', () => {
        const fileStore1 = new JsonFileRepository(testDataPath);
        fileStore1.putDataFor('testId', {id: 'f1'});
        fileStore1.putDataFor('testId', {id: 'Test String'});

        const fileStore2 = new JsonFileRepository(testDataPath);
        expect(fileStore2.getDataFor('testId', '1')).toEqual({id: 'f1'})
        expect(fileStore2.getDataFor('testId', '2')).toEqual({id: 'Test String'});
    });
});

describe('Listing data', () => {
    it('can list all the entries stored for a given directory', () => {
        const fileStore = new JsonFileRepository(testDataPath);
        fileStore.putDataFor('newTestId', {id: 'd1'});
        fileStore.putDataFor('newTestId', {id: 'd2'});
        fileStore.putDataFor('newTestId', {id: 'd3'});

        expect(fileStore.listDataFor('newTestId')).toEqual(['d1', 'd2', 'd3']);
    });
});
