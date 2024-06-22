import styled from 'styled-components';
import { taskHistoryType } from './Type/HomeType';
import { IoPersonCircleOutline } from 'react-icons/io5';
import IconComponent from '../Common/IconComponent';
import { copyUrlToClipboard } from './Function/HomeFunction';


//外側のスタイル
const OuterDiv = styled.div`
    border: 2px solid;
    border-radius: 5px;
    min-height: 80px;
    height: auto;
    border-color: #c0c0c0;
`;

//タイトルのスタイル
const ContentTitleDiv = styled.div`
    text-align: left;
    height: auto;
    min-height: 33px;
    border-bottom: 1px solid;
    border-color: #a9a9a9;
    border-radius: 5px 5px 0px 0px;
    overflow-wrap: break-word;
    font-size: 20px;
    padding-left: 10px;
    background-color: white;
    padding-top:1%;
    display: flex;
`;

//コンテンツのスタイル
const ContentInfoDiv = styled.div`
    display: flex;
    align-items: center;
    height: auto;
    border-radius: 0px 0x 5px 5px;
    min-height: 42px;
    padding-left: 10px;
    background-color: white;
`;

//タグエリアのスタイル
const ContentTagDiv = styled.div`
    display: flex;
    align-items: center;
    height: auto;
    min-height: 39px;
    padding-left: 10px;
    border-bottom: 1px solid;
    border-color: #a9a9a9;
    background-color: white;
    text-align: left;
`;

//IDのスタイル
const IdSpan = styled.span`
    cursor:pointer;
    color: blue;
    &:hover {
        text-decoration: underline;
    }
`;


//引数の型
type propsType = {
    taskHistory: taskHistoryType
}

function HomeHistoryContent(props: propsType) {

    console.log("HomeHistoryContent render");

    return (
        <OuterDiv>
            {/* タイトル */}
            <ContentTitleDiv
                onClick={() => { }}
            >
                <IconComponent
                    icon={IoPersonCircleOutline}
                    size='4%'
                />
                {
                    `${props.taskHistory.userName}さんが`
                }
                <IdSpan
                    onClick={() => { copyUrlToClipboard(props.taskHistory.url) }}
                >
                    {props.taskHistory.taskId}
                </IdSpan>
                {
                    `を${props.taskHistory.editType}`
                }
            </ContentTitleDiv>
            <ContentTagDiv>
                {
                    `${props.taskHistory.taskId}：${props.taskHistory.taskTitle}`
                }
            </ContentTagDiv>
            <ContentInfoDiv>
                {
                    `作業日時：${props.taskHistory.time}`
                }
            </ContentInfoDiv>
        </OuterDiv>
    );
}

export default HomeHistoryContent;