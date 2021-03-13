import React from "react";
import {useConnectionStore} from "../stores/ConnectionStore";
import {useSpring, animated, config} from "react-spring";
import {makeStyles} from "@material-ui/core";

const useStyle = makeStyles({
    main: {
        position: 'fixed',
        left: '20px',
        bottom: '20px',
        padding: '8px',
        boxShadow: 'black 0 0 3px 0px',
        borderRadius: '5px',
    }
})

export default function ConnectionLost(){
    const {status} = useConnectionStore();
    const styles = useStyle();

    const animations = useSpring({
        bottom: status ? '-100px' : '20px',
        config: config.wobbly,
        delay: 1000
    })

    return (
        <animated.div className={styles.main} style={animations}>
            connecting to server
        </animated.div>
    )
}
