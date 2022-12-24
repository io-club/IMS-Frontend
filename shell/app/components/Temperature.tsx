'use client'

import {CSSProperties} from "react";
import {Card} from "./Cards";
import cardStyle from './Card.module.css'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend, ChartOptions, ChartData, ChartArea,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
)
export default function Temperature(props: {style: CSSProperties}) {
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const data: ChartData<"line"> = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: labels.map(() => Math.random()),
                fill: true,
                tension: 0.7,
                xAxisID: 'xClear',
                yAxisID: 'yClear',
            },
        ],
    };
    const chartOptions: ChartOptions<"line"> = {
        elements: {
            line: {
                tension: 0.7,
                borderWidth: 5,
                borderColor: 'rgb(146, 126, 247)',
                backgroundColor: function(context) {
                    const chart = context.chart;
                    const {ctx, chartArea} = chart;

                    if (!chartArea) {
                        return;
                    }
                    return getGradient(ctx, chartArea);
                },
            },
            point: {
                borderColor: 'rgb(255, 255, 255)',
                radius: 8,
                backgroundColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 4,
            }
        },
        layout: {
            padding: {
                right: 50
            }
        },
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            xClear: {
                display: false
            },
            yClear: {
                display: false
            }
        },
    }
    const graphStyle: CSSProperties = {
        position: "absolute",
        left: -10,
        bottom: -5,
        height: 'calc(100% - 22px)',
        width: 'calc(100% + 20px)',
        borderRadius: '12px'
    }
    return <div style={props.style}>
        <Card title={'温度'}>
            <span
                className={[cardStyle.Description, cardStyle.Background].join(' ')}
                style={{zIndex: 9, backgroundColor: 'rgb(231, 224, 236)'}}
            >
                当前温度: 40
            </span>
            <div style={graphStyle}>
                <Line options={chartOptions} data={data} />
            </div>
        </Card>
    </div>
}

let width: number, height: number, gradient: CanvasGradient;
function getGradient(ctx: CanvasRenderingContext2D, chartArea: ChartArea) {
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;
    if (!gradient || width !== chartWidth || height !== chartHeight) {
        // Create the gradient because this is either the first render
        // or the size of the chart has changed
        width = chartWidth;
        height = chartHeight;
        gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        gradient.addColorStop(0, 'rgba(146, 126, 247, 0)');
        gradient.addColorStop(0.3, 'rgba(146, 126, 247, 0.2)');
        gradient.addColorStop(1, 'rgba(146, 126, 247, 0.3)');
    }

    return gradient;
}