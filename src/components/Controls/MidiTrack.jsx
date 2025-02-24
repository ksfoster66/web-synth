import { useState } from "react"

export default function MidiTrack({trackData, noteValue, bars, instIndex, updateInstTrack}){

    const [midiTrack, setMidiTrack] = useState(new Array(noteValue*bars).fill(""))

    
    const toggleMidiNote = (index) =>{
        updateInstTrack(instIndex, index);
        
    }
    
    let val = 0;
    let val2 = true;

    return <ul className="midi_track">
        {trackData.map((m, i)=> {
            let midiClass = m !== "" ? "midi_note active" : "midi_note"
            if (val2) midiClass += " even"
            else midiClass += " odd"
            val++;
            if (val >= noteValue){
                val2 = !val2;
                val = 0;
            }
           return  <li className={midiClass} key={i} onClick={() => toggleMidiNote(i)}></li>
        })}
    </ul>
}