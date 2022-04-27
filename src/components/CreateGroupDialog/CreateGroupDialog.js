import React, { useContext, useState } from 'react';
import './CreateGroupDialog.scss';
import { Autocomplete, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { UserContext } from "../../App";

const users = [
  { name: 'xiaowang' },
  { name: 'xiaozhang' },
  { name: 'xiaoli' }
];
export default function CreateGroupDialog(props) {
  const {open, handleClose, onGroupCreated} = props;
  const [groupName, setGroupName] = useState('');
  const [groupIntro, setGroupIntro] = useState('');
  const [groupUsers, setGroupUsers] = useState([]);

  const user = useContext(UserContext);
  const onCreate = () => {
    user.createGroup({
      name: groupName,
      introduction: groupIntro,
      memberList: groupUsers.map(u => ({
        userID: u.name
      })).concat({
        userID: user.getUserId(),
      })
    }).then(res => {
      console.log('创建群组', res);
      onGroupCreated(res);
    });
  };

  const onGroupUserChange = (e, v) => {
    setGroupUsers(v);
  };

  return (
    <div className="create-group-dialog">
      <Dialog open={open} onClose={handleClose}
              fullWidth={true}
              maxWidth='sm'
      >
        <DialogTitle>创建群组</DialogTitle>
        <DialogContent>
          <div className="group-info-items">
            <TextField
              autoFocus
              value={groupName}
              onChange={e => setGroupName(e.target.value)}
              margin="dense"
              label="群组名称"
              variant="standard"
            />
            <TextField
              value={groupIntro}
              onChange={e => setGroupIntro(e.target.value)}
              autoFocus
              margin="dense"
              label="群组简介"
              variant="standard"
            />
            <Autocomplete
              multiple
              getOptionLabel={(option) => option.name}
              options={users}
              onChange={onGroupUserChange}
              value={groupUsers}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="选择群成员"
                  placeholder="选择群成员"
                />
              )}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={onCreate} variant="contained">确定</Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}
