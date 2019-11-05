import React, { Component } from 'react';
import './creation-page.css';
import { Header } from '../../components/header';
import { ErrorPriorities, StringErrorPriorities } from '../../services/error-priority';
import { ErrorSeriousnesses, StringErrorSeriousnesses } from '../../services/error-seriousness';

interface CreationPageState {
    briefDescriptioInputValue: string;
    fullDescriptionInputValue: string;
    errorPriorityInputValue: string;
    errorSeriousnessInputValue: string;
    resultMessage: string;
}

export class CreationPage extends Component<any, CreationPageState> {
    constructor(props: any) {
        super(props);

        if (sessionStorage.getItem("userId") === null || 
            sessionStorage.getItem("userId") === "-1") {
            this.props.history.replace("enter");
        }

        this.state = {
            briefDescriptioInputValue: "",
            fullDescriptionInputValue: "",
            errorPriorityInputValue: ErrorPriorities[0],
            errorSeriousnessInputValue: ErrorSeriousnesses[0],
            resultMessage: ""
        };
    }

    handleSendButtonClick = () => {
        const xhr = new XMLHttpRequest();

        xhr.onloadend = () => {
            const result: number = JSON.parse(xhr.response);
            
            if (result > 0) {
                this.setState({ briefDescriptioInputValue: "", fullDescriptionInputValue: "",
                    errorPriorityInputValue: ErrorPriorities[0], 
                    errorSeriousnessInputValue: ErrorSeriousnesses[0],
                    resultMessage: "успешно добавлена" });
            } else {
                this.setState({ resultMessage: "ошибка системы" });
            }
        };

        const reqbody = {
            briefDescription: this.state.briefDescriptioInputValue,
            fullDescription: this.state.fullDescriptionInputValue,
            priority: StringErrorPriorities.indexOf(this.state.errorPriorityInputValue),
            seriousness: StringErrorSeriousnesses.indexOf(this.state.errorSeriousnessInputValue),
            userId: Number(sessionStorage.getItem("userId"))
        };

        xhr.open('post', 'http://localhost/api/errors');
        xhr.setRequestHeader("Content-type", "application/json")
    
        xhr.send(JSON.stringify(reqbody));
    }

    handleBriefDescriptioInputValueChange = (evt: React.ChangeEvent<HTMLInputElement>) => 
        this.setState({ briefDescriptioInputValue: evt.target.value });

    handleFullDescriptionInputValueChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => 
        this.setState({ fullDescriptionInputValue: evt.target.value })

    handleErrorPriorityInputValueChange = (evt: React.ChangeEvent<HTMLSelectElement>) => 
        this.setState({ errorPriorityInputValue: evt.target.value })

    handleErrorSeriousnessInputValueChange = (evt: React.ChangeEvent<HTMLSelectElement>) => 
        this.setState({ errorSeriousnessInputValue: evt.target.value })

    render() {
        return (
            <>
                <Header/>
                <div className="creation__block">
                    <div>
                        <p className="enter__input">Краткое описание:</p>
                        <input 
                            value={this.state.briefDescriptioInputValue}
                            type="text"
                            className="description__input"
                            onChange={this.handleBriefDescriptioInputValueChange}
                        >
                        </input>
                    </div>
                    <div>
                        <p className="enter__input">Полное описание:</p>
                        <textarea 
                            value={this.state.fullDescriptionInputValue}
                            className="full__descriprion description__input"
                            onChange ={this.handleFullDescriptionInputValueChange}
                        >
                        </textarea>
                    </div>
                    <div>
                        <p className="enter__input">Приоритет:</p>
                        <select 
                            value={this.state.errorPriorityInputValue}
                            onChange={this.handleErrorPriorityInputValueChange}
                        >
                            {ErrorPriorities.map((priority, key) =>
                            <option key={key}>{priority}</option>)}
                        </select>
                    </div>
                    <div>
                        <p className="enter__input">Серьезность:</p>
                        <select 
                            value={this.state.errorSeriousnessInputValue}
                            onChange={this.handleErrorSeriousnessInputValueChange}
                        >
                            {ErrorSeriousnesses.map((seriousnesses, key) =>
                            <option key={key}>{seriousnesses}</option>)}
                        </select>
                    </div>
                    <button 
                        className="send__button" 
                        onClick={this.handleSendButtonClick}
                    >
                        добавить
                    </button>
                    <p className="result__message">{this.state.resultMessage}</p>
                </div>
            </>
        )
    }
}