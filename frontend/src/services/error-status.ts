export enum ErrorStatus {
    New = "Новая",
    Opened = "Открытая",
    Resolved = "Решенная",
    Closed = "Закрытая"
}

export const ErrorStatuses: ErrorStatus[] = 
    [ErrorStatus.New, ErrorStatus.Opened, ErrorStatus.Resolved, ErrorStatus.Closed]

export const StringErrorStatuses: string[] = 
    [ErrorStatus.New, ErrorStatus.Opened, ErrorStatus.Resolved, ErrorStatus.Closed]