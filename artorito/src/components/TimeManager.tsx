import React from 'react';
import {animated, useSpring} from 'react-spring';
import {useTimeStore} from "../stores/TimeStore";
import style from './TimeManager.module.css';
import {Icon, IconButton} from "@material-ui/core";

export default function TimeManager(){

    const {time} = useTimeStore();

    const animation = useSpring({
        display: time === 0 ? 'none' : 'block'
    });

    return (
        <animated.div className={style.container} style={animation}>
            <IconButton>
                <Icon fontSize={"small"}>
                    stop
                </Icon>
            </IconButton>
            <IconButton>
                <Icon fontSize={"small"}>
                    replay
                </Icon>
            </IconButton>
            <IconButton>
                <Icon fontSize={"small"}>
                    done
                </Icon>
            </IconButton>
            <IconButton>
                <Icon fontSize={"small"}>
                    play_arrow
                </Icon>
            </IconButton>
        </animated.div>
    )
}