import { Link} from "react-router-dom";
import "./Navbar.scss";
export const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li><Link to="/list">Список чеков и квитанций</Link></li>
        <li><Link to="/">Регистрация чеков</Link></li>
        <li><Link to="/chart">Визуализация статистики</Link></li>
      </ul>
    </nav>
  )
}
