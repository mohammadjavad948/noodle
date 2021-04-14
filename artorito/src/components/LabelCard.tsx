import React, {useEffect, useRef, useState} from "react";
import {Card, CardContent, Typography, useTheme} from "@material-ui/core";
import Chart from "chart.js";
import ContextMenu from "./Menu";

interface DashboardCardI {
    data: any
}

export default function DashboardCard(props: DashboardCardI) {

    const graphCanvas = useRef() as React.MutableRefObject<HTMLCanvasElement>;

    const theme = useTheme();

    const [mouse, setMouse] = useState({open: false, x: 0, y: 0});

    useEffect(() => {
        buildChart();
    });

    function buildChart() {
        let canvas = graphCanvas.current.getContext('2d');

        // @ts-ignore
        new Chart(canvas, {
            type: 'line',
            data: {
                labels: [1, 2, 3, 4, 5, 6, 7],
                datasets: [{
                    label: props.data.name,
                    fill: false,
                    borderColor: props.data.color,
                    data: getRandomNumbers(7, 100)
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        gridLines: {
                            display: false
                        },
                        ticks: {
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
                },
                legend: {
                    display: false
                }
            }
        })
    }

    function getRandomNumbers(count: number, range: number): number[] {
        let all: number[] = [];

        for (let i = 0; i < count; i++){
            all.push(Math.floor(Math.random() * range));
        }

        return all;
    }

    function contextM(e: any){
        e.preventDefault();

        setMouse({
            open: true,
            x: e.pageX,
            y: e.pageY
        });

        console.log(e);
    }

    function hideContext(){
        setMouse({
            open: false,
            x: 0,
            y: 0
        })
    }

    return (
        <Card
            variant={"outlined"}
            style={{background: theme.palette.background.default}}
            className="col-12 col-sm-12 col-md-5 col-lg-3 col-xxl-3"
            onContextMenu={contextM}
        >
            <CardContent>
                <Typography style={{textAlign: 'center', fontSize: '20px'}}>
                    {props.data.name}
                </Typography>
                <canvas
                    width={"100%"}
                    ref={graphCanvas}
                />
            </CardContent>
            {mouse.open ? <ContextMenu hide={hideContext} {...mouse}/> : ''}
        </Card>
    )
}
