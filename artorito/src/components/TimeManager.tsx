import React, {useState} from 'react';
import {animated, useSpring} from 'react-spring';
import {useTimeStore} from "../stores/TimeStore";
import style from './TimeManager.module.css';
import {Icon, IconButton} from "@material-ui/core";
import {useStartStore} from "../stores/StartStore";

export default function TimeManager(){

    const {time} = useTimeStore();
    const {start} = useStartStore();

    const [hidden, setHidden] = useState(true);

    const animation = useSpring({
        display: time === 0 ? 'none' : 'block',
        right: hidden ? '-175px' : '10px'
    });

    function changeHidden(){
        setHidden(!hidden);
    }

    return (
        <animated.div className={style.container} style={animation}>
            <IconButton onClick={changeHidden}>
                {
                    hidden ? <Icon fontSize={"small"}>
                        keyboard_arrow_left
                    </Icon> :
                        <Icon fontSize={"small"}>
                            keyboard_arrow_right
                        </Icon>
                }
            </IconButton>
            <IconButton>
                <Icon fontSize={"small"}>
                    stop
                </Icon>
            </IconButton>
            <IconButton>
                <Icon fontSize={"small"}>
                    replay
                </Icon>
            </IconButton>
            <IconButton>
                <Icon fontSize={"small"}>
                    done
                </Icon>
            </IconButton>
            <IconButton>
                <Icon fontSize={"small"}>
                    play_arrow
                </Icon>
            </IconButton>
        </animated.div>
    )
}