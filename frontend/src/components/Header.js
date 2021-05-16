import { Link } from 'react-router-dom';
function Header(props) {
  return (
    <header className="header page__header">
      <div className="header__logo"></div>
      <ul className="header__list">
        <li className="header__item">{props.email}</li>
        <li className="header__item">
          <Link to={props.link} className={`header__link ${props.nameLink === 'Выйти' && 'header__link_color_grey'}`}
          onClick={props.onSignOut}>{props.nameLink}</Link>
        </li>
      </ul>
    </header>
  );
}
export default Header;
