import React from 'react';
import "./UserIcon.css";

function UserIcon({ profilePicture }) {
  return (
    <div className="user-icon">
      {profilePicture ? (
        <img src={profilePicture} alt="User Profile" />
      ) : (
        <div className="default-icon"></div>
      )}
    </div>
  );
}

export default UserIcon;

