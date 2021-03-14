import React from "react";
import {Button, makeStyles, TextField, Typography} from "@material-ui/core";

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
    return (
        <div className={styles.main}>
            <div className={styles.login}>
                <Typography variant={'h6'}>Welcome</Typography>
                <TextField label="username" variant={"outlined"}/>
                <TextField label="password" type="password" variant={"outlined"}/>
                <Button variant={"contained"} color={"secondary"}>login</Button>
            </div>
        </div>
    )
}
