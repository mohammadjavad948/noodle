import React, {useEffect, useState} from "react";
import {Button, FormControlLabel, Switch, TextField, Typography, useTheme} from "@material-ui/core";
import {useConnectionStore} from "../stores/ConnectionStore";
import {useSpring, animated} from "react-spring";
import styles from './login.module.css';
import Spinner from "./Spinner";
import {useTokenStore} from "../stores/TokenStore";
import {useThemeStore} from "../stores/ThemeStore";

export default function Login() {
    // animations and connection checks
    const {status: connectionStatus} = useConnectionStore();
    const {set: setToken} = useTokenStore();
    const {theme: savedTheme, light, dark} = useThemeStore();

    const [loginProps, set] = useSpring(() => ({
        x: 0,
        y: 0,
        opacity: 0,
        background: savedTheme === 'light' ? '#e9e9e9' : '#151515'
    }));

    useEffect(() => {
        set({opacity: 100});
    }, [])

    function Mouse(event: any){
       set({x: event.pageX, y: event.pageY})
    }

    function changeTheme(){

        set({background: savedTheme !== 'light' ? '#e9e9e9' : '#151515'});

        if (savedTheme === 'dark'){
            light();
        }else {
            dark()
        }
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
                    background: loginProps.background
                }}>
                <Typography variant={'h6'}>Welcome</Typography>
                <FormControlLabel
                    control={<Switch size="small" checked={savedTheme === 'dark'} color={"primary"} onChange={changeTheme}/>}
                    label="dark"
                />
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
