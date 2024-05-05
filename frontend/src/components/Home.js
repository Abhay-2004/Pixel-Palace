import React from 'react';
import homeImage from '../Images/Home/img1.jpeg';
import './Home.css';

const Home = () => {
  return (
    <section className="header16 cid-u3EbN5RTG5 mbr-fullscreen mbr-parallax-background" id="hero-17-u3EbN5RTG5">
      <div className="mbr-overlay" style={{ opacity: '0.3', backgroundColor: 'rgb(0, 0, 0)' }}></div>
      <div className="container-fluid" style={{ filter: 'brightness(150%)' }}>
        <div className="row">
          <div className="content-wrap col-12 col-md-10">
            <h1 className="mbr-section-title mbr-fonts-style mbr-white mb-4 display-1" style={{ textShadow: '2px 2px 2px black' }}>
              <strong>Pixel Palace</strong>
            </h1>
            <p className="mbr-fonts-style mbr-text mbr-white mb-4 display-7" style={{ textShadow: '2px 2px 2px black' }}>
              <strong>Welcome to the Kingdom of Cutting-Edge Computing!</strong>
            </p>
          </div>
        </div>
      </div>
      <footer className="footer">
      <div className="container">
        <p>&copy; Pixel Palace; all rights reserved</p>
      </div>
    </footer>
    </section>
  );
};

export default Home;