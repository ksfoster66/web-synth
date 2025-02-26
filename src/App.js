import * as Tone from 'tone';
import {useState} from 'react'
import './App.css';

import InstrumentPanel from './components/Instruments/InstrumentPanel';
import PlaybackControls from './components/Controls/PlaybackControls';
import Keyboard from './components/Controls/Keyboard';
import Midi from './components/Controls/Midi';
import { log } from 'tone/build/esm/core/util/Debug';

function App() {
  const [synths, setSynths] = useState([[new Tone.Synth().toDestination()], [new Tone.MetalSynth().toDestination()]])
  const [synthParams, setSynthParams] = useState(["C4", "C4"])
  const [timeSignature, setTimeSignature] = useState({
    noteValue: 4,
    bars: 4
  })

  const [midiTrackData, setMidiTrackData] = useState([new Array(timeSignature.noteValue*timeSignature.bars).fill(""),new Array(timeSignature.noteValue*timeSignature.bars).fill("")])

  

  //Array of instruments
  //active instrument
  const [currentInstrument, setCurrentInstrument] = useState(0);

  const playSound = () => {
    if (Tone.Context.state !== "running"){
      Tone.start()
    }

    console.log(currentInstrument);
    console.log(synthParams[currentInstrument]);
    
    
    synths[currentInstrument][0].triggerAttackRelease(synthParams[currentInstrument], "8n");
  };

  //Todo: voice management
  const keyPressed = (freq) => {
    synths[currentInstrument][0].triggerAttack(freq);
  }

  const keyReleased = (freq) => {
    synths[currentInstrument][0].triggerRelease()
  }

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
    setSynthParams(currentParams => {
      return [...currentParams, "C4"]
    })

    setMidiTrackData(currentTrackData =>{
      return [...currentTrackData, new Array(timeSignature.noteValue*timeSignature.bars).fill("")]
    })
  }

  const updateInstrument = (index, params) => {
    console.log(params);

    const newSynths = synths.map((s, i) => {
      if (i === index){
        s[0].frequency.set(Tone.Frequency(params.frequency));
        return s;
      }
      else return s
    })

    setSynths(newSynths)

    setSynthParams(currentParams => {
      const newParams = currentParams.map((p, i) => {
        if (i === index){
          return Tone.Frequency(params.frequency);
        }
        else return p
      })

      return newParams
    })
  }

  const removeInstrument = (index) => {
    if (currentInstrument === synths.length - 1) setCurrentInstrument(currentInstrument-1);
    setSynths( prev => {
      const newSynths = [...prev]
      newSynths.splice(index, 1);
      return newSynths;
    })

    setMidiTrackData(prev => {
      const newData = [...prev];
      newData.splice(index, 1);
      return newData;
    })
      
    
  }

  const addEffect = () => { //Add a parameter to dictate what type of effect to add
    const effect = new Tone.FeedbackDelay("8n", 0.5);

    let synthChain = synths[currentInstrument];

    synthChain[synthChain.length - 1].disconnect();
    synthChain[synthChain.length - 1].connect(effect);
    effect.toDestination();

    let newSynthChain = [...synthChain, effect];

    let newSynths = synths.map((current, index) => {
      if (index === currentInstrument){
        return newSynthChain;
      }
      else return current;
    })

    setSynths(currentSynths=>{
      return newSynths;
    })
    
  }

  const updateEffect = (index, params) => {// Possibly change to include optional parameter to specify the instrument it is being removed from?
  
  }

  const removeEffect = (index) => {// Possibly change to include optional parameter to specify the instrument it is being removed from?

  }

  const updateMidiData = (instIndex, noteIndex) => {
    console.log("Instrument: " + instIndex);
    console.log("Midi note index: " + noteIndex);

    setMidiTrackData(prev => {
      const trackData = midiTrackData[instIndex];
      const newTrackData = trackData.map((m, i)=>{
        if (noteIndex === i){
            if (m !==  ""){
                return "";
            }
            else{
                return "4n";
            }
        }
        else return m;
      })
      const newData = prev.map((t,i)=>{
        if (instIndex === i){
          return newTrackData
        }
        return t;
      })
      return newData;
    })
    
    
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Web Synth</h1>
        <div>
          <h3>Controls</h3>
          <h4>Current Instrument: {currentInstrument}</h4>
          <PlaybackControls
            playSound={playSound}
            changeInstrument={changeActiveInstrument}
          />
        </div>
        <InstrumentPanel
          instruments={synths}
          currentInstrument={currentInstrument}
          setCurrentInstrument={setCurrentInstrument}
          addInstrument={addInstrument}
          removeInstrument={removeInstrument}
          addEffect={addEffect}
          updateInstrument={updateInstrument}
        />
        <Midi midiData={midiTrackData} noteValue={4} bars={4} updateMidiData={updateMidiData} />
        <Keyboard keyPressed={keyPressed} keyReleased={keyReleased}/>
      </header>
    </div>
  );
}

export default App;
