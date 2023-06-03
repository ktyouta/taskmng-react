import styled from 'styled-components';
import '../App.css';
import SpaceComponent from '../Common/SpaceComponent';
import { displayTaskListType } from './Type/TaskType';


//外側のスタイル
const OuterDiv = styled.div<{ bdColor?: string }>`
    border: 1px solid;
    border-radius: 5px;
    min-height: 65px;
    height: auto;
    border-color: ${({ bdColor }) => (bdColor ?? "#c0c0c0")};
`;

//タイトルのスタイル
const ContentTitleDiv = styled.div<{ titleBgColor?: string }>`
    text-align: left;
    height: auto;
    min-height: 30px;
    border-bottom: 1px solid;
    border-color: #a9a9a9;
    border-radius: 5px 5px 0px 0px;
    overflow-wrap: break-word;
    font-size: 20px;
    padding-left: 10px;
    background-color: ${({ titleBgColor }) => (titleBgColor ?? "#d3d3d3")};
`;

//コンテンツのスタイル
const ContentInfoDiv = styled.div<{ infoBgColor?: string }>`
    display: flex;
    align-items: center;
    height: auto;
    border-radius: 0px 0x 5px 5px;
    min-height: 30px;
    padding-left: 10px;
    background-color: ${({ infoBgColor }) => (infoBgColor ?? "#dcdcdc")};
`;

//コンテンツのスタイル
const ButtonAreaDiv = styled.div`
    margin: 0 0 0 auto;
`;


//引数の型
type propsType = {
    displayTaskList: displayTaskListType,
    bdColor?: string,
    titleBgColor?: string,
    infoBgColor?: string,
}


function TaskContent(props: propsType) {

    console.log("TaskContent render");

    return (
        <OuterDiv
            bdColor={props.bdColor}
        >
            <ContentTitleDiv
                titleBgColor={props.titleBgColor}
            >
                {props.displayTaskList.title}
            </ContentTitleDiv>
            <ContentInfoDiv
                infoBgColor={props.infoBgColor}
            >
                <div>
                    登録日時：{props.displayTaskList.registerTime}
                </div>
                <SpaceComponent
                    space='2%'
                />
                <div>
                    更新日時：{props.displayTaskList.updTime}
                </div>
                <SpaceComponent
                    space='2%'
                />
                <div>
                    期限：{props.displayTaskList.limitTime}
                </div>
                <SpaceComponent
                    space='2%'
                />
                <div>
                    優先度：{props.displayTaskList.priority}
                </div>
                <SpaceComponent
                    space='2%'
                />
                <div>
                    状態：{props.displayTaskList.status}
                </div>
                <ButtonAreaDiv>
                    {props.displayTaskList.editButton}
                </ButtonAreaDiv>
            </ContentInfoDiv>
        </OuterDiv>
    );
}

export default TaskContent;