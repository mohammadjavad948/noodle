import React from 'react';
import {useParams} from 'react-router-dom';
import {useLabelsStore} from "./stores/LabelsStore";

export default function Label(){

    // @ts-ignore
    const {id} = useParams();
    const {labels} = useLabelsStore();
    const label = labels.find(e => e._id === id);

    return (
        <div>
            <div>
                <h1>{label?.name ?? "not found"}</h1>
            </div>
        </div>
    )
}