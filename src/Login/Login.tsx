import React from 'react';
import { Link } from "react-router-dom";
import ButtonComponent from '../Common/ButtonComponent';
import HorizonLabelInputComponent from '../Common/HorizonLabelInputComponent';
import useLoginLogic from './Hook/useLoginLogic';
import './css/Login.css'
import VerticalLabellInputComponent from '../Common/VerticalLabellInputComponent';
import SpaceComponent from '../Common/SpaceComponent';
import VerticalSpaceComponent from '../Common/VerticalSpaceComponent';
import LabelInputComponent from '../Common/LabelInputComponent';
import BaseInputComponent from '../Common/BaseInputComponent';
import { APP_TITLE } from '../Title';

function Login() {

    console.log("Login render");

    //ログインのビジネスロジック
    const {
        userIdRef,
        userPasswordRef,
        clickLoginBtn,
        handleKeyPress,
    } = useLoginLogic();

    return (
        <div className="login">
            <div className="login-area">
                <div className="login-title-area">{APP_TITLE}</div>
                <BaseInputComponent
                    value={""}
                    length={100}
                    disabled={false}
                    ref={userIdRef}
                    textWidth='100%'
                    onKeyDown={handleKeyPress}
                    placeholder='UserID'
                    autoComplete={true}
                />
                <VerticalSpaceComponent
                    space={'20px'}
                />
                <BaseInputComponent
                    type={"password"}
                    value={""}
                    length={100}
                    disabled={false}
                    ref={userPasswordRef}
                    textWidth='100%'
                    onKeyDown={handleKeyPress}
                    placeholder='Password'
                />
                <div className="login-button-area">
                    <ButtonComponent
                        styleTypeNumber="RUN"
                        title={"Login"}
                        onclick={clickLoginBtn}
                        style={{
                            "borderRadius": "23px",
                            "background": "black",
                            "fontSize": "1rem",
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Login;