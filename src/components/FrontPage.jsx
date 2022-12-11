import React, {useState, useReact} from 'react'
import metatedsHeader from '../../public/img/metateds-header.png'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head';
import styled from 'styled-components';
import Home from '../pages/index';
import CloseIcon from '@mui/icons-material/Close';
import ogIcon from '../assets/og_icon.png'
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
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
        content: "MetaPix provides a creation studio that offers users the opportunity to pixelate 2D art and merge metateds NFTs with secondary attributes, coming soon, that can be used for a wide variety of purposes such as pfps for the metateds platform, NFTs, avatars, game characters, and more, to meet your standards.",
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

	const RenderModal = ({...props}) => {
		return (
			<div key={props.id}>
				{props.id==0 && 
					<div key={props.id} className="items-center w-full h-full">
						<div className= "m-1 mb-8 sm:m-5 sm:mb-4 flex items-center">
							<div className="w-3/12 min-w-fit mx-auto h-full justify-center flex items-center cursor-pointer py-1 px-1 max-w-xs rounded-lg border-2 border-slate-100" >
								<Image src={ogIcon} alt="ted-og" width="25" height="auto" placeholder="shimmer" style={{marginRight:'0.75rem'}}/>
								<div className="block text-left mr-3 sm:mr-6">
									<p className="text-xs uppercase font-normal">Powered by</p>
									<p className="text-xs uppercase">MetaTed Labs - Metapix</p>
								</div>
							</div>
						</div>
						<div className="mt-2 w-full">
							<h1 className="text-3xl sm:text-4xl">{props.title}</h1>
						</div>
						<section className="w-full m-2 mt-2 sm:mt-4 block">
							<p className="inline-block text-base font-sans text-slate-400 font-bold">
								{props.content}
							</p>
						</section>
					</div>
				}
				{props.id==1 && 
					<div key={props.id} className="items-center w-full h-full">
						<h1 className="text-3xl sm:text-4xl">{props.title}</h1>
						<div className="mt-4 mb-4 w-full items-center">
							<span className="box-border block overflow-hidden bg-none opacity-100 border-0 m-0 p-0 relative">
                <Image
                  loader={customLoader}
                  quality='90'
                  src={props.img}
                  alt="metapix"
                  height="220"
                  width= "auto"
                  placeholder='shimmer'
                  style = {{objectFit: 'contain', objectPosition: 'center', borderRadius: '15px'}}
                />
              </span>
						</div>
						<section className="w-full text-center sm:text-left m-2 mt-2 sm:mt-4 block">
							<p className="mt-2 mb-1 inline-block text-base sm:text-lg font-sans text-slate-400">
								{props.content}
							</p>
							<p className="mt-2 mb-1 inline-block text-base sm:text-lg font-sans text-slate-400">
								Own and control the pixel quality of your images and produce outstanding pixelated images that meet your desires.
							</p>
							<p className="mt-2 mb-2 inline-block text-base sm:text-lg font-sans text-white">
								We will provide DAO members (NFT holders) their ability to mint their images from the MetaPix creation studio through the platform.
							</p>
						</section>
						<div className="mt-3 mb-6 text-align items-center">
							<Link href='/metapix/home' legacyBehavior >
								<a target='_blank' rel ="noopener noreferrer">
									<button type="button" className="cursor-pointer text-center text-lg sm:text-xl md:text-2xl m-4 sm:m-8 hover:bg-slate-900 rounded-lg bg-indigo-700 px-4 py-2 sm:px-6">
										MetaPix
									</button>
								</a>
              </Link>
						</div>
					</div>
				}
				{props.id==2 && 
					<div key={props.id} className="items-center w-full h-full">
						<h1 className="text-3xl sm:text-4xl">{props.title}</h1>
						<section className="w-full m-2 mt-2 sm:mt-4 block">
							<p className="inline-block mt-1 text-base font-sans text-slate-400 font-bold">
								{props.content}
							</p>
						</section>
					</div>
				}
			</div>
		)
	}
	const Explore = () => {
		return (
			<>
				<div className="inset-0 z-10 fixed bg-[#2e2e30e6] overflow-y-auto">
					<div className="min-h-screen p-2 items-center mx-auto w-screen max-w-full lg:max-w-screen-2xl">
						<nav className='flex items-center w-full h-[45px] mt-20 sticky gap-x-2'>
							<button className="text-[30px] ml-auto flex justify-center items-center h-full pr-0.5 mr-2 text-white bg-transparent pointer-cursor outline-none overflow-hidden hover:ring-4 hover:ring-indigo-600 rounded-md" onClick={toggleModal}>
								{modal ? (
									<CloseIcon sx={{width: 50, height:38}}/>)
								:(
									<Home />
								)}
							</button>
						</nav>
						<div className="h-full overflow-hidden px-4 pt-4 my-2 pb-4 sm:my-6 sm:p-4 opacity-100">
							<div className="mt-2 sm:mt-4 sm:grid sm:grid-cols-8 md:grid-cols-13 sm:place-items-center">
								<div className="overflow-hidden flex justify-center w-full sm:col-start-1 sm:col-span-2 md:col-start-1 md:col-span-4">
									<div className="m-2 p-4 sm:m-4 sm:p-6 flex items-center sm:gap-x-4 gap-x-1 sm:flex-col flex-row">
										{modalNavbar.map((elem, i) =>(
											<button className={`cursor-pointer text-center text-base sm:text-xl md:text-2xl m-4 sm:m-8 hover:bg-slate-900 rounded-lg bg-indigo-700 px-2 py-2 sm:px-4 ${activeSidebar===i?"ring-indigo-700 ring-4 bg-violet-900":""}`} key={i} onClick={(event) => activeModal(event, i)}>
												{elem.name}
											</button>
										))}
									</div>
								</div>
								<div className="flex mt-4 items-center sm:grid sm:col-start-3 sm:col-span-6 md:col-start-5 md:col-span-9">
									{landing ? (
										<div className="items-center mx-auto relative sm:flex">
											<Image
												src={require('../assets/landingIMG.png')}
												alt="space-ted"
												placeholder='shimmer'
												width='500'
												height='auto'
												loader={customLoader}
											/>
										</div>
									):(modalNavbar.map((elem, index) =>(
											<div className="" key={index}>
												{activeSidebar===index &&
													<RenderModal 
														id={index}
														title={elem.title}
														content={elem.content}
														img={elem.img}
													/>
												}
											</div>
										)))}
								</div>

							</div>
						</div>
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
								priority='true'
						/>
					</div>
					<div className = 'home_content_subheader pb-10 ml-a mr-a font_text_size text-[#EAA640]'>
							<h1>Building a Web3 Platform</h1>
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