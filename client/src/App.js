import './App.css';
import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router } from 'react-router-dom'
import LoggedIn from "./Pages/LoggedIn";
import LoggedOut from "./Pages/LoggedOut";





function App() {
    const [currentUser, setCurrentUser] = useState(null)
    const [authenticated, setAuthenticated] = useState(false)

    useEffect(() => {
        fetch('/api/me')
            .then((res) => {
                if (res.ok) {
                    res.json().then((user) => {
                        setCurrentUser(user)
                        setAuthenticated(true)
                    })
                }else {
                    setAuthenticated(true)
                }
            })
    }, [])

if(!authenticated){
    return <div></div>
}

  return (
    <div >
      <h1>Postcard App</h1>

      <Router>
          { currentUser? (
              <LoggedIn
                  setCurrentUser ={setCurrentUser}
                  currentUser = {currentUser}
              />
          ) : (
              <LoggedOut
                  setCurrentUser = {setCurrentUser}
              />
          )}
      </Router>

    </div>
  );
}

export default App;
