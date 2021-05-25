import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from "react-router-dom"
import GlobalContent from '../common/components/GlobalContent'
import FormTitle from "../common/components/FormTitle"
import { useErrorHandler } from "../common/utils/ErrorHandler"
import { newGame, play, updateGame } from "./gameService"

import "./board.css"

const Games = (props: RouteComponentProps) => {

    const [board, setBoard] = useState(Array(9).fill(''))
    const [symbol, setSymbol] = useState('')
    const [currentPlayer, setCurrentPlayer] = useState('')
    const [winner, setWinner] = useState('')
    const [gameOver, setGameOver] = useState(false)
    const [tiedGame, setTiedGame] = useState(false)

    const [boardActive, setBoardActive] = useState(true)
    const [activeGame, setActiveGame] = useState(false)
    const errorHandler = useErrorHandler()

    const findGame = async () => {
        errorHandler.cleanRestValidations()
        try {
            const game = await newGame()
            console.log(game)
            setBoard(game.board)
            setSymbol(game.symbol)
            setCurrentPlayer(game.current_player)
            setWinner(game.winner)
            setActiveGame(true)
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    const squareClick = async (index: number) => {
        errorHandler.cleanRestValidations()
        try {
            const playGame = await play({movement: {square: index}})
            console.log(playGame)
            setBoard(playGame.board)
            setCurrentPlayer(playGame.current_player)
            setGameOver(playGame.game_over)
            setTiedGame(playGame.tied_game)
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    const getGame = async () => {
        errorHandler.cleanRestValidations()
        try {
            const game = await updateGame()
            setBoard(game.board)
            setCurrentPlayer(game.current_player)
            setGameOver(game.game_over)
            setTiedGame(game.tied_game)
            setWinner(game.winner)
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    useEffect(() => {
        let timerID = setInterval( () => getGame(), 1000 );
        enableOrDisableBoard()
        return function cleanup() {
            clearInterval(timerID);
        };
    });

    const enableOrDisableBoard = () => {
        if (symbol == currentPlayer && !gameOver) {
            setBoardActive(false)
        } else {
            setBoardActive(true)
        }
    }


    return (
        <GlobalContent>
            <FormTitle>Games</FormTitle>
            <div className="board">
            
                {activeGame
                    ? board.map((square, index) => {
                        return (
                            <button disabled={boardActive} className="buttonStyle" type="button" key={index} onClick={() => { squareClick(index) }}>
                                {square}
                            </button>
                        );
                    })
                    : <button className="findGameButton" type="button" onClick={ () => { findGame() } }>Encontrar juego</button>
                }
            </div>
            {activeGame
                ? <table className="info">
                    <caption className="caption">Game Info</caption>
                    <tr>
                        <td className="info-item">Symbol</td>
                        <td className="info-item">Current Player</td>
                        <td className="info-item">GameOver?</td>
                        <td className="info-item">Winner</td>
                        <td className="info-item">TiedGame?</td>
                    </tr>
                    <tr>
                        <td className="info-item">{symbol}</td>
                        <td className="info-item">{currentPlayer}</td>
                        <td className="info-item">{gameOver ? 'yes' : 'no'}</td>
                        <td className="info-item">{winner ? winner : "none"}</td>
                        <td className="info-item">{tiedGame  ? 'yes' : 'no'}</td>
                    </tr>
                  </table>
                : null
            }
        </GlobalContent>
    )
}

export default Games
