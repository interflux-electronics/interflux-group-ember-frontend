'use strict';

const PKG = require('../package.json');

// Expose the git hash for fingerprinting and error logging
const git = require('git-rev-sync');
const gitBranch = git.branch();
const gitRevision = git.short();

// The Rails API namespace
const apiNamespace = 'v1/admin';

// Where the Rails backend is located
const apiHosts = {
  development: 'http://localhost:3000',
  production: 'https://api.interflux.com'
};

// Where this Ember app is located
const publicHosts = {
  development: 'http://localhost:4200',
  production: 'https://interflux.com'
};

const adminHosts = {
  development: 'http://localhost:4300',
  production: 'https://admin.interflux.com'
};

const groupHosts = {
  development: 'http://localhost:4400',
  production: 'https://interflux.group'
};

// Where the CDN is located
const cdnHosts = {
  development: 'http://localhost:9000',
  production: 'https://cdn.interflux.com'
};

// The UTC date and time of when this build was compiled
const date = new Date();
const buildTimestamp = date.toUTCString();

module.exports = function (env) {
  // Environment flags
  const isDevelopment = env === 'development';
  const isProduction = env === 'production';
  const isTest = env === 'test';

  // Hosts
  const apiHost = apiHosts[env];
  const publicHost = publicHosts[env];
  const adminHost = adminHosts[env];
  const groupHost = groupHosts[env];
  const cdnHost = cdnHosts[env];

  const ENV = {
    appName: PKG.name,
    modulePrefix: PKG.name,
    // podModulePrefix: `${PKG.name}/pods`,
    // podModulePrefix: `${PKG.name}`,
    environment: env,
    rootURL: '/',
    locationType: 'history',
    EmberENV: {
      FEATURES: {},
      EXTEND_PROTOTYPES: {
        Date: false
      }
    },
    APP: {},

    isDevelopment,
    isTest,
    isProduction,
    apiHost,
    publicHost,
    adminHost,
    groupHost,
    cdnHost,
    apiNamespace,
    gitBranch,
    gitRevision,
    buildTimestamp
  };

  if (isTest) {
    ENV.locationType = 'none';
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;
    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  return ENV;
};
