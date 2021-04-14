import React from 'react';
import {animated, useSpring} from 'react-spring';
import {useTimeStore} from "../stores/TimeStore";
import style from './TimeManager.module.css';

export default function TimeManager(){

    const {time} = useTimeStore();

    const animation = useSpring({

    });

    return (
        <animated.div className={style.container}>

        </animated.div>
    )
}