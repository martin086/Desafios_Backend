import { useState, useEffect } from "react";
import ItemList from "../ItemList/ItemList";
//import { consultarBDD } from "../../assets/funciones.js";
import { useParams } from "react-router-dom";
import { cargarBDD, getProductos, getProducto, updateProducto, deleteProducto } from "../../assets/firebase";

//Consultar BDD
const ItemListContainer = () => {

    const [productos, setProductos] = useState([]);
    const {category} = useParams()
    useEffect(() => {
        if(category) {
          getProductos().then(products => {
            const productsList = products.filter(prod => prod.stock > 0).filter(prod => prod.idCategoria === parseInt(category)).sort((p1, p2) => p1.idCategoria - p2.idCategoria);
            const cardProductos = ItemList({productsList})
            //const prodSort = cardProductos.sort((p1, p2) => p1.idCategoria - p2.idCategoria)
            setProductos(cardProductos);
          })
        } else {
          getProductos().then(products => {
            const productsList = products.filter(prod => prod.stock > 0)
            const cardProductos = ItemList({productsList})
            //const prodSort = cardProductos.sort((p1, p2) => p1.idCategoria - p2.idCategoria)
            setProductos(cardProductos);
          })
        }

        /*
        getProducto("4yGGt8Rm1qtu9ECpRU3C").then(prod => {
                prod.stock -= 16
                delete prod.id
                updateProducto("4yGGt8Rm1qtu9ECpRU3C", prod).then(estado => console.log(estado))
        */

        //cargarBDD().then(productos => console.log(productos))
        //getProductos().then(productos => console.log(productos))
        //Example id:"0HwKdXD7EbLCwKZfSr9n"
        //getProducto("0HwKdXD7EbLCwKZfSr9n").then(prod => console.log(prod))
        
          
    }, [category]);
    console.log(productos);
    
    return (
        
          <div className="row cardProductos card-img-top">
              {productos}
          </div>
        

    );
}

export default ItemListContainer;
