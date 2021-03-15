import React, {useEffect, useRef} from "react";
import {Card, CardContent, Typography} from "@material-ui/core";
import Chart from "chart.js";

Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif"
// @ts-ignore
Chart.defaults.global.legend.display = false;

export default function Dashboard() {

    return (
        <div className="row" style={{gap: '10px'}}>
            <DashboardCard title="21 H" description="Math"/>
            <DashboardCard title="1 H" description="Biology"/>
            <DashboardCard title="10 H" description="Computer"/>
        </div>
    )
}

interface DashboardCardI {
    title: string
    description: string
}

function DashboardCard(props: DashboardCardI) {

    const graphCanvas = useRef() as React.MutableRefObject<HTMLCanvasElement>;

    useEffect(() => {
       buildChart();
    });

    function buildChart() {
        let canvas = graphCanvas.current.getContext('2d');

        // @ts-ignore
        new Chart(canvas, {
            type: 'line',
            data: {
                labels: [1, 2, 3, 4, 5],
                datasets: [{
                    label: props.title,
                    fill: false,
                    data: [50, 80, 20, 30, 100]
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            beginAtZero: true,
                            display: false
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            display: false,
                        },
                        ticks: {
                            display: false
                        }
                    }],
                }
            }
        })
    }

    return (
        <Card variant={"outlined"} className="col-12 col-sm-12 col-md-5 col-lg-3 col-xxl-3">
            <CardContent>
                <Typography style={{textAlign: 'center', fontSize: '20px'}}>
                    {props.title}
                </Typography>
                <Typography style={{textAlign: 'center', fontSize: '14px', opacity: '60%'}}>
                    {props.description}
                </Typography>
                <canvas
                    width={"100%"}
                    ref={graphCanvas}
                />
            </CardContent>
        </Card>
    )
}
