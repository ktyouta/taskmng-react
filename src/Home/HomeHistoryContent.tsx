import styled from 'styled-components';
import { taskHistoryType } from './Type/HomeType';


//外側のスタイル
const OuterDiv = styled.div`
    border: 1px solid;
    border-radius: 5px;
    min-height: 80px;
    height: auto;
    border-color: #c0c0c0;
`;

//タイトルのスタイル
const ContentTitleDiv = styled.div`
    text-align: left;
    height: auto;
    min-height: 30px;
    border-bottom: 1px solid;
    border-color: #a9a9a9;
    border-radius: 5px 5px 0px 0px;
    overflow-wrap: break-word;
    font-size: 20px;
    padding-left: 10px;
    background-color: #cccccc;
    cursor:pointer;
    &:hover {
        color: blue;
        text-decoration: underline;
    }
`;

//コンテンツのスタイル
const ContentInfoDiv = styled.div`
    display: flex;
    align-items: center;
    height: auto;
    border-radius: 0px 0x 5px 5px;
    min-height: 42px;
    padding-left: 10px;
    background-color: #cccccc;
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
    background-color: #cccccc;
`;

//ステータスエリアのスタイル
const StatusAreaDiv = styled.div`
    margin: 0 1% 0 auto;
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

            </ContentTitleDiv>
            <ContentTagDiv>
                タグ：
            </ContentTagDiv>
            <ContentInfoDiv>
                {/* 内容 */}

                {/* ステータス */}
                <StatusAreaDiv>

                </StatusAreaDiv>
            </ContentInfoDiv>
        </OuterDiv>
    );
}

export default HomeHistoryContent;