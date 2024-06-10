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
}


function HomeHistoryBarGraph(props: propsType) {

    console.log("HomeHistoryBarGraph render");

    const {
        barTaskList
    } = useHomeHistoryBarGraph({ ...props });

    return (
        <React.Fragment>
            <OuterDiv
                height="90%"
                width="90%"
            >
                <SideStackBarGraphComponent
                    list={barTaskList}
                    xKey={'Month'}
                    yKey={'num'}
                    graphWidth={100}
                    graphHeight={100}
                    outerWidth={'100%'}
                    outerHeight={'60%'}
                    type={undefined}
                />
            </OuterDiv>
        </React.Fragment>
    );
}

export default HomeHistoryBarGraph;