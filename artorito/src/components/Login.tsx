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
    },
});

export default function Login() {
    const styles = useStyles();
    return (
        <div className={styles.main}>

        </div>
    )
}
