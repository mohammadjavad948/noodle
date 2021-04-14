import React, {useState} from 'react';
import {animated, useSpring} from 'react-spring';
import {useTimeStore} from "../stores/TimeStore";
import style from './TimeManager.module.css';
import {Icon, IconButton, useTheme} from "@material-ui/core";
import {useStartStore} from "../stores/StartStore";
import {useIntervalStore} from "../stores/IntervalStore";
import {green, purple, red} from "@material-ui/core/colors";

export default function TimeManager(){

    const theme = useTheme();

    const {time, update, set: setTime} = useTimeStore();
    const {start, set: setStart} = useStartStore();
    const {interval, set: changeInterval} = useIntervalStore();

    const [hidden, setHidden] = useState(true);

    const animation = useSpring({
        display: time === 0 ? 'none' : 'flex',
        right: hidden ? '-120px' : '10px',
        background: theme.palette.background.default
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
                    <Icon fontSize={"small"} style={{color: red[500]}}>
                        stop
                    </Icon>
                </IconButton> : ''
            }
            {
                !start ? <IconButton onClick={reset}>
                    <Icon fontSize={"small"} style={{color: purple[300]}}>
                        replay
                    </Icon>
                </IconButton> : ''
            }
            {
                !start ? <IconButton onClick={run}>
                    <Icon fontSize={"small"} style={{color: green[300]}}>
                        play_arrow
                    </Icon>
                </IconButton> : ''
            }
        </animated.div>
    )
}