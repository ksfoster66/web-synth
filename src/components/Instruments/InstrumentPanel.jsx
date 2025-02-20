import InstrumentSelector from "./InstrumentSelector"
import InstrumentDisplay from "./InstrumentDisplay"

export default function InstrumentPanel({instruments, currentInstrument, setCurrentInstrument, addEffect, addInstrument, updateInstrument, removeInstrument}){
    
    return (<div className="instrument_panel">
        <button id="add_instrument" className="btn" onClick={addInstrument}>add</button>
        <button id="remove_instrument" className="btn" onClick={() => removeInstrument(currentInstrument)}>remove inst</button>
        <button id="add_effect" className="btn" onClick={addEffect}>effect</button>
        <InstrumentSelector instruments={instruments} currentInstrument={currentInstrument} setCurrentInstrument={setCurrentInstrument}/>
        <InstrumentDisplay instruments={instruments} currentInstrument={currentInstrument} updateInstrument={updateInstrument}/>
    </div>)
}