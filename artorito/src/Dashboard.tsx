import React from "react";
import DashboardCard from "./components/LabelCard";


export default function Dashboard() {

    return (
        <div className="row" style={{gap: '10px'}}>
            <DashboardCard title="21 H" description="Math"/>
            <DashboardCard title="1 H" description="Biology"/>
            <DashboardCard title="10 H" description="Computer"/>
        </div>
    )
}