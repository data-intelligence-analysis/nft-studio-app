import React, {useState, useEffect, useRoute} from 'react'
import { FaWindowClose } from "react-icons/fa";
import { IconContext } from "react-icons";

export default function CookieBanner() {
  const [accepted, setAccepted] = useState(false);
  const [isAccepted, setStatus] = useState(null);
  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setAccepted(true);
  };

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    setStatus(cookiesAccepted)
  }, [])
  //const isAccepted = localStorage.getItem('cookiesAccepted');

  return (
    <div
      className={`cookie-banner${isAccepted || accepted ? ' hidden' : ''}`}
      style={{
        position: 'fixed',
        bottom: '0',
        left: '0',
        width: '100%',
        padding: '1rem',
        backgroundColor: '#312e81',
        borderTop: '1px solid #CCC',
        textAlign: 'center',
        transition: 'transform 0.3s ease-out',
        transform: isAccepted || accepted ? 'translateY(100%)' : 'translateY(0%)',
        zIndex: '999',
        fontFamily: 'Helvetica',
      }}
    >
      <p
        style={{
          fontSize: '1rem',
          lineHeight: '1.5rem',
          marginBottom: '0.5rem',
          color: '#ffffff',
        }}
      >
        We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.{' '}
        <a className="text-indigo-500 underline underline-offset-2 visited:text-indigo-600 font-bold" href="/cookies">
          Learn more
        </a>
      </p>
      <button
        onClick={acceptCookies}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#4f46e5',
          color: '#FFF',
          border: 'none',
          borderRadius: '2px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease-out',
        }}
      >
        Accept
      </button>
    </div>
  );
}


