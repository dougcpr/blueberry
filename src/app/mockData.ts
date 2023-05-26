export type Question = {
  id: number,
  question: string,
  level: string,
  answer: string
}
export const roles = [
  {
    id: 1,
    role: "Software Developer",
    questions: [{
      id: 0,
      question: 'What is a variable?',
      level: 'Basic',
      answer: ''
    }]
  }
]
