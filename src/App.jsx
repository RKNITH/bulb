import React, { useState, useEffect } from 'react';
import LightBulb from './components/LightBulb';
import { HiMicrophone } from 'react-icons/hi';

function App() {
  const [isOn, setIsOn] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const startRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript.toLowerCase();
      setTranscript(command);

      if (command.includes('on')) setIsOn(true);
      if (command.includes('off')) setIsOn(false);

      setIsListening(false);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.start();
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-700 ${isOn ? 'bg-yellow-50' : 'bg-slate-900'}`}>
      <h1 className={`text-3xl font-bold mb-8 ${isOn ? 'text-slate-900' : 'text-white'}`}>
        Voice Control Center
      </h1>

      <LightBulb isOn={isOn} />

      <div className="mt-10 text-center">
        <button
          onClick={startRecognition}
          className={`p-4 rounded-full transition-all ${isListening ? 'bg-red-500 animate-pulse' : 'bg-blue-600 hover:bg-blue-500'} text-white shadow-lg`}
        >
          <HiMicrophone size={32} />
        </button>

        <p className={`mt-4 font-medium ${isOn ? 'text-slate-600' : 'text-slate-400'}`}>
          {isListening ? "Listening... say 'Light On' or 'Light Off'" : "Click mic to speak"}
        </p>

        {transcript && (
          <p className="mt-2 text-sm italic text-blue-400">Last command: "{transcript}"</p>
        )}
      </div>
    </div>
  );
}

export default App;