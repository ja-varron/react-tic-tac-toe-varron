import './Components.css'

export default function CustomLetter(props) {
  // You can style or use SVGs for custom letters here
  if (props.value === 'X') {
    return <img src='/assets/letters/X.png' alt={props.value} />;
  }
  if (props.value === 'O') {
    return <img src='assets/letters/O.png' alt={props.value} />;
  }
  return null;
}