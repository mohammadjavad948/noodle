import React from "react";
import {Button, makeStyles, TextField, Typography} from "@material-ui/core";
import {useConnectionStore} from "../stores/ConnectionStore";
import {useSpring, animated} from "react-spring";
import styles from './login.module.css';

export default function Login() {
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
                    marginRight: loginProps.x.interpolate(v => v/10 + 'px'),
                    // @ts-ignore
                    marginBottom: loginProps.y.interpolate(v => v/10 + 'px')
                }}>
                <Typography variant={'h6'}>Welcome</Typography>
                <TextField label="username" variant={"outlined"}/>
                <TextField label="password" type="password" variant={"outlined"}/>
                <Button disabled={!connectionStatus} variant={"contained"} color={"secondary"}>login</Button>
            </animated.div>
        </div>
    )
}
