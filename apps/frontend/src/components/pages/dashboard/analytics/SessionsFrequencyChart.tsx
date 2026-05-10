import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card"

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
} from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../../../ui/chart"

export const description = "An area chart with gradient fill"

type SessionData = {
  subject: string
  value: number
  week: number
}

const rawData: SessionData[] = [
  // Week 1
  { subject: "biology", value: 4, week: 1 },
  { subject: "chemistry", value: 2, week: 1 },
  { subject: "physics", value: 5, week: 1 },
  { subject: "math", value: 3, week: 1 },
  { subject: "english", value: 2, week: 1 },
  { subject: "sat", value: 1, week: 1 },

  // Week 2
  { subject: "biology", value: 6, week: 2 },
  { subject: "chemistry", value: 3, week: 2 },
  { subject: "physics", value: 4, week: 2 },
  { subject: "math", value: 7, week: 2 },
  { subject: "english", value: 2, week: 2 },
  { subject: "sat", value: 2, week: 2 },

  // Week 3
  { subject: "biology", value: 3, week: 3 },
  { subject: "chemistry", value: 5, week: 3 },
  { subject: "physics", value: 6, week: 3 },
  { subject: "math", value: 8, week: 3 },
  { subject: "english", value: 4, week: 3 },
  { subject: "sat", value: 3, week: 3 },

  // Week 4
  { subject: "biology", value: 7, week: 4 },
  { subject: "chemistry", value: 4, week: 4 },
  { subject: "physics", value: 5, week: 4 },
  { subject: "math", value: 9, week: 4 },
  { subject: "english", value: 3, week: 4 },
  { subject: "sat", value: 4, week: 4 },
]

const subjects = [
  "biology",
  "chemistry",
  "physics",
  "math",
  "english",
  "sat",
] as const

const chartConfig = {
  biology: {
    label: "Biology",
    color: "var(--chart-1)",
  },
  chemistry: {
    label: "Chemistry",
    color: "var(--chart-2)",
  },
  physics: {
    label: "Physics",
    color: "var(--chart-3)",
  },
  math: {
    label: "Math",
    color: "var(--chart-4)",
  },
  english: {
    label: "English",
    color: "var(--chart-5)",
  },
  sat: {
    label: "SAT",
    color: "var(--chart-6)",
  },
} satisfies ChartConfig

const chartData = Array.from(
  new Set(rawData.map((entry) => entry.week))
).map((week) => {
  const weekEntries = rawData.filter((entry) => entry.week === week)

  return weekEntries.reduce(
    (acc, entry) => {
      acc[entry.subject] = entry.value
      return acc
    },
    {
      week: `Week ${week}`,
    } as Record<string, string | number>
  )
})

const SessionsFrequencyChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sessions Frequency</CardTitle>

        <CardDescription>
          Weekly frequency of sessions per subject
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
              dataKey="week"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />

            <defs>
              {subjects.map((subject) => (
                <linearGradient
                  key={subject}
                  id={`fill-${subject}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={`var(--color-${subject})`}
                    stopOpacity={0.8}
                  />

                  <stop
                    offset="95%"
                    stopColor={`var(--color-${subject})`}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              ))}
            </defs>

            {subjects.map((subject) => (
              <Area
                key={subject}
                dataKey={subject}
                type="natural"
                fill={`url(#fill-${subject})`}
                fillOpacity={0.4}
                stroke={`var(--color-${subject})`}
                stackId="a"
              />
            ))}
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default SessionsFrequencyChart