import { useState, useCallback } from "react"

import { useNavigate } from "react-router-dom"

import {
  FileText,
  Trash2,
  Check,
  Upload,
} from "lucide-react"

import { useDropzone } from "react-dropzone"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../ui/card"

import { Button } from "../../../ui/button"

type Options = {
  a: string
  b: string
  c: string
  d: string
}

type UploadedQuestion = {
  question_text: string
  options: Options
  correct_answer: string
  subject: string
  topic: string
  subtopic: string
}

const MOCK_STRUCTURE = `[
  {
    "question_text": "What is the capital of France?",
    "options": {
      "a": "Berlin",
      "b": "Madrid",
      "c": "Paris",
      "d": "Rome"
    },
    "correct_answer": "c",
    "subject": "geography",
    "topic": "europe",
    "subtopic": "capital-cities"
  }
]`

const UploadQuestions = () => {
  const navigate = useNavigate()

  const [file, setFile] =
    useState<File | null>(null)

  const [questions, setQuestions] =
    useState<UploadedQuestion[]>(
      []
    )

  const [error, setError] =
    useState<string | null>(null)

  /*
    parse uploaded json file

    the eternal struggle between
    structured data and humans.
  */
  const parseFile = async (
    file: File
  ) => {
    try {
      const text =
        await file.text()

      const json =
        JSON.parse(text)

      if (!Array.isArray(json)) {
        throw new Error(
          "JSON must be an array"
        )
      }

      setQuestions(json)

      setError(null)
    } catch (err) {
      console.error(err)

      setQuestions([])

      setError(
        "Invalid JSON format"
      )
    }
  }

  /*
    handle uploaded file
  */
  const handleFile =
    useCallback(
      (file: File) => {
        setFile(file)

        parseFile(file)
      },
      []
    )

  /*
    dropzone
  */
  const onDrop = useCallback(
    (
      acceptedFiles: File[]
    ) => {
      const uploadedFile =
        acceptedFiles[0]

      if (!uploadedFile) {
        return
      }

      handleFile(uploadedFile)
    },
    [handleFile]
  )

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,

    accept: {
      "application/json": [
        ".json",
      ],
    },

    multiple: false,
  })

  /*
    clear uploaded file
  */
  const clearFile = () => {
    setFile(null)

    setQuestions([])

    setError(null)
  }

  /*
    submit payload
  */
  const onSubmit = async () => {
    if (!questions.length) {
      return
    }

    const payload = {
      questions:
        questions.map((q) => ({
          question_text:
            q.question_text,

          options:
            q.options,

          correct_answer:
            q.correct_answer,

          subject:
            q.subject,

          topic:
            q.topic,

          subtopic:
            q.subtopic,
        })),
    }

    console.log(
      "UPLOAD PAYLOAD:",
      payload
    )

    /*
      future backend call

      await fetch("/api/questions/bulk", {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(payload),
      })

      one request.
      many inserts.
      civilization advances.
    */

    navigate(
      "/dashboard/questions"
    )
  }

  return (
    <div className="min-h-full flex items-center justify-center p-6">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>
            Upload Questions
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-6">
          {/* DROPZONE */}
          <div
            {...getRootProps()}
            className={`
              rounded-xl
              border-2
              border-dashed
              transition-colors
              cursor-pointer
              p-10
              flex
              flex-col
              items-center
              justify-center
              gap-4
              text-center
              ${
                isDragActive
                  ? "border-primary bg-muted"
                  : "border-muted-foreground/25"
              }
            `}
          >
            <input
              {...getInputProps()}
            />

            <div className="rounded-full border p-4">
              <Upload className="size-6" />
            </div>

            <div className="space-y-1">
              <p className="font-medium">
                Drop your JSON file
                here
              </p>

              <p className="text-sm text-muted-foreground">
                or click to browse
              </p>
            </div>
          </div>

          {/* JSON STRUCTURE */}
          <div className="flex flex-col gap-2">
            <div className="text-sm font-medium">
              Expected JSON Structure
            </div>

            <pre className="rounded-lg border bg-muted/40 p-4 text-xs overflow-auto">
              {MOCK_STRUCTURE}
            </pre>
          </div>

          {/* FILE INFO */}
          {file && (
            <div className="flex items-center justify-between border rounded-lg p-3">
              <div className="flex items-center gap-2">
                <FileText />

                <span className="text-sm">
                  {file.name}
                </span>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={clearFile}
              >
                <Trash2 />
              </Button>
            </div>
          )}

          {/* ERROR */}
          {error && (
            <p className="text-destructive text-sm">
              {error}
            </p>
          )}

          {/* PREVIEW */}
          {questions.length >
            0 && (
            <div className="flex flex-col gap-2">
              <div className="text-sm font-medium">
                Parsed Questions
              </div>

              <div className="max-h-[300px] overflow-auto border rounded-lg p-3 text-xs">
                <pre>
                  {JSON.stringify(
                    questions.slice(
                      0,
                      5
                    ),
                    null,
                    2
                  )}
                </pre>

                {questions.length >
                  5 && (
                  <p className="text-muted-foreground mt-2">
                    +
                    {questions.length -
                      5}{" "}
                    more questions
                  </p>
                )}
              </div>
            </div>
          )}

          {/* ACTIONS */}
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={clearFile}
              disabled={!file}
            >
              Clear
            </Button>

            <Button
              onClick={onSubmit}
              disabled={
                !questions.length
              }
            >
              <Check />
              Upload Questions
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default UploadQuestions