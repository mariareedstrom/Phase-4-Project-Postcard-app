import './App.css';
import React from "react";
import { useState, useEffect } from "react";
import {Routes, Route, useNavigate} from 'react-router-dom';
import Header from "./Components/Header";
import LoggedIn from "./Pages/LoggedIn";
import LoggedOut from "./Pages/LoggedOut";
import UserShow from "./Pages/UserShow";
import SignupForm from "./Components/SignupForm";
import UserEdit from "./Pages/UserEdit";
import PostcardShow from "./Pages/PostcardShow";





function App() {
    const [currentUser, setCurrentUser] = useState(null)
    const [authenticated, setAuthenticated] = useState(false)

    const navigate = useNavigate()

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

    function handleLogout(){
        setCurrentUser(null)
        fetch('/api/logout', {method: "DELETE"})
        navigate(`/`)

    }

  return (
      <main className="App" style={{height: "100vh", display: "flex", flexDirection: "column"}}>
          {currentUser? <Header currentUser={currentUser} handleLogout={handleLogout} /> : null }
          <Routes>
              <Route path="/" element=
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
                  />
              <Route path="/users/:id" element={<UserShow currentUser={currentUser}/>} />
              <Route path="/signup" element={ <SignupForm setCurrentUser={setCurrentUser} />} />
              <Route path="/users/:id/edit" element={ <UserEdit user={currentUser} /> } />
              <Route path="/postcards/:id" element={<PostcardShow user={currentUser}/> } />
          </Routes>

    </main>
  );
}

export default App;
