import axios, { AxiosError } from "axios"
import { environment } from "../app/environment/environment"
import { logout } from "../user/userService"

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
axios.defaults.headers.common["Content-Type"] = "application/json"

export interface Game {
    current_player: string
    board: string[]
    symbol: string
    winner: string
}

export async function newGame(): Promise<Game> {
    try {
        const res = (await axios.post(environment.backendUrl + "/v1/games")).data as Game
        return res
    } catch (err) {
        const axiosError = err as AxiosError
    
        if (axiosError.response && axiosError.response.status === 401) {
          void logout()
        }
        throw err
    }
    
}

export interface Square {
    square: number
}

export interface Movement {
    movement: Square
}

export interface PlayGame {
    current_player: string
    board: string[]
    game_over: boolean
    tied_game: boolean
    winner: string
}

export async function play(params:Movement): Promise<PlayGame> {
    try {
        const res = (await axios.post(environment.backendUrl + "/v1/games/play", params)).data as PlayGame
        return res
    } catch (err) {
        const axiosError = err as AxiosError
    
        if (axiosError.response && axiosError.response.status === 401) {
          void logout()
        }
        throw err
    }
}

export async function updateGame(): Promise<PlayGame> {
    try {
        const res = (await axios.get(environment.backendUrl + "/v1/games/current")).data as PlayGame
        return res
    } catch (err) {
        const axiosError = err as AxiosError
    
        if (axiosError.response && axiosError.response.status === 401) {
            void logout()
        }
        throw err
    }
}