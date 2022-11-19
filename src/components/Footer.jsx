import {React, useState} from 'react'
import twitter from '../assets/twitter.svg'
import discord from '../assets/discord.svg'
import solsurfer from '../assets/solsurfer.png'
import platformIcon from '../assets/ted@3.png'
import ogIcon from '../assets/og_icon.png'
import Image from 'next/image'
import {
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
//import styles from '../styles/Footer.module.css'
import Link from 'next/link'
//required for Solana modal
require('@solana/wallet-adapter-react-ui/styles.css');
const SocialMedia = [
    {
        name: 'Twitter',
        href: 'https://twitter.com/MetaTeds',
        icon: twitter
    },
    {
        name: 'Discord',
        href: 'http://discord.gg/N5wB8JTBBS',
        icon: discord
    },
    /*{
        name: 'SolSurfer Markeplace',
        href: 'https://solsurfer.xyz/#/',
        icon: solsurfer,
    },*/
    {   
        name: 'Platform',
        href: 'https://metateds.com/',
        icon: platformIcon,
    },
    
    /*{ 
        name: 'YouTube',
        href: 'https://www.youtube.com/channel/UCdAwJk3r-ZLVWekikurLDjw',
        icon: require('../assets/YouTube-Original.png')
    }*/
]

//fixed pt-1 pb-1 z-30 text-center w-full bottom-0 bg-transparent
const Footer = ({bgFormat, display}) => {
    const [socialImg] = useState(SocialMedia)
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
                            <Image
                                alt = {social.name} 
                                src ={social.icon} 
                                width="auto"
                                height={"20"}
                                priority="true"
                            />                                       
                        </a>
                        
                    ))}
                </div>
                <div className={`${display} flex font-bold items-center mt-0.5 gap-x-2 `}>
                    <button className="justify-center flex items-center overflow-hidden px-1 sm:px-3.5 py-2 rounded-md bg-zinc-700 hover:ring-4 pointer-cursor" onClick={()=> alert('Developemnt in progress. Loading... 80%')}>
                        <Image src={ogIcon} alt="ted-og" width="21" height="25" style={{marginRight:'0.475rem'}}/> 
                        <p className="font-bold font-['DM Sans'] tracking-wider text-xs sm:text-lg">Terms & Co.</p>
                    </button>
                </div>
                <div className= 'flex items-center gap-x-4 text-sm sm:text-base'>
                    <p>Copyright © 2022</p>
                </div>
            </div>
            
            
        </footer>
    )
}

export default Footer