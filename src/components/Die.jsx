export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    return (
        <button 
            style={styles} 
            onClick={props.handleHold}
            aria-pressed={props.isPressed}
            aria-label={`Die with value ${props.value}, 
            ${props.isHeld ? "held" : "not neld"}`}
        >{props.value}</button>
    )
}