import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from './api';
import './App.css';
import './Styles/pages.css';

// Import Components
import Header from './components/Header';

// Import Pages
import Home from './Pages/Home';
import Auth from './Pages/Auth';
import About from './Pages/About';
import Services from './Pages/Services';
import Booking from './Pages/Booking';
import MyBooking from './Pages/MyBooking';
import ProviderRegistration from './Pages/ProviderRegistration';

const Interceptor = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Add a request interceptor
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add a response interceptor
    const responseInterceptor = api.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          toast.error('Session expired. Please log in again.');
          navigate('/auth');
        }
        return Promise.reject(error);
      }
    );

    // Clean up interceptors on unmount
    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);

  return children;
}

function App() {
  return (
    <Router>
      <Interceptor>
        <div className="App">
          <Header />
          <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/service-details" element={<Services />} />
                <Route path="/services/:id" element={<Services />} />
                <Route path="/booking/:id" element={<Booking />} />
                <Route path="/my-bookings" element={<MyBooking />} />
                <Route path="/provider-registration" element={<ProviderRegistration />} />
                <Route path="*" element={<div><h1>404 - Page Not Found</h1></div>} />
              </Routes>
            </main>
            <ToastContainer 
              position="top-center" 
              autoClose={2000} 
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss={false}
              draggable={false}
              pauseOnHover={false}
              theme="light"
            />
          </div>
      </Interceptor>
    </Router>
  );
}

export default App;