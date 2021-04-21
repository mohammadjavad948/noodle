import React from 'react';
import {useParams} from 'react-router-dom';
import {useLabelsStore} from "./stores/LabelsStore";
import style from './Label.module.css';

export default function Label(){

    // @ts-ignore
    const {id} = useParams();
    const {labels} = useLabelsStore();
    const label = labels.find(e => e._id === id);

    function msToTime(duration: number) {
        let milliseconds = (duration % 1000) / 100,
            seconds: string | number = Math.floor((duration / 1000) % 60),
            minutes: string | number = Math.floor((duration / (1000 * 60)) % 60),
            hours: string | number = Math.floor((duration / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
    }

    return (
        <div>
            <div className={style.title}>
                <svg width="20" height="20">
                    <rect width="20" height="20" style={{fill: label?.color}} />
                </svg>
                <h1>{label?.name ?? "not found"}</h1>
            </div>
            <div>
                {label?.time.map((el, index) => <div key={index}>{msToTime(el.time)}</div>)}
            </div>
        </div>
    )
}