import React, {useRef, useState} from 'react';
import style from './NewTime.module.css';
import {Button, Icon} from "@material-ui/core";
import {green} from "@material-ui/core/colors";

export default function NewTime(){

    const [time, setTime] = useState(0);
    const [start, setStart] = useState(false);
    const [interval, changeInterval] = useState();

    let ref = useRef(0);

    function run(){
        setStart(true);

        const interval = setInterval(() => {

            ref.current = ref.current + 100;

            setTime(ref.current);

        }, 100);

        // @ts-ignore
        changeInterval(interval);
    }

    function msToTime(duration: number) {
        let milliseconds = (duration % 1000) / 100,
            seconds: string | number = Math.floor((duration / 1000) % 60),
            minutes: string | number = Math.floor((duration / (1000 * 60)) % 60),
            hours: string | number = Math.floor((duration / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
    }

    function stop(){
        clearInterval(interval);

        setStart(false);
    }

    return (
        <div className={style.container}>
            <div className={style.time}>
                {time === 0 ? <BigStart click={run}/> : msToTime(time)}
            </div>

            {start ? <Stop click={stop}/> : <Start click={run}/>}
        </div>
    )
}

// @ts-ignore
function BigStart({click}){

    return (
        <Button onClick={click} size={"large"} variant={"outlined"}>
            <Icon fontSize={"large"} style={{color: green[500]}}>
                play_arrow
            </Icon>
        </Button>
    )
}

// @ts-ignore
function Start({click}){

    return (
        <Button onClick={click} variant={"outlined"}>
            <Icon>
                play_arrow
            </Icon>
        </Button>
    )
}

// @ts-ignore
function Stop({click}){
    return (
        <Button onClick={click} variant={"outlined"}>
            <Icon>
                stop
            </Icon>
        </Button>
    )
}