'use client';

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartTooltipContent, ChartContainer } from '@/components/ui/chart';
import { MOCK_SOIL_MOISTURE_DATA } from '@/lib/data';

const chartConfig = {
  moisture: {
    label: "Soil Moisture",
    color: "hsl(var(--primary))",
  },
};

export default function SoilMoistureChart() {
  return (
    <ChartContainer config={chartConfig} className="w-full h-full">
      <AreaChart
        data={MOCK_SOIL_MOISTURE_DATA}
        margin={{
          top: 5,
          right: 10,
          left: -20,
          bottom: 0,
        }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 5)}
          className="text-sm"
        />
        <YAxis
          tickFormatter={(value) => `${value}%`}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          domain={[0, 100]}
          className="text-sm"
        />
        <Tooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <defs>
            <linearGradient id="fillMoisture" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
            </linearGradient>
        </defs>
        <Area
          dataKey="moisture"
          type="natural"
          fill="url(#fillMoisture)"
          stroke="hsl(var(--primary))"
          strokeWidth={3}
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
}
