import MidiTrack from "./MidiTrack";

export default function Midi({midiData, noteValue, bars, updateMidiData}){

    const updateInstrumentTrack = (instIndex, noteIndex) =>{
        updateMidiData(instIndex, noteIndex);
    }

    return <div>
        {midiData.map((m,i)=>(
            <MidiTrack trackData={m} noteValue={noteValue} bars={bars} instIndex={i} key={i} updateInstTrack={updateInstrumentTrack} />
        ))}
    </div>
}