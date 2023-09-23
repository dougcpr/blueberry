import React, {FC, useEffect, useState} from "react";
import Card from '@mui/material/Card';
import styled from "styled-components";
import InterviewQuestion from "@/app/components/interview/interviewQuestion";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";
import MicIcon from '@mui/icons-material/Mic';
import {Button, IconButton} from "@mui/material";
import {MicOff} from "@mui/icons-material";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CardContent from "@mui/material/CardContent";
import Feedback from "@/app/components/feedback";
import {completeResponse} from "@/app/lib/shared/helper";
import Typography from "@mui/material/Typography";

const InterviewCardContainer = styled.div`
  display: grid;
  place-items: center;
`

type InterviewCardProps = {
  interviewQuestion: string | undefined;
};

const InterviewCard: FC<InterviewCardProps> = ({interviewQuestion}) => {
  const [feedback, setFeedback] = useState(undefined)
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
      <Card style={{height: "30rem", width: "30rem", overflow: "scroll"}}>
        <CardContent>
          <InterviewQuestion interviewQuestion={interviewQuestion}></InterviewQuestion>
          {interviewQuestion &&
              <div>
                  <div>
                    {!listening ?
                      <IconButton onClick={() => SpeechRecognition.startListening()}><MicIcon /></IconButton> :
                      <IconButton onClick={() => SpeechRecognition.stopListening()}><MicOff /></IconButton>
                    }
                      <IconButton onClick={() => resetTranscript()}><RestartAltIcon /></IconButton>
                      <Typography variant="body2">
                        {transcript}
                      </Typography>
                  </div>
                <Button variant="contained" onClick={generateFeedback}>Generate Feedback</Button>
              </div>
          }
          {feedback &&
              <Feedback feedback={feedback} />
          }
        </CardContent>
      </Card>
    </InterviewCardContainer>
  )
}

export default InterviewCard
