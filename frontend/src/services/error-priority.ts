export enum ErrorPriority {
    VeryHigh = "Oчень высокий",
    High = "Высокий",
    Medium = "Средний",
    Low = "Низкий"
};

export const ErrorPriorities: ErrorPriority[] = 
    [ErrorPriority.VeryHigh, ErrorPriority.High, ErrorPriority.Medium, ErrorPriority.Low];

export const StringErrorPriorities: string[] = 
    [ErrorPriority.VeryHigh, ErrorPriority.High, ErrorPriority.Medium, ErrorPriority.Low];