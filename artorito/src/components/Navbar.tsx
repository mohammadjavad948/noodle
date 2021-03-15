import React from 'react';
import {
    AppBar,
    Avatar,
    Button,
    createStyles, FormControlLabel, Icon,
    makeStyles, Switch,
    Theme,
    Toolbar,
    Typography
} from "@material-ui/core";
import {green} from "@material-ui/core/colors";
import {useTokenStore} from "../stores/TokenStore";
import {useThemeStore} from "../stores/ThemeStore";
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

    function logout(){
        setToken('');
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
                    <Avatar variant={"rounded"} style={{marginRight: 10, backgroundColor: green[500]}}>N</Avatar>
                    <Typography variant="h6" className={classes.title}>
                        Noodle
                    </Typography>
                    <FormControlLabel
                        control={<Switch size="small" checked={theme === 'dark'} color={"primary"} onChange={changeTheme}/>}
                        label="dark"
                    />
                    <Button>
                        <Icon>
                            dashboard
                        </Icon>
                    </Button>
                    <Button color="inherit" onClick={logout}>Logout</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}


export default Navbar
