import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import '../App.css';
import LabelComponent from '../Common/LabelComponent';
import Loading from '../Common/Loading';
import useHomeWorkHistory from './Hook/useHomeWorkHistory';
import styled from 'styled-components';
import { HeightDiv } from '../Common/StyledComponent/CommonStyledComponent';
import ENV from '../env.json';
import CenterLoading from '../Common/CenterLoading';
import AccordionComponent from '../Common/AccordionComponent';
import ButtonComponent from '../Common/ButtonComponent';
import Table from '../Common/Table';
import HomeHistoryContent from './HomeHistoryContent';
import useHomeHistory from './Hook/useHomeHistory';
import HomeHistoryContentList from './HomeHistoryContentList';
import HomeGraph from './HomeGraph';


//外側のスタイル
const OuterDiv = styled.div<{ height: string, width: string }>`
    width: ${({ width }) => (width)};
    height: ${({ height }) => (height)};
    display:flex;
`;

//履歴表示エリアのスタイル
const WorkHistoryListUl = styled.ul`
    text-align: left;
    margin-left: 5%;
    margin-right: 10%;
`;


function HomeHistory() {

    console.log("HomeHistory render");

    //WorkHistoryのビジネスロジック
    const {
        isLoading,
        isError,
        taskList,
    } = useHomeHistory();

    //ローディング
    if (isLoading) {
        return <CenterLoading />;
    }

    //エラー
    if (isError) {
        return <WorkHistoryListUl>エラーが発生しました。</WorkHistoryListUl>;
    }

    return (
        <React.Fragment>
            <OuterDiv
                height="90%"
                width="90%"
            >
                <HomeHistoryContentList
                    taskList={taskList}
                />
                <HomeGraph
                    taskList={taskList}
                />
            </OuterDiv>
        </React.Fragment>
    );
}

export default HomeHistory;