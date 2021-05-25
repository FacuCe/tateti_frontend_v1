import axios from "axios"
import { environment } from "../app/environment/environment"

export interface UserPlayedGame {
  user_id: number
  login: string
  player_symbol: string
}

export interface PlayedGame {
  id: number
  game_over: boolean
  tied_game: boolean
  winner: string
  users: UserPlayedGame[]
}

export async function loadPlayedGames(): Promise<PlayedGame[]> {
  return (await axios.get(environment.backendUrl + "/v1/games")).data as PlayedGame[]
}
