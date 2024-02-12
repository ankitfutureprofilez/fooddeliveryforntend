import React from 'react'
import '../styles/loader.css';

export default function LoadingPage() {
    return (
        <div className="container">
          <div className="loader">
            <div className="loader--dot"></div>
            <div className="loader--dot"></div>
            <div className="loader--dot"></div>
            <div className="loader--dot"></div>
            <div className="loader--dot"></div>
            <div className="loader--dot"></div>
            <div className="loader--text"></div>
          </div>
        </div>
      );
}
