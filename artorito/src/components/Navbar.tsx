import React from 'react';
import {AppBar, Avatar, Button, createStyles, makeStyles, Theme, Toolbar, Typography} from "@material-ui/core";
import {green} from "@material-ui/core/colors";
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        title: {
            flexGrow: 1,
        },
    }),
);

function Navbar(){

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" color={"transparent"}>
                <Toolbar>
                    <Avatar variant={"rounded"} style={{marginRight: 10, backgroundColor: green[500]}}>N</Avatar>
                    <Typography variant="h6" className={classes.title}>
                        Noodle
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}


export default Navbar
