import type { SessionSettings, QuestionEntity } from "../types/session"

const shuffleArray = <T>(array: T[]) => {
  const copy = [...array]

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(
      Math.random() * (i + 1)
    )

    ;[copy[i], copy[j]] = [
      copy[j],
      copy[i],
    ]
  }

  return copy
}

export const filterSessionQuestions = (
  questions: QuestionEntity[],
  settings: SessionSettings
) => {
  let filtered = questions.filter(
    (question) => {
      /*
        subject required
      */
      if (
        question.subject !== settings.subject
      ) {
        return false
      }

      /*
        optional topic filtering
      */
      if (
        settings.topics &&
        !settings.topics.includes(
          question.topic
        )
      ) {
        return false
      }

      /*
        optional subtopic filtering
      */
      if (
        settings.subtopics &&
        !settings.subtopics.includes(
          question.subtopic
        )
      ) {
        return false
      }

      return true
    }
  )

  filtered = shuffleArray(filtered)

  return filtered.slice(
    0,
    settings.questionCount ?? 25
  )
}