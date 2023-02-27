import { constant } from "src/constants/constant";
export const environment = {
  firebase: {
    projectId: constant.projectId,
    appId: constant.appId,
    storageBucket: constant.storageBucket,
    apiKey: constant.apiKey,
    authDomain: constant.authDomain,
    messagingSenderId: constant.messagingSenderId,
  },
  production: false,
};
