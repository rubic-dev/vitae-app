import { IncorrectQuestionsChart } from "./analytics/IncorrectQuestionsChart"
import OverdueSessionsChart from "./analytics/OverdueSessionsChart"
import SessionDurationChart from "./analytics/SessionDurationChart"
import SessionsFrequencyChart from "./analytics/SessionsFrequencyChart"

const Analytics = () => {
  return (
    <div className="w-full space-y-6">
      <h1 className="text-2xl font-semibold">
        Analytics
      </h1>
      <div className="flex flex-col-gap-4 w-full">
        <div className="grid grid-cols-2 gap-4 w-full">
          <IncorrectQuestionsChart />
          <SessionDurationChart />
          <OverdueSessionsChart />
          <SessionsFrequencyChart />
        </div>
      </div>
    </div>
  )
}

export default Analytics