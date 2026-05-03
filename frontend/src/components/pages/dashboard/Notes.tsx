import { useMemo, useState } from "react";
import { FileText, ExternalLink, ChevronDown } from "lucide-react";
import { motion } from "motion/react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "../../ui/dialog";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Badge } from "../../ui/badge";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../../ui/command";

import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";

import { mockNotes } from "../../../data/mockNotes";
import type { Note } from "../../../types/notes";

/**
 * -------------------------
 * TAG SYSTEM (frontend-only)
 * -------------------------
 */

const SUBJECTS = [
  "Biology",
  "Physics",
  "Chemistry",
  "Mathematics",
];

const TOPICS: Record<string, string[]> = {
  Biology: ["Cells", "Genetics", "Evolution", "Ecology"],
  Physics: ["Forces", "Waves", "Electricity", "Mechanics"],
  Chemistry: ["Reactions", "Organic", "Bonding", "Stoichiometry"],
  Mathematics: ["Algebra", "Calculus", "Statistics"],
};

type UploadState = {
  title: string;
  subject: string | null;
  topics: string[];
  file: File | null;
};

function Dropzone({
  file,
  onFile,
}: {
  file: File | null;
  onFile: (file: File | null) => void;
}) {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();

    const dropped = e.dataTransfer.files?.[0];
    if (!dropped) return;

    if (dropped.type !== "application/pdf") return;

    onFile(dropped);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={() => document.getElementById("pdf-upload")?.click()}
      className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:bg-muted transition"
    >
      <input
        id="pdf-upload"
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
        }}
      />

      {!file ? (
        <div className="text-sm text-muted-foreground">
          Drag & drop a PDF here or click to upload
        </div>
      ) : (
        <div className="text-sm font-medium">
          📄 {file.name}
        </div>
      )}
    </div>
  );
}

function NotesPage() {
  const [notes] = useState<Note[]>(mockNotes);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const [uploadOpen, setUploadOpen] = useState(false);

  const [upload, setUpload] = useState<UploadState>({
    title: "",
    subject: null,
    topics: [],
    file: null,
  });

  const availableTopics = useMemo(() => {
    if (!upload.subject) return [];
    return TOPICS[upload.subject] ?? [];
  }, [upload.subject]);

  const toggleTopic = (topic: string) => {
    setUpload((prev) => {
      const exists = prev.topics.includes(topic);

      return {
        ...prev,
        topics: exists
          ? prev.topics.filter((t) => t !== topic)
          : [...prev.topics, topic],
      };
    });
  };

  const onFileSelect = (file: File | null) => {
    setUpload((p) => ({
      ...p,
      file,
    }));
  };

  const resetUpload = () => {
    setUpload({
      title: "",
      subject: null,
      topics: [],
      file: null,
    });
  };

  return (
    <div className="w-full h-full p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Notes</h1>

        <Button
          className="rounded-xl"
          onClick={() => setUploadOpen(true)}
        >
          <FileText />
          Upload PDF
        </Button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {notes.map((note) => (
          <motion.div
            key={note.id}
            className="group cursor-pointer"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedNote(note)}
          >
            <div className="relative aspect-video rounded-xl border bg-background flex items-center justify-center overflow-hidden">
              <FileText size={48} className="opacity-70" />

              {/* hover overlay (no badges, just text) */}
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition p-3 flex flex-col justify-end text-white text-xs">
                <div className="flex gap-2">
                  {note.tags.map((t) => (
                    <Badge
                      key={t.id}
                      className="rounded-md"
                    >
                      {t.label}
                    </Badge>
                  ))}
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
      <Dialog open={!!selectedNote} onOpenChange={() => setSelectedNote(null)}>
        <DialogContent className="max-w-5xl w-full h-[85vh] flex flex-col p-4 overflow-hidden gap-4">

          <DialogHeader className="flex flex-row justify-between items-center border-b pb-2">
            <div className="font-medium">
              {selectedNote?.title}
            </div>

            {selectedNote && (
              <Button
                size="icon"
                variant="outline"
                onClick={() => window.open(selectedNote.fileUrl, "_blank")}
              >
                <ExternalLink size={18} />
              </Button>
            )}
          </DialogHeader>

          <div className="flex-1">
            {selectedNote && (
              <iframe
                src={selectedNote.fileUrl}
                className="w-full h-full"
              />
            )}
          </div>

        </DialogContent>
      </Dialog>

      {/* UPLOAD DIALOG */}
      <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
        <DialogContent className="max-w-2xl w-full p-6 space-y-1">

          <h2 className="text-lg font-semibold">Upload PDF</h2>

          <Dropzone file={upload.file} onFile={onFileSelect} />

          {/* TITLE */}
          <Input
            placeholder="Title"
            className="w-full flex justify-between items-center border rounded-md px-3 py-2"
            value={upload.title}
            onChange={(e) =>
              setUpload((p) => ({ ...p, title: e.target.value }))
            }
          />

          {/* SUBJECT DROPDOWN */}
          <Popover>
            <PopoverTrigger>
              <div
                className="w-full flex justify-between items-center border rounded-md px-3 py-2"
              >
                {upload.subject ?? "Select subject"}
                <ChevronDown size={16} />
              </div>
            </PopoverTrigger>

            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search subjects..." />
                <CommandEmpty>No subject found</CommandEmpty>

                <CommandGroup>
                  {SUBJECTS.map((subj) => (
                    <CommandItem
                      key={subj}
                      onSelect={() => {
                        setUpload((p) => ({
                          ...p,
                          subject: subj,
                          topics: [],
                        }));
                      }}
                    >
                      {subj}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          {/* TOPICS DROPDOWN (ONLY AFTER SUBJECT) */}
          {upload.subject && (
            <Popover>
              <PopoverTrigger>
                <div
                  className="w-full flex justify-between items-center border rounded-md px-3 py-2"
                >
                  {upload.topics.length
                    ? `${upload.topics.length} topics selected`
                    : "Select topics (optional)"}
                  <ChevronDown size={16} />
                </div>
              </PopoverTrigger>

              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search topics..." />
                  <CommandEmpty>No topics found</CommandEmpty>

                  <CommandGroup>
                    {availableTopics.map((topic) => {
                      const selected = upload.topics.includes(topic);

                      return (
                        <CommandItem
                          key={topic}
                          onSelect={() => toggleTopic(topic)}
                        >
                          <div className="flex justify-between w-full">
                            <span>{topic}</span>
                            {selected ? "✓" : ""}
                          </div>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          )}

          {/* ACTIONS */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => {
                resetUpload();
                setUploadOpen(false);
              }}
            >
              Cancel
            </Button>

            <Button
              onClick={() => {
                console.log("UPLOAD PAYLOAD:", upload);
                resetUpload();
                setUploadOpen(false);
              }}
            >
              Upload
            </Button>
          </div>

        </DialogContent>
      </Dialog>

    </div>
  );
}

export default NotesPage;