export default function InstrumentSelector({instruments, currentInstrument, setCurrentInstrument}){
    return (<div className="instrument_selector">
        {instruments.map((instrument, index) => (
            <li className={currentInstrument === index ? "instrument_tab active" : "instrument_tab"} key={index} onClick={() => setCurrentInstrument(index)}>synth {index}</li>
        ))}
    </div>)
}