import { useMemo } from "react"

import {
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom"

import { ArrowLeft } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card"

import { Button } from "../../../ui/button"

import generateSessionQuestions from "../../../../data/generateSessionQuestions"

import type { SessionSettings, QuestionEntity } from "../../../../types/session"

import { filterSessionQuestions } from "../../../../lib/sessionQuestionFilter"

const OverviewSession = () => {
  const navigate = useNavigate()

  const location = useLocation()

  const sessionSettings =
    location.state
      ?.sessionSettings as SessionSettings

  /*
    refresh protection
  */
  if (!sessionSettings) {
    return (
      <Navigate to="/session/create" />
    )
  }

  /*
    generate full question bank
  */
  const allQuestions: QuestionEntity[] =
    useMemo(() => {
      return generateSessionQuestions()
    }, [])

  /*
    filtered session questions
  */
  const sessionQuestions =
    useMemo(() => {
      return filterSessionQuestions(
        allQuestions,
        sessionSettings
      )
    }, [
      allQuestions,
      sessionSettings,
    ])

  /*
    launch session
  */
  const startSession = () => {
    navigate("/dashboard/session/start", {
      state: {
        sessionSettings,
        sessionQuestions,
      },
    })
  }

  return (
    <div className="min-h-full flex flex-col gap-6">
      {/* TOP BAR */}
      <div>
        <Button
          variant="ghost"
          className="rounded-lg"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft />
          Back
        </Button>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex items-center justify-center">
        <Card className="w-3xl">
          <CardHeader>
            <CardTitle>
              Session Overview
            </CardTitle>

            <CardDescription>
              Confirm your session settings
              before starting.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-6">
            {/* SETTINGS */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 flex flex-col gap-2">
                    <h2 className="font-medium">
                        Subject
                    </h2>

                    <p className="text-muted-foreground text-sm">
                        {
                            sessionSettings.subject
                        }
                    </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex flex-col gap-2">
                    <h2 className="font-medium">
                        Topics
                    </h2>

                    <p className="text-muted-foreground text-sm">
                        {
                            sessionSettings.topics
                            ?.join(", ") ??
                            "All Topics"
                        }
                    </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex flex-col gap-2">
                    <h2 className="font-medium">
                        Subtopics
                    </h2>

                    <p className="text-muted-foreground text-sm">
                        {
                            sessionSettings.subtopics
                            ?.join(", ") ??
                            "All Subtopics"
                        }
                    </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex flex-col gap-2">
                    <h2 className="font-medium">
                        Question Count
                    </h2>

                    <p className="text-muted-foreground text-sm">
                        {
                            sessionQuestions.length
                        }
                    </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex flex-col gap-2">
                    <h2 className="font-medium">
                        Max Attempts
                    </h2>

                    <p className="text-muted-foreground text-sm">
                        {
                            sessionSettings.maxAttempts ??
                            3
                        }
                    </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex flex-col gap-2">
                    <h2 className="font-medium">
                        Time Limit
                    </h2>

                    <p className="text-muted-foreground text-sm">
                        {
                            sessionSettings.timeLimit
                            ? `${sessionSettings.timeLimit} minutes`
                            : "No Time Limit"
                        }
                    </p>
                </CardContent>
              </Card>
            </div>

            {/* SESSION INFO */}
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                {
                  sessionQuestions.length
                }{" "}
                questions matched your
                filters.
              </p>
            </div>

            {/* ACTION */}
            <Button
              className="rounded-lg"
              onClick={startSession}
            >
              Start Session
            </Button>

            {/* DEBUG */}
            <pre className="rounded-lg border p-4 text-xs overflow-auto">
              {JSON.stringify(
                sessionQuestions,
                null,
                2
              )}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default OverviewSession