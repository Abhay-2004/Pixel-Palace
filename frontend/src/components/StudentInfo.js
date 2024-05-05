import React from 'react';
import abhayImage from '../Images/Profile_Pics/abhay.jpg';
import prerakImage from '../Images/Profile_Pics/prerak.jpeg';

const StudentInfo = () => {
  const profileStyle = {
    profile: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginBottom: '20px',
      background: '#f8f9fa',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    profileImage: {
      width: '150px',
      height: '150px',
      borderRadius: '50%',
    },
    profileImagePrerak:{
      width: '140px',
      height: '155px',
      borderRadius: '50%',
    },
    profileInfo: {
      textAlign: 'center',
    },
    aboutSection: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
  };

  return (
    <div className="container">
      <h2>Student Information</h2>
      <p>Welcome to Pixel Palace, one place to buy the latest technology. This is our final project for the COMS 319 course.</p>
      <div className="row">
        <div className="col-md-6" style={profileStyle.profile}>
          <img src={abhayImage} alt="Abhay" style={profileStyle.profileImage} />
          <div style={profileStyle.profileInfo}>
            <h3>Abhay</h3>
            <p>Email: abhay14@iastate.edu</p>
          </div>
        </div>
        <div className="col-md-6" style={profileStyle.profile}>
          <img src={prerakImage} alt="Prerak" style={profileStyle.profileImagePrerak} />
          <div style={profileStyle.profileInfo}>
            <h3>Prerak</h3>
            <p>Email: prerak@iastate.edu</p>
          </div>
        </div>
      </div>
      <div className="about-section" style={profileStyle.aboutSection}>
        <h2>About Our Project</h2>
        <p>This is our Final Wesbite built for the COMS 319 course shwoing our Web Development skills using technologies like React, Java Script, HTML, mongoDB, client and server (Frontend and backend storing) etc..</p>
        <p>Hope you liked our website! Reach out to us if you have any questions.</p>
        <p><strong>Course:</strong> COMS 319 - CONSTRUCTION OF USER INTERFACES<br />
           <strong>Professor:</strong> Professor Abraham Aldaco<br />
           <strong>Date:</strong> May 4, 2024</p>
      </div>
    </div>
  );
};

export default StudentInfo;
