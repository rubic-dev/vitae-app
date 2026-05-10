# Backend Stubs Integration Plan

## [BACKEND STUBS]

### [STUB 1]
**Location:** frontend/src/api/tables/sessions.source.ts  
**Type:** Sessions table data source  
**Input shape:**  
```typescript
SessionEntityInput {
  id: string,
  session_name: string,
  subject: string,
  topics: string[],
  subtopics: string[],
  question_count: number,
  time_limit: number,
  max_attempts: number,
  status: string,
  created_at: string,
  review_date: string,
  last_reviewed: string
}
```

**Async:** true ✅  
**Mutation:** Already properly async via `getSessionRows()` function. However, fix: (1) Remove the `Math.floor(Math.random() * s.max_attempts)` randomization in mock path—this should come from backend as `current_attempts` field. (2) Endpoint is correct (`/api/sessions`). (3) Remove entire mock fallback once backend is live, or keep `USE_API` flag to toggle. The normalizeSession function is necessary for camelCase conversion, so keep it.

---

### [STUB 2]
**Location:** frontend/src/api/tables/questions.source.ts  
**Type:** Questions table data source  
**Input shape:**  
```typescript
QuestionEntityInput {
  id: string,
  question_text: string,
  options: string[],
  correct_answer: string,
  subject: string,
  topics: string[],
  subtopics: string[],
  created_at: string
}
```

**Async:** true (but API endpoint is wrong) ⚠️  
**Mutation:** (1) **CRITICAL**: Change endpoint from `/api/sessions` to `/api/questions` on line 50. (2) Mock fallback is already wrapped in `generateMockQuestions(50).map()` which is synchronous—keep it as-is since it's in the fallback path. (3) Remove the spread operator on `(s: QuestionEntityInput)` since backend returns array, not objects named `s`. The actual issue is the wrong endpoint, not the async nature. Once fixed, this will work correctly.

---

### [STUB 3]
**Location:** frontend/src/api/tables/attempts.source.ts  
**Type:** Question attempts table data source  
**Input shape:**  
```typescript
QuestionAttemptEntityInput {
  id: string,
  attempt_id: string,
  question_id: string,
  question_text: string,
  options: string[],
  correct_answer: string,
  user_answer: string,
  is_correct: boolean,
  time_taken: number,
  subject: string,
  topics: string[],
  subtopics: string[],
  attempted_at: string
}
```

**Async:** true (but API endpoint is wrong) ⚠️  
**Mutation:** (1) **CRITICAL**: Change endpoint from `/api/sessions` to `/api/attempts` (or `/api/question-attempts`) on line 69. (2) Same as STUB 2—mock path is fine as-is. (3) Type mapping looks correct. Once endpoint is fixed, no other mutations needed.

---

### [STUB 4]
**Location:** frontend/src/api/tables/session-attempts.source.ts  
**Type:** Session attempts grouped data source  
**Input shape:**  
```typescript
{
  sessionId: string  // parameter passed to getData()
}
```
**Output shape:**  
```typescript
SessionAttempt[] {
  id: string,
  index: number,
  questions: QuestionAttemptRow[]
}
```

**Async:** true (but no API implemented yet) ⚠️  
**Mutation:** (1) Add new endpoint `GET /api/sessions/{sessionId}/attempts` (or similar). (2) Currently returns mock data from `generateQuestionAttempts()` regardless of sessionId. (3) Add parameter passing: change function signature to accept `sessionId` from the caller. (4) Remove mock-only fallback once backend is ready. (5) Fluff to remove: The hardcoded split into 2 attempts on lines 40-41 is just for demo—backend should return the actual grouping.

---

### [STUB 5]
**Location:** frontend/src/components/pages/dashboard/Notes.tsx  
**Type:** Notes list display  
**Input shape:**  
```typescript
Note {
  id: string,
  title: string,
  fileUrl: string,
  createdAt: string,
  subject: string,
  topic?: string,
  tags: NoteTag[]  // { id, label, type: "subject" | "topic" }
}
```

**Async:** false (currently hardcoded) ❌  
**Mutation:** (1) Replace `const [notes] = useState<Note[]>(mockNotes)` with useEffect + useState + fetch call. (2) Add `useEffect` hook to call `GET /api/notes` on component mount. (3) Add loading and error states. (4) Remove the import of `mockNotes` entirely. (5) Remove the hardcoded `mockNotes` array from state—fetch from backend instead. (6) Fluff to remove: The hardcoded 3-note array in src/data/mockNotes.ts can be deleted once backend is live.

---

### [STUB 6]
**Location:** frontend/src/components/pages/dashboard/questions/UploadQuestions.tsx  
**Type:** Bulk upload questions form  
**Input shape:**  
```typescript
{
  questions: UploadedQuestion[] [
    {
      question_text: string,
      options: { a: string, b: string, c: string, d: string },
      correct_answer: string,
      subject: string,
      topic: string,
      subtopic: string
    }
  ]
}
```

**Async:** false (backend call is commented out) ❌  
**Mutation:** (1) **UNCOMMENT** the fetch call on lines 203-211. (2) Wrap it in try/catch and add error handling (currently none). (3) Add loading state during upload using `useState`. (4) Disable the submit button while loading. (5) Remove the early `navigate()` call on line 222—move it to the success path of the fetch response. (6) Add success confirmation feedback (toast or dialog) before navigation. (7) Fluff to remove: The `console.log("UPLOAD PAYLOAD:", payload)` on line 200 is debug-only—remove in production. (8) The `MOCK_STRUCTURE` constant can stay for docs, or remove if backend docs exist.

---

### [STUB 7]
**Location:** frontend/src/components/pages/dashboard/notes/UploadNotes.tsx  
**Type:** Bulk upload notes (PDF) form  
**Input shape:**  
```typescript
FormData {
  files: File[] (PDFs or ZIP archives containing PDFs),
  subject_id: string,
  topic_id: string,
  [for each file]:
    title: string
}
```

**Async:** false (no backend implementation) ❌  
**Mutation:** (1) After file processing (ZIP extraction, PDF parsing), add `POST /api/notes/bulk` endpoint call. (2) Use FormData to send files + metadata. (3) Add loading state during upload. (4) Currently the component only manages local state (subjects, topics)—these should come from backend via `GET /api/subjects` and `GET /api/topics`. (5) Replace hardcoded `initialSubjects` and `initialTopics` with fetched data. (6) Add success/error handling and callbacks. (7) Fluff to remove: The local `useState` for `subjects` and `topics` (lines 86-142)—fetch from backend instead. (8) The `currentTopic.map()` and `currentSubject.map()` filtering logic is valid UI state—keep it.

---

### [STUB 8]
**Location:** frontend/src/components/pages/dashboard/analytics/IncorrectQuestionsChart.tsx  
**Type:** Donut chart - incorrect questions by subject  
**Input shape:**  
```typescript
{
  subject: string,
  value: number
}[]
```

**Async:** false (hardcoded) ❌  
**Mutation:** (1) Replace the hardcoded `data` array with state + useEffect. (2) Fetch from `GET /api/analytics/incorrect-questions` on component mount. (3) Add loading skeleton/spinner state. (4) Add error boundary in case API fails. (5) Fluff to remove: Lines 31-37 (the entire hardcoded data array). The capitalize function and buildChartConfig are valid utilities—keep them. (6) The COLORS array is UI config—keep it. (7) Remove the `console.log(data)` and `console.log(chartConfig)` debug statements on lines 98-99.

---

### [STUB 9]
**Location:** frontend/src/components/pages/dashboard/analytics/OverdueSessionsChart.tsx  
**Type:** Bar/Line chart - overdue sessions by subject  
**Input shape:**  
```typescript
{
  subject: string,
  overdue: number
}[]
```

**Async:** false (hardcoded) ❌  
**Mutation:** Same as STUB 8: (1) Replace hardcoded data with fetch from `GET /api/analytics/overdue-sessions`. (2) Add state + useEffect. (3) Add loading/error states. (4) Remove debug code. (5) Keep chart config and utilities.

---

### [STUB 10]
**Location:** frontend/src/components/pages/dashboard/analytics/SessionDurationChart.tsx  
**Type:** Line chart - session duration by month  
**Input shape:**  
```typescript
{
  subject: string,  // actually month name
  duration: number  // in minutes or seconds
}[]
```

**Async:** false (hardcoded) ❌  
**Mutation:** Same as STUBS 8-9: (1) Replace hardcoded data with fetch from `GET /api/analytics/session-duration`. (2) Add state + useEffect. (3) Add loading/error states. (4) Keep utilities.

---

### [STUB 11]
**Location:** frontend/src/components/pages/dashboard/analytics/SessionsFrequencyChart.tsx  
**Type:** Area chart - sessions frequency by subject and week  
**Input shape:**  
```typescript
{
  subject: string,
  value: number,     // session count
  week: number       // week number (1-4)
}[]
```

**Async:** false (hardcoded) ❌  
**Mutation:** Same as STUBS 8-10: (1) Replace the hardcoded `rawData` array (lines 14-44) with fetch from `GET /api/analytics/sessions-frequency`. (2) Add state + useEffect. (3) Add loading/error states. (4) Keep transform logic that converts `rawData` into chart format (the `chartData` variable on lines 46+). (5) Remove debug code if any.

---

## Summary Table

| Stub | Location | Type | Status | Complexity |
|------|----------|------|--------|------------|
| 1 | sessions.source.ts | Table data | Async ✅ | Remove randomization |
| 2 | questions.source.ts | Table data | Async (wrong endpoint) ⚠️ | Fix endpoint `/api/questions` |
| 3 | attempts.source.ts | Table data | Async (wrong endpoint) ⚠️ | Fix endpoint `/api/attempts` |
| 4 | session-attempts.source.ts | Table data | Async (no API) ⚠️ | Add new endpoint |
| 5 | Notes.tsx | Notes list | Sync ❌ | Add fetch + state |
| 6 | UploadQuestions.tsx | Form submit | Sync ❌ | Uncomment + error handling |
| 7 | UploadNotes.tsx | Form submit | Sync ❌ | Add fetch + FormData |
| 8 | IncorrectQuestionsChart.tsx | Chart data | Sync ❌ | Add fetch + state |
| 9 | OverdueSessionsChart.tsx | Chart data | Sync ❌ | Add fetch + state |
| 10 | SessionDurationChart.tsx | Chart data | Sync ❌ | Add fetch + state |
| 11 | SessionsFrequencyChart.tsx | Chart data | Sync ❌ | Add fetch + state |

---

## Critical Issues to Fix First

1. **STUB 2 & 3**: Wrong API endpoints—change `/api/sessions` to `/api/questions` and `/api/attempts`
2. **STUB 6**: Uncomment the backend call in UploadQuestions
3. All chart stubs (8-11): Replace hardcoded data with fetch calls—these are the highest-impact for user experience
