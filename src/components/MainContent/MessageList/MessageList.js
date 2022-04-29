import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from "../../../App";
import './MessageList.scss';

export default function MessageList(props) {
  const { messages } = props;

  const user = useContext(UserContext);
  console.log('messages', messages);
  return (
    <div>
      {
        messages.map(m => {
          const textMessage = m.payload.text;
          if (!textMessage) return null;
          const isMyself = m.from === user.getUserId();

          return (
            <div className="message-item"
                 style={{ textAlign: isMyself ? 'right' : 'left' }}
                 key={m.ID}>
              <div className="which-user">
                {m.from}
              </div>
              <div>
                {textMessage}
              </div>
            </div>
          )
        })
      }
    </div>
  )
}