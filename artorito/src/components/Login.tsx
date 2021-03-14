import React, {useState} from "react";
import {Button, TextField, Typography} from "@material-ui/core";
import {useConnectionStore} from "../stores/ConnectionStore";
import {useSpring, animated} from "react-spring";
import styles from './login.module.css';

export default function Login() {
    // animations and connection checks
    const {status: connectionStatus} = useConnectionStore();
    const [loginProps, set] = useSpring(() => ({x: 0, y: 0}));

    function Mouse(event: any){
       set({x: event.pageX, y: event.pageY})
    }

    // login logic
    const [requesting, setRequest] = useState(false);
    const [username, setUsername] = useState('')
    const [passowrd, setPassword] = useState('')

    function usernameChanged(event: any){
        setUsername(event.target.value);
    }
    function passwordChanged(event: any){
        setPassword(event.target.value);
    }
    function login(){
        console.log({username, passowrd});
        setRequest(true);
        setTimeout(()=> {
            setRequest(false);
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
                    marginBottom: loginProps.y.interpolate(v => v/10 + 'px')
                }}>
                <Typography variant={'h6'}>Welcome</Typography>
                <TextField label="username" variant={"outlined"} onChange={usernameChanged}/>
                <TextField label="password" type="password" variant={"outlined"} onChange={passwordChanged}/>
                <Button
                    disabled={!connectionStatus || requesting}
                    onClick={login}
                    variant={"contained"}
                    color={"secondary"}
                >login</Button>
            </animated.div>
        </div>
    )
}
