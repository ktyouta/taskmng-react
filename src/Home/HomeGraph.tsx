import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import '../App.css';
import LabelComponent from '../Common/LabelComponent';
import Loading from '../Common/Loading';
import useHomeWorkHistory from './Hook/useHomeWorkHistory';
import styled from 'styled-components';
import { BoldSpan, HeightDiv } from '../Common/StyledComponent/CommonStyledComponent';
import ENV from '../env.json';
import CenterLoading from '../Common/CenterLoading';
import AccordionComponent from '../Common/AccordionComponent';
import ButtonComponent from '../Common/ButtonComponent';
import Table from '../Common/Table';
import HomeHistoryContent from './HomeHistoryContent';
import useHomeHistory from './Hook/useHomeHistory';
import { taskHistoryType } from './Type/HomeType';
import BarGraphComponent from '../Common/BarGraphComponent';
import HomeHistoryBarGraph from './HomeHistoryBarGraph';
import useHomeGraph from './Hook/useHomeGraph';
import HomeHistoryLineGraph from './HomeHistoryLineGraph';
import VerticalSpaceComponent from '../Common/VerticalSpaceComponent';
import ComboComponent from '../Common/ComboComponent';
import SpaceComponent from '../Common/SpaceComponent';


//外側のスタイル
const OuterDiv = styled.div<{ height: string, width: string }>`
    width: ${({ width }) => (width)};
    height: ${({ height }) => (height)};
`;

//履歴表示エリアのスタイル
const TitleDiv = styled.div`
    text-align: left;
    margin-left: 5%;
`;

//タイトルのスタイル
const TitleBoldSpan = styled(BoldSpan)`
    font-size: 1.1rem;
`;

//コンボボックスエリアのスタイル
const ComboDiv = styled.div<{ height: string }>`
    display:flex;
    align-items: center;
    justify-content: center;
    height: ${({ height }) => (height)};
`;

//引数の型
type propsType = {
    taskList: taskHistoryType[],
    height: string,
    width: string,
}


function HomeGraph(props: propsType) {

    console.log("HomeGraph render");

    const {
        selectYear,
        yearList,
        setSelectYear,
        selectState,
        setSelectState,
        stateList
    } = useHomeGraph({ ...props });

    return (
        <OuterDiv
            height={props.height}
            width={props.width}
        >
            <VerticalSpaceComponent
                space='2%'
            />
            <TitleDiv>
                <LabelComponent
                    title={<TitleBoldSpan>タスクチャート</TitleBoldSpan>}
                />
            </TitleDiv>
            <VerticalSpaceComponent
                space='4%'
            />
            <ComboDiv
                height='7%'
            >
                対象年
                <SpaceComponent
                    space='2%'
                />
                <ComboComponent
                    combo={yearList ?? []}
                    onChange={setSelectYear}
                    initValue={selectYear}
                    height='100%'
                    width='25%'
                    minWidth='10px'
                />
                <SpaceComponent
                    space='1%'
                />
                年
                <SpaceComponent
                    space='4%'
                />
                ステータス
                <SpaceComponent
                    space='2%'
                />
                <ComboComponent
                    combo={stateList ?? []}
                    onChange={setSelectState}
                    initValue={selectState}
                    height='100%'
                    width='25%'
                    minWidth='10px'
                />
            </ComboDiv>
            <VerticalSpaceComponent
                space='2%'
            />
            <HomeHistoryLineGraph
                taskList={props.taskList}
                selectYear={selectYear}
                height="50%"
                width="90%"
            />
            <HomeHistoryBarGraph
                taskList={props.taskList}
                selectYear={selectYear}
                selectState={selectState}
                height="35%"
                width="100%"
            />
        </OuterDiv>
    );
}

export default HomeGraph;