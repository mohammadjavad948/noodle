import React from "react";
import {Button, makeStyles, TextField, Typography} from "@material-ui/core";
import {useConnectionStore} from "../stores/ConnectionStore";
import {useSpring, animated} from "react-spring";

const useStyles = makeStyles({
    main: {
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        backgroundImage: 'url(/background.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    login: {
        maxWidth: '400px',
        width: '100%',
        height: '300px',
        background: '#151515',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px'
    }
});

export default function Login() {
    const styles = useStyles();
    const {status: connectionStatus} = useConnectionStore();
    const [loginProps, set] = useSpring(() => ({x: 0, y: 0}));

    function Mouse(event: any){
       set({x: event.pageX, y: event.pageY})
    }

    return (
        <div className={styles.main} onMouseMove={Mouse}>
            <animated.div
                className={styles.login}
                style={{
                    // @ts-ignore
                    marginLeft: loginProps.x.interpolate(v => v/10 + 'px'),
                    // @ts-ignore
                    marginTop: loginProps.y.interpolate(v => v/10 + 'px')
                }}>
                <Typography variant={'h6'}>Welcome</Typography>
                <TextField label="username" variant={"outlined"}/>
                <TextField label="password" type="password" variant={"outlined"}/>
                <Button disabled={!connectionStatus} variant={"contained"} color={"secondary"}>login</Button>
            </animated.div>
        </div>
    )
}
