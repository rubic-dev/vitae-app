import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Check } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card"

import { Input } from "../../../ui/input"
import { Label } from "../../../ui/label"
import { Command } from "../../../ui/command"
import { CommandDialog } from "cmdk"
import { Button } from "../../../ui/button"

import generateSessionQuestions from "../../../../data/generateSessionQuestions"

import {
  buildQuestionTree,
  type QuestionTree,
} from "../../../../lib/buildQuestionTree"

import type { SessionSettings } from "../../../../types/session"

const questions = generateSessionQuestions()

const questionTree: QuestionTree =
  buildQuestionTree(questions)

const CreateSession = () => {
  const navigate = useNavigate();

  const [openSubject, setOpenSubject] =
    useState(false)

  const [openTopics, setOpenTopics] =
    useState(false)

  const [openSubtopics, setOpenSubtopics] =
    useState(false)

  const [questionCount, setQuestionCount] =
    useState(25)

  const [maxAttempts, setMaxAttempts] =
    useState(3)

  const [timeLimit, setTimeLimit] =
    useState<number | null>(null)

  const [selectedSubject, setSelectedSubject] =
    useState("")

  const [selectedTopics, setSelectedTopics] =
    useState<string[]>([])

  const [
    selectedSubtopics,
    setSelectedSubtopics,
  ] = useState<string[]>([])

  /*
    derive subjects from tree
  */
  const subjects = useMemo(() => {
    return Object.keys(questionTree)
  }, [])

  /*
    derive topics from selected subject
  */
  const availableTopics = useMemo(() => {
    if (!selectedSubject) return []

    return Object.keys(
      questionTree[selectedSubject] ?? {}
    )
  }, [selectedSubject])

  /*
    derive subtopics from selected topics
  */
  const availableSubtopics = useMemo(() => {
    if (!selectedSubject) return []

    const subtopics = selectedTopics.flatMap(
      (topic) =>
        questionTree[selectedSubject]?.[
          topic
        ] ?? []
    )

    return [...new Set(subtopics)]
  }, [
    selectedSubject,
    selectedTopics,
  ])

  /*
    topic toggle
  */
  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) => {
      const exists = prev.includes(topic)

      if (exists) {
        /*
          remove orphaned subtopics
        */
        const removedSubtopics =
          questionTree[selectedSubject]?.[
            topic
          ] ?? []

        setSelectedSubtopics((current) =>
          current.filter(
            (subtopic) =>
              !removedSubtopics.includes(
                subtopic
              )
          )
        )

        return prev.filter(
          (t) => t !== topic
        )
      }

      return [...prev, topic]
    })
  }

  /*
    subtopic toggle
  */
  const toggleSubtopic = (
    subtopic: string
  ) => {
    setSelectedSubtopics((prev) =>
      prev.includes(subtopic)
        ? prev.filter(
            (s) => s !== subtopic
          )
        : [...prev, subtopic]
    )
  }

  /*
    derived session settings object
  */
  const sessionSettings: SessionSettings =
    useMemo(() => {
      return {
        subject: selectedSubject,

        topics:
          selectedTopics.length > 0
            ? selectedTopics
            : undefined,

        subtopics:
          selectedSubtopics.length > 0
            ? selectedSubtopics
            : undefined,

        questionCount:
          questionCount !== 25
            ? questionCount
            : undefined,

        maxAttempts:
          maxAttempts !== 3
            ? maxAttempts
            : undefined,

        timeLimit,

        new: true,
      }
    }, [
      selectedSubject,
      selectedTopics,
      selectedSubtopics,
      questionCount,
      maxAttempts,
      timeLimit,
    ])

  /*
    submit
  */
  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    if (!selectedSubject) {
      console.error(
        "Subject is required"
      )

      return
    }

    navigate("/dashboard/session/overview", {
      state: {
        sessionSettings,
      },
    })

    console.log(sessionSettings)

    /*
      future api call goes here
    */
  }

  return (
    <div className="min-h-full">
      <div className="h-full w-full my-auto flex align-center justify-center">
        <Card className="w-3xl">
          <CardHeader>
            <CardTitle>
              Session Settings
            </CardTitle>

            <CardDescription>
              Pick the settings for your
              session.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-6 w-full"
            >
              {/* QUESTION COUNT */}
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="questionCount"
                  className="text-muted-foreground text-sm"
                >
                  Question Count
                </Label>

                <Input
                  id="questionCount"
                  type="number"
                  min={1}
                  max={200}
                  className="rounded-lg"
                  value={questionCount}
                  onChange={(e) =>
                    setQuestionCount(
                      Number(
                        e.target.value
                      )
                    )
                  }
                />
              </div>

              {/* MAX ATTEMPTS */}
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="maxAttempts"
                  className="text-muted-foreground text-sm"
                >
                  Max Attempts
                </Label>

                <Input
                  id="maxAttempts"
                  type="number"
                  min={1}
                  max={20}
                  className="rounded-lg"
                  value={maxAttempts}
                  onChange={(e) =>
                    setMaxAttempts(
                      Number(
                        e.target.value
                      )
                    )
                  }
                />
              </div>

              {/* TIME LIMIT */}
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="timeLimit"
                  className="text-muted-foreground text-sm"
                >
                  Time Limit (optional)
                </Label>

                <Input
                  id="timeLimit"
                  type="number"
                  min={1}
                  className="rounded-lg"
                  placeholder="(minutes)"
                  value={timeLimit ?? ""}
                  onChange={(e) => {
                    if (
                      e.target.value === ""
                    ) {
                      setTimeLimit(null)

                      return
                    }

                    setTimeLimit(
                      Number(
                        e.target.value
                      )
                    )
                  }}
                />
              </div>

              {/* SELECTS */}
              <div className="grid grid-cols-3 gap-6 w-full">
                {/* SUBJECT */}
                <div className="flex flex-col gap-2">
                  <h1 className="text-muted-foreground text-sm">
                    Subject
                  </h1>

                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-lg font-medium"
                    onClick={() =>
                      setOpenSubject(
                        !openSubject
                      )
                    }
                  >
                    {
                      selectedSubject ||
                      "Select Subject"
                    }
                  </Button>

                  <CommandDialog
                    open={openSubject}
                    onOpenChange={
                      setOpenSubject
                    }
                    className="fixed top-1/2 left-1/2 -translate-1/2"
                  >
                    <Command className="min-w-xs rounded-lg border p-6 gap-2">
                      {
                        subjects.map(
                          (subject) => (
                            <Button
                              key={subject}
                              type="button"
                              variant="outline"
                              className="flex justify-between w-full rounded-lg"
                              onClick={() => {
                                setSelectedSubject(
                                  subject
                                )

                                /*
                                  reset dependent selections
                                */
                                setSelectedTopics(
                                  []
                                )

                                setSelectedSubtopics(
                                  []
                                )

                                setOpenSubject(
                                  false
                                )
                              }}
                            >
                              {subject}

                              {
                                selectedSubject ===
                                  subject && (
                                  <Check />
                                )
                              }
                            </Button>
                          )
                        )
                      }
                    </Command>
                  </CommandDialog>
                </div>

                {/* TOPICS */}
                <div className="flex flex-col gap-2">
                  <h1 className="text-muted-foreground text-sm">
                    Topics (optional)
                  </h1>

                  <Button
                    type="button"
                    variant="outline"
                    disabled={
                      !selectedSubject
                    }
                    className="rounded-lg font-medium"
                    onClick={() =>
                      setOpenTopics(
                        !openTopics
                      )
                    }
                  >
                    {
                      selectedTopics.length ===
                      0
                        ? "Select Topics"
                        : selectedTopics.length ===
                            1
                          ? `${selectedTopics[0]} selected`
                          : `${selectedTopics.length} topics selected`
                    }
                  </Button>

                  <CommandDialog
                    open={openTopics}
                    onOpenChange={
                      setOpenTopics
                    }
                    className="fixed top-1/2 left-1/2 -translate-1/2"
                  >
                    <Command className="min-w-xs rounded-lg border p-6 gap-2">
                      {
                        availableTopics.map(
                          (topic) => (
                            <Button
                              key={topic}
                              type="button"
                              variant="outline"
                              className="flex justify-between w-full rounded-lg"
                              onClick={() =>
                                toggleTopic(
                                  topic
                                )
                              }
                            >
                              {topic}

                              {
                                selectedTopics.includes(
                                  topic
                                ) && (
                                  <Check />
                                )
                              }
                            </Button>
                          )
                        )
                      }
                    </Command>
                  </CommandDialog>
                </div>

                {/* SUBTOPICS */}
                <div className="flex flex-col gap-2">
                  <h1 className="text-muted-foreground text-sm">
                    Subtopics
                    (optional)
                  </h1>

                  <Button
                    type="button"
                    variant="outline"
                    disabled={
                      selectedTopics.length ===
                      0
                    }
                    className="rounded-lg font-medium"
                    onClick={() =>
                      setOpenSubtopics(
                        !openSubtopics
                      )
                    }
                  >
                    {
                      selectedSubtopics.length ===
                      0
                        ? "Select Subtopics"
                        : selectedSubtopics.length ===
                            1
                          ? `${selectedSubtopics[0]} selected`
                          : `${selectedSubtopics.length} subtopics selected`
                    }
                  </Button>

                  <CommandDialog
                    open={openSubtopics}
                    onOpenChange={
                      setOpenSubtopics
                    }
                    className="fixed top-1/2 left-1/2 -translate-1/2"
                  >
                    <Command className="min-w-xs rounded-lg border p-6 gap-2">
                      {
                        availableSubtopics.map(
                          (
                            subtopic
                          ) => (
                            <Button
                              key={
                                subtopic
                              }
                              type="button"
                              variant="outline"
                              className="flex justify-between w-full rounded-lg"
                              onClick={() =>
                                toggleSubtopic(
                                  subtopic
                                )
                              }
                            >
                              {
                                subtopic
                              }

                              {
                                selectedSubtopics.includes(
                                  subtopic
                                ) && (
                                  <Check />
                                )
                              }
                            </Button>
                          )
                        )
                      }
                    </Command>
                  </CommandDialog>
                </div>
              </div>

              <Button type="submit" className="rounded-lg">
                Create Session
              </Button>

              {/* DEBUG */}
              <pre className="rounded-lg border p-4 text-xs overflow-auto">
                {JSON.stringify(
                  sessionSettings,
                  null,
                  2
                )}
              </pre>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default CreateSession