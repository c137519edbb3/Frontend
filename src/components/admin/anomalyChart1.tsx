"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Button } from "../ui/button"
import Link from "next/link"
const chartData = [
  { camera: "Camera 1", count: 186 },
  { camera: "Camera 2", count: 305 },
  { camera: "Camera 4", count: 237 },
  { camera: "Camera 5", count: 73 },
  { camera: "Camera 6", count: 209 },
  { camera: "Camera 7", count: 214 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function Graph1() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
        <div className="flex w-full justify-between items-center gap-4 ">
            <div className="flex-1">
            Anomaly Count for Cameras
            </div>
            <div className="flex-0">
            <Button className="bg-background hover:bg-neutral-100 text-primary border-2" onClick={() => {}}>Refresh Data</Button>
            </div>
        </div>
        </CardTitle>
        <CardDescription>
            Visualizing anomalies reported per camera for: {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', year: 'numeric' })}
        </CardDescription>

    </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="camera"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            //   tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" fill="primary" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
     
    </Card>
  )
}
