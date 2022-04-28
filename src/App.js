import * as React from 'react';
import Button from '@mui/material/Button';
import './utils/timUtils';
import GroupUser from "./utils/GroupUser";
import TIM from "tim-js-sdk";
import { TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import './app.scss';
import CollectUsername from "./components/CollectUsername/CollectUsername";
import MainContent from "./components/MainContent/MainContent";

export const UserContext = React.createContext(null);

function App() {
  const [username, setUsername] = useState('administrator');
  const userRef = useRef(username && new GroupUser(username));

  return (
    <div className="app-container">
      {
        !username ? (
          <CollectUsername setUsername={(v) => {
            userRef.current = new GroupUser(v);
            setUsername(v);
          }} />
        ) : (
          <UserContext.Provider value={userRef.current}>
            <MainContent />
          </UserContext.Provider>
        )
      }
    </div>
  );
}

export default App;
