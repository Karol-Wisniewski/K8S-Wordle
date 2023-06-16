import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import loading from './Utils/loading.png';


// https://reactrouter.com/en/main/components/navigate
import { Navigate } from 'react-router-dom';
import Keycloak from 'keycloak-js';
import Game from './Pages/Game';
import Header from './Components/Header';
import Rules from './Pages/Rules';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import axios from 'axios';
import Admin from './Pages/Admin';

function App() {

  const [isKeycloakInitialized, setIsKeycloakInitialized] = useState(false);
  const [currentUserAndAxiosClient, setCurrentUserAndAxiosClient] = useState(null);

  const keycloakRef = useRef(new Keycloak({
    url: process.env.REACT_APP_KEYCLOAK_URL,
    realm: process.env.REACT_APP_KEYCLOAK_REALM,
    clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID
  }));

  useEffect(() => {
    const keycloak = keycloakRef.current;
    keycloak.init({
      onLoad: 'login-required',
      pkceMethod: "S256",
      silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html",
    }).then((authenticated) => {
      console.log(authenticated);
      if (!authenticated) {
        setIsKeycloakInitialized(true);
        setCurrentUserAndAxiosClient(null);
      } else {
        keycloak.loadUserProfile().then((profile) => {
          setIsKeycloakInitialized(true);
          setCurrentUserAndAxiosClient({
            currentUser: {
              username: keycloak.profile.username,
              email: keycloak.profile.email,
              firstName: keycloak.profile.firstName,
              lastName: keycloak.profile.lastName,
              roles: keycloak.realmAccess.roles
            },
            axiosClient: axios.create({
              baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
              // baseURL: 'http://localhost:5000',
              headers: {
                Authorization: `Bearer ${keycloak.token}`
              },
              withCredentials: true
            })
          });
        });
      }
    })
  }, []);

  return (
    <div className="App">
      {isKeycloakInitialized ? (
        <Routes>
          <Route exact path="/" element={
            (currentUserAndAxiosClient !== null) ? <Navigate to="/game" /> :
            (<Login
              keycloak={keycloakRef.current}
            />)
          } />
          <Route exact path="/game" element={
            (currentUserAndAxiosClient === null) ? <Navigate to="/" /> :
            <>
              <Header currentUser={currentUserAndAxiosClient.currentUser} logout={keycloakRef.current.logout} />
              <Game axiosClient={currentUserAndAxiosClient.axiosClient} currentUser={currentUserAndAxiosClient.currentUser} />
            </>
          } />
          <Route exact path="/game/rules" element={
            (currentUserAndAxiosClient === null) ? <Navigate to="/" /> :
            <>
              <Header currentUser={currentUserAndAxiosClient.currentUser} logout={keycloakRef.current.logout} />
              <Rules />
            </>
          } />
          <Route exact path="/profile" element={
            (currentUserAndAxiosClient === null) ? <Navigate to="/" /> :
            <>
              <Header currentUser={currentUserAndAxiosClient.currentUser} logout={keycloakRef.current.logout} />
              <Profile currentUser={currentUserAndAxiosClient.currentUser}/>
            </>
          } />
          <Route exact path="/admin" element={
            (currentUserAndAxiosClient === null || !currentUserAndAxiosClient.currentUser.roles.includes('admin')) ? <Navigate to="/" /> :
            <>
              <Header currentUser={currentUserAndAxiosClient.currentUser} logout={keycloakRef.current.logout} />
              <Admin axiosClient={currentUserAndAxiosClient.axiosClient} currentUser={currentUserAndAxiosClient.currentUser}/>
            </>
          } />
        </Routes>
      ) : (
        <img className="loading-icon" src={loading} alt="loading"></img>
      )}
      
    </div>
  );
}

export default App;
