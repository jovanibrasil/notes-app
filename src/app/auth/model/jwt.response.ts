export interface JwtReponseData {
    token: string,
    //userName: string,
    //authorities: string[]
}

export interface JwtResponse {
    data: JwtReponseData,
    errors: String[]
}

export interface CustomResponse {
    data: string,
    errors: CustomError[]
}

export interface CustomError {
    code: number,
    message: string,
    objectName: string,
    status: string,
    errors: CustomErrorDetail[]
}

export interface CustomErrorDetail {
    field: string,
    message: string,
    parameter: string
}