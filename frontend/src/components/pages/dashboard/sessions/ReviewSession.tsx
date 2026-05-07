/* eslint-disable react-hooks/rules-of-hooks */
import { useMemo, useState } from "react"

import {
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom"

import {
  RotateCcw,
  Trash2,
  Check,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card"

import { Button } from "../../../ui/button"

import { Input } from "../../../ui/input"

import { Label } from "../../../ui/label"

import type {
  SessionSettings,
  QuestionEntity,
} from "../../../../types/session"

type AttemptedQuestion = {
  userAnswer: string
  isCorrect: boolean
  timeTaken: number
  questionId: string
}

type SessionPayload = {
  id: string
  session_name: string
  subject: string
  topics: string[]
  subtopics: string[]
  questionCount: number
  maxAttempts: number
  createdAt?: string
  status?: string[]
  lastReview?: string
  nextReview?: string
}

type SessionAttemptPayload = {
  id: string
  sessionId: string
  attemptIndex: number
  duration: number
  totalQuestions: number
  accuracyScore: number
  submittedAt?: string
}

type AttemptedQuestionPayload = {
  id: string
  attempt_id: string
  session_id: string
  question_id: string
  question_text: string
  options: string[]
  correct_answer: string
  subject: string
  topic: string
  subtopic: string
  user_answer: string
  is_correct: boolean
  time_taken: number
  submitted_at?: string
}

const ResultsSession = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const sessionSettings =
    location.state?.sessionSettings as SessionSettings

  const sessionQuestions =
    location.state?.sessionQuestions as QuestionEntity[]

  const attemptedQuestions =
    location.state?.attemptedQuestions as AttemptedQuestion[]

  if (!sessionSettings || !sessionQuestions || !attemptedQuestions) {
    return <Navigate to="/dashboard/sessions" />
  }

  const [sessionName, setSessionName] = useState(() => {
    const topicString =
      sessionSettings.topics?.[0] ?? "all-topics"

    const subtopicString =
      sessionSettings.subtopics?.[0] ?? "all-subtopics"

    return `s-${sessionSettings.subject}-${topicString}-${subtopicString}`
  })

  const correctAnswers =
    attemptedQuestions.filter((a) => a.isCorrect).length

  const accuracyScore =
    sessionQuestions.length > 0
      ? correctAnswers / sessionQuestions.length
      : 0

  const accuracyPercentage = Math.round(accuracyScore * 100)

  const totalTimeTaken = attemptedQuestions.reduce(
    (acc, a) => acc + a.timeTaken,
    0
  )

  const averageTimePerQuestion =
    sessionQuestions.length > 0
      ? Math.round(totalTimeTaken / sessionQuestions.length)
      : 0

  const sessionId = useMemo(
    () => `s-${Math.floor(Math.random() * 100000)}`,
    []
  )

  const attemptId = useMemo(
    () => `a-${Math.floor(Math.random() * 100000)}`,
    []
  )

  const attemptIndex = 1

  const calculateNextReviewDays = (
    accuracyScore: number,
    attemptIndex: number,
    maxAttempts: number
  ) => {
    const attemptPressure =
      maxAttempts > 0 ? attemptIndex / maxAttempts : 0

    const clampedAttemptPressure = Math.min(
      1,
      Math.max(0, attemptPressure)
    )

    const mastery =
      accuracyScore - 0.35 * clampedAttemptPressure

    const clampedMastery = Math.min(
      1,
      Math.max(0, mastery)
    )

    const k = 3.2

    const exponential =
      (Math.exp(k * clampedMastery) - 1) /
      (Math.exp(k) - 1)

    return Math.round(1 + exponential * 6)
  }

  const nextReviewDays = useMemo(() => {
    return calculateNextReviewDays(
      accuracyScore,
      attemptIndex,
      sessionSettings.maxAttempts ?? 3
    )
  }, [accuracyScore, attemptIndex, sessionSettings.maxAttempts])

  const sessionPayload: SessionPayload = useMemo(() => {
    const now = new Date()
    const nextReview = new Date()

    nextReview.setDate(now.getDate() + nextReviewDays)

    return {
      id: sessionId,
      session_name: sessionName,
      subject: sessionSettings.subject,
      topics: sessionSettings.topics ?? [],
      subtopics: sessionSettings.subtopics ?? [],
      questionCount: sessionQuestions.length,
      maxAttempts: sessionSettings.maxAttempts ?? 3,
      createdAt: now.toISOString(),
      status: [accuracyPercentage >= 70 ? "passed" : "failed"],
      lastReview: now.toISOString(),
      nextReview: nextReview.toISOString(),
    }
  }, [
    sessionId,
    sessionName,
    sessionSettings,
    sessionQuestions.length,
    accuracyPercentage,
    nextReviewDays,
  ])

  const sessionAttemptPayload: SessionAttemptPayload =
    useMemo(() => {
      return {
        id: attemptId,
        sessionId,
        attemptIndex,
        duration: totalTimeTaken,
        totalQuestions: sessionQuestions.length,
        accuracyScore,
        submittedAt: new Date().toISOString(),
      }
    }, [
      attemptId,
      sessionId,
      attemptIndex,
      totalTimeTaken,
      sessionQuestions.length,
      accuracyScore,
    ])

  const attemptedQuestionPayloads: AttemptedQuestionPayload[] =
    useMemo(() => {
      return attemptedQuestions.map((attempt) => {
        const question = sessionQuestions.find(
          (q) => q.id === attempt.questionId
        )

        if (!question) return null

        return {
          id: `qa-${Math.random()}`,
          attempt_id: attemptId,
          session_id: sessionId,
          question_id: question.id,
          question_text: question.questionText,
          options: question.options,
          correct_answer: question.correctAnswer,
          subject: question.subject,
          topic: question.topic,
          subtopic: question.subtopic,
          user_answer: attempt.userAnswer || "",
          is_correct: attempt.isCorrect,
          time_taken: attempt.timeTaken,
          submitted_at: new Date().toISOString(),
        }
      }).filter(Boolean) as AttemptedQuestionPayload[]
    }, [attemptedQuestions, sessionQuestions, attemptId, sessionId])

  const handleRetry = () => {
    navigate("/dashboard/session/overview", {
      state: {
        sessionSettings: {
          ...sessionSettings,
          new: false,
        },
      },
    })
  }

  const handleDiscard = () => navigate("/dashboard/sessions")

  const handleSubmit = () => {
    console.log({
      session: sessionPayload,
      sessionAttempt: sessionAttemptPayload,
      attemptedQuestions: attemptedQuestionPayloads,
    })

    navigate("/dashboard/sessions")
  }

  return (
    <div className="min-h-full flex items-center justify-center p-6">
      <Card className="w-full max-w-5xl">
        <CardHeader>
          <CardTitle>Session Results</CardTitle>
          <CardDescription>
            Review and confirm the session payload before submission.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <Label htmlFor="sessionName">Session Name</Label>
            <Input
              id="sessionName"
              className="rounded-lg"
              value={sessionName}
              onChange={(e) => setSessionName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 flex flex-col gap-2">
                <p className="text-sm text-muted-foreground">Accuracy</p>
                <h2 className="text-2xl font-semibold">
                  {accuracyPercentage}%
                </h2>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex flex-col gap-2">
                <p className="text-sm text-muted-foreground">Correct</p>
                <h2 className="text-2xl font-semibold">
                  {correctAnswers}/{sessionQuestions.length}
                </h2>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex flex-col gap-2">
                <p className="text-sm text-muted-foreground">Avg Time</p>
                <h2 className="text-2xl font-semibold">
                  {averageTimePerQuestion}s
                </h2>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex flex-col gap-2">
                <p className="text-sm text-muted-foreground">Next Review</p>
                <h2 className="text-2xl font-semibold">
                  {nextReviewDays}d
                </h2>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex flex-col gap-3">
              <h2 className="font-medium">Session Payload</h2>
              <pre className="rounded-lg border p-4 text-xs overflow-auto max-h-[500px]">
                {JSON.stringify(sessionPayload, null, 2)}
              </pre>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="font-medium">Session Attempt</h2>
              <pre className="rounded-lg border p-4 text-xs overflow-auto max-h-[240px]">
                {JSON.stringify(sessionAttemptPayload, null, 2)}
              </pre>

              <h2 className="font-medium mt-4">Attempted Questions</h2>
              <pre className="rounded-lg border p-4 text-xs overflow-auto max-h-[240px]">
                {JSON.stringify(attemptedQuestionPayloads, null, 2)}
              </pre>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4">
            <Button variant="outline" className="rounded-lg" onClick={handleRetry}>
              <RotateCcw />
              Retry
            </Button>

            <Button
              variant="destructive"
              className="rounded-lg"
              onClick={handleDiscard}
            >
              <Trash2 />
              Discard
            </Button>

            <Button className="rounded-lg" onClick={handleSubmit}>
              <Check />
              Submit Session
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ResultsSession