import React, {useState} from "react";
import DashboardCard from "./components/LabelCard";
import {useLabelsStore} from "./stores/LabelsStore";
import {Button, Card, TextField, Typography} from "@material-ui/core";


export default function Dashboard() {

    const {labels} = useLabelsStore();

    return (
        <div className="row" style={{gap: '10px'}}>

            {labels.map((data, index) => <DashboardCard title="21 H" description="Math" key={index}/>)}

            <NewLabelCard />
        </div>
    )
}

function NewLabelCard(){

    const [name, setName] = useState('');
    const [color, setColor] = useState('#000000');

    function save(){
        console.log({name, color})
    }

    return (
        <Card
            variant={"outlined"}
            className="col-12 col-sm-12 col-md-5 col-lg-3 col-xxl-3 d-flex flex-column align-items-center justify-content-center"
        >
            <Typography variant={"body1"} className="mt-2">new Label</Typography>
            <TextField label="name" variant="outlined" onChange={(e) =>  {setName(e.target.value)}} className="mt-4" />
            <div className="mt-2">
                color
                <input type="color" onChange={(e) => {setColor(e.target.value)}}/>
            </div>
            <Button variant="contained" color="primary" onClick={save} className="mt-2 mb-2">
                save
            </Button>
        </Card>
    )
}