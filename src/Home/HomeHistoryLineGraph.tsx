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
import { barGraphTaskListType, taskHistoryType } from './Type/HomeType';
import useHomeHistoryBarGraph from './Hook/useHomeHistoryBarGraph';
import BarGraphComponent from '../Common/BarGraphComponent';
import LineGraphComponent from '../Common/LineGraphComponent';


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
    taskGraphDatas: barGraphTaskListType[]
}


function HomeHistoryLineGraph(props: propsType) {

    console.log("HomeHistoryLineGraph render");

    const {

    } = HomeHistoryLineGraph({ ...props });

    return (
        <React.Fragment>
            <OuterDiv
                height="90%"
                width="90%"
            >
                <LineGraphComponent
                    list={props.taskGraphDatas}
                    xKey={'Month'}
                    yKey={'num'}
                    graphWidth={0}
                    graphHeight={0}
                    outerWidth={''}
                    outerHeight={''}
                    type={undefined}
                />
            </OuterDiv>
        </React.Fragment>
    );
}

export default HomeHistoryLineGraph;