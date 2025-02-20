import Key from "./Key";

const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
export default function Keyboard({keyPressed, keyReleased}){
    const octaves = 2;
    const startingOctave = 4;

    const keys= [];
    
    for(let octave = startingOctave; octave < startingOctave + octaves; octave++){
        for(let noteIndex = 0; noteIndex < notes.length; noteIndex++){
            keys.push(<Key note={notes[noteIndex]} octave={octave} keyPressed={keyPressed} keyReleased={keyReleased}/>);
        }
    }
    keys.push(<Key note="C" octave={startingOctave + octaves} keyPressed={keyPressed} keyReleased={keyReleased}/>)

    return <div id="keyboard">
        
        {keys}
    </div>
}