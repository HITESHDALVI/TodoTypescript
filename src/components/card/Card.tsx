import {useTheme} from "../../utilis/context";
import "./card.css";

type cardProps = {children: JSX.Element; color?: string};
const Card = (props: cardProps) => {
  const theme = useTheme();
  return (
    <div
      className={`card ${theme && theme.theme ? "dark" : "light"}`}
      style={{color: props.color}}
    >
      {props.children}
    </div>
  );
};

export default Card;
