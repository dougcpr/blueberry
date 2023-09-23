import React, {FC, useState} from "react";
import {Fab, TextField} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import styled from "styled-components";
import {completeResponse} from "@/app/lib/shared/helper";
import {FileUpload} from "@mui/icons-material";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from "@mui/material/Typography";

type InterviewOptionsProps = {
  setInterviewQuestion: any;
  setConversation: any;
  conversation: string[];
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

const InterviewOptions: FC<InterviewOptionsProps> = ({setInterviewQuestion, setConversation, conversation}) => {
  const [role, setRole] = useState<string>("");
  const [experience, setExperience] = useState<number | number[]>(0);
  const [loading, setLoading] = useState<boolean>(false);
  async function generateInterviewQuestion() {
    setInterviewQuestion(undefined)
    setLoading(true);
    try {
      let prompt = generateInterviewPrompt()
      const res = await completeResponse(prompt)
      const text = res.choices[0].text
      console.log(text)
      setInterviewQuestion(text)
      setConversation([...conversation, text])
    } catch (e) {
      console.error(e)
      setInterviewQuestion("This is an offline interview prompt.")
    } finally {
      setLoading(false);
    }
  }

  function generateInterviewPrompt() {
    console.log(conversation);
    const feedbackContext = `Assume you are a hiring manager for ${role}.`
    return`${feedbackContext} Ask 1 question to the interviewee given the user has ${experience} years of experience. Do not ask a question like ${conversation}.`
  }
  return (
    <>
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
            defaultValue={2}
            getAriaValueText={valuetext}
            marks={marks}
            max={10}
            onChange={(_, newExp) => {setExperience(newExp)}}
          />
        </Box>
      </InterviewPrompt>
      <LoadingButton
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
    </>
  )
}

export default InterviewOptions