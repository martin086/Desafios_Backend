import { Link } from "react-router-dom";
import { useCarritoContext } from "../../context/CarritoContext";
import { useDarkModeContext } from "../../context/DarkModeContext";

const Cart = () => {
    const {darkMode} = useDarkModeContext()
    const {carrito, emptyCart, totalPrice, removeItem} = useCarritoContext()
    return (
        <>
            {carrito.length === 0 ?
            <>
                <h1 className={`mx-3 ${darkMode ? 'text-light' : 'text-dark'}`}>Carrito vacío</h1>
                <button className={`mx-3 btn mx-1 ${darkMode ? 'btn-secondary' : 'btn-warning'}`}><Link className="nav-link" to={"/"}>Continuar comprando</Link></button>
            </>
            :
            <div className="container cartContainer">
                {
                    carrito.map(prod => 
                        <div className="card mb-3" key={prod.id} style={{maxWidth: '26rem'}}>
                            <div className="row g-0 justify-content-center">
                                <div className="col-md-4">
                                    <img src={prod.imagen} alt="Producto" className="img-fluid rounded-start my-3" />
                                </div>
                            </div>
                            <div className="col-md">
                                <div className={`card-body ${darkMode ? 'cardBodyDark' : 'cardBody' }`}>
                                    <h5 className="card-title">{`${prod.nombre} ${prod.tipo}`}</h5>
                                    <p className="card-text">Cantidad: {prod.cant}</p>
                                    <p className="card-text">Precio Unitario: ${new Intl.NumberFormat('de-De').format(prod.precio)}</p>
                                    <p className="card-text">Valor Total: ${new Intl.NumberFormat('de-De').format(prod.precio * prod.cant)}</p>
                                </div>
                                <button className="btn btn-danger m-2" onClick={() => removeItem(prod.id)}>Eliminar Producto</button>
                            </div>
                        </div>    
                    )
                }
                
                <div className={`border ${darkMode ? 'border-light' : 'border-dark'}`} style={{maxWidth: '25rem'}}>
                    <p className={`d-flex justify-content-center fw-bold m-1 ${darkMode ? 'text-light' : 'text-dark'}`}>Resumen de Compra: ${new Intl.NumberFormat('de-De').format(totalPrice())}</p>
                    <div className="container d-flex justify-content-center">
                    <button className="btn m-1 btn-danger" onClick={emptyCart}><i className="me-2 fa-solid fa-cart-arrow-down"></i>Vaciar</button>
                    <button className={`btn m-1 ${darkMode ? 'btn-secondary' : 'btn-warning'}`}><i className="fa-solid fa-basket-shopping"></i><Link className="nav-link" to={"/"}>Agregar</Link></button>
                    <button className={`btn m-1 ${darkMode ? 'btn-primary' : 'btn-success'}`}><i className="fa-solid fa-money-bill"></i><Link className="nav-link" to={"/checkout"}>Checkout</Link></button>
                    </div>
                </div>    
            </div>
            }
        </>
    );
}

export default Cart;
