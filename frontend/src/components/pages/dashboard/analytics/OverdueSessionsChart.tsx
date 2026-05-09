import { Card, CardDescription, CardContent, CardHeader, CardTitle } from "../../../ui/card"

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../../../ui/chart"


const data = [
  { subject: "Biology", overdue: 186 },
  { subject: "Chemistry", overdue: 305 },
  { subject: "Physics", overdue: 237 },
  { subject: "Math", overdue: 273 },
  { subject: "English", overdue: 209 },
  { subject: "SAT", overdue: 214 },
]

const chartConfig = {
  overdue: {
    label: "Overdue",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

const OverdueSessionsChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Overdue Sessions Chart</CardTitle>
        <CardDescription>Number of overdue sessions per subject</CardDescription>
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
              dataKey="overdue"
              fill="var(--chart-3)"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default OverdueSessionsChart