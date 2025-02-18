import * as Tone from 'tone';
import {useState} from 'react'
import './App.css';

function App() {
  const [synths, setSynths] = useState([[new Tone.Synth().toDestination()], [new Tone.MetalSynth().toDestination()]])

  //Array of instruments
  //active instrument
  const [currentInstrument, setCurrentInstrument] = useState(0);

  const playSound = () => {
    if (Tone.Context.state !== "running"){
      Tone.start()
    }

    console.log(currentInstrument);
    

    synths[currentInstrument][0].triggerAttackRelease("C4", "8n");
  };

  const changeActiveInstrument = () => {
    setCurrentInstrument(()=>{
      let val = currentInstrument + 1;
      if (val >= synths.length) val = 0;
      return val;
    });
  }

  const addInstrument = () => {//Add parameters to dictate what kind of synth to add
    setSynths(()=> {
      const newSynth = new Tone.DuoSynth().toDestination();

      return [...synths, [newSynth]];
    })
  }

  const addEffect = () => { //Add a parameter to dictate what type of effect to add
    const effect = new Tone.FeedbackDelay("8n", 0.5);

    let synthChain = synths[currentInstrument];
    console.log(synthChain);
    
    console.log(synthChain[synthChain.length - 1]);

    synthChain[synthChain.length - 1].disconnect();
    synthChain[synthChain.length - 1].connect(effect);
    effect.toDestination();

    synthChain.push(effect);

    setSynths(currentSynths=>{
      const s = [...currentSynths];
      s[currentSynths] = [...synthChain];
      return s;
    })
    
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Web Synth</h1>
        <div>
          <h3>Controls</h3>
        <button id="play-btn" onClick={playSound}>play</button>
        <button id="change-instrument" onClick={changeActiveInstrument}>switch</button>
        <button id="add-instrument" onClick={addInstrument}>add</button>
        <button id="add-effect" onClick={addEffect}>effect</button>

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
