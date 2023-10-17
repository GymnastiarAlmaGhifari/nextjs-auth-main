// pages/component/temperature.js
"use client"
import React, { Fragment, useEffect, useState } from "react";
import { useChartQuery } from "@/hooks/use-chart-query";
import { useChartSocket } from "@/hooks/use-chart-socket";

interface TemperatureData {
    temperature: number;
    humidity: number;
}
interface TemperatureProps {
    apiUrl: string;
    socketUrl: string;
    socketQuery: Record<string, string>;
    paramKey: "sensorId" | "conversationId";
    paramValue: string;
}

export const Temperature = ({
    apiUrl,
    socketUrl,
    socketQuery,
    paramKey,
    paramValue,
}: TemperatureProps) => {
    const queryKey = `sensor`;
    const addKey = `sensors`;

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useChartQuery({
        queryKey,
        apiUrl,
        // paramKey,
        // paramValue,
    });
    useChartSocket({ queryKey, addKey });


    return (
        <div>
            <h1>Data Sensor</h1>
            {status === "loading" ? (
                <p>Loading...</p>
            ) : status === "error" ? (
                <p>Error loading data</p>
            ) : (
                <Fragment>
                    <ul>
                        {data?.pages.map((page, pageIndex) => (
                            <Fragment key={pageIndex}>
                                {page.sensorData.map((item: any) => (
                                    <li key={item.id}>
                                        <p>Temperature: {item.temperature}</p>
                                    </li>
                                ))}
                            </Fragment>
                        ))}
                    </ul>

                </Fragment>
            )}
        </div>
    );
}
export default Temperature;

// useEffect(() => {
//     let intervalId: NodeJS.Timeout;

//     if (!isConnected) {
//         intervalId = setInterval(() => {
//             // Fetch data with SWR
//             fetch(apiURL)
//                 .then((response) => response.json())
//                 .then((data: TemperatureData[]) => {
//                     setTemperatureData(data);
//                 })
//                 .catch((error) => {
//                     console.error("Error fetching data from API:", error);
//                 });
//         }, 5000); // Fetch data every 5 seconds
//     }

//     return () => {
//         if (intervalId) {
//             clearInterval(intervalId);
//         }
//     };
// }, [isConnected]);