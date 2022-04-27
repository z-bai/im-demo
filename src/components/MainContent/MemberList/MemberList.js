import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from "../../../App";

export default function MemberList(props) {
  const { groupId } = props;
  const [members, setMembers] = useState([]);
  const currentUser = useContext(UserContext);

  useEffect(() => {
    console.log('groupId', groupId);
    currentUser.getGroupMemberList(groupId).then(res => {
      console.log('members', res);
    });
  }, [groupId]);

  return (
    <div className="member-list">

    </div>
  )
}