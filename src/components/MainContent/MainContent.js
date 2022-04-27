import React, { useContext, useEffect, useState } from 'react';
import './MainContent.scss';
import GroupUser from "../../utils/GroupUser";
import Button from "@mui/material/Button";
import CreateGroupDialog from "../CreateGroupDialog/CreateGroupDialog";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText, Menu, MenuItem,
  TextField
} from "@mui/material";
import MemberList from "./MemberList/MemberList";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { UserContext } from "../../App";

export default function MainContent(props) {
  const [groupList, setGroupList] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const user = useContext(UserContext);

  const getGroupList = () => {
    return user.getGroupList().then(res => {
      console.log('groups', res);
      setGroupList(res);
      return res;
    });
  }

  useEffect(() => {
    getGroupList();
  }, []);

  const handleGroupCreated = (res) => {
    console.log('group created', res);
    getGroupList();
  };

  const handleGroupIconClick = (e) => {
    setAnchorEl(e.currentTarget);
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
  }

  const handleDeleteGroup = (gid) => {
    user.dismissGroup(gid).then(() => {
      getGroupList();
    });
  }
  if (!groupList.length) {
    return (
      <div>
        暂无群组，您可以
        <Button variant="contained"
                onClick={() => {
                  setDialogOpen(true);
                }}
        >
          创建群组
        </Button>
        <CreateGroupDialog
          open={dialogOpen}
          onGroupCreated={handleGroupCreated}
          handleClose={() => setDialogOpen(false)} />
      </div>
    )
  }
  return (
    <div className="main-content">
      <div className="existing-groups">
        <List>
          {
            groupList.map((g) => {
              return (
                <ListItem key={g.groupID}>
                  <ListItemButton>
                    <div className="group-item-content">
                      <div className="group-item-content-left">
                        <ListItemAvatar>
                          <Avatar />
                        </ListItemAvatar>
                        <ListItemText primary={g.name} />
                      </div>

                      <div className="group-item-content-right">
                        <MoreVertIcon
                          onClick={handleGroupIconClick}
                        />
                        <Menu
                          anchorEl={anchorEl}
                          open={menuOpen}
                          onClose={handleMenuClose}
                          MenuListProps={{
                            'aria-labelledby': 'basic-button'
                          }}
                        >
                          <MenuItem onClick={() => handleDeleteGroup(g.groupID)}>删除</MenuItem>
                        </Menu>
                      </div>
                    </div>
                  </ListItemButton>
                </ListItem>
              );
            })
          }
        </List>
      </div>
      <div className="chat-window">
        <div className="messages">

        </div>
        <div className="text-box">
          <TextField
            fullWidth
            label="请输入，按回车发送"
            multiline
            rows={4}
            variant="filled"
          />
        </div>
      </div>
      <div className="group-users">
        <MemberList groupId={groupList[activeGroupIndex].groupID} />
      </div>
    </div>
  )
}
