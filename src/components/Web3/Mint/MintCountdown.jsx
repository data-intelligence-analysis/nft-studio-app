import React, { useEffect, useState } from 'react';
import { Paper } from "@material-ui/core";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Countdown from "react-countdown";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      padding: theme.spacing(0),
      "& > *": {
        margin: theme.spacing(0.4),
        width: theme.spacing(6),
        height: theme.spacing(6),
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        background: "#384457",
        color: "white",
        borderRadius: 5,
        fontSize: 10,
      },
    },
    done: {
      display: "flex",
      margin: 0,
      marginBottom: theme.spacing(0.5),
      height: theme.spacing(3.5),
      padding: theme.spacing(1),
      flexDirection: "column",
      alignContent: "center",
      alignItems: "center",
      justifyContent: "center",
      background: "#384457",
      color: "white",
      borderRadius: 5,
      fontWeight: "bold",
      fontSize: 18,
    },
    item: {
      fontWeight: "bold",
      fontSize: 18,
    },
  })
);


const CountdownTimer = ({ dropDate }) => {
  // State
  const [timerString, setTimerString] = useState('');
  // Our useEffect will run on component load
  useEffect(() => {
    console.log('Setting interval...');
    // Use setInterval to run this piece of code every second
    const interval = setInterval(() => {
      const currentDate = new Date().getTime();
      const distance = dropDate - currentDate;

      // Here it's as easy as doing some time math to get the different properties
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // We have our desired output, set it in state!
      setTimerString(`${days}d ${hours}h ${minutes}m ${seconds}s`);

      // If our distance passes zero this means that it's drop time!
      if (distance < 0) {
        console.log('Clearing interval...');
        clearInterval(interval);
      }
    }, 1000);

    // Anytime our component unmounts let's clean up our interval
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [dropDate]);
  return (
    <div className="flex-row text-center">
      <p className="text-white py-2.5">Mint Starting In: </p>
      {timerString && <p className="font-pixel">{`${timerString}`}</p>}
    </div>
  );
};

export default CountdownTimer
{/*export const MintCountdown = (date, status, style) => {
  const classes = useStyles();

}*/}