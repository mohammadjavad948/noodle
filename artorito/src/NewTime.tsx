import React from 'react';
import style from './NewTime.module.css';
import {Button, Icon} from "@material-ui/core";
import {green} from "@material-ui/core/colors";

export default function NewTime(){

    return (
        <div className={style.container}>
            <div className={style.time}>
                <BigStart />
            </div>
        </div>
    )
}

function BigStart(){

    return (
        <Button size={"large"} variant={"outlined"}>
            <Icon fontSize={"large"} style={{color: green[500]}}>
                play_arrow
            </Icon>
        </Button>
    )
}