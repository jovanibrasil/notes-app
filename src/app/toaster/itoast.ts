export class IToast {
    message: string;
    keepAfterRouterChange: boolean;
    type: ToastTypeEnum
}

export enum ToastTypeEnum {
    Success = "success", 
    Error = "danger", 
    Info = "info", 
    Warning = "warning"
}