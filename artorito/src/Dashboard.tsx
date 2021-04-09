import React from "react";
import DashboardCard from "./components/LabelCard";
import {useLabelsStore} from "./stores/LabelsStore";


export default function Dashboard() {

    const {labels} = useLabelsStore();

    return (
        <div className="row" style={{gap: '10px'}}>

            {labels.map((data, index) => <DashboardCard title="21 H" description="Math" key={index}/>)}

        </div>
    )
}