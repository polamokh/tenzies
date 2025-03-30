export default function Dice(props) {
  const styles = { backgroundColor: props.isHeld ? "#59E391" : "#FFFFFF" };

  return (
    <button
      className="dice"
      style={styles}
      onClick={props.hold}
      aria-label={`Die with value ${props.value}, 
    ${props.isHeld ? "held" : "not held"}`}
    >
      {props.value}
    </button>
  );
}
