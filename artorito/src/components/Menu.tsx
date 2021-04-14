import React, {LegacyRef, useEffect, useRef} from 'react';
import {MenuItem, useTheme} from "@material-ui/core";

interface Props{
    x: number
    y: number
    hide: () => void
    content: {
        title: string | React.ElementType
        click: () => any
    }[]
}

export default function ContextMenu(props: Props){

    let ref = useRef() as LegacyRef<HTMLDivElement> | undefined

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event: { target: any; }) {
            // @ts-ignore
            if (ref.current && !ref.current.contains(event.target)) {
                props.hide();
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref]);

    const theme = useTheme();

    return (
        <div
            style={{
                position: 'fixed',
                left: props.x,
                top: props.y,
                borderRadius: '8px',
                boxShadow: '0 0 3px 0 #9c9c9c',
                background: theme.palette.background.default,
                padding: '8px 0'
            }} ref={ref}>
            {
                props.content.map((cont, index) => <MenuItem key={index} onClick={cont.click}>{cont.title}</MenuItem>)
            }
        </div>
    )
}