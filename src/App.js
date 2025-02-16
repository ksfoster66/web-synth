import * as Tone from 'tone';
import {useState} from 'react'
import './App.css';

function App() {
  const [synths, setSynths] = useState([new Tone.Synth().toDestination(), new Tone.MetalSynth().toDestination()])

  //Array of instruments
  //active instrument
  const [currentInstrument, setCurrentInstrument] = useState(0);

  const playSound = () => {
    if (Tone.Context.state !== "running"){
      Tone.start()
    }

    synths[currentInstrument].triggerAttackRelease("C4", "8n");
  };

  const changeActiveInstrument = () => {
    setCurrentInstrument(()=>{
      let val = currentInstrument + 1;
      if (val >= synths.length) val = 0;
      return val;
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Web Synth</h1>
        <div>Controls
        <button id="play-btn" onClick={playSound}>play</button>
        <button id="change-instrument" onClick={changeActiveInstrument}>switch</button>

        </div>
        <div>Instruments section</div>
        <div>Midi section</div>
        {/* Grid of buttons??
        With preset note time durations */}
      </header>
    </div>
  );
}

export default App;
