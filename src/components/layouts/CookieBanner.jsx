import React, {useState, useEffect, useRoute} from 'react'
import { FaWindowClose } from "react-icons/fa";
import { IconContext } from "react-icons";
import Link from "next/link";
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
    <>
      <div className={`fixed inset-0 z-[9998] bg-zinc-900 bg-opacity-70 ${isAccepted || accepted ? 'hidden': ''} sm:hidden`}></div>
       <div className="w-full z-[9999] max-w-md items-center fixed absolute-middle sm:bottom-[52px] sm:right-[30px]">
        <div
          className={`backdrop-blur  p-5 sm:p-3  ${isAccepted || accepted ? 'hidden' : ''}`}
          style={{
            borderTop: '1px solid #CCC',
            borderRadius: '3px',
            transition: 'transform 0.3s ease-out',
            transform: isAccepted || accepted ? 'translateY(100%)' : 'translateY(0%)',
            fontFamily: 'Helvetica',
          }}
        >
          <div>
            <h1 className="text-center sm:mb-4 mb-2 mt-1 sm:mt-2 uppercase text-base font-sans font-semibold">Cookies & Privacy</h1>
            <p
              className='text-left text-sm'
              style={{
                marginBottom: '0.5rem',
                color: '#ffffff',
              }}
            >
              We use cookies to provide you with personalized advertising 
              based on your browsing profile and to compile analytical statistics to improve your experience on our website.
              By continuing to visit this site you agree to our use of cookies please visit our {' '}
              <Link href="/policy/cookies" passHref legacyBehavior>
                <a className="text-slate-200 underline underline-offset-2 visited:text-indigo-700 font-bold">
                  cookies policy
                </a>
              </Link> {' '} to learn more
              To find out more, please visit our {' '}
              <Link href="/policy/privacy" passHref legacyBehavior>
                <a className="text-slate-200 underline underline-offset-2 visited:text-indigo-700 font-bold">
                  privacy policy
                </a>
              </Link> {' '}
              or the {' '} 
              <Link href="/policy/cookies-list" passHref legacyBehavior>
                <a className="text-slate-200 underline underline-offset-2 visited:text-indigo-700 font-bold">
                  list of cookies
                </a>
              </Link> {' '} we use
            </p>
            <div className="sm:flex sm:justify-between grid gap-y-4 items-center pt-5 sm:p-5 sm:gap-x-2">
              <button
                onClick={acceptCookies}
                className="p-2 uppercase hover:outline hover:outline-2 hover:outline-white"
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
              <button
                onClick={acceptCookies}
                className="p-2 uppercase hover:outline hover:outline-2 hover:outline-white"
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
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
    
  );
}


