import { loginUser, tim, waitSDK } from "./timUtils";
import TIM from "tim-js-sdk";

export default class GroupUser {
  constructor(userId) {
    if (!userId) {
      debugger;
      throw new Error('userId 不能为空');
    }
    this.userId = userId;
  }

  getUserId() {
    return this.userId;
  }
  prepareUser() {
    const uid = this.userId;
    console.log('preparing for uid', uid);
    return loginUser(uid).then(() => waitSDK(uid));
  }

  // 获取用户加入的群组列表
  getGroupList () {
    return this.prepareUser().then(() => {
      return tim.getGroupList().then(({ data }) => data.groupList);
    })
  };

  createGroup(options) {
    // debugger;
    return this.prepareUser().then(() => {
      console.log('creating group for options', options);
      return tim.createGroup({
        ...options,
        type: TIM.TYPES.GRP_PUBLIC
      });
    })
  }

  dismissGroup(groupId) {
    return this.prepareUser().then(() => {
      return tim.dismissGroup(groupId);
    })
  }

  getGroupMemberList(gid) {
    return this.prepareUser().then(() => {
      return tim.getGroupMemberList({
        groupID: gid,
        count: 30,
        offset: 0
      }).then(res => res.data.memberList);
    })
  }
}
