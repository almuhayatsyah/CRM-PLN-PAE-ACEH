import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

export default function PowerUsageChart({ data }) {
    // Format data agar bisa dibaca oleh Recharts
    const chartData = data.map((item) => ({
        name: item.bulan_tahun,
        "Pemakaian (kWh)": item.pemakaian_kwh,
        "Beban Puncak (kW)": item.beban_puncak,
    }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart
                data={chartData}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="Pemakaian (kWh)"
                    stroke="#3b82f6"
                    activeDot={{ r: 8 }}
                />
                <Line
                    type="monotone"
                    dataKey="Beban Puncak (kW)"
                    stroke="#8884d8"
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
