"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

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


const chartData = [
  { month: "12AM", moderate: 186, critical: 80, catastrophic: 50 },
  { month: "01AM", moderate: 305, critical: 200, catastrophic: 120 },
  { month: "02AM", moderate: 237, critical: 120, catastrophic: 80 },
  { month: "03AM", moderate: 73, critical: 190, catastrophic: 60 },
  { month: "04AM", moderate: 209, critical: 130, catastrophic: 95 },
  { month: "05AM", moderate: 214, critical: 140, catastrophic: 100 },
  { month: "06AM", moderate: 186, critical: 80, catastrophic: 50 },
  { month: "07AM", moderate: 305, critical: 200, catastrophic: 120 },
  { month: "08AM", moderate: 237, critical: 120, catastrophic: 80 },
  { month: "09AM", moderate: 73, critical: 190, catastrophic: 60 },
  { month: "10AM", moderate: 209, critical: 130, catastrophic: 95 },
  { month: "11AM", moderate: 214, critical: 140, catastrophic: 100 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
  tablet: {
    label: "Tablet",
    color: "hsl(var(--chart-3))", // New color for tablet
  },
} satisfies ChartConfig

export function Graph2() {
  return (
    <Card>
      <CardHeader>
      <CardTitle>
        <div className="flex w-full justify-between items-center gap-4 ">
            <div className="flex-1">
            Anomaly Criticality
            </div>
            <div className="flex-0">
            <Button className="bg-background hover:bg-neutral-100 text-primary border-2" onClick={() => {}}>Refresh Data</Button>
            
            </div>
        </div>
        </CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 4)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              {/* New gradient for tablet */}
              <linearGradient id="fillTablet" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-tablet)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-tablet)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="moderate"
              type="natural"
              fill="url(#fillMobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="critical"
              type="natural"
              fill="url(#fillDesktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />
            {/* New area for tablet */}
            <Area
              dataKey="catastrophic"
              type="natural"
              fill="url(#fillTablet)"
              fillOpacity={0.4}
              stroke="var(--color-tablet)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
