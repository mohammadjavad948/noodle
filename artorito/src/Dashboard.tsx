import React, {useState} from "react";
import DashboardCard from "./components/LabelCard";
import {useLabelsStore} from "./stores/LabelsStore";
import {Button, Card, TextField, Typography, useTheme} from "@material-ui/core";
import {useTokenStore} from "./stores/TokenStore";
import {createLabel} from "./api/api";
import { TwitterPicker } from 'react-color'

export default function Dashboard() {

    const {labels} = useLabelsStore();

    return (
        <div className="row">

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

        createLabel(token, name, color)
            .then((res: any) => {

            })
            .catch(console.log)
    }

    return (
        <div className={"col-12 col-sm-12 col-md-5 col-lg-3 col-xxl-3 "}>
            <Card
                variant={"outlined"}
                className="d-flex flex-column align-items-center"
                style={{background: theme.palette.background.default, padding: '10px'}}
            >
                <Typography variant={"body1"} className="mt-2">new Label</Typography>
                <TextField label="name" variant="outlined" onChange={(e) =>  {setName(e.target.value)}} className="mt-4" />
                <div className="mt-2 d-flex align-items-center justify-content-center">
                    <TwitterPicker
                        color={color}
                        onChange={(c) => setColor(c.hex)}
                        triangle={"hide"}
                        className={"color"}
                    />
                </div>
                <Button variant="contained" color="primary" onClick={save} className="mt-2 mb-2">
                    save
                </Button>
            </Card>
        </div>
    )
}