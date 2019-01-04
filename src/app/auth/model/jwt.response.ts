export interface JwtReponseData {
    token: string
}

export interface JwtResponse {
    data: JwtReponseData,
    errors: string[]
}