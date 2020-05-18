export interface JwtResponse {
    token: string
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