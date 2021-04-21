import React from 'react';
import {useParams} from 'react-router-dom';
import {useLabelsStore} from "./stores/LabelsStore";
import style from './Label.module.css';

export default function Label(){

    // @ts-ignore
    const {id} = useParams();
    const {labels} = useLabelsStore();
    const label = labels.find(e => e._id === id);

    return (
        <div>
            <div className={style.title}>
                <h1>{label?.name ?? "not found"}</h1>
            </div>
        </div>
    )
}