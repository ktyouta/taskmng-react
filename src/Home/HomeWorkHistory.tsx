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


//外側のスタイル
const OuterDiv = styled.div<{ height: string, width: string }>`
    width: ${({ width }) => (width)};
    height: ${({ height }) => (height)};
    overflow: auto;
    overflow-x: hidden;
    margin-left: auto;
    margin-right: auto;
`;

//履歴表示エリアのスタイル
const WorkHistoryListUl = styled.ul`
    text-align: left;
    margin-left: 5%;
    margin-right: 10%;
`;

//URL列
const IdTd = styled.td<{ titleBgColor?: string }>`
    cursor:pointer;
    color: blue;
    text-decoration: underline;
`;

//テーブルヘッダ
const Th = styled.th<{ width: string }>`
    width: ${({ width }) => (width)};
`;

//タイトルのスタイル
const TitleDiv = styled.div`
    text-align:left;
    padding-left:10%;
`;


function HomeWorkHistory() {

    console.log("HomeWorkHistory render");

    //WorkHistoryのビジネスロジック
    const {
        isLoading,
        isError,
        tableWorkHistoryList,
    } = useHomeWorkHistory();

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
                {
                    tableWorkHistoryList &&
                    <Table
                        tableDatas={tableWorkHistoryList}
                    />
                }
            </OuterDiv>
        </React.Fragment>
    );
}

export default HomeWorkHistory;