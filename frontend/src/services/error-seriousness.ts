export enum ErrorSeriousness {
    Critical = "Критичная",
    Significant = "Значительная",
    Insignificant = "Незначительная",
    ChangeRequest = "Запрос на изменение"
};

export const ErrorSeriousnesses: ErrorSeriousness[] = 
    [ErrorSeriousness.Critical, ErrorSeriousness.Significant, ErrorSeriousness.Insignificant, ErrorSeriousness.ChangeRequest];

export const StringErrorSeriousnesses: string[] = 
    [ErrorSeriousness.Critical, ErrorSeriousness.Significant, ErrorSeriousness.Insignificant, ErrorSeriousness.ChangeRequest]