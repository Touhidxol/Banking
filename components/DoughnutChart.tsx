"use client"
import React from 'react'
import { Chart as chartjs, ArcElement, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { register } from 'module';

chartjs.register(ArcElement, Tooltip, Legend);


const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
    const data = {
        datasets: [
            {
                label: "Balance",
                data: [1250, 2000, 3500],
                backgroundColor: ["#0747b6", "#2265d8", "#2f91fa"]
            },
        ],
        labels: ["Bank1", "Bank2", "Bank3"]
    }
    return (
        <div className='max-w-full'>
            <Doughnut 
            data={data}
            options={{
                cutout : '60%',
                plugins:{
                    legend:{display:false}
                }
            }} />
        </div>
    )
}

export default DoughnutChart
