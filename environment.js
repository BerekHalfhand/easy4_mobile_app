import { Constants } from 'expo';
import { Platform } from 'react-native';

const ENV = {
  dev: {
    apiUrl: 'https://stage.mp.api.easy4.pro',
  },
  staging: {
    apiUrl: 'https://stage.mp.api.easy4.pro',
  },
  prod: {
    apiUrl: 'https://mp.api.easy4.pro',
  }
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.
  if (__DEV__) {
    return ENV.dev;
  } else if (env === 'staging') {
    return ENV.staging;
  } else if (env === 'prod') {
    return ENV.prod;
  }
};

export default getEnvVars;
