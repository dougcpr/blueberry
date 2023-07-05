'use client';
import 'regenerator-runtime/runtime'
import React, {useState} from "react";
import {Question, roles} from "@/app/mockData";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


const prompt = `Given these questions and answers, determine`

function Home() {
  const [loading, setLoading] = useState(false)
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  async function convertSpeechToText() {
    setLoading(true)

    const response = await fetch("/api/generate", {
      method: "POST",
      body: null
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const res = await response.json()
    console.log(res)
    setLoading(false)
  }

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser does not support speech recognition.</span>;
  }

  return (
    <main style={{display: "grid", gridGap: "1rem"}}>
      <h3>Interview Questions</h3>
      <div style={{padding: "1rem", border: "1px solid", maxHeight: "15rem", overflowY: "scroll"}}>
        {roles[0].questions.map((question: Question) => {
          return (
            <div key={question.id}>
              <div style={{paddingBottom: "1rem"}}>
                {question.question}
              </div>
              <button onClick={convertSpeechToText}>Record Answer</button>
            </div>
          )
        })}
      </div>
      <div>
        <p>Microphone: {listening ? 'on' : 'off'}</p>
        <button onClick={() => SpeechRecognition.startListening()}>Start</button>
        <button onClick={() => SpeechRecognition.stopListening()}>Stop</button>
        <button onClick={() => resetTranscript()}>Reset</button>
        <p>{transcript}</p>
      </div>
    </main>
  )
}

export default Home