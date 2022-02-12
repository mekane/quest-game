/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        "^.+\\.(t|j)sx?$": "@swc/jest"
    },
    moduleNameMapper: {
        '^@entities/(.*)$': '<rootDir>/src/engine/01_entities/$1',
        '^@useCases/(.*)$': '<rootDir>/src/engine/02_useCases/$1',
        '^@repositories/(.*)$': '<rootDir>/src/engine/03_repositories/$1',
    }
};