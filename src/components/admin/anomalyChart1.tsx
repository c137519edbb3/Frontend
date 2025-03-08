"use client"

import { useEffect, useState } from "react"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import axios from "axios"

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
import { useSession } from "next-auth/react"

interface AnomalyCount {
  cameraId: number
  moderate: number
  critical: number
  catastrophic: number
  total: number
}

interface AnomalyResponse {
  date: string
  totalCameras: number
  cameraCounts: AnomalyCount[]
}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function Graph1() {
  const [chartData, setChartData] = useState<{ camera: string; count: number }[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { data: session } = useSession();

  const fetchAnomalyData = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL_AWS}/api/analytics/anomaly/counts/today`,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      )
      const data: AnomalyResponse = response.data

      // Transform the data for the chart
      const transformedData = data.cameraCounts.map((count) => ({
        camera: `Camera ${count.cameraId}`,
        count: count.total
      }))

      console.log(transformedData)

      setChartData(transformedData)
      setError(null)
    } catch (err) {
      console.error("Error fetching anomaly data:", err)
      setError("Failed to load anomaly data")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAnomalyData()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex w-full justify-between items-center gap-4 ">
            <div className="flex-1">
              Anomaly Count for Cameras
            </div>
            <div className="flex-0">
              <Button 
                className="bg-background hover:bg-neutral-100 text-primary border-2" 
                onClick={fetchAnomalyData}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Refresh Data"}
              </Button>
            </div>
          </div>
        </CardTitle>
        <CardDescription>
          Visualizing anomalies reported per camera for: {new Date().toLocaleDateString('en-GB', { 
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="text-center text-red-500 py-4">{error}</div>
        ) : chartData.length === 0 ? (
          <div className="text-center text-gray-500 py-4">No anomalies detected today</div>
        ) : (
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="camera"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="count" fill="var(--color-desktop)" radius={8} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
