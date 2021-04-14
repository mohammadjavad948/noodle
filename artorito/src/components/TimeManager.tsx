import React, {useState} from 'react';
import {animated, useSpring} from 'react-spring';
import {useTimeStore} from "../stores/TimeStore";
import style from './TimeManager.module.css';
import {Icon, IconButton} from "@material-ui/core";
import {useStartStore} from "../stores/StartStore";
import {useIntervalStore} from "../stores/IntervalStore";

export default function TimeManager(){

    const {time, update, set: setTime} = useTimeStore();
    const {start, set: setStart} = useStartStore();
    const {interval, set: changeInterval} = useIntervalStore();

    const [hidden, setHidden] = useState(true);

    const animation = useSpring({
        display: time === 0 ? 'none' : 'flex',
        right: hidden ? '-120px' : '10px'
    });

    function run(){
        setStart(true);

        const interval = setInterval(() => {

            update();

        }, 100);

        // @ts-ignore
        changeInterval(interval);
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

    function changeHidden(){
        setHidden(!hidden);
    }

    return (
        <animated.div className={style.container} style={animation}>
            <IconButton onClick={changeHidden}>
                {
                    hidden ? <Icon fontSize={"small"}>
                        keyboard_arrow_left
                    </Icon> :
                        <Icon fontSize={"small"}>
                            keyboard_arrow_right
                        </Icon>
                }
            </IconButton>
            {
                start ? <IconButton onClick={stop}>
                    <Icon fontSize={"small"}>
                        stop
                    </Icon>
                </IconButton> : ''
            }
            {
                !start ? <IconButton onClick={reset}>
                    <Icon fontSize={"small"}>
                        replay
                    </Icon>
                </IconButton> : ''
            }
            {
                !start ? <IconButton onClick={run}>
                    <Icon fontSize={"small"}>
                        play_arrow
                    </Icon>
                </IconButton> : ''
            }
        </animated.div>
    )
}