import React, {useState, useEffect, useRoute} from 'react'
import ReactDOM from "react-dom";
import { FaWindowClose } from "react-icons/fa";
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import { Box, ThemeProvider, createTheme } from '@mui/system';
import { Padding } from '@mui/icons-material';
import { IconContext } from "react-icons";

const useModal = () => {
  //states
  const [isShowing, setShowing] =useState(false);
  const [overlay, setOverlay] = useState(true);
  const toggle =() => {
    setShowing(!isShowing)
  }
  const returnOverlay =() => {
    setOverlay(false)
  }
  return {
    isShowing,
    overlay,
    returnOverlay,
    toggle,
  }
  
}

export default function DesktopWarnModal() {
  //states
  const [modal, setModal] = useState(true);
  

  const { isShowing, overlay, toggle, returnOverlay} = useModal();
  const [cookieConsent, showCookieConsent] = useState(true);
  const [checked, setIsChecked] = useState(0);

  //functions
  const handleOnchange = (e) =>{
    setIsChecked(e.target.checked);
    localStorage.setItem("hide", e.target.checked);
  }
  const clearStorage = () =>{
    localStorage.clear();
  }
  const closeModal = (e) => {
    setModal(prev => !prev);
  }

  useEffect(()=>{
    toggle();
    let modalStorage = localStorage.getItem("hide", checked);
    if (modalStorage) {
      console.log("storage", modalStorage);
      showCookieConsent(false);
    }
  }, [])
  // dark:outline-2  dark:outline dark:outline-offset-2 dark:outline-white use for modal dark mode
  return (
    <>
      {cookieConsent === true && (
        <>
          {isShowing ? (
            
              <div className="grid sm:hidden inset-0 z-50 fixed bg-slate-800 opacity-95">
                <div className="grid justify-items-center overflow-x-auto min-h-full p-4 items-center mx-auto">
                  <div className="flex items-center justify-content mx-auto text-white bg-indigo-800 dark:bg-slate-900 rounded-md min-w-fit w-[60vw] max-w-md">
                    <div className="p-5 flex items-center flex-col grow flex-wrap font-sans">
                      <div className="flex w-full mr-auto items-center mb-4 pointer-events-auto pointer-cursor">
                        <button className="flex pointer-cursor" onClick={toggle}>
                            <IconContext.Provider value={{size: '1.75em', color: 'white'}}>
                              <div>
                                <FaWindowClose />
                              </div>
                            </IconContext.Provider>
                        </button>
                      </div>
                      <section className="mb-5 flex justify-content items-center">
                        <h1 className="text-center inline-block text-lg font-bold">
                          Caution!
                        </h1>
                      </section>
                      <div className='mb-2 text-sm text-center'>
                        <div>Features on this page are not fully supported on <span className="font-bold text-slate-100 uppercase">mobile/tablet</span>{''} screens.<span className="inline-flex items-baseline"></span> Switch to <span className="font-bold text-slate-100 uppercase">desktop</span> to obtain a better experience.</div>
                      </div>
                      
                      <div className='flex gap-x-2 mt-8 mr-auto'>
                        <input type="checkbox" id="dont-show" onChange={handleOnchange}/>
                        <p className="text-left text-xs"> {"Don't Show This Message"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : ('')
          }
        </>
      )}
    </>

  )
}
