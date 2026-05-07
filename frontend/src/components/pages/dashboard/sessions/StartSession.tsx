/* eslint-disable react-hooks/rules-of-hooks */
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"

import {
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom"

import {
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
} from "lucide-react"

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../ui/card"

import { Button } from "../../../ui/button"

import {
  RadioGroup,
  RadioGroupItem,
} from "../../../ui/radio-group"

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

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60

  return `${mins
    .toString()
    .padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`
}

const StartSession = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const sessionSettings =
    location.state?.sessionSettings as SessionSettings

  const sessionQuestions =
    location.state?.sessionQuestions as QuestionEntity[]

  if (!sessionSettings || !sessionQuestions) {
    return <Navigate to="/session/create" />
  }

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  const [attemptedQuestions, setAttemptedQuestions] = useState<
    AttemptedQuestion[]
  >([])

  const [selectedAnswer, setSelectedAnswer] = useState("")

  const [showQuestionTimer, setShowQuestionTimer] = useState(true)
  const [showSessionTimer, setShowSessionTimer] = useState(true)

  const [sessionTimeRemaining, setSessionTimeRemaining] = useState(
    sessionSettings.timeLimit
      ? sessionSettings.timeLimit * 60
      : null
  )

  const [currentQuestionTime, setCurrentQuestionTime] = useState(0)

  const questionStartTimeRef = useRef(Date.now())

  const currentQuestion =
    sessionQuestions[currentQuestionIndex]

  const existingAttempt = useMemo(() => {
    return attemptedQuestions.find(
      (a) => a.questionId === currentQuestion.id
    )
  }, [attemptedQuestions, currentQuestion.id])

  useEffect(() => {
    questionStartTimeRef.current = Date.now()
    setSelectedAnswer(existingAttempt?.userAnswer ?? "")
    setCurrentQuestionTime(existingAttempt?.timeTaken ?? 0)
  }, [currentQuestionIndex])

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Math.floor(
        (Date.now() - questionStartTimeRef.current) / 1000
      )

      setCurrentQuestionTime(
        (existingAttempt?.timeTaken ?? 0) + elapsed
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [currentQuestion.id, existingAttempt])

  const buildUpdatedAttempts = (answerOverride?: string) => {
    const elapsed = Math.floor(
      (Date.now() - questionStartTimeRef.current) / 1000
    )

    const finalAnswer = answerOverride ?? selectedAnswer

    const updated: AttemptedQuestion = {
      questionId: currentQuestion.id,
      userAnswer: finalAnswer,
      isCorrect:
        finalAnswer === currentQuestion.correctAnswer,
      timeTaken:
        (existingAttempt?.timeTaken ?? 0) + elapsed,
    }

    const filtered = attemptedQuestions.filter(
      (a) => a.questionId !== currentQuestion.id
    )

    return [...filtered, updated]
  }

  const persistAttempt = (answerOverride?: string) => {
    const updated = buildUpdatedAttempts(answerOverride)
    setAttemptedQuestions(updated)
    return updated
  }

  const goNext = () => {
    const updated = persistAttempt()

    if (currentQuestionIndex < sessionQuestions.length - 1) {
      setCurrentQuestionIndex((p) => p + 1)
      return
    }

    navigate("/dashboard/session/results", {
      state: {
        sessionSettings,
        sessionQuestions,
        attemptedQuestions: updated,
      },
    })
  }

  const goPrevious = () => {
    const updated = persistAttempt()

    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((p) => p - 1)
    }

    setAttemptedQuestions(updated)
  }

  const handleSelectAnswer = (value: string) => {
    setSelectedAnswer(value)
    persistAttempt(value)
  }

  const handleFinishSession = () => {
    const updated = persistAttempt()

    navigate("/dashboard/session/results", {
      state: {
        sessionSettings,
        sessionQuestions,
        attemptedQuestions: updated,
      },
    })
  }

  const progressText = useMemo(() => {
    return `${currentQuestionIndex + 1} / ${sessionQuestions.length}`
  }, [currentQuestionIndex, sessionQuestions.length])

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="text-sm text-muted-foreground">
          Question {progressText}
        </div>

        {sessionTimeRemaining !== null && (
          <div className="flex items-center gap-3">
            {showSessionTimer && (
              <div className="text-sm font-medium">
                {formatTime(sessionTimeRemaining)}
              </div>
            )}

            <Button
              size="icon"
              variant="ghost"
              className="rounded-lg"
              onClick={() =>
                setShowSessionTimer(!showSessionTimer)
              }
            >
              {showSessionTimer ? <EyeOff /> : <Eye />}
            </Button>
          </div>
        )}
      </div>

      <div className="flex-1 grid grid-cols-[120px_1fr_120px] overflow-hidden">
        <div className="flex items-center justify-center">
          <Button
            size="icon"
            variant="outline"
            className="h-20 w-20 rounded-full"
            disabled={currentQuestionIndex === 0}
            onClick={goPrevious}
          >
            <ChevronLeft className="size-8" />
          </Button>
        </div>

        <div className="flex items-center justify-center p-6 overflow-hidden">
          <Card className="w-full max-w-4xl p-10">
            <CardHeader className="flex flex-row items-center justify-between gap-4">
              <CardTitle className="text-start flex-1 text-xl leading-relaxed">
                {currentQuestion.questionText}
              </CardTitle>

              <CardAction className="flex gap-2 items-center">
                <div
                  className={`text-sm text-muted-foreground ${
                    showQuestionTimer ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {formatTime(currentQuestionTime)}
                </div>

                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-lg shrink-0 text-muted-background"
                  onClick={() =>
                    setShowQuestionTimer(!showQuestionTimer)
                  }
                >
                  {showQuestionTimer ? <EyeOff /> : <Eye />}
                </Button>
              </CardAction>
            </CardHeader>

            <CardContent className="flex flex-col items-center gap-8">
              <RadioGroup
                value={selectedAnswer}
                onValueChange={handleSelectAnswer}
                className="w-full max-w-[70%] flex flex-col gap-4"
              >
                {currentQuestion.options.map((option) => (
                  <Label
                    key={option}
                    className="flex items-center gap-4 rounded-lg border p-4 cursor-pointer"
                  >
                    <RadioGroupItem value={option} />
                    <span>{option}</span>
                  </Label>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-center">
          <Button
            size="icon"
            className="h-20 w-20 rounded-full"
            variant={
              currentQuestionIndex === sessionQuestions.length - 1
                ? "default"
                : "outline"
            }
            onClick={goNext}
          >
            <ChevronRight className="size-8" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default StartSession