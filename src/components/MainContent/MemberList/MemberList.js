import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from "../../../App";
import { Avatar } from "@mui/material";
import './MemberList.scss';

export default function MemberList(props) {
  const { groupId } = props;
  const [members, setMembers] = useState([]);
  const currentUser = useContext(UserContext);

  useEffect(() => {
    currentUser.getGroupMemberList(groupId).then(res => {
      // console.log('members', res);
      setMembers(res);
    });
  }, [groupId]);

  return (
    <div className="member-list">
      {
        members.map((m) => {
          return (
            <div key={m.userID} className="member-item">
              <Avatar alt={m.userID} />
              {m.userID}
            </div>
          )
        })
      }
    </div>
  )
}