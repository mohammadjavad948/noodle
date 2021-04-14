import React from 'react';
import {animated, useSpring} from 'react-spring';
import {useTimeStore} from "../stores/TimeStore";

export default function TimeManager(){

    const {time} = useTimeStore();

    const animation = useSpring({

    });

    return (
        <animated.div>

        </animated.div>
    )
}