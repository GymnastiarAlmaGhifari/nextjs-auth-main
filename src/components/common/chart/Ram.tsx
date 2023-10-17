'use client'
// components/AreaChart.tsx
import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,

} from 'recharts';

const data = [
    { name: 'Jan', uv: 4000 },
    { name: 'Feb', uv: 3000 },
    { name: 'Mar', uv: 2000 },
    { name: 'Apr', uv: 5000 },
    { name: 'May', uv: 6000 },
    { name: 'Jun', uv: 4000 },
];

const gradientOffset = () => {
    const dataMax = Math.max(...data.map((entry) => entry.uv));
    const dataMin = Math.min(...data.map((entry) => entry.uv));

    if (dataMax <= 0) {
        return 0;
    }
    if (dataMin >= 0) {
        return 1;
    }

    return dataMax / (dataMax - dataMin);
};

const AreaChartWithGradient: React.FC = () => {
    const offset = gradientOffset();

    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset={offset} stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset={offset} stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                    type="monotone"
                    dataKey="uv"
                    stroke="#8884d8"
                    fill="url(#colorUv)"
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default AreaChartWithGradient;



// import React, { PureComponent } from 'react';
// import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// import { RamChart } from "@/widget/ram";

// const data = [
//     {
//         name: 'Page A',
//         uv: 4000,
//         pv: 2400,
//         amt: 2400,
//     },
//     {
//         name: 'Page B',
//         uv: 3000,
//         pv: 1398,
//         amt: 2210,
//     },
//     {
//         name: 'Page C',
//         uv: 2000,
//         pv: 9800,
//         amt: 2290,
//     },
//     {
//         name: 'Page D',
//         uv: 2780,
//         pv: 3908,
//         amt: 2000,
//     },
//     {
//         name: 'Page E',
//         uv: 1890,
//         pv: 4800,
//         amt: 2181,
//     },
//     {
//         name: 'Page F',
//         uv: 2390,
//         pv: 3800,
//         amt: 2500,
//     },
//     {
//         name: 'Page G',
//         uv: 3490,
//         pv: 4300,
//         amt: 2100,
//     },
// ];

// export default class Ram extends PureComponent {
//     static demoUrl = 'https://codesandbox.io/s/simple-area-chart-4ujxw';

//     render() {
//         return (
//             <ResponsiveContainer width="100%" height="100%">
//                 <AreaChart
//                     width={500}
//                     height={400}
//                     data={data}
//                     margin={{
//                         top: 10,
//                         right: 30,
//                         left: 0,
//                         bottom: 0,
//                     }}
//                 >
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip />
//                     <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
//                 </AreaChart>
//             </ResponsiveContainer>
//         );
//     }
// }


// const Ram = () => {
//     const ramData = {
//         size: 8,
//         layout: [
//             { brand: 'Corsair', type: 'DDR4', frequency: 3200 },
//             { brand: 'Kingston', type: 'DDR4', frequency: 2666 },
//             // Tambahkan lebih banyak entri sesuai dengan jumlah RAM yang Anda miliki
//         ],
//     };

//     const ramLoad = [30, 40, 50, 60, 70, 45, 55, 75, 80, 65];


//     return (
//         <div>
//             <h1>RAM Chart</h1>
//             <RamChart
//                 data={ramData}
//                 load={ramLoad}
//                 showPercentages={true} // Tampilkan persentase pada grafik
//                 textOffset="10px" // Sesuaikan offset teks jika diperlukan
//                 textSize="16px" // Sesuaikan ukuran teks jika diperlukan
//             />
//         </div>
//     );
// };

// export default Ram

