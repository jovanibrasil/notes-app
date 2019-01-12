export interface JwtReponseData {
    token: string,
    //userName: string,
    //authorities: string[]
}

export interface JwtResponse {
    data: JwtReponseData,
    errors: string[]
}