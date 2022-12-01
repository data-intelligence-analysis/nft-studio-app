import React, {useState, useReact} from 'react'
import metatedsHeader from '../assets/metateds-header.png'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import styled from 'styled-components'
import Home from '../pages/index';
import CloseIcon from '@mui/icons-material/Close';
//import {Linking} from 'react-native';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActions } from '@mui/material';
import Typography from '@mui/material/Typography';


const FrontPage = () => {
	//explore page array
	const modalNavBarElements =[
    {
        id: 1,
        name: "Evolution",
        href: "mutation",
        content: "Enhance your MetaTeds NFT by merging it with our Elixir to unlock and mint a gamefied version NFT",
        title: "Evolved MetaTeds",
        img: ""  
    },
    {
        id: 2,
        name: "Pixelate",
        href: 'pixelate',
        content: "With MetaPix, you can pixelate your 2D images / art pieces that can be used for a wide variety of uses such as NFTs, avatars, game characters, and more, to meet your standards.",
        title: "Pixelate Images with MetaPix",
        img: require('../assets/metapix_banner.png'),

    },
    {
        id: 3,
        name: "Gallery",
        href: 'gallery',
        content: "Displaying MetaTeds generative art that serve as communitites in our platform",
        title: "Collections & Communities",
        img: "",
    }
  
  ]
	//react hooks
	const [modal, setModal] = useState(false);
  const [modalNavbar] = useState(modalNavBarElements);
  const [activeSidebar, setActiveSideBar] = useState(null);
  const [landing, setLanding] = useState(null);

	//url to tweet metateds and metahead gallery
	const tweetNow = (event, twitterShareUrl, tweetContent, twitterAccount) => {
    console.log("tweetNow has been selected")
    let twitterParam = []
    twitterParam.push('url=' + encodeURI(twitterShareUrl))
    twitterParam.push('text=' + encodeURI(tweetContent))
    twitterParam.push('via=' + encodeURI(twitterAccount))
    const url = 'https://twitter.com/intent/tweet?' + twitterParam.join('&');
    Linking.openURL(url)
      .then((data)=>{
        console.log('Twitter has opened')
      }).catch((error)=>{
        console.log(error)
      })
  }
	//custom loader
	const customLoader = ({src, width, quality}) => {
		return process.env.NODE_ENV === "production" ?
		`${process.env.BASE_URL}/${src}?${width}&q=${quality || 75}`:
		`http://localhost:3000/${src}?${width}&q=${quality || 75}`;
	}

	const toggleModal = () => {
		setModal(prev => !prev);
		setLanding(prev => !prev)
	}
	const activeModal = (event, index) => {
		setLanding(false);
		setActiveSideBar(index)
		console.log(`current ${index}`)
	}

	const RenderModal = ({props}) => {
		return (
			<div className="" key={props.id}>
				{props.id==0 && 
					<div key={props.id}>

					</div>
				}
				{props.id==1 && 
					<div key={props.id}>
						
					</div>
				}
				{props.id==2 && 
					<div key={props.id}>
						
					</div>
				}
			</div>
		)
	}
	const Explore = () => {
		return (
			<>
				<div className="inset-0 z-10 fixed bg-[#2e2e30e6]">
					<div className="relative justify-center mx-auto min-h-full overflow-y-auto p-2 items-center lg:max-w-screen-2xl">
						<nav className='flex items-center w-full h-[45px] top-20 sticky gap-x-2'>
							<button className="text-[30px] pt-0.5 ml-auto flex justify-center items-center h-full mr-6 text-white bg-transparent pointer-cursor outline-none overflow-hidden hover:ring-4 hover:ring-indigo-600 rounded-md" onClick={toggleModal}>
								{modal ? (
									<CloseIcon sx={{width: 50, height:38}}/>)
								:(
									<Home />
								)}
							</button>
						</nav>
					</div>
				</div>
			</>
		)
	}
	return (
			<div className='home_container'>
					<Head>
							<title>Home | MetaTeds </title>
					</Head>
					<div className = 'home_container_name'>
						<Image
								loader={customLoader} 
								src={metatedsHeader}
								alt="MetaTeds Logo"
								height={250}
								width='auto'
								priority="true"
						/>
					</div>
					<div className = 'home_content_subheader pb-10 ml-a mr-a font_text_size text-[#EAA640]'>
							<h1>Building a Web3 Ecosystem</h1>
					</div>
					<div className="mt-8 flex text-center">
						<Link href ="/mint" legacyBehavior>
								<MintButton>
										Mint Teds
								</MintButton>
						</Link>
						<ExploreButton onClick={toggleModal}>
								Explore
						</ExploreButton>
					</div>
					{modal && <Explore />}

			</div>
	);
};

const MintButton = styled.button`
		font-size: 1.2rem;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		cursor: pointer;
		background-repeat: no-repeat;
		width: 150px;
		font-family: 'Ranchers',bold;
		border-radius: 4px;
		margin-right: 1.5rem;
		background-color: var(--tw-purple-ted);
		&:hover {
			background: #4e4197;
			font-weight: 500;
			box-shadow: 0;
			-webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
			-moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
			transition: all 0.3s ease 0s;
		};
		@media (max-width: 428px){
				padding-top: 0.375rem;
        padding-bottom: 0.375rem;
        padding-right: 1rem;
        padding-left: 1rem;
        height: 100%;
        width: 100px;
        font-size: 1rem;
		}
`
const ExploreButton = styled.button`
		font-size: 1.2rem;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		cursor: pointer;
		background-repeat: no-repeat;
		width: 150px;
		font-family: 'Ranchers',bold;
		border-radius: 4px;
		margin-left: 1.5rem;
		background-color: var(--tw-metateds);
		&:hover{
			background: #B27315;
			font-weight: 500;
			box-shadow: 0;
			-webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
			-moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
			transition: all 0.3s ease 0s;
		}
		@media (max-width: 428px){
			padding-top: 0.375rem;
			padding-bottom: 0.375rem;
			padding-right: 1rem;
			padding-left: 1rem;
			height: 100%;
			width: 100px;
			font-size: 1rem;
	}
`


export default FrontPage;