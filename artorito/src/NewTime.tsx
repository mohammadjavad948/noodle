import React from 'react';
import style from './NewTime.module.css';
import {Button, Fab, Icon} from "@material-ui/core";
import {useSpring, animated} from "react-spring";
import {green} from "@material-ui/core/colors";
import {useTimeStore} from "./stores/TimeStore";
import {useStartStore} from "./stores/StartStore";
import {useIntervalStore} from "./stores/IntervalStore";

export default function NewTime(){

    const {time, update, set: setTime} = useTimeStore();
    const {start, set: setStart} = useStartStore();
    const {interval, set: changeInterval} = useIntervalStore();


    const animation = useSpring({
        height: start ? '70vh' : '40vh'
    });

    function run(){
        setStart(true);

        const interval = setInterval(() => {

            update();

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
        // @ts-ignore
        clearInterval(interval);

        setStart(false);
    }

    function reset(){

        // @ts-ignore
        clearInterval(interval);

        setTime(0);

        setStart(false);
    }

    return (
        <div className={style.container}>
            <animated.div style={animation} className={style.time}>
                {msToTime(time)}
            </animated.div>

            <div style={{display: 'flex', gap: '20px'}}>
                {start ? <Stop click={stop}/> : <Start click={run}/>}
                {start ? '' : <Reset click={reset}/>}
            </div>

            <Save time={time} start={start}/>
        </div>
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
                pause
            </Icon>
        </Button>
    )
}


// @ts-ignore
function Reset({click}){
    return (
        <Button onClick={click} variant={"outlined"}>
            <Icon>
                replay
            </Icon>
        </Button>
    )
}

// @ts-ignore
function Save({start, time}){

    const animation = useSpring({
        bottom: !start && time !== 0 ? '20px' : '-80px'
    });

    return (
        <animated.div style={animation} className={style.fab}>
            <Fab style={{background: green[500]}}>
                <Icon>
                    done
                </Icon>
            </Fab>
        </animated.div>
    )
}