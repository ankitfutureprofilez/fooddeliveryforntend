import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Heroplet from '../assest/hero-plet.png';

export default function Homehero() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const exploreMenuRef = useRef(null); 

  useEffect(() => {
    window.scrollTo(120, 350);
    setCollapsed(true);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location]);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const handleExploreMenuClick = () => {
    if (exploreMenuRef.current) {
      exploreMenuRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="herro-sec">
      <div className="container mx-auto">
        <div className="food-hero-sec mb-24">
          <div className='left-hero' >
            <h1>Food Truck </h1>
            <p>Your Ultimate Food Delivery Destination!</p>
            <a href="#menu">Explore Menu <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.6069 2.48929L0 11.0962L1.41421 12.5104L10.0211 3.90351V11.4893H12.0208V0.489594H1.02106L1.02106 2.48929H8.6069Z" fill="white" />
            </svg>
            </a>
          </div>
          <img src={Heroplet} alt="" />
        </div>
      </div>
      <div ref={exploreMenuRef}></div>
    </div>
  );
}
