export class IToast {
    message: string;
    keepAfterRouterChange: boolean;
    type: ToastTypeEnum;
    timer: number
}

export enum ToastTypeEnum {
    Success = "success", 
    Error = "danger", 
    Info = "info", 
    Warning = "warning"
}

export enum Timer {
    Short = 4000,
    Medium = 8000,
    Long = 16000
}