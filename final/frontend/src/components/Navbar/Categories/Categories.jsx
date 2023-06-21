import {Link} from 'react-router-dom';

const Categories = () => {

  return (
    <li className="nav-item dropdown">
        <Link className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Categorías</Link>
        <div className="dropdown-menu">
          <li><button className="dropdown-item"><Link className='nav-link btn btn-secondary' to={"/category/1"}>Caño de Cobre</Link></button></li>  
          <li><button className="dropdown-item"><Link className='nav-link btn btn-secondary' to={"/category/2"}>Aislación</Link></button></li>  
          <li><button className="dropdown-item"><Link className='nav-link btn btn-secondary' to={"/category/3"}>Gases Refrigerantes</Link></button></li>  
          <li><button className="dropdown-item"><Link className='nav-link btn btn-secondary' to={"/category/4"}>Cable Taller</Link></button></li>  
          <li><button className="dropdown-item"><Link className='nav-link btn btn-secondary' to={"/category/5"}>Manguera Cristal</Link></button></li>  
          <li><button className="dropdown-item"><Link className='nav-link btn btn-secondary' to={"/category/6"}>Cintas PVC</Link></button></li>  
          <li><button className="dropdown-item"><Link className='nav-link btn btn-secondary' to={"/category/7"}>Ménsulas</Link></button></li>  
          <li><button className="dropdown-item"><Link className='nav-link btn btn-secondary' to={"/category/8"}>Motocompresores</Link></button></li>  
          <li><button className="dropdown-item"><Link className='nav-link btn btn-secondary' to={"/category/9"}>Herramientas</Link></button></li>  
          <li><button className="dropdown-item"><Link className='nav-link btn btn-secondary' to={"/category/10"}>Accesorios</Link></button></li>  
          <li><button className="dropdown-item"><Link className='nav-link btn btn-secondary' to={"/category/11"}>Varios</Link></button></li>  
          <li><button className="dropdown-item"><Link className='nav-link btn btn-secondary' to={"/category/12"}>Aire Acondicionado</Link></button></li>  
          <div className="dropdown-divider" />
          <li><button className="dropdown-item"><Link className="nav-link btn btn-dark" to="/">Ver Todas</Link></button></li>
        </div>
    </li>
  );
}

export default Categories