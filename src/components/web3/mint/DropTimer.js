import React from 'react';
import CountdownTimer from './MintCountdown';

export const RenderDropTimer = () => {
  // Get the current date and dropDate in a JavaScript Date object
  const currentDate = new Date();
  const dropDate = new Date(candyMachine.state.goLiveDate * 1000);

  // If currentDate is before dropDate, render our Countdown component
  if (currentDate < dropDate) {
    console.log('Before drop date!');
    // Don't forget to pass over your dropDate!
    return <CountdownTimer dropDate={dropDate} />;
  }

  // Else let's just return the current drop date
  return <p className="text-white">{`Mint is Live`}</p>
};