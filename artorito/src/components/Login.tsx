import React, {useEffect, useState} from "react";
import {Button, FormControlLabel, Switch, TextField, Typography, useTheme} from "@material-ui/core";
import {useConnectionStore} from "../stores/ConnectionStore";
import {useSpring, animated, useSprings} from "react-spring";
import styles from './login.module.css';
import Spinner from "./Spinner";
import {useTokenStore} from "../stores/TokenStore";
import {useThemeStore} from "../stores/ThemeStore";


// @ts-ignore
function LoginFrom({setAnimation, signUp, style}){

    const {status: connectionStatus} = useConnectionStore();
    const {set: setToken} = useTokenStore();

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
            setAnimation({opacity: 0})
        }, 2500)
        setTimeout(()=> {
            setToken('aefefesf');
        }, 3000)
    }

    return (
        <animated.div style={style} className={styles.loginForm}>
            <Typography variant={'h6'}>Welcome</Typography>
            <TextField label="username" variant={"outlined"} onChange={usernameChanged}/>
            <TextField label="password" type="password" variant={"outlined"} onChange={passwordChanged}/>
            <div>
                <Button
                    disabled={!connectionStatus || requesting}
                    onClick={login}
                    variant={"contained"}
                    color={"secondary"}
                >
                    {requesting ? <Spinner /> : 'login'}
                </Button>
                <Button
                    disabled={!connectionStatus || requesting}
                    onClick={signUp}
                    size="small"
                >
                    or signup
                </Button>
            </div>
        </animated.div>
    )
}


// @ts-ignore
function SignUpForm({setAnimation, login, style}){

    const {status: connectionStatus} = useConnectionStore();
    const {set: setToken} = useTokenStore();

    // login logic
    const [requesting, setRequest] = useState(false);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    function usernameChanged(event: any){
        setUsername(event.target.value);
    }
    function nameChanged(event: any){
        setName(event.target.value);
    }
    function passwordChanged(event: any){
        setPassword(event.target.value);
    }
    function signUp(){
        setRequest(true);

        setTimeout(()=> {
            setAnimation({opacity: 0})
        }, 2500)
        setTimeout(()=> {
            setToken('aefefesf');
        }, 3000)
    }

    return (
        <animated.div style={style} className={styles.loginForm}>
            <Typography variant={'h6'}>Welcome</Typography>
            <TextField label="name" variant={"outlined"} onChange={nameChanged}/>
            <TextField label="username" variant={"outlined"} onChange={usernameChanged}/>
            <TextField label="password" type="password" variant={"outlined"} onChange={passwordChanged}/>
           <div>
               <Button
                   disabled={!connectionStatus || requesting}
                   onClick={signUp}
                   variant={"contained"}
                   color={"secondary"}
               >
                   {requesting ? <Spinner /> : 'sign up'}
               </Button>
               <Button
                   disabled={!connectionStatus || requesting}
                   onClick={login}
                   size="small"
               >
                   or login
               </Button>
           </div>
        </animated.div>
    )
}

export default function Login() {
    // animations and connection checks
    const {theme: savedTheme, light, dark} = useThemeStore();
    const [page, setPageIndex] = useState(0);
    const [loginProps, set] = useSpring(() => ({
        x: 0,
        y: 0,
        opacity: 0,
        height: '300px',
        background: savedTheme === 'light' ? '#e9e9e9' : '#151515'
    }));

    const [springs, setPage] = useSprings(2, (index) => {
        return {
            position: 'absolute',
            right: index === 1 ? '420px' : '90px'
        }
    });

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

    function findPosition(page: number, index: number){
        if (page === 0 && index === 0){
            return '-420px'
        }
        if ((page === 0 && index === 1) || (page === 1 && index === 0)){
            return '90px'
        }
        if (page === 1 && index === 1){
            return '420px'
        }
    }

    function transition(){
        // @ts-ignore
        setPage((index) => {
            return {
                position: 'absolute',
                right: findPosition(page, index)
            }
        })
        set({height: page === 1 ? '300px' : '400px'});
        setPageIndex(page === 0 ? 1 : 0)
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
                    background: loginProps.background,
                    height: loginProps.height
                }}>
                {springs.map((props, i) => {
                    return i === 0 ?
                        // @ts-ignore
                        <LoginFrom key={i} setAnimation={set} signUp={transition} style={props}/>
                        // @ts-ignore
                        : <SignUpForm key={i} setAnimation={set} login={transition} style={props}/>
                })}
                <FormControlLabel
                    control={<Switch size="small" checked={savedTheme === 'dark'} color={"primary"} onChange={changeTheme}/>}
                    label="dark"
                    style={{position: 'absolute', bottom: '5px'}}
                />
            </animated.div>
        </div>
    )
}
