import React, {useEffect} from "react";
import {useConnectionStore} from "../stores/ConnectionStore";
import {useSpring, animated, config} from "react-spring";
import {makeStyles, useTheme} from "@material-ui/core";
import Spinner from "./Spinner";
import {status as getStatus} from '../api/api';

const useStyle = makeStyles({
    main: {
        position: 'fixed',
        left: '20px',
        bottom: '20px',
        padding: '8px',
        boxShadow: 'black 0 0 3px 0px',
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    }
})

export default function ConnectionLost(){
    const {status, connected} = useConnectionStore();
    const styles = useStyle();
    const theme = useTheme();

    useEffect(() => {
        // fetch server status
        getStatus()
            .then((res: any) => {
                if (res.data.status === 'online'){
                    connected();
                }
            })
            .catch(console.log)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const animations = useSpring({
        bottom: status ? '-100px' : '20px',
        config: config.wobbly,
        color: theme.palette.type !== 'light' ? '#e9e9e9' : '#151515',
        delay: 1000
    })

    return (
        <animated.div className={styles.main} style={animations}>
            {status ? 'connected :D' : 'catching a server'}
            {status ? '' : <Spinner/>}
        </animated.div>
    )
}
