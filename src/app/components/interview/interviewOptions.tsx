import React, {FC} from "react";
import {Button} from "@mui/material";
import styled from "styled-components";
import {completeResponse} from "@/app/lib/shared/helper";
import {FileUpload} from "@mui/icons-material";

type InterviewOptionsProps = {
  setInterviewQuestion: any;
};

const InterviewPrompt = styled.div`
  display: flex;
  justify-content: space-between;
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
        <Button onClick={generateInterviewQuestion} size="medium" variant="contained">Create Interview Question</Button>
        <Button color="primary" variant="contained">
          <FileUpload sx={{ mr: 1 }} />
          Upload
        </Button>
      </InterviewPrompt>
  )
}

export default InterviewOptions