type QuestionEntity = {
  id: string
  questionText: string
  options: string[]
  correctAnswer: string

  subject: string
  topic: string
  subtopic: string
}

const subjects = {
  math: {
    calculus: [
      "limits",
      "derivatives",
      "integration",
    ],

    algebra: [
      "quadratics",
      "polynomials",
    ],
  },

  phy: {
    mechanics: [
      "kinematics",
      "forces",
    ],

    optics: [
      "reflection",
      "refraction",
    ],
  },

  chem: {
    organic: [
      "hydrocarbons",
      "alkanes",
    ],

    electrochemistry: [
      "electrolysis",
      "cells",
    ],
  },

  bio: {
    anatomy: [
      "heart",
      "brain",
    ],

    microbiology: [
      "bacteria",
      "viruses",
    ],
  },
}

const generateMockQuestions = () => {
  const questions: QuestionEntity[] = []

  let id = 1

  Object.entries(subjects).forEach(
    ([subject, topics]) => {
      Object.entries(topics).forEach(
        ([topic, subtopics]) => {
          subtopics.forEach((subtopic) => {
            /*
              3 questions per subtopic
            */
            for (let i = 1; i <= 3; i++) {
              questions.push({
                id: crypto.randomUUID(),

                questionText:
                  `Question ${id} about ${subtopic}`,

                options: [
                  "Option A",
                  "Option B",
                  "Option C",
                  "Option D",
                ],

                correctAnswer: "Option A",

                subject,
                topic,
                subtopic,
              })

              id++
            }
          })
        }
      )
    }
  )

  return questions
}

export default generateMockQuestions