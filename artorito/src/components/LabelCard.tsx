import React, {useEffect, useState} from "react";
import {Card, CardContent, Icon, Typography, useTheme} from "@material-ui/core";
import ContextMenu from "./Menu";
import {removeLabel} from "../api/api";
import {useTokenStore} from "../stores/TokenStore";
import {useHistory} from "react-router-dom";

interface DashboardCardI {
    data: any
}

export default function DashboardCard(props: DashboardCardI) {

    const theme = useTheme();

    const [mouse, setMouse] = useState({open: false, x: 0, y: 0});
    const [sum, setSum] = useState('');
    const {token} = useTokenStore();

    const history = useHistory();

    useEffect(() => {
        createSum();
    });


    function createSum(){
        let sum = props.data.time.reduce((n: any, next: any) => {
            return n + next.time
        }, 0);

        setSum(msToTime(sum));
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
            output = minutes + "M " + seconds + "S";
        }else if (+seconds !== 0){
            output = seconds + "." + milliseconds + "S";
        }else {
            output = milliseconds.toString();
        }

        return output
    }


    function contextM(e: any){
        e.preventDefault();

        setMouse({
            open: true,
            x: e.pageX,
            y: e.pageY
        });
    }

    function hideContext(){
        setMouse({
            open: false,
            x: 0,
            y: 0
        })
    }

    function remove(){
        hideContext()

        removeLabel(token, props.data._id)
            .catch(console.log)
    }

    function gotoPage(){
        history.push('/label/' + props.data._id);
    }

    const contextMenu = [
        {
            title: 'view',
            click: gotoPage,
            icon: <Icon>visibility</Icon>
        },
        {
            title: 'remove',
            click: remove,
            icon: <Icon>delete</Icon>
        }
    ]

    return (
        <div className="col-12 col-sm-12 col-md-5 col-lg-3 col-xxl-3">
            <Card
                variant={"outlined"}
                style={{background: theme.palette.background.default, borderColor: props.data.color}}
                className="d-flex align-items-center justify-content-evenly"
                onContextMenu={contextM}
                onClick={gotoPage}
            >
                <CardContent>
                    <Typography style={{textAlign: 'center', fontSize: '20px'}}>
                        {props.data.name}
                    </Typography>
                    <Typography style={{textAlign: 'center'}}>{sum}</Typography>
                </CardContent>
                {mouse.open ? <ContextMenu content={contextMenu} hide={hideContext} {...mouse}/> : ''}
            </Card>
        </div>
    )
}
