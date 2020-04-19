/*
ANIME BENSALEM, BRIAHANA MAUGÉ, JOSEPH P. PASAOA
APP MAIN | Capstone App (Pursuit Volunteer Mgr)
*/


/* IMPORTS */
import React, { useState, useEffect } from 'react';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';

import './App.scss';
import LoginSignupGate from './Components/LoginSignupGate';
import PrivateRouteGate from './Components/PrivateRouteGate';
import Dashboard from './Components/Dashboard';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import ProfilePage from './Components/Profile/ProfilePage';
import VolunteerSearch from './Components/VolunteerSearch';
import Events from './Components/Events';
import AdminTools from './Components/AdminTools/AdminTools';
import ProfileRender from './Components/ProfilePages/ProfileRender';
import Feedback from './Components/Feedback';


function App() {
  // USER states
  const [loggedUser, setLoggedUser] = useState({});
  const [isUserStateReady, setIsUserStateReady] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // LOGIN/SIGNUP states
  const [formType, setFormType] = useState('login');
  const [userType, setUserType] = useState('');

  // LOGIN/SIGNUP & PROFILE states
  const [email, setEmail] = useState('alexis@pursuit.org');
  const [password, setPassword] = useState('1234');
  const [newPassword, setNewPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cohortId, setCohortId] = useState(0);
  const [company, setCompany] = useState('');
  const [title, setTitle] = useState('');
  const [volunteerSkills, setVolunteerSkills] = useState([]);
  const [mentor, setMentor] = useState(false);
  const [officeHours, setOfficeHours] = useState(false);
  const [techMockInterview, setTechMockInterview] = useState(false);
  const [behavioralMockInterview, setBehavioralMockInterview] = useState(false);
  const [professionalSkillsCoach, setProfessionalSkillsCoach] = useState(false);
  const [hostSiteVisit, setHostSiteVisit] = useState(false);
  const [industrySpeaker, setIndustrySpeaker] = useState(false);

  const location = useLocation();
  const history = useHistory();

  const checkForLoggedInUser = () => {
    axios.get('/api/auth/is_logged')
      .then(res => settleUser(res.data.payload))
      .catch(err => {
          if (err.response && err.response.status === 401) {
            setIsUserStateReady(true);
            history.push('/', { from: location });
          } else {
            setFeedback(err);
          }
      });
  }
  useEffect(checkForLoggedInUser, []);

  const settleUser = (user) => {
    setLoggedUser(user);
    setIsUserStateReady(true);
  }

  const logout = () => {
    setIsUserStateReady(false);
    axios.get('/api/auth/logout')
      .then(res => {
        settleUser({}); // async await sometimes didn't execute this so switched to .then.catch
        history.push('/');
      })
      .catch(err => setFeedback(err));
  }

  const resetFeedback = () => {
    setFeedback(null);
  }


  /* PREP RETURN */
  const gateProps = {
    loggedUser,
    isUserStateReady,
    logout
  }
  const userProps = {
    loggedUser,
    setFeedback,
    settleUser
  };
  const signupProps = {
    formType, setFormType,
    userType, setUserType
  };
  const profileProps = {
    email, setEmail,
    password, setPassword,
    newPassword, setNewPassword,
    firstName, setFirstName,
    lastName, setLastName,
    cohortId, setCohortId,
    company, setCompany,
    title, setTitle,
    volunteerSkills, setVolunteerSkills,
    mentor, setMentor,
    officeHours, setOfficeHours,
    techMockInterview, setTechMockInterview,
    behavioralMockInterview, setBehavioralMockInterview,
    professionalSkillsCoach, setProfessionalSkillsCoach,
    hostSiteVisit, setHostSiteVisit,
    industrySpeaker, setIndustrySpeaker
  }
  let showAdmins = null;
  if (loggedUser && loggedUser.a_id) {
    showAdmins = (
      <PrivateRouteGate path='/tools' {...gateProps}>
        <AdminTools {...userProps} />
      </PrivateRouteGate>
    );
  }


  return (
    <div className="g1App container-fluid p-3">
      <Switch>

        <Route exact path='/'>
          <LoginSignupGate {...gateProps}>
            <LoginSignup {...userProps} {...signupProps} {...profileProps} />
          </LoginSignupGate>
        </Route>

        <PrivateRouteGate path='/home' {...gateProps}>
          <Dashboard {...userProps} />
        </PrivateRouteGate>

        <PrivateRouteGate path='/profile' {...gateProps}>
          <ProfilePage {...userProps} {...profileProps} />
        </PrivateRouteGate>

        {showAdmins}

        <PrivateRouteGate path='/volunteers/search' {...gateProps}>
          <VolunteerSearch {...userProps} />
        </PrivateRouteGate>

        <PrivateRouteGate path='/volunteers/:volunteerId' {...gateProps}>
          <ProfileRender {...userProps} />
        </PrivateRouteGate>

        <PrivateRouteGate path='/fellows/:fellowId' {...gateProps}> 
          <ProfileRender {...userProps} />
        </PrivateRouteGate>

        <PrivateRouteGate path='/events/search' {...gateProps}>
          <Events {...userProps} />
        </PrivateRouteGate>

      </Switch>

      {
        (feedback)
          ? <Feedback feedback={feedback} resetFeedback={resetFeedback} />
          : null
      }
    </div>
  );
}

export default App;
