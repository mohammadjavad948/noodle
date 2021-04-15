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
    const [chartData, setChartData] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [sum, setSum] = useState('');

    useEffect(() => {
        buildChart();
        createChartData();
        createSum();
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
                    data: chartData
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
                },
                animation: false,
                tooltips: {
                    enabled: false
                }
            }
        })
    }

    function createSum(){
        let sum = props.data.time.reduce((n: any, next: any) => {
            return n + next.time
        }, 0);

        setSum(msToTime(sum));
    }

    function msToTime(duration: number) {
        let milliseconds = (duration % 1000) / 100,
            seconds: string | number = Math.floor((duration / 1000) % 60),
            minutes: string | number = Math.floor((duration / (1000 * 60)) % 60),
            hours: string | number = Math.floor((duration / (1000 * 60 * 60)) % 24);

        let output = '';

        if (+hours !== 0){
            output = hours + "H " + minutes + "M";
        }else if (+minutes !== 0){
            output = minutes + "M " + seconds + "S";
        }else if (+seconds !== 0){
            output = seconds + "." + milliseconds + "S";
        }else {
            output = milliseconds.toString();
        }

        return output
    }

    function sortByDate(data: any){
        let finalObj = {}
        data.forEach((games: any) => {
            const date = games.date.split('T')[0]
            // @ts-ignore
            if (finalObj[date]) {
                // @ts-ignore
                finalObj[date].push(games);
            } else {
                // @ts-ignore
                finalObj[date] = [games];
            }
        });

        return finalObj;
    }

    function createChartData(){
        let final = [];
        const sorted = sortByDate(props.data.time);

        for (let i = 0; i < 7; i++){
            let date: any = new Date(new Date().setDate(new Date().getDate() - i))

            date = date.toISOString().split('T')[0]

            // @ts-ignore
            if (sorted[date]){
                // @ts-ignore
                const sum = sorted[date].reduce((a: any, b: any) => {
                    return a + b.time
                }, 0)

                final.push(sum);
            }else {
                final.push(0);
            }
        }

        setChartData(final);
    }

    function contextM(e: any){
        e.preventDefault();

        setMouse({
            open: true,
            x: e.pageX,
            y: e.pageY
        });
    }

    function hideContext(){
        setMouse({
            open: false,
            x: 0,
            y: 0
        })
    }

    function remove(){
        hideContext()
        console.log('remove')
    }

    const contextMenu = [
        {
            title: 'remove',
            click: remove
        }
    ]

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
                <Typography style={{textAlign: 'center'}}>{sum}</Typography>
                <canvas
                    width={"100%"}
                    ref={graphCanvas}
                />
            </CardContent>
            {mouse.open ? <ContextMenu content={contextMenu} hide={hideContext} {...mouse}/> : ''}
        </Card>
    )
}
