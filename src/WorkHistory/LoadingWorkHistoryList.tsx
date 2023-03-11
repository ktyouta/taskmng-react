import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import '../App.css';
import { masterDataListContext } from '../Main/Main';
import useWorkHistory from './Hook/useWorkHistory';
import './css/WorkHistory.css';
import LabelComponent from '../Common/LabelComponent';
import Loading from '../Common/Loading';
import { userInfoContext } from '../Content/Content';


function LoadingWorkHistoryList() {

    //WorkHistoryのビジネスロジック
    const { workDisplayList, isLoading, isError } = useWorkHistory();

    //ローディング
    if (isLoading) {
        return <ul className='workhistory-ul-list'>Loading...</ul>;
    }

    //エラー
    if (isError) {
        return <ul className='workhistory-ul-list'>エラーが発生しました。</ul>;
    }

    return (
        <ul className='workhistory-ul-list'>
            {workDisplayList}
        </ul>
    );
}

export default LoadingWorkHistoryList;