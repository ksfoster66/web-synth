import InstrumentNode from "./InstrumentNode";
import * as Tone from 'tone';

export default function InstrumentDisplay({instruments, currentInstrument, updateInstrument}){

    let defaultFreq = Tone.Frequency("C4");

    console.log(instruments[currentInstrument]);
    
    const updateValues = (event) => {
        const newVal = event.target.value;
        defaultFreq = newVal;

        const newOptions = {
            frequency: newVal
        }

        updateInstrument(currentInstrument, newOptions);
    }
    
    return (<div>
        {instruments[currentInstrument].map((node, index) => (
            <InstrumentNode node={node} />
        ))}
    </div>)
}