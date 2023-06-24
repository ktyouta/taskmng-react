import React from 'react';
import { Link } from "react-router-dom";
import './css/NotFoundComponent.css';

//引数の型
type porpType = {
    backUrl: string
}

function NotFoundComponent(props: porpType) {
    return (
        <div className="notfound">
            <h1>404 NOT FOUND</h1>
            <p>お探しのページが見つかりませんでした。</p>
            <Link to={props.backUrl}>Topに戻る</Link>
        </div>
    )
}

export default NotFoundComponent;