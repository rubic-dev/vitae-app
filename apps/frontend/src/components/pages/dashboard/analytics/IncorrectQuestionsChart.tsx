import * as React from "react"
import { Cell, Label, Pie, PieChart, Sector } from "recharts"
import type {
  PieSectorShapeProps,
} from "recharts/types/polar/Pie"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import {
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../../../ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select"

export const description = "An interactive pie chart"

type DonutData = {
  subject: string,
  value: number,
  fill?: string,
}

const data: DonutData[] = [
  { subject: "biology", value: 20},
  { subject: "chemistry", value: 20 },
  { subject: "physics", value: 20 },
  { subject: "math", value: 20 },
  { subject: "english", value: 20 },
  { subject: "SAT", value: 20 },
]

const capitalize = (str: string) =>
  str.charAt(1) !== str.charAt(1).toUpperCase() ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : str.toUpperCase()

const buildChartConfig = (data: DonutData[]): ChartConfig => {
  return data.reduce((acc, entry, index) => {
    acc[entry.subject] = {
      label: capitalize(entry.subject),
      color: `var(--chart-${index + 1})`,
    }

    return acc
  }, {} as ChartConfig)
}

// const COLORS = [
//   "#a3b3ff",
//   "#615fff",
//   "#4f39f6",
//   "#432dd7",
//   "#372aac",
// ]

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",
  "var(--chart-7)",
  "var(--chart-8)",
]

export function IncorrectQuestionsChart() {
  const id = "pie-interactive"
  const [activeSubject, setActiveSubject] = React.useState(data[0].subject)

  const chartConfig = React.useMemo(() => buildChartConfig(data), [])

  const activeIndex = React.useMemo(
    () => data.findIndex((item) => item.subject === activeSubject),
    [activeSubject]
  )
  const subjects = React.useMemo(() => data.map((item) => item.subject), [])

  const renderPieShape = React.useCallback(
    ({ index, outerRadius = 0, ...props }: PieSectorShapeProps) => {
      if (index === activeIndex) {
        return (
          <g>
            <Sector {...props} outerRadius={outerRadius + 10} />
            <Sector
              {...props}
              outerRadius={outerRadius + 25}
              innerRadius={outerRadius + 12}
            />
          </g>
        )
      }

      return <Sector {...props} outerRadius={outerRadius} />
    },
    [activeIndex]
  )
  
  console.log(data)
  console.log(chartConfig)

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />

      <CardHeader className="flex items-center space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Incorrect Questions Chart</CardTitle>
          <CardDescription>Number of incorrectly answered questions across sessions</CardDescription>
        </div>

        <Select value={activeSubject} onValueChange={setActiveSubject}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {subjects.map((key) => {
              const config = chartConfig[key as keyof typeof chartConfig]

              if (!config) {
                return null
              }

              return (
                <SelectItem
                  key={key}
                  value={key}
                  className="rounded-lg [&_span]:flex"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-xs"
                      style={{
                        backgroundColor: `var(--color-${key})`,
                      }}
                    />
                    {config.label}
                  </div>
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="value"
              nameKey="subject"
              innerRadius={70}
              strokeWidth={5}
              shape={renderPieShape}
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.subject}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-xl font-bold"
                        >
                          {capitalize(data[activeIndex].subject.toLocaleString())}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Incorrect Questions
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
