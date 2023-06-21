import React from 'react'

export default function Search({busqueda}) {
  return (
    <form className="d-flex mx-4">
        <input className="form-control me-sm-2" type="text" placeholder={busqueda} aria-label="Search" />
        <button className="btn btn-secondary my-2 my-sm-0" type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
    </form>
  )
}
