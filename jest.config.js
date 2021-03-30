module.exports = {
    preset: 'ts-jest',
    globals: {
        'ts-jest': {
            isolatedModules: 'true',
        }
    },
    // transform: {
    //     '.(ts|tsx)': 'babel-jest',
    // },
    transform: {
        '.(ts|tsx)': 'ts-jest',
    },
    testMatch: ['<rootDir>/src/**/__tests__/**/*.(ts|js)?(x)', '<rootDir>/src/**/?(*.)(spec|test).(ts|js)?(x)'],
    moduleFileExtensions: ['ts', 'tsx'],
};