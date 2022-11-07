import React from 'react'
import '../styles/Legion.module.css'
import pfp1 from '../assets/pfp/pfp-1.png'
import pfp2 from '../assets/pfp/pfp-2.png'
import pfp3 from '../assets/pfp/pfp-3.png'
import Head from 'next/head'
//import pfp4 from '../assets/pfp/pfp-4.png'
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
const Legion = () => {
    return (
        <div className="legion-container">
            <Helmet>
                <title>Legion | MetaTeds </title>
            </Helmet>
            {/*<h1>Coming Soon</h1>*/}
            <div className="about-container">
                <div className="mission-container">
                    <h1 className="h1-pos font-size font-weight-roboto font-color">
                        Ted Mission
                    </h1>

                    <p id="para-m-1" className="font-w text-pos">
                        We are creators, innovators, and community builders with the objective of developing a platform that intellectually empowers
                        communities to be involved and become citizens of the Web3 space.   
                    </p>
                    <p id="para-m--1" className="font-w text-pos">
                        To accomplish this we are driven to build the next-gen applications
                        with a deep understanding of the decentralized ecosystem to deliver value to stakeholders and foster engagement.
                        Our focus is on building experiences in each of the following: <b>Web3 Blog</b>, <b>Marketplace</b>, <b>Metaverse & Gaming</b>, and <b>DAO (Decentralized Autonomous Organization)</b>
                    </p>
                </div>
                <div className="utility-container">
                    <h1 className="font-size font-color font-weight-roboto">
                        Utility
                    </h1>
                    {/*that give users the opportunity to provide insights, 
                    communicate, and engage with tools that add value to the 
                    web3 experience. */}
                    <p id="para-u-1" className="font-w text-pos">
                        Our utility is centered around our NFTs and tokens that offer holder (membership) benefits. 
                        Currently, those benefits would be accessible through our <a href ="https://metateds.com" noreferrer className="font-color focus pad-top font-weight" target="_blank" rel="noreferrer">blog platform</a>, which include but not limited to the ability for each holder to build a
                        personalized page to feature their blogs, analyzed current engagement metrics of their blogs, view other blogs, and follow and interact with other members.
                    </p>
                        <p id="para-u-1" className="font-w text-pos">
                            You can access our blog through our ecosystem as well by connecting to our <a href ="/utility" noreferrer className="font-color focus pad-top font-weight">Utility</a> page. with your Solana wallet.
                        </p>
                     <p id="para-u-1" className="font-w text-pos">   
                        Eventually, we would transcend those tokens/NFTS into gamefied utility tokens  
                        utilized in our gaming platform more updates would be unravelled in <a href="/gaming" className="font-color focus pad-top font-weight">Gaming</a>, 
                        and provide exclusive access to our <b>DAO</b> coming soon in our  <a href ="/utility" noreferrer className="font-color focus pad-top font-weight">Utility</a> page. 
                        
                    </p>
                    <p id="para-u-1" className="font-w text-pos">
                        If you are new to Solana space, please head over to this <a href ="https://help.phantom.app/hc/en-us/articles/4406388623251-How-to-create-a-new-wallet" target="_blank" rel="noreferrer" className="font-color focus pad-top font-weight">link</a> to learn how to 
                        create and connect your Solana wallet, 
                        or head on over to our <a href ="http://discord.gg/N5wB8JTBBS" target="_blank" rel="noreferrer" className="font-color focus pad-top font-weight">Discord</a> to request for assistance, 
                        address any concerns, meet members of the community, 
                        or learn more about this new trailblazing ecosystem.    
                    </p>
                    
                    
                    
                    
                </div>
            </div>
            <div className="creators-builder-container">
                <div className="creators-container">
                    <h1 className="font-size font-weight-roboto font-color margin">
                        Creators
                    </h1>
                    <br />
                    <div className="bio1">
                        <div className= "pfp-container">
                            <img src={pfp1} alt="pfp" height= "130px" width="130px" className="pfp-img" />
                        </div>
                        <div className="bio-container">
                            <span className="px-2 py-l c-pos uppercase font-w font-weight-bolder">
                                Dennis | Full-Stack Developer & Artist
                            </span>
                            <a className="px-1" href ="https://twitter.com/archiDevOps" target="_blank" rel="noreferrer">
                                <span className="twitter-img-size twitter-color" alt="twitterIcon">
                                    <TwitterIcon color="primary" />
                                </span>
                            </a>
                            <a className="px-1" href ="https://www.linkedin.com/in/gribzdevo" target="_blank" rel="noreferrer">
                                <span className="twitter-img-size twitter-color" alt="twitterIcon">
                                    <LinkedInIcon color="primary" />
                                </span>
                            </a>
                            <p className="text-xs px-2 font-w">
                                Software developer & artist, focused on blockchain development and Web3 art, that enjoys building things.
                                
                            </p>
                        </div>
                    </div>
                    
                    <div className="bio2">
                        <div className= "pfp-container">
                            <img src={pfp2} alt="pfp" height= "130px" width="130px" className="pfp-img" />
                        </div>
                        <div className="bio-container">
                            <span className="px-2 py-l c-pos uppercase font-w font-weight-bolder">
                                Nico | Full-Stack Developer
                            </span>
                            <a className="px-1" href ="https://twitter.com/nico_builds" target="_blank" rel="noreferrer">
                                <span className="twitter-img-size twitter-color" alt="twitterIcon">
                                    <TwitterIcon color="primary" />
                                </span>
                            </a>
                            <a className="px-1" href ="https://www.linkedin.com/in/nstranquist" target="_blank" rel="noreferrer">
                                <span className="twitter-img-size twitter-color" alt="twitterIcon">
                                    <LinkedInIcon color="primary" />
                                </span>
                            </a>
                            <p className="text-xs px-2 font-w">
                            Software Engineer, Web3 Builder, passionate about the progressive decentralization of web2 infrastructure.
                            </p>
                        </div>

                    </div>
                    
                    <div className="bio3">
                        <div className= "pfp-container">
                            <img src={pfp3} alt="pfp" className="pfp-img" />
                        </div>
                        <div className="bio-container">
                            <span className="px-2 py-l c-pos uppercase font-w font-weight-bolder">
                                Conor | Tech Arch Analyst
                            </span>
                            <a className="px-1" href ="https://twitter.com/kolmercm" target="_blank" rel="noreferrer">
                                <span className="twitter-img-size twitter-color" alt="twitterIcon">
                                    <TwitterIcon color="primary"/>
                                </span>
                            </a>
                            <a className="px-1" href ="https://www.linkedin.com/in/conorkolmer" target="_blank" rel="noreferrer">
                                <span className="twitter-img-size twitter-color" alt="twitterIcon">
                                    <LinkedInIcon color="primary" />
                                </span>
                            </a>
                            <p className="text-xs px-2 font-w">
                                MetaTeds marketer, focused on showing the world MetaTeds, 
                                learner and gamer, passionate about Web3.
                            </p>
                        </div>
                    </div>
                    
                    {/*<div className="bio4">
                        <div className= "pfp-container">
                            <img src={pfp4} alt="pfp" height= "130px" width="130px" className="pfp-img" />
                        </div>
                        <div className="bio-container">
                            <span className="px-2 py-l c-pos uppercase font-w font-weight-bolder">
                                Jerry | Business Analyst
                            </span>
                            <a className="px-1" href ="https://twitter.com/Cryptocoincolle" target="_blank" rel="noreferrer">
                                <span className="twitter-img-size twitter-color" alt="twitterIcon">
                                    <TwitterIcon color="primary" />
                                </span>
                            </a>
                            <p className="text-xs px-2 font-w">
                                Avid contributor and collector of NFTs and crypto. 
                                Your typical Degen providing technical analysis in the Web 3 space.
                            </p>
                        </div>
                    </div>*/}
                </div>
            </div>
        </div>
    )
}

export default Legion;