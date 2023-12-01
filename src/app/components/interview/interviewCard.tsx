import React, {FC, useEffect, useState} from "react";
import Card from '@mui/material/Card';
import styled from "styled-components";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";
import GradingIcon from '@mui/icons-material/Grading';
import {Button, CardActions} from "@mui/material";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CardContent from "@mui/material/CardContent";
import {completeResponse} from "@/app/lib/shared/helper";
import {Message, Role} from "@/app/api/models/openai";
import LoadingButton from "@mui/lab/LoadingButton";
import {APIChatResponse} from "@/app/api/models/interview";
import Typography from "@mui/material/Typography";

const InterviewCardContainer = styled.div`
  display: grid;
  place-items: center;
`

const InterviewButtonGroup = styled.div`
  display: grid;
  grid-template-columns: 5rem 3rem 1fr;
  grid-column-gap: 1rem;
`

const NoInterviewQuestionBlockText = styled.div`
  color: slategray;
  text-align: center;
`

type InterviewCardProps = {
  conversation: Message[];
  interviewQuestion: APIChatResponse;
  role: string;
  setConversation: any;
  setFeedback: any;
};


const InterviewCard: FC<InterviewCardProps> = ({interviewQuestion, setFeedback, role, conversation}) => {
  const [loading, setLoading] = useState<boolean>(false)
  let {
    transcript,
    listening,
    resetTranscript,
  } = useSpeechRecognition();

  async function generateFeedback() {
    setLoading(true)
    const messages = generateFeedbackPrompt()
    const res = await completeResponse(messages)
    setFeedback({returnedMessage: res.choices[0].message.content, status: true})
    setLoading(false)
  }

  useEffect(() => {
    resetTranscript()
    setFeedback(undefined)
  }, [interviewQuestion, resetTranscript, setFeedback])

  const generateFeedbackPrompt = () => {
    const feedbackContext = `You are a hiring manager for the ${role}. Do not give any mention you are a language model.`
    let newMessage: Message = {
      role: Role.user,
      content: `${feedbackContext} Mention something positive and negative in 4 sentences. The response the I gave is ${transcript}. Also tell me if I pass or fail the question.`
    }
    return [...conversation, newMessage]
  }

  return (
    <InterviewCardContainer>
      <Card style={{width: "100%", overflow: "scroll"}}>
        <CardContent style={{transition: "0.3s"}}>
          {interviewQuestion.message && <Typography variant="body2">
            {interviewQuestion.message}
          </Typography>}
          {!interviewQuestion.status &&
          <NoInterviewQuestionBlockText>
              Enter a role and generate a question <br/>or<br/> Upload a job description
          </NoInterviewQuestionBlockText>}
        </CardContent>
        <CardActions style={{justifyContent: "space-between", display: "flex"}}>
          {interviewQuestion.status &&
              <>
                <InterviewButtonGroup>
                    <LoadingButton variant="contained" loading={listening} onClick={() => SpeechRecognition.startListening()}>Record</LoadingButton>
                    <Button variant="outlined" onClick={() => resetTranscript()}><RestartAltIcon color="primary" /></Button>
                </InterviewButtonGroup>
                <LoadingButton
                    loading={loading}
                    disabled={transcript === '' || loading}
                    color="success"
                    variant="contained"
                    onClick={generateFeedback}>
                    <GradingIcon />
                </LoadingButton>
              </>
          }
        </CardActions>
      </Card>
    </InterviewCardContainer>
  )
}

export default InterviewCard
