import { useMemo, useState } from "react"

import JSZip from "jszip"

import {
  ChevronDown,
  FileArchive,
  FileText,
  Plus,
  Upload,
  X,
} from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../ui/accordion"

import { Badge } from "../../../ui/badge"

import { Button } from "../../../ui/button"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../ui/card"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../ui/dialog"

import { Input } from "../../../ui/input"

import { Label } from "../../../ui/label"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../ui/popover"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../../../ui/command"

type Subject = {
  id: string
  name: string
}

type Topic = {
  id: string
  subject_id: string
  name: string
}

type UploadNoteFile = {
  id: string
  file: File
  title: string
  subjectId: string | null
  topicId: string | null
}

const initialSubjects: Subject[] = [
  {
    id: "subject-1",
    name: "Physics",
  },
  {
    id: "subject-2",
    name: "Biology",
  },
]

const initialTopics: Topic[] = [
  {
    id: "topic-1",
    subject_id: "subject-1",
    name: "Mechanics",
  },
  {
    id: "topic-2",
    subject_id: "subject-1",
    name: "Electricity",
  },
  {
    id: "topic-3",
    subject_id: "subject-2",
    name: "Genetics",
  },
]

function UploadNotes() {
  const [files, setFiles] = useState<
    UploadNoteFile[]
  >([])

  const [subjects, setSubjects] =
    useState(initialSubjects)

  const [topics, setTopics] =
    useState(initialTopics)

  const [newSubjects, setNewSubjects] =
    useState<Subject[]>([])

  const [newTopics, setNewTopics] =
    useState<Topic[]>([])

  const [
    createSubjectOpen,
    setCreateSubjectOpen,
  ] = useState(false)

  const [
    createTopicOpen,
    setCreateTopicOpen,
  ] = useState(false)

  const [subjectName, setSubjectName] =
    useState("")

  const [topicName, setTopicName] =
    useState("")

  const [
    selectedSubjectForTopic,
    setSelectedSubjectForTopic,
  ] = useState("")

  const resetDialogs = () => {
    setSubjectName("")
    setTopicName("")
    setSelectedSubjectForTopic("")
  }

  const handleFiles = async (
    incoming: FileList | File[]
  ) => {
    const collected: UploadNoteFile[] =
      []

    for (const file of Array.from(
      incoming
    )) {
      if (
        file.type ===
        "application/pdf"
      ) {
        collected.push({
          id: crypto.randomUUID(),
          file,
          title: file.name.replace(
            /\.pdf$/i,
            ""
          ),
          subjectId: null,
          topicId: null,
        })

        continue
      }

      const isZip =
        file.type ===
          "application/zip" ||
        file.name.endsWith(".zip")

      if (isZip) {
        const zip =
          await JSZip.loadAsync(file)

        const entries = Object.values(
          zip.files
        )

        for (const entry of entries) {
          const isPdf =
            !entry.dir &&
            entry.name.endsWith(".pdf")

          if (!isPdf) continue

          const blob =
            await entry.async("blob")

          const extractedPdf =
            new File(
              [blob],
              entry.name.split("/").pop() ??
                "document.pdf",
              {
                type: "application/pdf",
              }
            )

          collected.push({
            id: crypto.randomUUID(),
            file: extractedPdf,
            title:
              extractedPdf.name.replace(
                /\.pdf$/i,
                ""
              ),
            subjectId: null,
            topicId: null,
          })
        }
      }
    }

    setFiles((prev) => [
      ...prev,
      ...collected,
    ])
  }

  const updateFile = (
    id: string,
    updates: Partial<UploadNoteFile>
  ) => {
    setFiles((prev) =>
      prev.map((file) =>
        file.id === id
          ? {
              ...file,
              ...updates,
            }
          : file
      )
    )
  }

  const removeFile = (id: string) => {
    setFiles((prev) =>
      prev.filter(
        (file) => file.id !== id
      )
    )
  }

  const createSubject = () => {
    if (!subjectName.trim()) return

    const subject: Subject = {
      id: crypto.randomUUID(),
      name: subjectName.trim(),
    }

    setSubjects((prev) => [
      ...prev,
      subject,
    ])

    setNewSubjects((prev) => [
      ...prev,
      subject,
    ])

    resetDialogs()
    setCreateSubjectOpen(false)
  }

  const createTopic = () => {
    if (
      !topicName.trim() ||
      !selectedSubjectForTopic
    ) {
      return
    }

    const topic: Topic = {
      id: crypto.randomUUID(),
      name: topicName.trim(),
      subject_id:
        selectedSubjectForTopic,
    }

    setTopics((prev) => [
      ...prev,
      topic,
    ])

    setNewTopics((prev) => [
      ...prev,
      topic,
    ])

    resetDialogs()
    setCreateTopicOpen(false)
  }

  const payload = useMemo(() => {
    return {
      notes: files.map((file) => ({
        title: file.title,
        subject_id:
          file.subjectId,
        topic_id: file.topicId,
        file_name: file.file.name,
      })),

      newSubjects:
        newSubjects.map(
          (subject) => ({
            name: subject.name,
          })
        ),

      newTopics: newTopics.map(
        (topic) => {
          const subject =
            subjects.find(
              (s) =>
                s.id ===
                topic.subject_id
            )

          return {
            name: topic.name,
            subject:
              subject?.name ?? "",
          }
        }
      ),
    }
  }, [
    files,
    newSubjects,
    newTopics,
    subjects,
  ])

  return (
    <div className="w-full h-full p-6">
      <Card className="max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle>
            Upload Notes
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-6">
          {/* DROPZONE */}
          <div
            onDrop={async (e) => {
              e.preventDefault()

              await handleFiles(
                e.dataTransfer.files
              )
            }}
            onDragOver={(e) =>
              e.preventDefault()
            }
            onClick={() =>
              document
                .getElementById(
                  "note-upload"
                )
                ?.click()
            }
            className="border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted transition"
          >
            <input
              id="note-upload"
              type="file"
              multiple
              accept=".pdf,.zip"
              className="hidden"
              onChange={async (e) => {
                if (!e.target.files)
                  return

                await handleFiles(
                  e.target.files
                )
              }}
            />

            <Upload className="mb-3" />

            <div className="text-sm text-muted-foreground">
              Upload PDFs or ZIPs
              containing PDFs
            </div>
          </div>

          {/* FILES */}
          {files.length > 0 && (
            <Accordion
              className="w-full"
            >
              {files.map((file) => {
                const availableTopics =
                  topics.filter(
                    (topic) =>
                      topic.subject_id ===
                      file.subjectId
                  )

                return (
                  <AccordionItem
                    key={file.id}
                    value={file.id}
                  >
                    <AccordionTrigger>
                      <div className="flex items-center gap-3">
                        {file.file.name.endsWith(
                          ".zip"
                        ) ? (
                          <FileArchive />
                        ) : (
                          <FileText />
                        )}

                        <span>
                          {
                            file.file.name
                          }
                        </span>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="flex flex-col gap-4 pt-4">
                      {/* TITLE */}
                      <div className="flex flex-col gap-2">
                        <Label>
                          Display Name
                        </Label>

                        <Input
                          value={file.title}
                          onChange={(
                            e
                          ) =>
                            updateFile(
                              file.id,
                              {
                                title:
                                  e.target
                                    .value,
                              }
                            )
                          }
                        />
                      </div>

                      {/* SUBJECT */}
                      <div className="flex flex-col gap-2">
                        <Label>
                          Subject
                        </Label>

                        <div className="flex gap-2">
                          <Select
                            value={
                              file.subjectId ??
                              ""
                            }
                            onValueChange={(
                              value
                            ) =>
                              updateFile(
                                file.id,
                                {
                                  subjectId:
                                    value,
                                  topicId:
                                    null,
                                }
                              )
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select subject" />
                            </SelectTrigger>

                            <SelectContent>
                              {subjects.map(
                                (
                                  subject
                                ) => (
                                  <SelectItem
                                    key={
                                      subject.id
                                    }
                                    value={
                                      subject.id
                                    }
                                  >
                                    {
                                      subject.name
                                    }
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>

                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() =>
                              setCreateSubjectOpen(
                                true
                              )
                            }
                          >
                            <Plus />
                          </Button>
                        </div>
                      </div>

                      {/* TOPIC */}
                      <div className="flex flex-col gap-2">
                        <Label>
                          Topic
                        </Label>

                        <div className="flex gap-2">
                          <Select
                            disabled={
                              !file.subjectId
                            }
                            value={
                              file.topicId ??
                              ""
                            }
                            onValueChange={(
                              value
                            ) =>
                              updateFile(
                                file.id,
                                {
                                  topicId:
                                    value,
                                }
                              )
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select topic" />
                            </SelectTrigger>

                            <SelectContent>
                              {availableTopics.map(
                                (
                                  topic
                                ) => (
                                  <SelectItem
                                    key={
                                      topic.id
                                    }
                                    value={
                                      topic.id
                                    }
                                  >
                                    {
                                      topic.name
                                    }
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>

                          <Button
                            size="icon"
                            variant="outline"
                            disabled={
                              !file.subjectId
                            }
                            onClick={() =>
                              setCreateTopicOpen(
                                true
                              )
                            }
                          >
                            <Plus />
                          </Button>
                        </div>
                      </div>

                      {/* BADGES */}
                      <div className="flex flex-wrap gap-2">
                        {file.subjectId && (
                          <Badge>
                            {
                              subjects.find(
                                (
                                  s
                                ) =>
                                  s.id ===
                                  file.subjectId
                              )?.name
                            }
                          </Badge>
                        )}

                        {file.topicId && (
                          <Badge variant="secondary">
                            {
                              topics.find(
                                (
                                  t
                                ) =>
                                  t.id ===
                                  file.topicId
                              )?.name
                            }
                          </Badge>
                        )}
                      </div>

                      {/* REMOVE */}
                      <div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() =>
                            removeFile(
                              file.id
                            )
                          }
                        >
                          <X />
                          Remove
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          )}

          {/* PAYLOAD PREVIEW */}
          <pre className="rounded-lg border p-4 text-xs overflow-auto">
            {JSON.stringify(
              payload,
              null,
              2
            )}
          </pre>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3">
            <Button variant="outline">
              Cancel
            </Button>

            <Button
              disabled={!files.length}
              onClick={() => {
                console.log(
                  "UPLOAD PAYLOAD",
                  payload
                )
              }}
            >
              Upload Notes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* CREATE SUBJECT */}
      <Dialog
        open={createSubjectOpen}
        onOpenChange={
          setCreateSubjectOpen
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Create Subject
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <Input
              placeholder="Subject name"
              value={subjectName}
              onChange={(e) =>
                setSubjectName(
                  e.target.value
                )
              }
            />

            <Button
              onClick={createSubject}
            >
              Create Subject
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* CREATE TOPIC */}
      <Dialog
        open={createTopicOpen}
        onOpenChange={
          setCreateTopicOpen
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Create Topic
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <Popover>
              <PopoverTrigger>
                <Button variant="outline">
                  {selectedSubjectForTopic
                    ? subjects.find(
                        (s) =>
                          s.id ===
                          selectedSubjectForTopic
                      )?.name
                    : "Select subject"}

                  <ChevronDown />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="p-0">
                <Command>
                  <CommandInput placeholder="Search subject..." />

                  <CommandEmpty>
                    No subject found
                  </CommandEmpty>

                  <CommandGroup>
                    {subjects.map(
                      (
                        subject
                      ) => (
                        <CommandItem
                          key={
                            subject.id
                          }
                          onSelect={() =>
                            setSelectedSubjectForTopic(
                              subject.id
                            )
                          }
                        >
                          {
                            subject.name
                          }
                        </CommandItem>
                      )
                    )}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>

            <Input
              placeholder="Topic name"
              value={topicName}
              onChange={(e) =>
                setTopicName(
                  e.target.value
                )
              }
            />

            <Button
              disabled={
                !selectedSubjectForTopic
              }
              onClick={createTopic}
            >
              Create Topic
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default UploadNotes