import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import "./Login.css";
import loginpage from '../../img/First.jpeg';
import welcome from '../../img/web-logo.png';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Add your authentication logic here if needed
    navigate('/admindashbord');
  };

  return (
    <div className="Login-form-container">
      <div className="image-container">
        {/* Side image */}
        <img src={loginpage} alt="side image" />
        <div className="welcome-text">
          <img src={welcome} alt="side image" className='welcome-img'/>
        </div>
      </div>
      <div className="Login-form-container2">
        <h2>Staff Login</h2>
        <input
          type="text"
          placeholder="Username" className='login-inputs'
        /><br/>
        <input
          type="password"
          placeholder="Password" className='login-inputs'
        /><br/>
        <button className='logbtn' onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
