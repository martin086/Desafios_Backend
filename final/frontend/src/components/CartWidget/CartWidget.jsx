import { Link } from 'react-router-dom'
import { useCarritoContext } from '../../context/CarritoContext'

const CartWidget = () => {
  const {getItemQuantity} = useCarritoContext()
  
  return (
    <>
      <button className="btn btn-primary active mx-2">
        <Link className="nav-link active" to={"/cart"}>
          <i className="fa-solid fa-cart-shopping"></i>
          {getItemQuantity() > 0 && <span className="cantCarrito">{getItemQuantity()}</span>}
        </Link>
      </button>
    </>  
      
  )
}

export default CartWidget;