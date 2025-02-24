export default function Key({note, octave, keyPressed, keyReleased}){
    const freq = note + octave;
    const onPress = () => {
        keyPressed(freq)
    }

    const onRelease = () => {
        keyReleased(freq)
    }

    return <div className="key">
       <button className={note.includes('#') ? "black_key" : "white_key"} onMouseDown={onPress} onMouseUp={onRelease}></button>
       <label>{freq}</label>
    </div>
}