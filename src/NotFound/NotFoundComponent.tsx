import React from 'react';
import { Link } from "react-router-dom";
import './css/NotFoundComponent.css';

function NotFoundComponent() {
    return (
        <div className="notfound">
            <h1>404 NOT FOUND</h1>
            <p>お探しのページが見つかりませんでした。</p>
            <Link to="/">Topに戻る</Link>
        </div>
    )
}

export default NotFoundComponent;