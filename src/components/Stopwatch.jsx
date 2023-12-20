import { useState, useEffect } from "react";

export default function Stopwatch(props){
    const time = props.time;
    useEffect(() =>{
        let interval;
        if (!props.tenzies) {
            interval = setInterval(() => {
                props.setTime(time + 1)
            }, 10)
            props.setScore( `${hours}:${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`);
        }
        if (props.tenzies) {
            pause();
        }

        return () => clearInterval(interval);
    }, [props.tenzies, time]);

    const hours = Math.floor(time / 360000),
    min = Math.floor((time % 360000) / 6000),
    sec = Math.floor((time % 6000) / 100);

    const pause = () =>{
        props.setScore( `${hours}:${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`);
    }

    return(
        <div>
            <p className='time'>{props.score}</p>
        </div>
    )
}