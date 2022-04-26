import * as React from 'react';
import Button from '@mui/material/Button';
import './utils/timUtils';
import GroupUser from "./utils/GroupUser";
import TIM from "tim-js-sdk";
import { TextField } from "@mui/material";
import { useState } from "react";
import './app.scss';

// const user = new GroupUser('123');
//
// const groupParams = {
//   name: '自建群组',
//   type: TIM.TYPES.GRP_PUBLIC,
//   introduction: '这是第一个创建的群',
//   memberList: [{
//     userID: '123'
//   }]
// };
//
// user.getGroupList().then(res => {
//   console.log('group result', res);
// })
//
// user.dismissGroup('@TGS#2XFSRRFIF');

function App() {
  const [username, setUsername] = useState('');
  return (
    <div className="app-container">
      <div className="name-collector">
        <TextField variant="standard" value={username}
                   label="在此输入您在群聊中的昵称"
                   fullWidth
                   onChange={t => setUsername(t.target.value)}
        />
        <Button variant="contained">继续</Button>
      </div>
    </div>
  )
}

export default App;
