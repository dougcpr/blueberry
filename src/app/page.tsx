'use client';
import 'regenerator-runtime/runtime'
import React, {useEffect, useState} from "react";
import InterviewOptions from "@/app/components/interview/interviewOptions";
import InterviewCard from "@/app/components/interview/interviewCard";
import styled from "styled-components";
import FeedbackCard from "@/app/components/feedback/feedbackCard";


const Main = styled.main`
  padding: 1rem;
  display: grid;
  grid-row-gap: 1rem;
  margin: 0 auto;
  width: 30rem;
  @media (max-width: 500px) {
    padding: 0;
    width: auto;
  }
`

function Home() {
  const [loading, setLoading] = useState(false)
  const [role, setRole] = useState<string>("");
  const [interviewQuestion, setInterviewQuestion] = useState(undefined)
  const [conversation, setConversation] = useState([]);
  const [feedback, setFeedback] = useState<string>('')

  useEffect(() => {
    setLoading(true)
  }, [])

  if (!loading) {
    return (
      <main></main>
    )
  }

  return (
    <Main>
      <InterviewOptions
        role={role}
        setRole={setRole}
        conversation={conversation}
        setConversation={setConversation}
        setInterviewQuestion={setInterviewQuestion}/>
      <InterviewCard
        conversation={conversation}
        setConversation={setConversation}
        setFeedback={setFeedback}
        interviewQuestion={interviewQuestion}
        role={role}/>
      <FeedbackCard
        feedback={feedback} />
    </Main>
  )
}

export default Home