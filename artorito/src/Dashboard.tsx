import React from "react";
import {Button, Card, CardActions, CardContent, Typography} from "@material-ui/core";
import {Link} from 'react-router-dom';

export default function Dashboard() {

    return (
        <div className="row">
            <DashboardCard title="Quiz" description="View All Quizzes" link="/quiz"/>
        </div>
    )
}

interface DashboardCardI {
    title: string
    description: string
    link: string
}

function DashboardCard(props: DashboardCardI) {
    return (
        <Card variant={"outlined"} className="col-12 col-sm-12 col-md-6 col-lg-3 col-xxl-2">
            <CardContent>
                <Typography style={{textAlign: 'center', fontSize: '20px'}}>
                    {props.title}
                </Typography>
                <Typography style={{textAlign: 'center', fontSize: '14px', opacity: '60%'}}>
                    {props.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button component={Link} to={props.link}>
                    go
                </Button>
            </CardActions>
        </Card>
    )
}
