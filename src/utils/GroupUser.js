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

  sendMessageToGroup({ gid, text }) {
    const message = tim.createTextMessage({
      to: gid,
      conversationType: TIM.TYPES.CONV_GROUP,
      payload: {
        text: text
      }
    });

    return tim.sendMessage(message).then(res => {
      console.log('发送消息成功', res);
    });
  }

  getMessageList({targetId, nextReqMessageID}) {
    return tim.getMessageList({
      conversationID: `GROUP${targetId}`,
      nextReqMessageID,
      count: 15
    }).then(res => {
      console.log('群聊消息列表', res);
      return res.data;
    })
  }
}
