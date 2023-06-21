import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createOC, getOC, getProducto, updateProducto } from '../../assets/firebase';
import { useCarritoContext } from '../../context/CarritoContext';
import { toast } from 'react-toastify';
import OrderForm from './Form/Form';

const Checkout = () => {

    const {totalPrice, carrito, emptyCart} = useCarritoContext();

    let navigate = useNavigate();

    const consultarFormulario = (cliente) => {
        const aux = [...carrito]
        aux.forEach(prodCarrito => {
            getProducto(prodCarrito.id).then(prodBDD => {
                if(prodBDD.stock >= prodCarrito.cant) {
                    prodBDD.stock -= prodCarrito.cant
                    updateProducto(prodCarrito.id, prodBDD)
                } else {
                    toast.error(`El producto ${prodBDD.nombre} no tiene stock disponible.`)
                    emptyCart() //removeItem(prodBDD.id)
                    navigate("/")
                }
            })
        })

        createOC(cliente, totalPrice(), new Date().toISOString().slice(0,10), carrito).then(ordenCompra => {
            getOC(ordenCompra.id).then(item => {
                toast.success(`¡Gracias por su compra! Su n° de orden es: ${item.id}`)
                emptyCart()
                navigate("/")
            }).catch(error => {
                toast.error("Su orden no pudo ser generada.")
                console.log(error)
            })
        })
        console.log(cliente)
        
    }

    return (
        <div className="container">
            <OrderForm sendOrder={consultarFormulario}/>
        </div>
    );
}

export default Checkout;
