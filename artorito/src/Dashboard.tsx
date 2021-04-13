import React, {useState} from "react";
import DashboardCard from "./components/LabelCard";
import {useLabelsStore} from "./stores/LabelsStore";
import {Button, Card, TextField, Typography, useTheme} from "@material-ui/core";
import {useTokenStore} from "./stores/TokenStore";
import {createLabel} from "./api/api";


export default function Dashboard() {

    const {labels} = useLabelsStore();

    return (
        <div className="row" style={{gap: '10px'}}>

            {labels.map((data, index) => <DashboardCard data={data} key={index}/>)}

            <NewLabelCard />
        </div>
    )
}

function NewLabelCard(){

    const [name, setName] = useState('');
    const [color, setColor] = useState('#000000');

    const theme = useTheme();

    const {token} = useTokenStore();

    function save(){
        console.log({name, color});

        createLabel(token, name, color)
            .then((res: any) => {
                console.log(res)
            })
            .catch(console.log)
    }

    return (
        <Card
            variant={"outlined"}
            className="col-12 col-sm-12 col-md-5 col-lg-3 col-xxl-3 d-flex flex-column align-items-center justify-content-center"
            style={{background: theme.palette.background.default}}
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