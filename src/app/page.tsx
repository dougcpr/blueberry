'use client';
import 'regenerator-runtime/runtime'
import React, {useState} from "react";
import {useFormik} from 'formik';
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';


let prompt = ``

function Home() {
  const [interviewQuestion, setInterviewQuestion] = useState(undefined)
  const [feedback, setFeedback] = useState(undefined)
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  const formik = useFormik({
    initialValues: {
      role: '',
      userExperience: 0,
    },
    onSubmit: async (values) => {
      await generateInterviewQuestion()
    },
  });

  async function completeResponse(prompt: string) {
    console.log(prompt)
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify({prompt}),
    });

    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return await response.json()
  }

  async function generateInterviewQuestion() {
    let prompt = generateInterviewPrompt()
    const res = await completeResponse(prompt)
    setInterviewQuestion(res.choices[0].text)
  }

  async function generateFeedback() {
    prompt = generateFeedbackPrompt()
    const res = await completeResponse(prompt)
    setFeedback(res.choices[0].text)
  }

  function generateInterviewPrompt() {
    const feedbackContext = `Assume you are a hiring manager for ${formik.values.role}.`
    return`${feedbackContext} Ask 1 question to the interviewee given their experience is ${formik.values.userExperience}..`
  }

  function generateFeedbackPrompt() {
    const feedbackContext = `Assume you are a hiring manager for ${formik.values.role}.`
    return `${feedbackContext} Give 1 pro and con as feedback. Rate the overall answer out of 10. 
    The rating should be based on the user's experience of ${formik.values.userExperience}.
    The answer the user gave is ${transcript}.`
  }

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser does not support speech recognition.</span>;
  }

  return (
    <main style={{display: "grid", gridGap: "1rem"}}>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="role">Role Applying For</label>
        <select
          id="role"
          name="role"
          onChange={formik.handleChange}
          value={formik.values.role}
        >
          <option value="" label="Select a role">
            Select a color
          </option>
          <option value="junior react developer" label="Junior React Developer">
            Junior Developer
          </option>
          <option value="math teacher" label="Math Teacher">
            Teacher
          </option>
        </select>
        <div>
          <label htmlFor="userExperience">User Experience</label>
          <input
            id="userExperience"
            name="userExperience"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.userExperience}
          />
        </div>
        <button type="submit">Generate Interview Question</button>
      </form>
      {interviewQuestion &&
          <div>
              <h3>Interview Question:</h3>
              <p>{interviewQuestion}</p>
              <div>
                  <p>Microphone: {listening ? 'on' : 'off'}</p>
                  <button onClick={() => SpeechRecognition.startListening()}>Start</button>
                  <button onClick={() => SpeechRecognition.stopListening()}>Stop</button>
                  <button onClick={() => resetTranscript()}>Reset</button>
                  <p>{transcript}</p>
              </div>
              <button onClick={() => generateFeedback()}>Generate Feedback</button>
          </div>
      }
      {feedback &&
          <div>
              <h3>Feedback:</h3>
              <p>{feedback}</p>
          </div>
      }
    </main>
  )
}

export default Home