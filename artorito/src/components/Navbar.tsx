import React from 'react';
import {
    AppBar,
    Avatar,
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
                    <IconButton onClick={add}>
                        <Icon>
                            add
                        </Icon>
                    </IconButton>
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
