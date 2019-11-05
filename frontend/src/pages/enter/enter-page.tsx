import React, { Component } from 'react';
import './enter-page.css';

interface EnterPageState {
    isSignInEnter: boolean;
    signInStyle: string;
    logInStyle: string;
    loginInputValue: string;
    passwordInputValue: string;
    errorMessage: string;
}

export class EnterPage extends Component<any, EnterPageState> {
    constructor(props: any) {
        super(props);

        sessionStorage.setItem("userId", "-1");

        this.state = {
            isSignInEnter: true,
            signInStyle: "active__sign",
            logInStyle: "",
            loginInputValue: "",
            passwordInputValue: "",
            errorMessage: ""
        }
    }

    handleSignInClick = () =>
        this.setState({ isSignInEnter: true, signInStyle: "active__sign",
            logInStyle: "", errorMessage: "" });

    handleLogInClick = () => 
        this.setState({ isSignInEnter: false, signInStyle: "",
            logInStyle: "active__sign", errorMessage: "" });

    handleLoginIputValueChange = (evt: React.ChangeEvent<HTMLInputElement>) => 
        this.setState({ loginInputValue: evt.target.value });

    handlePasswordIputValueChange = (evt: React.ChangeEvent<HTMLInputElement>) => 
        this.setState({ passwordInputValue: evt.target.value })

    handleSendButtonClick = () => {
        let errorMessage: string;
        const xhr = new XMLHttpRequest();

        xhr.onloadend = () => {
            const result: number = JSON.parse(xhr.response);
            
            if (result > 0) {
                sessionStorage.setItem("userId", result.toString());
                this.props.history.replace(""); 
            } else {
                this.setState({ errorMessage: errorMessage });
            }
        };

        if (this.state.isSignInEnter) {
            errorMessage = "пользователь уже существует";

            const reqbody = {
                login: this.state.loginInputValue,
                password: this.state.passwordInputValue
            };
    
            xhr.open('post', 'http://localhost/api/users');
            xhr.setRequestHeader("Content-type", "application/json")
        
            xhr.send(JSON.stringify(reqbody));
        } else {
            errorMessage = "введен неверный логин или пароль";

            xhr.open('get', 
                `http://localhost/api/users/${this.state.loginInputValue}/${this.state.passwordInputValue}`);

            xhr.send();
        }
    }

    render() {
        return (
            <div className="enter__block">
                <h1 
                    className={`enter__sign ${this.state.logInStyle}`} 
                    onClick={this.handleLogInClick}
                >
                    ВОЙТИ
                </h1>
                <h1 
                    className={`enter__sign ${this.state.signInStyle}`}  
                    onClick={this.handleSignInClick}
                >
                    ЗАРЕГИСТРИРОВАТЬСЯ
                </h1>
                <div>
                    <p className="enter__input">логин:</p>
                    <input 
                        value={this.state.loginInputValue} 
                        type="text"
                        onChange={this.handleLoginIputValueChange}
                    >
                    </input>
                </div>
                <div>
                    <p className="enter__input">пароль:</p>
                    <input 
                        value={this.state.passwordInputValue} 
                        type="password"
                        onChange={this.handlePasswordIputValueChange}
                    >
                    </input>
                </div>
                <button 
                    className="enter__button" 
                    onClick={this.handleSendButtonClick}
                >
                    отправить
                </button>
                <p className="error__message">{this.state.errorMessage}</p>
            </div>
        )
    }
}