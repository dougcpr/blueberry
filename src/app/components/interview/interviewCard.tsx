import React, {FC, useEffect} from "react";
import Card from '@mui/material/Card';
import styled from "styled-components";
import InterviewQuestion from "@/app/components/interview/interviewQuestion";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";
import GradingIcon from '@mui/icons-material/Grading';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import {Button, CardActions, IconButton} from "@mui/material";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CardContent from "@mui/material/CardContent";
import {completeResponse} from "@/app/lib/shared/helper";
import {MicOff} from "@mui/icons-material";

const InterviewCardContainer = styled.div`
  display: grid;
  place-items: center;
`

const InterviewButtonGroup = styled.div`
  display: grid;
  grid-template-rows: 3rem;
  grid-template-columns: 3rem 3rem 1fr;
  grid-column-gap: 1rem;
`

const NoInterviewQuestionBlockText = styled.div`
  color: slategray;
  text-align: center;
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
  }, [interviewQuestion, resetTranscript, setFeedback])

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
          {!interviewQuestion &&
          <NoInterviewQuestionBlockText>
              Enter a role and create an interview question <br/>or<br/> Upload a job description
          </NoInterviewQuestionBlockText>}
        </CardContent>
        <CardActions style={{justifyContent: "space-between", display: "flex"}}>
          {interviewQuestion &&
              <>
                  <InterviewButtonGroup>
                    {!listening ?
                      <IconButton onClick={() => SpeechRecognition.startListening()}><MicOff/></IconButton> :
                      <IconButton onClick={() => SpeechRecognition.stopListening()}><RecordVoiceOverIcon/></IconButton>
                    }
                      <IconButton onClick={() => resetTranscript()}><RestartAltIcon /></IconButton>
                  </InterviewButtonGroup>
                  <Button disabled={transcript === ''} color="success" variant="contained" onClick={generateFeedback}><GradingIcon /></Button>
              </>
          }
        </CardActions>
      </Card>
    </InterviewCardContainer>
  )
}

export default InterviewCard
