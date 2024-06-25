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

//引数の型
type propsType = {
    height: string,
    width: string,
}

function HomeHistory(props: propsType) {

    console.log("HomeHistory render");

    //WorkHistoryのビジネスロジック
    const {
        isLoading,
        isError,
        taskList,
        selectYear,
        setSelectYear,
        orgTaskList,
        setOrgTaskList,
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
                height={props.height}
                width={props.width}
            >
                <HomeHistoryContentList
                    taskList={taskList}
                    height="100%"
                    width="58%"
                />
                <HomeGraph
                    taskList={taskList}
                    selectYear={selectYear}
                    setSelectYear={setSelectYear}
                    orgTaskList={orgTaskList}
                    setOrgTaskList={setOrgTaskList}
                    height="100%"
                    width="42%"
                />
            </OuterDiv>
        </React.Fragment>
    );
}

export default HomeHistory;