import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import '../App.css';
import LabelComponent from '../Common/LabelComponent';
import Loading from '../Common/Loading';
import useHomeWorkHistory from './Hook/useHomeWorkHistory';
import styled from 'styled-components';
import { HeightDiv } from '../Common/StyledComponent/CommonStyledComponent';



//履歴表示エリアのスタイル
const WorkHistoryListUl = styled.ul`
    text-align: left;
    margin-left: 5%;
    margin-right: 10%;
`;

const OunterDiv = styled.div`
    height: 85%;
    overflow-y: auto;
`;

function HomeWorkHistory() {

    console.log("HomeWorkHistory render");

    //WorkHistoryのビジネスロジック
    const {
        workDisplayList,
        isLoading,
        isError
    } = useHomeWorkHistory();

    //ローディング
    if (isLoading) {
        return <WorkHistoryListUl>Loading...</WorkHistoryListUl>;
    }

    //エラー
    if (isError) {
        return <WorkHistoryListUl>エラーが発生しました。</WorkHistoryListUl>;
    }

    return (
        <OunterDiv>
            <WorkHistoryListUl>
                {workDisplayList}
            </WorkHistoryListUl>
        </OunterDiv>
    );
}

export default HomeWorkHistory;