import React from 'react';
import {
    AppBar,
    Avatar, Button,
    createStyles, Icon, IconButton,
    makeStyles,
    Theme,
    Toolbar,
    Typography
} from "@material-ui/core";
import {green, red} from "@material-ui/core/colors";
import {useTokenStore} from "../stores/TokenStore";
import {useThemeStore} from "../stores/ThemeStore";
import {useHistory} from 'react-router-dom';
import image from '../noodle.png';
import {useTimeStore} from "../stores/TimeStore";

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
    const {set: setToken} = useTokenStore();
    const {theme, dark, light} = useThemeStore();

    const {time} = useTimeStore();

    const history = useHistory();

    function logout(){
        setToken('');
    }

    function dashboard(){
        history.push('/')
    }

    function add(){
        history.push('/new')
    }

    function changeTheme() {
        if (theme === 'dark'){
            light();
        }else {
            dark()
        }
    }

    function msToTime(duration: number) {
        let milliseconds = (duration % 1000) / 100,
            seconds: string | number = Math.floor((duration / 1000) % 60),
            minutes: string | number = Math.floor((duration / (1000 * 60)) % 60),
            hours: string | number = Math.floor((duration / (1000 * 60 * 60)) % 24);

        let output = '';

        if (+hours !== 0){
            output = hours + "H " + minutes + "M";
        }else if (+minutes !== 0){
            output = minutes + "M " + seconds;
        }else if (+seconds !== 0){
            output = seconds + " " + milliseconds;
        }else {
            output = milliseconds.toString();
        }

        return output
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" color={"transparent"}>
                <Toolbar>
                    <Avatar src={image} variant={"rounded"} style={{marginRight: 10, backgroundColor: green[500]}} />
                    <Typography variant="h6" className={classes.title}>
                        Noodle
                    </Typography>
                    <IconButton onClick={changeTheme}>
                        {
                            theme === 'dark' ?
                                <Icon>
                                    light_mode
                                </Icon>
                                :
                                <Icon>
                                    dark_mode
                                </Icon>
                        }
                    </IconButton>
                    {
                        time === 0 ?
                            <IconButton onClick={add}>
                                <Icon>
                                    add
                                </Icon>
                            </IconButton> :
                            <Button onClick={add}>
                                {msToTime(time)}
                            </Button>
                    }
                    <IconButton onClick={dashboard}>
                        <Icon>
                            dashboard
                        </Icon>
                    </IconButton>
                    <IconButton color="inherit" onClick={logout}>
                        <Icon style={{color: red[500]}}>
                            logout
                        </Icon>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    )
}


export default Navbar
