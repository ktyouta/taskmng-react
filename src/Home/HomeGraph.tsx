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
import useHomeHistoryBarGraph from './Hook/useHomeHistoryBarGraph';
import BarGraphComponent from '../Common/BarGraphComponent';
import HomeHistoryBarGraph from './HomeHistoryBarGraph';
import useHomeGraph from './Hook/useHomeGraph';
import HomeHistoryLineGraph from './HomeHistoryLineGraph';
import VerticalSpaceComponent from '../Common/VerticalSpaceComponent';
import ComboComponent from '../Common/ComboComponent';


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

//引数の型
type propsType = {
    taskList: taskHistoryType[]
}


function HomeGraph(props: propsType) {

    console.log("HomeGraph render");

    const {
        selectYear,
        yearList,
        setSelectYear
    } = useHomeGraph({ ...props });

    return (
        <OuterDiv
            height="100%"
            width="42%"
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
            <ComboComponent
                combo={yearList ?? []}
                onChange={setSelectYear}
                initValue={selectYear}
                height='40px'
                width='240px'
            />
            年
            <HomeHistoryLineGraph
                taskList={props.taskList}
                selectYear={selectYear}
            />
            {/* <HomeHistoryBarGraph
                taskList={props.taskList}
            /> */}
        </OuterDiv>
    );
}

export default HomeGraph;