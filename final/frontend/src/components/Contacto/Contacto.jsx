import React from 'react';
import { useDarkModeContext } from "../../context/DarkModeContext";

const Contacto = () => {
    const {darkMode} = useDarkModeContext()
    return (
        <div className='mx-3'>
            <h1 className={`${darkMode ? 'text-light' : 'text-dark'}`}>Nosotros</h1>
            <p>Te contamos un poco sobre nuestra empresa.</p>
            <ul>
                <li>Quienes somos.</li>
                <li>Qué productos y servicios comercializamos.</li>
                <li>Dónde estamos.</li>
                <li>Etc...</li>
            </ul>
        </div>
    );
}

export default Contacto;
