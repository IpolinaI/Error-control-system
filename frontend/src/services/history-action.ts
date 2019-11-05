export enum HistoryAction {
    Creation = "Создание", 
    Opening = "Открытие", 
    Resolving = "Решение", 
    Closing = "Закрытие"
}

export const HistoryActions: HistoryAction[] = 
    [HistoryAction.Creation, HistoryAction.Opening, HistoryAction.Resolving, HistoryAction.Closing]