import TIM from 'tim-js-sdk';
import COS from 'cos-js-sdk-v5';
import genTestUserSig from "./GenerateTestUserSig";

let options = {
  SDKAppID: 1400665641
};

export let tim = TIM.create(options);
tim.setLogLevel(4);
tim.registerPlugin({'cos-js-sdk': COS});

let loginP;
export const loginUser = (userId) => {
  if (!loginP) {
    console.log('login userId', userId);
    const userSig = genTestUserSig(userId).userSig;
    console.log('login userSig', userSig);
    return loginP = tim.login({
      userID: userId,
      userSig
    }).catch((e) => {
      loginP = null;
      throw e;
    });
  }
  return loginP;
};


let sdkP;
export function waitSDK(uid) {
  if (!loginP) {
    throw new Error('需要先登录');
  }
  if (!sdkP) {
    sdkP = new Promise((resolve) => {
      const onReady = (event) => {
        console.log('sdk ready for uid', uid);
        resolve();
      };
      tim.on(TIM.EVENT.SDK_READY, onReady);
    });
  }
  return sdkP;
}

