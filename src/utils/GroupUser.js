import { loginUser, tim, waitSDK } from "./timUtils";
import TIM from "tim-js-sdk";
import { getUserSig } from "../apis";

/*
* 由于群聊的各项操作都是由一个用户发起或处理的，所以以 GroupUser 对象作为 IM 调用的媒介。
* GroupUser 定义了用户登录、登出和其他群聊相关的操作方法，如创建群聊、发送消息等。
 */
export default class GroupUser {
  constructor(userId) {
    if (!userId) {
      throw new Error('userId 不能为空');
    }
    this.userId = userId;
    tim.on(TIM.EVENT.SDK_READY, () => {
      alert('sdk ready');
    });
    tim.on(TIM.EVENT.SDK_NOT_READY, () => {
      alert('sdk not ready');
      this.login();
    });
    this.login();
  }

  login() {
    const uid = this.userId;
    getUserSig(uid).then(userSig => {
      tim.login({
        userID: uid,
        userSig
      }).catch((e) => {
        throw e;
      });
    });
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
  getGroupList() {
    return tim.getGroupList().then(({ data }) => data.groupList);
  };

  createGroup(options) {
    return tim.createGroup({
      ...options,
      type: TIM.TYPES.GRP_PUBLIC
    });
  }

  dismissGroup(groupId) {
    return tim.dismissGroup(groupId);
  }

  getGroupMemberList(gid) {
    return tim.getGroupMemberList({
      groupID: gid,
      count: 30,
      offset: 0
    }).then(res => res.data.memberList);
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
      return res.data.message;
    });
  }

  getMessageList({ targetId, nextReqMessageID }) {
    return tim.getMessageList({
      conversationID: `GROUP${targetId}`,
      nextReqMessageID,
      count: 15
    }).then(res => {
      console.log('群聊消息列表', res);
      return res.data;
    })
  }

  onMessageReceived(callback) {
    tim.on(TIM.EVENT.MESSAGE_RECEIVED, callback);
  };

  detectMessageEvent() {
    return this.prepareUser().then(() => {
      const onMessageReceived = (e) => {
      };
      tim.on(TIM.EVENT.MESSAGE_RECEIVED, onMessageReceived);
    });
  }
}
