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



function HomeWorkHistory() {

    console.log("HomeWorkHistory render");

    //WorkHistoryのビジネスロジック
    const {
        workDisplayList,
        isLoading,
        isError,
        workHistoryList,
        copyUrlToClipboard,
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
            {/* <WorkHistoryListUl>
                {workDisplayList}
            </WorkHistoryListUl> */}
            <OuterDiv
                height="95%"
                width="100%"
            >
                <div className="tablecomponent">
                    <table className="tablecomponent-table-tag">
                        <thead className="tablecomponent-thead">
                            <tr>
                                <th>
                                    ID
                                </th>
                                <th>
                                    タイトル
                                </th>
                                <th>
                                    作業内容
                                </th>
                                <th>
                                    作業ユーザー
                                </th>
                                <th>
                                    作業日時
                                </th>
                                <th>
                                    タスク詳細のURL
                                </th>
                            </tr>
                        </thead>
                        <tbody className="tablecomponent-tbody">
                            {
                                workHistoryList && workHistoryList.map((element) => {
                                    return (
                                        <tr>
                                            <td>
                                                {element.taskId}
                                            </td>
                                            <td>
                                                {
                                                    <AccordionComponent
                                                        text={'aaaaaaaaaaaaaaaaaaaaaaaaa'}
                                                    />
                                                }
                                            </td>
                                            <td>
                                                {element.editType}
                                            </td>
                                            <td>
                                                {element.userName}
                                            </td>
                                            <td>
                                                {element.time}
                                            </td>
                                            <IdTd onClick={() => { copyUrlToClipboard(element.url) }}>
                                                URLをコピー
                                            </IdTd>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </OuterDiv>
        </React.Fragment>
    );
}

export default HomeWorkHistory;