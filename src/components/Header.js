import { AiOutlineMenu } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const handleClick = () => {
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (!navbarToggler.classList.contains('collapsed')) navbarToggler.click();
  };
  return (
    <header>
      <nav className="navbar navbar-expand-md bg-light fixed-top">
        <div className="container-fluid">
          <span className="navbar-brand">Encrypt - Decrypt</span>
          <button
            className="navbar-toggler collapsed asdf asdf2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <AiOutlineMenu className="fs-3" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink to="/" activeClassName="active-link" onClick={handleClick} exact>
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/encrypt" activeClassName="active-link" onClick={handleClick} exact>
                  Encrypt
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/decrypt" activeClassName="active-link" onClick={handleClick} exact>
                  Decrypt
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
