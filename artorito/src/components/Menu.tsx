import React from 'react';
import {MenuItem} from "@material-ui/core";

interface Props{
    open: boolean
    x: number
    y: number
}

export default function ContextMenu(props: Props){

    return (
        <div
            style={{
                position: 'fixed',
                left: props.x,
                top: props.y
            }}>
            <MenuItem>test</MenuItem>
        </div>
    )
}