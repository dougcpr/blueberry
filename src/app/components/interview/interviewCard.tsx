import React, {FC, useEffect} from "react";
import Card from '@mui/material/Card';
import styled, {keyframes} from "styled-components";
import InterviewQuestion from "@/app/components/interview/interviewQuestion";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";
import MicIcon from '@mui/icons-material/Mic';
import {Button, IconButton} from "@mui/material";
import {MicOff} from "@mui/icons-material";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CardContent from "@mui/material/CardContent";
import {completeResponse} from "@/app/lib/shared/helper";

const InterviewCardContainer = styled.div`
  display: grid;
  place-items: center;
`

const InterviewButtonGroup = styled.div`
  display: grid;
  grid-template-rows: 3rem;
  grid-template-columns: 5rem 5rem 1fr;
  grid-column-gap: 1rem;
`

type InterviewCardProps = {
  interviewQuestion: string | undefined;
  setFeedback: any;
};


const InterviewCard: FC<InterviewCardProps> = ({interviewQuestion, setFeedback}) => {
  let {
    transcript,
    listening,
    resetTranscript,
  } = useSpeechRecognition();

  async function generateFeedback() {
    const prompt = generateFeedbackPrompt()
    const res = await completeResponse(prompt)
    setFeedback(res.choices[0].text)
  }

  useEffect(() => {
    resetTranscript()
    setFeedback(undefined)
  }, [interviewQuestion, resetTranscript])

  function generateFeedbackPrompt() {
    const feedbackContext = `Assume you are a strict pessimistic, hiring manager for React Developer.`
    return `${feedbackContext} give areas of improvement to the interviewee.  If there is anything positive, mention it.
    The response the user gave is ${transcript}. Tell the interviewee if they pass or fail the question.`
  }

  return (
    <InterviewCardContainer>
      <Card style={{width: "100%", overflow: "scroll"}}>
        <CardContent style={{transition: "0.3s"}}>
          <InterviewQuestion interviewQuestion={interviewQuestion}></InterviewQuestion>
          {interviewQuestion &&
              <div>
                <InterviewButtonGroup>
                  {!listening ?
                    <IconButton onClick={() => SpeechRecognition.startListening()}><MicIcon /></IconButton> :
                    <IconButton onClick={() => SpeechRecognition.stopListening()}><MicOff /></IconButton>
                  }
                  <IconButton onClick={() => resetTranscript()}><RestartAltIcon /></IconButton>
                  <Button disabled={transcript === ''} variant="contained" onClick={generateFeedback}>Generate Feedback</Button>
                </InterviewButtonGroup>
              </div>
          }
        </CardContent>
      </Card>
    </InterviewCardContainer>
  )
}

export default InterviewCard
