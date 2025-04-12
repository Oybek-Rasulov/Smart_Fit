import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './pages/Home';
import './App.css'
// import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './context/AuthContext';
import { SocialProvider } from './context/SocialContext';
import { TrainersProvider } from './context/TrainersContext';
import Saves from './pages/Saves';
import TrainerList from './pages/TrainerList';
import TProfile from './pages/TProfile';
import HealthyFoods from './pages/HealthyFoods';
import Profile from './pages/Profile';
import TLogin from './pages/TLogin';
import TForm from './pages/TForm';
import TUser from './pages/TUser';
import Chat from './pages/Chat';
import Exercise from './pages/Exercise';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AdminLayout from './pages/AdminLayout';
import AdminLogin from './pages/AdminLogin';
import ChatCommunity from './pages/ChatCommunity';
import { getAuthToken, isAdmin } from './Auth/getAuthToken'; // Utility functions for auth check'
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated and if they have the 'admin' role
    const token = getAuthToken(); // Get token from localStorage or cookies
    if (token && isAdmin()) {
      setIsAuthenticated(true);
      setIsAdminUser(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <SocialProvider>
          <TrainersProvider>
            <Routes>
              <Route index element={<Home />} />
              <Route path='save' element={<Saves />} />
              <Route path='trainer' element={<TrainerList />} />
              <Route path='login' element={<SignIn />} />
              <Route path='register' element={<SignUp />} />
              <Route path='tprofile/:trainerid' element={<TProfile />} />
              <Route path='food' element={<HealthyFoods />} />
              <Route path='exercise' element={<Exercise />} />
              <Route path='profile' element={<Profile />} />
              <Route path='tlogin' element={<TLogin />} />
              <Route path='tform' element={<TForm />} />
              <Route path='tuser' element={<TUser />} />
              <Route path='chat/:trainerid' element={<Chat />} />
              <Route path="/AdminLogin" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  isAuthenticated && isAdminUser ? (
                    <AdminLayout /> // Render AdminLayout if the user is authenticated and is an admin
                  ) : (
                    <Navigate to="/AdminLogin" /> // Redirect to login page if not authenticated
                  )
                }
              />
              {/* <Route path='admin' element={<DashboardLayoutBasic />} /> */}
              <Route path='community' element={<ChatCommunity />} />
            </Routes>
          </TrainersProvider>
        </SocialProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
