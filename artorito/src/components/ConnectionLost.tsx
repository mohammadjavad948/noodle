import React from "react";
import {useConnectionStore} from "../stores/ConnectionStore";
import {useSpring, animated} from "react-spring";

export default function ConnectionLost(){
    const {status} = useConnectionStore();

    const animations = useSpring({

    })

    return (
        <animated.div style={animations}>

        </animated.div>
    )
}
