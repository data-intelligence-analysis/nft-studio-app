import {React, useState} from 'react'
import { SiDiscord } from "@react-icons/all-files/si/SiDiscord";
import {GiOffshorePlatform} from "@react-icons/all-files/gi/GiOffshorePlatform"
import { SiTwitter } from "@react-icons/all-files/si/SiTwitter";
import TwitterIcon from '@mui/icons-material/Twitter';
import {buildUrl} from 'cloudinary-build-url';
//import platformIcon from '../assets/ted@3.png'
import ogIcon from '../assets/og_icon.png'
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image'
import Home from '../pages/index';
import {
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
//import styles from '../styles/Footer.module.css'
import Link from 'next/link'
//required for Solana modal
require('@solana/wallet-adapter-react-ui/styles.css');
/*<svg stroke="currentColor" fill="currentColor" stroke-width="0" role="img" viewBox="0 0 24 24" aria-hidden="true" class="w-6 h-6" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="color: rgb(87, 100, 241);">
  <title>
  </title>
  <path d="M20.222 0c1.406 0 2.54 1.137 2.607 2.475V24l-2.677-2.273-1.47-1.338-1.604-1.398.67 2.205H3.71c-1.402 0-2.54-1.065-2.54-2.476V2.48C1.17 1.142 2.31.003 3.715.003h16.5L20.222 0zm-6.118 5.683h-.03l-.202.2c2.073.6 3.076 1.537 3.076 1.537-1.336-.668-2.54-1.002-3.744-1.137-.87-.135-1.74-.064-2.475 0h-.2c-.47 0-1.47.2-2.81.735-.467.203-.735.336-.735.336s1.002-1.002 3.21-1.537l-.135-.135s-1.672-.064-3.477 1.27c0 0-1.805 3.144-1.805 7.02 0 0 1 1.74 3.743 1.806 0 0 .4-.533.805-1.002-1.54-.468-2.14-1.404-2.14-1.404s.134.066.335.2h.06c.03 0 .044.015.06.03v.006c.016.016.03.03.06.03.33.136.66.27.93.4.466.202 1.065.403 1.8.536.93.135 1.996.2 3.21 0 .6-.135 1.2-.267 1.8-.535.39-.2.87-.4 1.397-.737 0 0-.6.936-2.205 1.404.33.466.795 1 .795 1 2.744-.06 3.81-1.8 3.87-1.726 0-3.87-1.815-7.02-1.815-7.02-1.635-1.214-3.165-1.26-3.435-1.26l.056-.02zm.168 4.413c.703 0 1.27.6 1.27 1.335 0 .74-.57 1.34-1.27 1.34-.7 0-1.27-.6-1.27-1.334.002-.74.573-1.338 1.27-1.338zm-4.543 0c.7 0 1.266.6 1.266 1.335 0 .74-.57 1.34-1.27 1.34-.7 0-1.27-.6-1.27-1.334 0-.74.57-1.338 1.27-1.338z">
  </path>
</svg>*/

const SocialMedia = [
    {
        name: 'Twitter',
        href: 'https://twitter.com/MetaTeds',
        icon: <SiTwitter />
    },
    {
        name: 'Discord',
        href: 'http://discord.gg/N5wB8JTBBS',
        icon: <SiDiscord aria-hidden="true"/>
        /*icon: <Image alt = 'Discord' src ={discord} width="auto" height={"20"} styles={{objectFit:"contain", objectPosition:'center'}}/>*/
    },
    {   
        name: 'Platform',
        href: 'https://metateds.com/',
        icon: <GiOffshorePlatform aria-hidden="true"/> /*<Image alt = 'Platform' src ={platformIcon} width="auto" height={"20"} styles={{objectFit:"contain", objectPosition:'center'}}/>*/
    },
]

//fixed pt-1 pb-1 z-30 text-center w-full bottom-0 bg-transparent

//footer tailwind css
//fixed flex pt-1 pb-1 z-20 left-0 items-center w-screen bottom-0
const Footer = ({bgFormat, display}) => {
    //react hooks
    const [socialImg] = useState(SocialMedia)
    const [modal, setModal] = useState(false);
    
    const toggleModal = () => {
        setModal(prev => !prev);
    }
    //Security measure to validate external site urls
    function valURL(url) {
      const parsed = url
      return ['https:', 'http:'].includes(parsed.protocol)
    }
    const TermsAndConditions = () => {
      return (
        <>
          <div className="inset-0 z-10 fixed bg-[#2e2e30e6]">
            <div className="relative justify-center mx-auto min-h-full overflow-y-auto p-2 items-center lg:max-w-screen-2xl">
              <div className="mt-10 sticky w-full h-[45px] items-center">
                <button className="text-[30px] pt-0.5 ml-auto flex justify-center items-center h-full mr-6 text-white bg-transparent pointer-cursor outline-none overflow-hidden hover:ring-4 hover:ring-indigo-600 rounded-md" onClick={toggleModal}>
                  {modal ? (
                    <CloseIcon sx={{width: 50, height:38}}/>)
                  :(
                    <Home />
                  )}
                </button>
              </div>
              <div className="absolute px-4 pt-4 pb-4 overflow-hidden text-left text-slate-50 transform transition-all sm:my-8 sm:p-5 opacity-100 translate-y-0 sm:scale-100">
                <div className="font-sans mt-4 sm:mt-5 items-center text-left">
                  <h2 className="text-xl text-white font-bold leading-6">Website Terms and Conditions of Use</h2>
                  <div className="mt-4">
                    <h2 className="mt-5 mb-2 text-lg font-bold">1. Terms </h2>
                    <p className="mb-1 leading-5">
                      By accessing this Website accessible from<span>&#44;</span>{" "}
                      you are agreeing to be bound by these Website Terms and Conditions 
                      of Use and agree that you are responsible for the agreement with any applicable local laws. 
                      If you disagree with any of these terms, you are prohibited from accessing this site. 
                      The materials contained in this Website are protected by copyright and trade mark law. 
                    </p>
                    <h2 className="mt-5 mb-2 text-lg font-bold">2. Use License</h2>
                    <p className="mb-1 leading-5">
                      Permission is granted to use the materials provided at MetaTed Labs LLC<span>&#39;</span>s Website for personal viewing only. 
                      This is the grant of a license, not a transfer of title, and under this license you may not:
                    </p>
                    <ol className="flex flex-col mt-2 mb-6 pl-9 list-decimal">
                      <li className="list-item text-white leading-5">
                        Modify or copy the materials.
                      </li>
                      <li className="list-item text-white leading-5">
                        Abuse the materials or server resources, i.e. through distributed denial of service.
                      </li>
                      <li className="list-item text-white leading-5">
                        Create or participate in harmful language or action that may harm others.
                      </li>
                      <li className="list-item text-white leading-5">
                        <span>&#39;</span>mirror<span>&#39;</span> the materials on any other server without proper attribution
                      </li>
                    </ol>
                    <p className="mb-1 leading-5">
                      This will let MetaTed Labs LLC to terminate upon violations of any of these restrictions. 
                      Upon termination, your viewing right will also be terminated and you should destroy any
                      downloaded materials in your possession whether it is printed or electronic format. 
                      These Terms of Service has been created with the help of the <a href={valURL(new URL("https://www.termsofservicegenerator.net/"))? 'https://www.termsofservicegenerator.net/' : ''} target="_blank" rel="noopener noreferrer" className="hover:underline font-bold visited:text-amber-500 text-base cursor-pointer text-violet-800">Terms Of Service Generator</a>.
                    </p>
                    <h2 className="mt-6 mb-2 text-lg">3. Disclaimer</h2>
                    <p className="mb-1 leading-5">
                      All the materials on MetaTed Labs LLC<span>&#39;</span>s Websites are provided <span>&#8220;</span>as is<span>&#8221;</span>. 
                      MetaTed Labs LLC makes no warranties, may it be expressed or implied, therefore negates all other warranties. Furthermore, MetaTed Labs LLC does not make any representations concerning the accuracy or reliability of the use of the materials on its Website or otherwise relating to such materials or any sites linked to this Website.
                    </p>
                    <h2 className="mt-6 mb-2 text-lg">4. Limitations</h2>
                    <p className="mb-1 leading-5">
                      MetaTed Labs LLC or its suppliers will not be hold accountable for any damages that will arise with the use or inability to use the materials on MetaTed Labs LLC<span>&#39;</span>s Website, 
                      even if MetaTed Labs LLC or an authorize representative of this Website has been notified, orally or written, of the possibility of such damage. 
                      Some jurisdiction does not allow limitations on implied warranties or limitations of liability for incidental damages, these limitations may not apply to you.
                    </p>
                    <h2 className="mt-6 mb-2 text-lg">5. Revisions and Errata</h2>
                    <p className="mb-1 leading-5">
                      The materials appearing on MetaTed Labs LLC<span>&#39;</span>s Website may include technical, typographical, or photographic errors. 
                      MetaTed Labs LLC will not promise that any of the materials in this Website are accurate, complete, or current. 
                      MetaTed Labs LLC may change the materials contained on its Website at any time without notice. 
                      MetaTed Labs LLC does not make any commitment to update the materials.
                    </p>
                    <h2 className="mt-6 mb-2 text-lg">6. Links</h2>
                    <p className="mb-1 leading-5">
                      MetaTed Labs LLC has not reviewed all of the sites linked to its Website and is not responsible for the contents of any such linked site. 
                      The presence of any link does not imply endorsement by MetaTed Labs LLC of the site. 
                      The use of any linked website is at the user<span>&#39;</span>s own risk.
                    </p>
                    <h2 className="mt-6 mb-2 text-lg">7. Site Terms of Use Modifications</h2>
                    <p className="mb-1 leading-5">
                      MetaTed Labs LLC may revise these Terms of Use for its Website at any time without prior notice.
                      By using this Website, 
                      you are agreeing to be bound by the current version of these Terms and Conditions of Use.
                    </p>
                    <h2 className="mt-6 mb-2 text-lg ">8. Your Privacy</h2>
                    <p className="mb-1 leading-5">
                      Please read our <button className="hover:underline font-bold visited:text-amber-500 text-base cursor-pointer text-violet-800" onClick={()=> alert("Privacy Policy coming soon")}>Privacy Policy</button>
                    </p>
                    <h2 className="mt-6 mb-2 text-lg ">9. Governing Law</h2>
                    <p className="mb-1 leading-5">
                      Any claim related to MetaTed Labs LLC<span>&#39;</span>s Website shall be governed 
                      by the laws of us without regards to its conflict of law provisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )
    }
    
    function valURL(url) {
        const parsed = url
        return ['https:', 'http:'].includes(parsed.protocol)
      }
    return (
        <footer className={`fixed flex pt-1 pb-1 z-20 left-0 items-center w-screen bottom-0 ${bgFormat}`}>
            <div className="mx-w-screen-xl mx-auto flex items-center justify-between gap-x-4 w-full py-1 px-4">
                <div className='flex items-center gap-x-2'>
                    {socialImg.map((social, index) => (
                        <a className = 'sm:py-[10px] sm:px-[10px] py-[8px] px-[4px]' key={index} 
                            target="_blank" rel = "noreferrer" 
                            href={valURL(new URL(`${social.href}`)) ? social.href : ''}>
                            {social.icon}                                     
                        </a>
                    ))}
                </div>
                <div className={`${display} flex font-bold items-center mt-0.5 gap-x-2 `}>
                    <button className="justify-center flex items-center overflow-hidden px-1 sm:px-3.5 py-2 rounded-md bg-zinc-700 hover:ring-4 hover:ring-indigo-600 pointer-cursor" onClick={toggleModal}>
                        <Image src={ogIcon} alt="ted-og" width="21" height="auto" style={{marginRight:'0.475rem'}}/> 
                        <p className="font-bold font-display tracking-wider text-xs sm:text-lg">Terms of Use</p>
                    </button>
                </div>
                {modal && <TermsAndConditions /> }
                <div className= 'flex items-center gap-x-4 text-sm sm:text-base'>
                    <p>Copyright © 2022</p>
                </div>
            </div>
            
            
        </footer>
    )
}

export default Footer