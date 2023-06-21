import { NavLink } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget';
import Search from '../Search/Search';
import Categories from './Categories/Categories';
import DarkModeBtn from './DarkModeBtn/DarkModeBtn';
import { useDarkModeContext } from '../../context/DarkModeContext';
const Navbar = () => {
    const {darkMode} = useDarkModeContext()
    return (
        <nav className={`navbar navbar-expand-lg navbar-dark mb-3 ${darkMode ? 'bg-dark' : 'bg-primary'}`}>
            <div className="container-fluid">
                <NavLink className="navbar-brand" to={"/"}><img src="../logo.png" alt="LogoConfidenza" title="Logo Confidenza" className="d-inline-block align-text-center"/></NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/"}>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/contacto"}>Contacto</NavLink>
                        </li>
                        <Categories/>
                    </ul>
                    <Search busqueda={"Buscar Producto"}/>
                    <CartWidget/>
                    <DarkModeBtn/>
                </div>
            </div>
        </nav>


    );
}

export default Navbar;
