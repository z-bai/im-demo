import { loginUser, tim, waitSDK } from "./timUtils";
import TIM from "tim-js-sdk";

export default class GroupUser {
  constructor(userId) {
    this.userId = userId;
  }

  prepareUser() {
    const uid = this.userId;
    return loginUser(uid).then(() => waitSDK(uid));
  }

  // 获取用户加入的群组列表
  getGroupList () {
    return this.prepareUser().then(() => {
      return tim.getGroupList().then(({ data }) => data.groupList);
    })
  };

  createGroup(options) {
    return this.prepareUser().then(() => {
      return tim.createGroup(options)
    })
  }

  dismissGroup(groupId) {
    return this.prepareUser().then(() => {
      return tim.dismissGroup(groupId);
    })
  }
}
