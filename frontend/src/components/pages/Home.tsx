const Home = () => {
  const content = {
    app: "Vitae",
    headline: "Built for Recall. Designed for Results.",
    subHeadline:
      "Turn biology notes into structured practice with mock exams, analytics, and a smarter way to revise.",
    primaryBtn: "Get Started",
    secondaryBtn: "Explore Guide",
  };
  const [ headline1, headline2 ] = content.headline.split(".");
 
  return (
    <div className="h-full w-full flex flex-col justify-between items-center">
      <div className="py-6">
        <h1 className="text-2xl sm:text-3xl font-medium">
          {content.app}
        </h1>
      </div>

      <div className="flex flex-col items-center gap-8 py-6 w-full">
        {/* text content */}
        <div className="flex flex-col gap-4 items-start sm:items-center w-full max-w-4xl">
          <div className="flex flex-col gap-0 items-start sm:items-center w-full">
            <h1 className="text-4xl sm:text-3xl font-medium text-left sm:text-center leading-tight">
              {headline1}
            </h1>

            <h1 className="text-4xl sm:text-3xl font-medium text-left sm:text-center leading-tight">
              {headline2}
            </h1>
          </div>

          <p className="text-base sm:text-lg w-full sm:w-lg text-left sm:text-center leading-relaxed">
            {content.subHeadline}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home