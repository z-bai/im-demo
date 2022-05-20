import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useState } from 'react';
import './CollectUsername.scss';

export default function CollectUsername(props) {
  const [name, setName] = useState('');
  const { setUsername } = props;

  return (
    <div className="name-collector">
      <TextField variant="standard" value={name}
                 label="在此输入您在群聊中的昵称"
                 fullWidth
                 onChange={t => setName(t.target.value)}
      />
      <Button variant="contained"
              className="button"
              onClick={() => {
                if (name.trim().length) {
                  setUsername(name);
                }
              }}
      >进入聊天室</Button>
    </div>
  )
}
