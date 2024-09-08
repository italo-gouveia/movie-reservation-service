import dotenv from 'dotenv';
dotenv.config();

import process from 'process';

const getConfig = (envPrefix) => {
    return {
        username: process.env[`${envPrefix}_DB_USER`] || 'defaultUser',
        password: process.env[`${envPrefix}_DB_PASSWORD`] || 'defaultPassword',
        database: process.env[`${envPrefix}_DB_NAME`] || 'defaultDatabase',
        host: process.env[`${envPrefix}_DB_HOST`] || 'localhost',
        port: parseInt(process.env[`${envPrefix}_DB_PORT`] || '5432', 10),
        dialect: 'postgres',
    };
};

export const development = getConfig('DEV');
export const test = getConfig('TEST');
export const production = getConfig('PROD');
