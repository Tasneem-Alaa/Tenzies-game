export default function Die(prop){
    let styles={
        backgroundColor: prop.isHeld ? "#59E391" : "white"
    }
    return(
        <button 
        className="die" 
        style={styles} 
        onClick={prop.hold}
        aria-pressed={prop.isHeld}
        aria-label={`Die with value ${prop.value}, ${prop.isHeld ? "held" : "not held"}`}

        >{prop.value}</button>
    )
}