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
import SideStackBarGraphComponent from '../Common/SideStackBarGraphComponent';
import HomeStatusBarGraph from './HomeStatusBarGraph';
import { BAR_GRAPH_MODE } from './Const/HomeConst';
import HomePriorityBarGraph from './HomePriorityBarGraph';


//外側のスタイル
const OuterDiv = styled.div<{ height: string, width: string }>`
    width: ${({ width }) => (width)};
    height: ${({ height }) => (height)};
    overflow: auto;
    overflow-x: hidden;
    margin-left: auto;
    margin-right: auto;
`;


//引数の型
type propsType = {
    taskList: taskHistoryType[],
    selectYear: string,
    selectState: string,
}


function HomeHistoryBarGraph(props: propsType) {

    console.log("HomeHistoryBarGraph render");

    return (
        <React.Fragment>
            <OuterDiv
                height="35%"
                width="100%"
            >
                {
                    (() => {
                        switch (props.selectState) {
                            //状態
                            case BAR_GRAPH_MODE.STATUS:
                                return <HomeStatusBarGraph
                                    taskList={props.taskList}
                                    selectYear={props.selectYear}
                                    selectState={props.selectState}
                                />
                            //優先度
                            case BAR_GRAPH_MODE.PRIORITY:
                                return <HomePriorityBarGraph
                                    taskList={props.taskList}
                                    selectYear={props.selectYear}
                                    selectState={props.selectState}
                                />
                            default:
                                return (
                                    <React.Fragment></React.Fragment>
                                )
                        }
                    })()
                }
            </OuterDiv>
        </React.Fragment>
    );
}

export default HomeHistoryBarGraph;