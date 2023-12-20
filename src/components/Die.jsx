import './Die.css';

export default function Die (props){
    const value = props.value;
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "#FFFFFF"
    }

    function dots() {
        for (let i = 0; i < value; i++) {
            return Array(value)
            .fill(<span className="dot"></span>)
        }
    }
    return (
        <div className={`die face${value}`}
        style={styles} 
        onClick={props.holdDice}>
            {dots()}
        </div>
    )
}
//#59E391