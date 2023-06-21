import { useState, useEffect } from "react";
//import { consultarBDD } from "../../assets/funciones";
import { useParams } from "react-router-dom";
import ItemDetail from "../ItemDetail/ItemDetail";
import { getProducto } from "../../assets/firebase";
import { useDarkModeContext } from "../../context/DarkModeContext";


const ItemDetailContainer = () => {
    const [producto, setProducto] = useState([]);
    const {id} = useParams()
    const {darkMode} = useDarkModeContext()
    useEffect(() => {
        getProducto(id).then(prod => setProducto(prod))
        
    }, []);

    return (
        <div className={`card mb-3 container itemDetail ${darkMode ? 'text-white bg-secondary' : 'border-light' }`}>
            <ItemDetail item={producto} />
        </div>
    );
}

export default ItemDetailContainer;
