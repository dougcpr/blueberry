'use client';
import 'regenerator-runtime/runtime'
import React, {useEffect, useState} from "react";
import InterviewOptions from "@/app/components/interview/interviewOptions";
import InterviewCard from "@/app/components/interview/interviewCard";
import styled from "styled-components";


const Main = styled.main`
  display: grid;
  grid-row-gap: 1rem;
  grid-template-rows: 1fr calc(100vh - 7rem) 3rem;
`

function Home() {
  const [loading, setLoading] = useState(false)
  const [interviewQuestion, setInterviewQuestion] = useState(undefined)

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
      <InterviewOptions setInterviewQuestion={setInterviewQuestion}/>
      <InterviewCard interviewQuestion={interviewQuestion}/>
    </Main>
  )
}

export default Home