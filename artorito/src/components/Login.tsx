import React from "react";
import {makeStyles} from "@material-ui/core";

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
        borderRadius: '8px'
    }
});

export default function Login() {
    const styles = useStyles();
    return (
        <div className={styles.main}>
            <div className={styles.login}>

            </div>
        </div>
    )
}
