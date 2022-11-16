import React from 'react'
import { CircularProgress } from "@material-ui/core";
import styled from 'styled-components'
const MintReady = styled.button`
  postion: absolute;
  height: 100%;
  width: 100%;
  display: inline-block
  &:hover {
    background-color: rgba(78, 68, 245, 3)
    transform: scale(1.1)
  };
  cursor: pointer; 
  font-family: 'Press Start 2P'; 
  text-transform: uppercase; 
  text-align: center;
  animation: bounce 1.75s ease-in-out infinite;
  opacity: 1;
  
  color: #FDFDFD;   
  background: linear-gradient(180deg,#FDFDFD 0%,#4e44ce 4.7%,#4e44ce 97.2%,#4e44ce 100%);
  padding: 2.5px;
  border: 3px solid #9A9A9A;
  border-radius: 6px;
`
const MintNotReady = styled.button`
  postion: absolute;
  height: 100%;
  width: 100%;
  display: inline-block
  &:hover {
    background-color: rgba(78, 68, 245, 3)
    transform: scale(1.1)
  }; 
  font-family: 'Press Start 2P'; 
  text-transform: uppercase; 
  text-align: center;
  animation: bounce 1.75s ease-in-out infinite;
  opacity: 1;

  color: #9A9A9A;   
  background: linear-gradient(180deg,#FDFDFD 0%,#4e44ce 4.7%,#4e44ce 97.2%,#4e44ce 100%);
  padding: 2.5px;
  border: 3px solid #9A9A9A;
  border-radius: 6px;
`
export const CTAButton = styled.button`
  width: 100%;
  height: 60px;
  margin-top: 10px;
  margin-bottom: 5px;
  background: linear-gradient(180deg, #604ae5 0%, #813eee 100%);
  color: white;
  font-size: 16px;
  font-weight: bold;
`; // add your own styles here

export const MintButton = ({props}) => {
  const currentDate = new Date();
  const dropDate = new Date(props.candyMachine.state.goLiveDate*1000)
  if (props.candyMachine.state.itemsRedeemed === props.candyMachine.state.itemsAvailable){
    return <p className="font-pixel text-white text-center sm:text-base xsm:text-size py-2.5">Sold Out 😔</p>
  }else if (props.isMinting){
    return <CircularProgress />;
  }else if (props.candyMachine?.state.isPresale || props.candyMachine?.state.isWhitelistOnly){
    return <MintReady>WHITELIST MINT</MintReady>
  }else if (currentDate < dropDate){
    return (<MintNotReady onClick={() => alert('Mint coming soon')}>
              Mint TED
          </MintNotReady>)
  }
  return ( 
    <>
      <MintReady onClick={props.onMint}/>
    </>
  )
}