export default function Key({note, octave, keyPressed, keyReleased}){
    const freq = note + octave;
    const onPress = () => {
        keyPressed(freq)
    }

    const onRelease = () => {
        keyReleased(freq)
    }

    return <div>
       <button className={note.includes('#') ? "key black_key" : "key white_key"} onMouseDown={onPress} onMouseUp={onRelease}>{freq}</button>
    </div>
}