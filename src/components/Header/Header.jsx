import { useTelegram } from "../../hooks/useTelegram.js";
import Button from "../Button/Button";

const Header = () => {
  const { onClose, user } = useTelegram();
  console.log(user);

  return (
    <div className={"header"}>
      <Button onClick={onClose}>Закрыть</Button>
      <span className={"username"}>{user?.username}</span>
    </div>
  );
};
export default Header;
