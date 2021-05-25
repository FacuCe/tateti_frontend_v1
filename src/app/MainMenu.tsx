import React from "react"
import { NavLink } from "react-router-dom"
import "./Menu.css"
import { logout } from "../user/userService"

export default function MainMenu() {
  const logoutApp = async () => {
    await logout()
  }

  return (
    <div>
      <NavLink to="/info" className="menu_item btn btn-sm btn-link">Sesión</NavLink><br />
      <NavLink to="/password" className="menu_item btn btn-sm btn-link">Password</NavLink><br />
      <NavLink to="" onClick={logoutApp} className="menu_item btn btn-sm btn-link">Logout</NavLink><br />

      <h6 className="menu_section">Played Games</h6>
      <NavLink to="/history" className="menu_item btn btn-sm btn-link">History</NavLink><br />

      <h6 className="menu_section">Games</h6>
      <NavLink to="/games" className="menu_item btn btn-sm btn-link">Play</NavLink><br />
    </div>
  )
}

// BORRAR

// <h6 className="menu_section">Mascotas</h6>
// <NavLink to="/pets" className="menu_item btn btn-sm btn-link">Lista</NavLink><br />