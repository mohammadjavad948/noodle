import React, {useEffect, useState} from "react";
import {Button, TextField, Typography, useTheme} from "@material-ui/core";
import {useConnectionStore} from "../stores/ConnectionStore";
import {useSpring, animated} from "react-spring";
import styles from './login.module.css';
import Spinner from "./Spinner";
import {useTokenStore} from "../stores/TokenStore";

export default function Login() {
    // animations and connection checks
    const {status: connectionStatus} = useConnectionStore();
    const {set: setToken} = useTokenStore();
    const [loginProps, set] = useSpring(() => ({x: 0, y: 0, opacity: 0}));
    const theme = useTheme();

    useEffect(() => {
        set({opacity: 100});
    }, [])

    function Mouse(event: any){
       set({x: event.pageX, y: event.pageY})
    }

    // login logic
    const [requesting, setRequest] = useState(false);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function usernameChanged(event: any){
        setUsername(event.target.value);
    }
    function passwordChanged(event: any){
        setPassword(event.target.value);
    }
    function login(){
        setRequest(true);

        setTimeout(()=> {
            set({opacity: 0})
        }, 2500)
        setTimeout(()=> {
            setToken('aefefesf');
        }, 3000)
    }

    return (
        <div className={styles.main} onMouseMove={Mouse}>
            <animated.div
                className={styles.login}
                style={{
                    // @ts-ignore
                    marginRight: loginProps.x.interpolate(v => v/10 + 'px'),
                    // @ts-ignore
                    marginBottom: loginProps.y.interpolate(v => v/10 + 'px'),
                    opacity: loginProps.opacity.interpolate(v => v + '%'),
                    background: theme.palette.type === 'light' ? '#e9e9e9' : '#151515'
                }}>
                <Typography variant={'h6'}>Welcome</Typography>
                <TextField label="username" variant={"outlined"} onChange={usernameChanged}/>
                <TextField label="password" type="password" variant={"outlined"} onChange={passwordChanged}/>
                <Button
                    disabled={!connectionStatus || requesting}
                    onClick={login}
                    variant={"contained"}
                    color={"secondary"}
                >
                    {requesting ? <Spinner /> : 'login'}
                </Button>
            </animated.div>
        </div>
    )
}
