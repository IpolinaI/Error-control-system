import React, { Component } from 'react';
import './history-page.css';
import { Error } from '../../services/error';
import { Header } from '../../components/header';
import { StringErrorStatuses, ErrorStatus } from '../../services/error-status';
import { StringErrorPriorities } from '../../services/error-priority';
import { StringErrorSeriousnesses } from '../../services/error-seriousness';
import { HistoryActions } from '../../services/history-action';

interface HistoryPageState {
    error: Error | null;
    errorStatusInputValue: string;
    availableErrorStatuses: string[];
    showCommentField: boolean;
    commentInputValue: string;
    message: string;
}

export class HistoryPage extends Component<any, HistoryPageState> {
    constructor(props: any) {
        super(props);

        if (sessionStorage.getItem("userId") === null || 
            sessionStorage.getItem("userId") === "-1") {
            this.props.history.replace("enter");
        }

        this.state = {
            error: null,
            errorStatusInputValue: "",
            availableErrorStatuses: [],
            showCommentField: false,
            commentInputValue: "",
            message: ""
        };

        this.getError();
    }

    getError() {
        const xhr = new XMLHttpRequest();

        xhr.onloadend = () => {
            const result = JSON.parse(xhr.response);

            this.setState({ error: result, errorStatusInputValue: result.status });

            this.createErrorStatusesList(StringErrorStatuses[result.status]);
        };
    
        xhr.open('get', `http://localhost/api/errors/${this.props.match.params.id}`);
        xhr.send();
    }

    handleErrorStatusInputValueChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({ errorStatusInputValue: evt.target.value, showCommentField: true })

        this.createErrorStatusesList(evt.target.value);
    }

    handleCommentInputValueChange = (evt: React.ChangeEvent<HTMLInputElement>) => 
        this.setState({ commentInputValue: evt.target.value });

    handleSaveButtonClick = () => {
        if (this.state.commentInputValue === "") {
            this.setState({ message: "введите комментарий"});
        } else {
            const xhr = new XMLHttpRequest();

            xhr.onloadend = () => {
                const result: number = JSON.parse(xhr.response);

                if (result > 0) {
                    this.getError();
                    this.setState({ commentInputValue: "", showCommentField: false, 
                        message: "статус изменен" });
                } else {
                    this.setState({ message: "ошибка системы" }); 
                }
            };
    
            const reqbody = {
                Action: StringErrorStatuses.indexOf(this.state.errorStatusInputValue),
                comment: this.state.commentInputValue,
                errorId: this.state.error!.id,
                userId: Number(sessionStorage.getItem("userId"))
            };
    
            xhr.open('post', 'http://localhost/api/histories');
            xhr.setRequestHeader("Content-type", "application/json")
        
            xhr.send(JSON.stringify(reqbody));
        }
    }

    createErrorStatusesList(currStatus: string) {
        let newList: string[] = [];

        newList.push(currStatus);
        switch(currStatus) {
            case ErrorStatus.New:
                newList.push(ErrorStatus.Opened);
                break;
            case ErrorStatus.Opened:
                newList.push(ErrorStatus.Resolved);
                break;
            case ErrorStatus.Resolved:
                newList.push(ErrorStatus.Opened);
                newList.push(ErrorStatus.Closed);
        }

        this.setState({ availableErrorStatuses: newList });
    }

    render() {
        return (
            <>
                <Header/>
                {this.state.error && 
                    <div className="error__history__block">
                        <div className="error__structure__block">
                            <h1 className="error__header">{this.state.error.briefDescription}</h1>
                            <p>{new Date(this.state.error.creationDate).toLocaleString()}</p>
                            <p>Описание: {this.state.error.fullDescription}</p>
                            <select 
                                value={this.state.errorStatusInputValue}
                                onChange={this.handleErrorStatusInputValueChange}
                            >
                                {this.state.availableErrorStatuses.map((status, key) =>
                                <option key={key}>{status}</option>)}
                            </select>
                            {this.state.showCommentField && 
                                <>
                                    <input 
                                        type="text" 
                                        className="comment__field"
                                        value={this.state.commentInputValue}
                                        onChange={this.handleCommentInputValueChange}
                                    >
                                    </input>
                                    <button 
                                        className="save__button"
                                        onClick={this.handleSaveButtonClick}
                                    >
                                        сохранить
                                    </button>
                                </>}
                            <p>Приоритет: {StringErrorPriorities[this.state.error.priority]}</p>
                            <p>Серьезность: {StringErrorSeriousnesses[this.state.error.seriousness]}</p>
                            <p>Пользователь: {this.state.error.userLogin}</p>
                            <p className="result__message">{this.state.message}</p>
                        </div>
                        <div className="history__block">
                            <p>История</p>
                            <table className="history__info">
                                <tbody>
                                    <tr>
                                        <td className="simple__history__cell">Действие</td>
                                        <td className="main__history__cell">Коментарий</td>
                                        <td className="simple__history__cell">Пользователь</td>
                                    </tr>
                                    {this.state.error.histories && 
                                        this.state.error.histories.map((history, key) =>
                                        <tr className="history__row" key={key}>
                                            <td className="simple__history__cell">{HistoryActions[history.action]}</td>
                                            <td className="main__history__cell">{history.comment}</td>
                                            <td className="simple__history__cell">{history.userLogin}</td>
                                        </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>}
            </>
        )
    }
}