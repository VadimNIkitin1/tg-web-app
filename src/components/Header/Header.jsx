import { useTelegram } from "../../hooks/useTelegram.js";
import Button from "../Button/Button";
import "./Header.css";

const Header = () => {
  const { onClose, user } = useTelegram();

  return (
    <div className={"header"}>
      <Button onClick={onClose}>Закрыть</Button>
      <span className={"username"}>{user?.first_name}</span>
    </div>
  );
};
export default Header;
