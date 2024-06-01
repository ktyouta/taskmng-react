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
import { taskHistoryType } from './Type/HomeType';
import useHomeHistoryBarGraph from './Hook/useHomeHistoryBarGraph';
import BarGraphComponent from '../Common/BarGraphComponent';
import HomeHistoryBarGraph from './HomeHistoryBarGraph';
import useHomeGraph from './Hook/useHomeGraph';
import HomeHistoryLineGraph from './HomeHistoryLineGraph';


//外側のスタイル
const OuterDiv = styled.div<{ height: string, width: string }>`
    width: ${({ width }) => (width)};
    height: ${({ height }) => (height)};
    overflow: auto;
    overflow-x: hidden;
`;


//引数の型
type propsType = {
    taskList: taskHistoryType[]
}


function HomeGraph(props: propsType) {

    console.log("HomeGraph render");

    const {
        taskGraphDatas
    } = useHomeGraph({ ...props });

    return (
        <React.Fragment>
            <OuterDiv
                height="90%"
                width="40%"
            >
                {/* <HomeHistoryLineGraph
                    taskGraphDatas={taskGraphDatas}
                /> */}
                <HomeHistoryBarGraph
                    taskList={props.taskList}
                />
            </OuterDiv>
        </React.Fragment>
    );
}

export default HomeGraph;