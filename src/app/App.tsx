import React from "react"
import { HashRouter, Route } from "react-router-dom"
import LoggedInRoute from "../common/components/LoggedInRoute"
import NewGame from "../games/Games"
import Info from "../info/Info"
import History from "../history/History"
import Login from "../user/Login"
import Password from "../user/Password"
import Register from "../user/Register"
import Welcome from "../welcome/Welcome"
import "./App.css"
import Menu from "./Menu"
import Toolbar from "./Toolbar"

export default function App() {
  return (
    <HashRouter>
      <table className="app_table">
        <thead>
          <tr className="app_toolbar">
            <td colSpan={2} >
              <Toolbar />
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="app_menu">
              <Menu />
            </td>
            <td id="content" className="app_content">
              <Route exact path="/" component={Welcome} />
              <Route exact path="/login" component={Login} />
              <Route path="/newUser" component={Register} />
              <LoggedInRoute path="/info" component={Info} />
              <LoggedInRoute path="/password" component={Password} />
              <LoggedInRoute path="/history" component={History} />
              <LoggedInRoute path="/games" component={NewGame}/>
            </td>
          </tr>
        </tbody>
      </table>
    </HashRouter >
  )
}
