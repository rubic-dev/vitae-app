type QuestionEntity = {
  id: string
  questionText: string
  options: string[]
  correctAnswer: string

  subject: string
  topic: string
  subtopic: string
}

export type QuestionTree = Record<
  string,
  Record<string, string[]>
>

/*
  structure:

  {
    math: {
      calculus: [
        "limits",
        "derivatives"
      ]
    }
  }
*/

export const buildQuestionTree = (
  questions: QuestionEntity[]
): QuestionTree => {
  const tree: QuestionTree = {}

  questions.forEach((question) => {
    const {
      subject,
      topic,
      subtopic,
    } = question

    /*
      initialize subject
    */
    if (!tree[subject]) {
      tree[subject] = {}
    }

    /*
      initialize topic
    */
    if (!tree[subject][topic]) {
      tree[subject][topic] = []
    }

    /*
      avoid duplicate subtopics
    */
    if (
      !tree[subject][topic].includes(subtopic)
    ) {
      tree[subject][topic].push(subtopic)
    }
  })

  return tree
}