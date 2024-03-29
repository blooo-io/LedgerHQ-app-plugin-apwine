// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    modulePaths: ['<rootDir>/src', '<rootDir>/tests'],

    moduleNameMapper: {
        '^jest$': '<rootDir>/jest.js',
    },

    // Automatically clear mock calls and instances between every test
    clearMocks: true,

    // The directory where Jest should output its coverage files
    coverageDirectory: 'coverage',

    globalSetup: '<rootDir>/globalsetup.js',

    // A list of paths to directories that Jest should use to search for files in
    roots: ['<rootDir>'],

    runner: 'jest-serial-runner',

    // The test environment that will be used for testing
    testEnvironment: 'node',

    // The glob patterns Jest uses to detect test files
    testMatch: [
        '**/swap_exact_amount_in_ethereum.test*',
        '**/swap_exact_amount_in_polygon.test*',
        '**/remove_liquidity_polygon.test*',
        '**/remove_liquidity_ethereum.test*',
        '**/add_liquidity_polygon.test*',
        '**/add_liquidity_ethereum.test*',
        '**/withdraw_ethereum.test*',
        '**/withdraw_polygon.test*',
        '**/deposit_ethereum.test*',
        '**/deposit_polygon.test*',
        '**/zapintopt_ethereum.test*',
        '**/zapintopt_polygon.test*',
        '**/redeem_yield_ethereum.test*',
        '**/redeem_yield_polygon.test*',
        '**/increase_amount_ethereum.test*',
        '**/create_lock_ethereum.test*',
        '**/increase_unlock_time_ethereum.test*',
    ],

    // Stop immediatly when a test fails
    bail: true,
};
