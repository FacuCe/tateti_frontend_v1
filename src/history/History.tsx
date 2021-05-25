import React, { useState, useEffect } from "react"
import { loadPlayedGames, PlayedGame } from "./historyService"
import "../styles.css"
import { useErrorHandler } from "../common/utils/ErrorHandler"
import FormTitle from "../common/components/FormTitle"
import GlobalContent from "../common/components/GlobalContent"
import { RouteComponentProps } from "react-router-dom"

import "./history.css"

export default function History(props:RouteComponentProps) {
  const [playedGames, setPlayedGames] = useState<PlayedGame[]>([])

  const errorHandler = useErrorHandler()

  const loadGames = async () => {
    try {
      const res = await loadPlayedGames()
      setPlayedGames(res)
    } catch (error) {
      errorHandler.processRestValidations(error)
    }
  }

  useEffect(() => {
    void loadGames()
  }, [])

  return(
    <GlobalContent>
      <FormTitle>Played Games</FormTitle>
      <table className="history-table">
        <thead className="history-thead">
          <tr>
            <td rowSpan={2} className="history-td">game id</td>
            <td rowSpan={2} className="history-td">game over?</td>
            <td rowSpan={2} className="history-td">tied game?</td>
            <td rowSpan={2} className="history-td">winner</td>
            <td colSpan={2} className="history-td">Me</td>
            <td colSpan={3} className="history-td">Opponent</td>
          </tr>
          <tr>
            <td className="history-td">id</td>
            <td className="history-td">symbol</td>
            <td className="history-td">id</td>
            <td className="history-td">login</td>
            <td className="history-td">symbol</td>
          </tr>
        </thead>
        <tbody>
          {playedGames.map((game, index) => {
            return(
              <tr key={index}>
                <td className="history-td">{game.id}</td>
                <td className="history-td">{game.game_over ? "yes" : "no"}</td>
                <td className="history-td">{game.tied_game ? "yes" : "no"}</td>
                <td className="history-td">{game.winner ? game.winner : "none"}</td>
                <td className="history-td">{game.users[0].user_id}</td>
                <td className="history-td">{game.users[0].player_symbol}</td>
                <td className="history-td">{game.users[1] ? game.users[1].user_id : "none"}</td>
                <td className="history-td">{game.users[1] ? game.users[1].login : "none"}</td>
                <td className="history-td">{game.users[1] ? game.users[1].player_symbol : "none"}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </GlobalContent>
  )
}