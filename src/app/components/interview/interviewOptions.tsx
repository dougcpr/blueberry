import React, {FC} from "react";
import {Button, Card} from "@mui/material";
import styled from "styled-components";
import {completeResponse} from "@/app/lib/shared/helper";

type InterviewOptionsProps = {
  setInterviewQuestion: any;
};

const InterviewPrompt = styled.div`
  display: flex;
  grid-column-gap: 1rem;
  justify-content: center;
`

const InterviewStyleChoice = styled(Card)`
  display: grid;
  height: 13rem;
  padding: 1rem;
  width: 13rem;
  grid-gap: 1rem;
`

const UploadFakeBorder = styled.div`
  border: 0.25rem dashed grey;
  display: grid;
  place-items: center;
`

const InterviewOptions: FC<InterviewOptionsProps> = ({setInterviewQuestion}) => {
  async function generateInterviewQuestion() {
    setInterviewQuestion(undefined)
    try {
      let prompt = generateInterviewPrompt()
      const res = await completeResponse(prompt)
      setInterviewQuestion(res.choices[0].text)
    } catch (e) {
      console.error(e)
      setInterviewQuestion("This is an offline interview prompt.")
    }

  }

  function generateInterviewPrompt() {
    const feedbackContext = `Assume you are a hiring manager for React Developer.`
    return`${feedbackContext} Ask 1 question to the interviewee given their experience is 2 years.`
  }
  return (
      <InterviewPrompt>
        <InterviewStyleChoice>
          <h4>Position: React Developer <span style={{'color': 'gray'}}>with</span> Doug Cooper</h4>
          <Button onClick={generateInterviewQuestion} size="medium" variant="contained">Generate Interview Question</Button>
        </InterviewStyleChoice>
        <InterviewStyleChoice>
          <UploadFakeBorder>?</UploadFakeBorder>
          <Button size="medium" variant="contained">Upload Job Description</Button>
        </InterviewStyleChoice>
      </InterviewPrompt>
  )
}

export default InterviewOptions