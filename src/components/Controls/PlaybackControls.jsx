export default function PlaybackControls({playSound, changeInstrument}){
    return <div>
            <button id="play-btn" className="btn" onClick={playSound}>play</button>
            <button id="change-instrument" className="btn" onClick={changeInstrument}>switch</button>
        </div>
}