import { FC, useState } from "react";

export const LoginForm: FC = () => {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [userData, setUserData] = useState<{
        id: string;
        name: string;
        mail: string;
    } | null>(null);

    const submit = async () => {
        console.log("testsubmit is called");
        const response = await fetch("https://XXXXXXX/signin", {
            method: "POST",
            body: JSON.stringify({ mail, password }),
        });
        const body = await response.json();
        body && setUserData(body);
    };

    return (
        <div className="login-form">
            <h3 className="login-form-title">ログイン</h3>
            {userData && <h5>Welcome {userData.name} !</h5>}

            <label htmlFor="mail" className="login-form-label">
                メールアドレス
            </label>
            <input
                id="mail"
                type="text"
                className="login-form-input"
                onChange={(event) => setMail(event.target.value)}
                value={mail}
            />

            <label htmlFor="password" className="login-form-label">
                パスワード
            </label>
            <input
                id="password"
                type="password"
                className="login-form-input"
                onChange={(event) => setPassword(event.target.value)}
                value={password}
            />

            <button className="login-form-submit" onClick={submit}>
                ログインする
            </button>
        </div>
    );
};