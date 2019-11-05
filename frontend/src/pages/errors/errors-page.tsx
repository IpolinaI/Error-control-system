import React, { Component } from 'react';
import './errors-page.css';
import { Header } from '../../components/header';
import { Error } from '../../services/error';
import { ErrorPriorities } from '../../services/error-priority';
import { ErrorStatuses } from '../../services/error-status';
import { ErrorSeriousnesses } from '../../services/error-seriousness';
import { ErrorCellBlock } from '../../components/error-cell-block';

interface ErrorsPageState {
    errors: Error[];
}

export class ErrorsPage extends Component<any, ErrorsPageState> {
    constructor(props: any) {
        super(props);

        if (sessionStorage.getItem("userId") === null || 
        sessionStorage.getItem("userId") === "-1") {
            this.props.history.replace("enter");
        }

        this.state = {
            errors: []
        }

        this.getErrors();
    }

    getErrors() {
        const xhr = new XMLHttpRequest();
        
        xhr.onloadend = () => {
            const results = JSON.parse(xhr.response);
            
            this.setState({ errors: results });

            this.sortRows(this.sortByBriefDescriptionStrategy);
        };

        xhr.open('get', 'http://localhost/api/errors');
        xhr.send();
    }

    sortRows(sortFunction: (a: Error, b: Error) => number) {
        const sortedErrors: Error[] = this.state.errors.sort(sortFunction);
        
        this.setState({ errors: sortedErrors });
    }

    sortByBriefDescriptionStrategy = (a: Error, b: Error): number => 
        a.briefDescription.localeCompare(b.briefDescription);

    sortByFullDescriptionStrategy = (a: Error, b: Error): number => 
        a.fullDescription.localeCompare(b.fullDescription);

    sortByUserStrategy = (a: Error, b: Error): number => 
        a.userLogin.localeCompare(b.userLogin);

    sortByDateStrategy = (a: Error, b: Error): number => 
        this.customComparison(a, b, "creationDate");

    sortByPriorityStrategy = (a: Error, b: Error): number => 
        this.customComparison(a, b, "priority");

    sortBySeriousnessStrategy = (a: Error, b: Error): number => 
        this.customComparison(a, b, "seriousness");

    sortByStatusStrategy = (a: Error, b: Error): number => 
        this.customComparison(a, b, "status");

    customComparison(a: any, b: any, field: string): number {
        let result: number;
        
        if (a[field] > b[field])
            result = 1;

        if (a[field] < b[field])
            result = -1;
        else
            result = 0;

        return result;
    }

    render() {
        return (
            <>
                <Header/>
                <table className="errors__info">
                    <tbody>
                        <tr className="columns__names__row">
                            <td className="medium__error__cell">
                                <div 
                                    className="cell__block" 
                                    onClick={() => this.sortRows(this.sortByBriefDescriptionStrategy)}
                                >
                                    Краткое описание
                                </div>
                            </td>
                            <td className="main__error__cell">
                                <div                                     
                                    className="cell__block" 
                                    onClick={() => this.sortRows(this.sortByFullDescriptionStrategy)}
                                >
                                    Полное описание
                                </div>
                            </td>
                            <td className="medium__error__cell">
                                <div                                    
                                    className="cell__block" 
                                    onClick={() => this.sortRows(this.sortByDateStrategy)}
                                >
                                    Дата создания
                                </div>
                            </td>
                            <td className="simple__error__cell">
                                <div                                    
                                    className="cell__block" 
                                    onClick={() => this.sortRows(this.sortByPriorityStrategy)}
                                >
                                    Приоритет
                                </div>
                            </td>
                            <td className="simple__error__cell">
                                <div                                    
                                    className="cell__block" 
                                    onClick={() => this.sortRows(this.sortByStatusStrategy)}
                                >
                                    Статус
                                </div>
                            </td>
                            <td className="simple__error__cell">
                                <div                                    
                                    className="cell__block" 
                                    onClick={() => this.sortRows(this.sortBySeriousnessStrategy)}
                                >
                                    Серьезность
                                </div>
                            </td> 
                            <td className="simple__error__cell">
                                <div                                    
                                    className="cell__block" 
                                    onClick={() => this.sortRows(this.sortByUserStrategy)}
                                >
                                    Пользователь
                                </div>
                            </td> 
                        </tr>
                        {this.state.errors.map((error, key) => 
                            <tr key={key} className="error__row">
                                <td className="medium__error__cell">
                                    <ErrorCellBlock
                                        info = {error.briefDescription}
                                        errorId = {error.id}
                                    />
                                </td>
                                <td className="main__error__cell">
                                    <ErrorCellBlock
                                        info = {error.fullDescription}
                                        errorId = {error.id}
                                    />
                                </td>
                                <td className="medium__error__cell">
                                    <ErrorCellBlock
                                        info = {new Date(error.creationDate).toLocaleString()}
                                        errorId = {error.id}
                                    />
                                </td>
                                <td className="simple__error__cell">
                                    <ErrorCellBlock
                                        info = {ErrorPriorities[error.priority]}
                                        errorId = {error.id}
                                    />
                                </td>
                                <td className="simple__error__cell">
                                    <ErrorCellBlock
                                        info = {ErrorStatuses[error.status]}
                                        errorId = {error.id}
                                    />
                                </td>
                                <td className="simple__error__cell">
                                    <ErrorCellBlock
                                        info = {ErrorSeriousnesses[error.seriousness]}
                                        errorId = {error.id}
                                    />
                                </td>
                                <td className="simple__error__cell">
                                    <ErrorCellBlock
                                        info = {error.userLogin}
                                        errorId = {error.id}
                                    />
                                </td>
                            </tr>)}
                    </tbody>
                </table>
            </>
        )
    }
}