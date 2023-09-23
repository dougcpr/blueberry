'use client';
import 'regenerator-runtime/runtime'
import React, {useEffect, useState} from "react";
import InterviewOptions from "@/app/components/interview/interviewOptions";
import InterviewCard from "@/app/components/interview/interviewCard";
import styled, {ThemeProvider} from "styled-components";
import FeedbackCard from "@/app/components/feedback/feedbackCard";
import {GlobalStyles} from "@/app/lib/global-styles";

const darkTheme = {
  transition: 0.3,
  body: '#1a1f36',
  text: '#d5d5d5',
  colors: {
    black: '#000',
    button_disabled: 'rgba(0, 0, 0, 0.26)',
    button_disabled_bg: 'rgba(0, 0, 0, 0.12)',
    button_height: '2.25rem',
    default: '#d5d5d5',
    defaultBackgroundColor: 'white',
    disabled: '#f5f5f5',
    disabled_NavBar_Item: '#8BB7F1',
    fontFamily: 'Roboto, sans-serif',
    green: '#55ad7a',
    blue: '#1e5d88',
    navBarFontColor: '#1a1f36',
    input_border_hover: 'rgba(0,0,0,.87)',
    red: '#FF1654',
    grey: '#e0e0e0',
    white: '#fff',
    font_medium: '1rem',
    width_medium: '12.5rem',
    technologies: {
      typescript: '#347DDB',
      productMgmt: '#55ad7a',
      unity: 'black'
    }
  },
};


const Main = styled.main`
  padding: 1rem;
  display: grid;
  grid-row-gap: 1rem;
  margin: 0 auto;
  width: 30rem;
`

function Home() {
  const [loading, setLoading] = useState(false)
  const [interviewQuestion, setInterviewQuestion] = useState(undefined)
  const [feedback, setFeedback] = useState(undefined)

  useEffect(() => {
    setLoading(true)
  }, [])

  if (!loading) {
    return (
      <main></main>
    )
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyles />
      <Main>
        <InterviewOptions setInterviewQuestion={setInterviewQuestion}/>
        <InterviewCard setFeedback={setFeedback} interviewQuestion={interviewQuestion}/>
        <FeedbackCard feedback={feedback} />
      </Main>
    </ThemeProvider>
  )
}

export default Home