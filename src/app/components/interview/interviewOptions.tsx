import React, {FC, useState} from "react";
import {Fab, TextField} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import styled from "styled-components";
import {completeResponse} from "@/app/lib/shared/helper";
import {FileUpload} from "@mui/icons-material";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from "@mui/material/Typography";
import {Message, Role} from "@/app/api/models/openai";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

type InterviewOptionsProps = {
  setInterviewQuestion: any;
  setConversation: any;
  setRole: any;
  role: string;
  conversation: Message[];
};

const InterviewPrompt = styled.div`
  display: flex;
  justify-content: space-between;
`

const marks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 2,
    label: '2',
  },
  {
    value: 5,
    label: '5',
  },
  {
    value: 10,
    label: '10+',
  },
];

function valuetext(value: number) {
  return `${value} years`;
}

const InterviewOptions: FC<InterviewOptionsProps> = ({setInterviewQuestion, setConversation, setRole, role, conversation}) => {
  const [experience, setExperience] = useState<number | number[]>(2);
  const [loading, setLoading] = useState<boolean>(false);
  async function generateInterviewQuestion() {
    let message: Message[] = [{
      role: Role.user,
      content: ``
    }]
    setInterviewQuestion(undefined)
    setLoading(true);
    try {
      if (conversation.length === 0) {
        message = generateInitialMessage();
      } else {
        const additionalMessage: Message = {
          role: Role.user,
          content: `Ask me another question, please.`
        }
        message = [...conversation, additionalMessage]
      }
    } catch (e) {
      console.error(e)
      setInterviewQuestion("This was an error generating your prompt.")
    } finally {
      const res = await completeResponse(message)
      const text = res.choices[0].message.content
      setConversation([...conversation, res.choices[0].message])
      setInterviewQuestion(text)
      setLoading(false);
    }
  }

  function generateInitialMessage() {
    const interviewContext = `Assume you are a hiring manager for ${role}.`
    let newMessage: Message[] = [{
      role: Role.user,
      content: `${interviewContext} Ask me 1 question given I have ${experience} years of experience.`
    }]
    return newMessage
  }
  return (
    <Card>
      <CardContent>
        <InterviewPrompt>
          <TextField
            style={{alignSelf: "center"}}
            id="outlined-basic"
            label="Role"
            variant="outlined"
            onChange={(e) => setRole(e.target.value)}  />
          <Box sx={{ width: 225 }}>
            <Typography gutterBottom>Experience</Typography>
            <Slider
              aria-label="Experience"
              valueLabelDisplay="auto"
              defaultValue={experience}
              getAriaValueText={valuetext}
              marks={marks}
              max={10}
              onChange={(_, newExp) => {setExperience(newExp)}}
            />
          </Box>
        </InterviewPrompt>
        <LoadingButton
          style={{width: "-webkit-fill-available"}}
          disabled={role === '' || conversation.length === 5}
          loading={loading}
          onClick={generateInterviewQuestion}
          variant="contained">
          <p>Ask
            {conversation.length == 0 && <span> a </span>}
            {conversation.length > 0 && <span> Another </span>}
            Question ({conversation.length}/5)
          </p>
        </LoadingButton>
        <Fab style={{position: "absolute", right: "1rem", bottom: "1rem"}} color="primary" aria-label="add">
          <FileUpload />
        </Fab>
      </CardContent>
    </Card>
  )
}

export default InterviewOptions