import { useEffect, useState } from 'react';
import { useSocket } from '@/components/providers/socket-provider';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import useSWR from 'swr';

type SensorData = {
    temperature: number;
};

type AreaChartContainerProps = {
    size: { height: number; width: number };
};
interface TemperatureData {
    temperature: number;
    humidity: number;
}


const SensorChart: React.FC<AreaChartContainerProps> = ({ size }) => {
    const { isConnected, socket } = useSocket();
    const [temperatureData, setTemperatureData] = useState<TemperatureData[]>([]);

    // Key SWR untuk mengambil data dari API, gantilah dengan URL yang sesuai
    const apiURL = "/api/sensor"; // Ganti dengan URL yang sesuai

    // ambil data dari dari api untuk pertama kali dimuat
    useEffect(() => {
        if (isConnected) {
            fetch(apiURL)
                .then((response) => response.json())
                .then((data: TemperatureData[]) => {
                    setTemperatureData(data);
                })
                .catch((error) => {
                    console.error("Error fetching data from API:", error);
                });
        }
    }, [isConnected]);

    useEffect(() => {
        // ambil data saat pertama kali dimuat
        if (socket) {
            socket.on("sensor", (data: TemperatureData[]) => {
                setTemperatureData(data);
            });
        }
        // Bersihkan event listener
        return () => {
            if (socket) {
                socket.off("sensor");
            }
        };
    }, [socket, isConnected]);

    // Penggunaan SWR untuk memantau data dengan interval 5 detik


    const renderTooltip = (val: any) => {
        return `${val.payload?.[0]?.value.toFixed(1)} °C`; // Menampilkan nilai suhu dengan satuan °C
    };

    return (
        <div className="w-full h-64  rounded shadow p-4 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={temperatureData}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <YAxis type="number" domain={[0, 100]} /> {/* Batasan suhu dari 0 hingga 100 derajat */}
                    <Tooltip content={renderTooltip} />
                    <Area type="monotone" dataKey="temperature" name="Temperature" stroke="#CD2626" fill="#FF8888" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SensorChart;
