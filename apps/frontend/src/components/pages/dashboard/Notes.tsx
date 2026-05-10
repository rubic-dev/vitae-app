import { useState } from "react"

import {
  ExternalLink,
  FileText,
} from "lucide-react"

import { motion } from "motion/react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "../../ui/dialog"

import { Button } from "../../ui/button"

import { Badge } from "../../ui/badge"

import { mockNotes } from "../../../data/mockNotes"

import type { Note } from "../../../types/notes"

function NotesPage() {
  const [notes] =
    useState<Note[]>(mockNotes)

  const [
    selectedNote,
    setSelectedNote,
  ] = useState<Note | null>(null)

  return (
    <div className="w-full h-full">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">
          Notes
        </h1>

        <Button
          className="rounded-xl"
          onClick={() =>
            window.location.assign(
              "/dashboard/notes/upload"
            )
          }
        >
          <FileText />
          Upload Notes
        </Button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {notes.map((note) => (
          <motion.div
            key={note.id}
            className="group cursor-pointer"
            whileHover={{
              scale: 1.03,
            }}
            transition={{
              duration: 0.2,
            }}
            onClick={() =>
              setSelectedNote(note)
            }
          >
            <div className="relative aspect-video rounded-xl border bg-background flex items-center justify-center overflow-hidden">
              <FileText
                size={48}
                className="opacity-70"
              />

              {/* HOVER OVERLAY */}
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition p-3 flex flex-col justify-end text-white text-xs">
                <div className="flex gap-2 flex-wrap">
                  {note.tags.map(
                    (tag) => (
                      <Badge
                        key={tag.id}
                        className="rounded-md"
                      >
                        {tag.label}
                      </Badge>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="mt-2 text-sm font-medium truncate">
              {note.title}
            </div>
          </motion.div>
        ))}
      </div>

      {/* VIEW PDF DIALOG */}
      <Dialog
        open={!!selectedNote}
        onOpenChange={() =>
          setSelectedNote(null)
        }
      >
        <DialogContent className="max-w-5xl w-full h-[85vh] flex flex-col p-4 overflow-hidden gap-4">
          <DialogHeader className="flex flex-row justify-between items-center border-b pb-2">
            <div className="font-medium">
              {selectedNote?.title}
            </div>

            {selectedNote && (
              <Button
                size="icon"
                variant="outline"
                onClick={() =>
                  window.open(
                    selectedNote.fileUrl,
                    "_blank"
                  )
                }
              >
                <ExternalLink
                  size={18}
                />
              </Button>
            )}
          </DialogHeader>

          <div className="flex-1">
            {selectedNote && (
              <iframe
                src={
                  selectedNote.fileUrl
                }
                className="w-full h-full"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default NotesPage