'use client';
import React, {useState} from "react";
import {Question, roles} from "@/app/mockData";
import {useReactMediaRecorder} from "react-media-recorder";


const prompt = `Given these questions and answers, determine`

function Home() {
  const [recordedAnswers, setRecordedAnswers] = useState<string[]>([])
  const [summary, setSummary] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [whisperPayload, setWhisperPayload] = useState<FormData>()
  const { status, startRecording, stopRecording, mediaBlobUrl,  } = useReactMediaRecorder({
    audio: true,
    onStop:async (blobUrl, blob) => {
      const formData = new FormData();
      formData.append("model", "whisper-1");
      formData.append("file", blob);
      setWhisperPayload(formData)
    }
  });
  async function convertSpeechToText(questionIndex: number) {
    setLoading(true)

    const response = await fetch("/api/whisper", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: whisperPayload,
      // @ts-ignore
      duplex: "half"
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const res = await response.json()
    console.log(res)
    // recordedAnswers[questionIndex] = summary.choices[0].text
    setLoading(false)
  }

  function generateFeedback() {

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
              {status !== 'recording' ? <button
                disabled={loading}
                type="button"
                style={{width: "fit-content"}}
                onClick={() => startRecording()}>
                Record Answer
              </button> : <button onClick={stopRecording}>Stop Recording</button>}
              <button onClick={() => convertSpeechToText(question.id)}>Convert STT</button>
              <div style={{paddingTop: "1rem"}}>
                <audio src={mediaBlobUrl} controls />
              </div>
              <div>{recordedAnswers[question.id]}</div>
            </div>
          )
        })}
      </div>
      <button
        disabled={loading}
        type="button"
        style={{width: "fit-content"}}
        onClick={() => generateFeedback()}>
        Generate Feedback
      </button>
      <div style={{display: "grid", gridGap: "1rem"}}>
        {summary}
      </div>
    </main>
  )
}

export default Home