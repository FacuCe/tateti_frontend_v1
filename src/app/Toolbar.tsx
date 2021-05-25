import React from "react"
import "./Toolbar.css"
import { useSessionUser } from "../store/userStore"

export default function Toolbar() {
  const user = useSessionUser()

  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark d-flex shadow">
      <div className="toolbar_title navbar-brand flex-grow-1">
        Programación Avanzada - TP1 {user ? " - " + user.name : ""}
      </div>
    </nav>
  )
}
