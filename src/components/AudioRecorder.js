import React, { useEffect, useRef, useState } from "react";

const AudioRecorder = () => {
  // State variables to manage recording and audio playback
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [audioURL, setAudioURL] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  // Ref to interact with the <audio> element
  const audioRef = useRef();

  // useEffect to initialize MediaRecorder and access the user's microphone
  useEffect(() => {
    const initializeMediaRecorder = async () => {
      try {
        // Request access to the user's microphone
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        // Create a MediaRecorder instance with the microphone stream
        const recorder = new MediaRecorder(stream);

        // Event listener for the availability of recorded data
        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            // Add the recorded data chunk to the array
            setRecordedChunks((prevChunks) => [...prevChunks, event.data]);
          }
        };

        // Event listener for when recording is stopped
        recorder.onstop = () => {
          // Update the recording state
          setIsRecording(false);
        };

        // Set the MediaRecorder instance in the state
        setMediaRecorder(recorder);
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    };

    // Initialize MediaRecorder when the component mounts
    initializeMediaRecorder();
  }, [recordedChunks]);

  // useEffect to start/stop MediaRecorder based on the recording state
  useEffect(() => {
    if (isRecording && mediaRecorder) {
      mediaRecorder.start();
    } else if (!isRecording && mediaRecorder) {
      mediaRecorder.stop();
    }
  }, [isRecording, mediaRecorder]);

  // useEffect to process recorded data after recording stops
  useEffect(() => {
    if (!isRecording && recordedChunks.length > 0) {
      // Create a Blob from the recorded chunks
      const blob = new Blob(recordedChunks, { type: "audio/wav" });
      // Create a URL for the Blob and set it as the audio URL
      const url = URL.createObjectURL(blob);
      setAudioURL(url);
    }
  }, [isRecording, recordedChunks]);

  // Function to start recording
  const startRecording = () => {
    // Clear the recorded chunks array
    setRecordedChunks([]);
    // Update the recording state
    setIsRecording(true);
  };

  // Function to stop recording
  const stopRecording = () => {
    // Update the recording state
    setIsRecording(false);
  };

  return (
    <div>
      {/* Display recording status */}
      <div style={{ fontSize: "2rem" }}>
        {isRecording ? "🎙️ Recording..." : "⏹️ Ready to Record"}
      </div>

      {/* Button to start/stop recording */}
      <div>
        <button onClick={isRecording ? stopRecording : startRecording}>
          {isRecording ? "⏹️ Stop Recording" : "🎙️ Start Recording"}
        </button>
      </div>

      {/* Display audio player if there is an audio URL */}
      {audioURL && <audio ref={audioRef} src={audioURL} controls />}
    </div>
  );
};

export default AudioRecorder;
