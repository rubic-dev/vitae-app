import { Card, CardDescription, CardContent, CardHeader, CardTitle } from "../../../ui/card"

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../../../ui/chart"

const data = [
  { subject: "January", duration: 186 },
  { subject: "February", duration: 305 },
  { subject: "March", duration: 237 },
  { subject: "April", duration: 273 },
  { subject: "May", duration: 209 },
  { subject: "June", duration: 214 },
]

const chartConfig = {
  duration: {
    label: "Avg. Duration",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

const SessionDurationChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Average Session Duration</CardTitle>
        <CardDescription>Average total session duration per subject</CardDescription>
      </CardHeader>

      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <RadarChart data={data}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="subject" />
            <PolarGrid />
            <Radar
              dataKey="duration"
              fill="var(--chart-3)"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default SessionDurationChart