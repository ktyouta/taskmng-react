import React from 'react';
import { Link } from "react-router-dom";
import ButtonComponent from '../Common/ButtonComponent';
import HorizonLabelInputComponent from '../Common/HorizonLabelInputComponent';
import useLoginLogic from './Hook/useLoginLogic';
import './css/Login.css'
import VerticalLabellInputComponent from '../Common/VerticalLabellInputComponent';
import SpaceComponent from '../Common/SpaceComponent';
import VerticalSpaceComponent from '../Common/VerticalSpaceComponent';

function Login() {

    //ログインのビジネスロジック
    const { userIdRef, userPassword, clickLoginBtn, clickClearBtn } = useLoginLogic();

    return (
        <div className="login">
            <div className="login-area">
                <div className="login-title-area">RLMNT</div>
                <VerticalLabellInputComponent
                    title={"ユーザーID"}
                    value={""}
                    lenght={100}
                    disabled={false}
                    ref={userIdRef}
                    textWidth={"350px"}
                />
                <VerticalSpaceComponent
                    space={'15px'}
                />
                <VerticalLabellInputComponent
                    title={"パスワード"}
                    type={"password"}
                    value={""}
                    lenght={100}
                    disabled={false}
                    ref={userPassword}
                    textWidth={"350px"}
                />
                <div className="login-button-area">
                    <ButtonComponent
                        styleTypeNumber="RUN"
                        title={"クリア"}
                        onclick={clickClearBtn}
                    />
                    <SpaceComponent
                        space={"12%"}
                    />
                    <ButtonComponent
                        styleTypeNumber="RUN"
                        title={"ログイン"}
                        onclick={clickLoginBtn}
                    />
                </div>
            </div>
        </div>
    )
}

export default Login;