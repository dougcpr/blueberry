import React, {FC} from "react";
import {Button} from "@mui/material";
import styled from "styled-components";
import {completeResponse} from "@/app/lib/shared/helper";

type Role = {
  id: number,
  value: string,
  label: string
}

const InterviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  
`

type HeaderProps = {
  setInterviewQuestion: any;
};

const Header: FC<HeaderProps> = ({setInterviewQuestion}) => {
  async function generateInterviewQuestion() {
    setInterviewQuestion(undefined)
    let prompt = generateInterviewPrompt()
    const res = await completeResponse(prompt)
    setInterviewQuestion(res.choices[0].text)
  }

  function generateInterviewPrompt() {
    const feedbackContext = `Assume you are a hiring manager for React Developer.`
    return`${feedbackContext} Ask 1 question to the interviewee given their experience is 2 years.`
  }
  return (
      <InterviewHeader>
        <p>
          React Developer <span style={{color: "grey"}}>with</span> Doug Cooper
        </p>
        <Button onClick={generateInterviewQuestion} size="medium" variant="contained">Generate Interview Question</Button>
      </InterviewHeader>
  )
}

export default Header