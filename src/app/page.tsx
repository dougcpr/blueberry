'use client';
import 'regenerator-runtime/runtime'
import React, {useEffect, useState} from "react";
import Header from "@/app/components/header";
import InterviewCard from "@/app/components/interview/interviewCard";
import styled from "styled-components";


const Main = styled.main`
  display: grid;
  grid-template-rows: 3rem calc(100vh - 7rem) 3rem;
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
      <Header setInterviewQuestion={setInterviewQuestion}/>
      <InterviewCard interviewQuestion={interviewQuestion}/>
    </Main>
  )
}

export default Home