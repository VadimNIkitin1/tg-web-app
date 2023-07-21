import { useTelegram } from "../../hooks/useTelegram";
import Button from "../Button/Button";
const tg = window.Telegram.WebApp;

const Header = () => {
  const { onClose, user } = useTelegram();

  return (
    <div className={"header"}>
      <Button onClick={onClose}>Закрыть</Button>
      <span className={"username"}>{user?.username}</span>
    </div>
  );
};
export default Header;
