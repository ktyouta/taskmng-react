import { createRef, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import ENV from '../../env.json';
import { bodyObj, comboType, generalDataType, inputMasterSettingType, inputSettingType, refConditionType, refInfoType } from "../../Common/Type/CommonType";
import { refType } from "../../Common/BaseInputComponent";
import useMutationWrapper, { errResType, resType } from "../../Common/Hook/useMutationWrapper";
import useQueryClientWrapper from "../../Common/Hook/useQueryClientWrapper";
import { taskContentDisplayType, taskListType } from "../Type/TaskType";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";
import { buttonType } from "../../Common/ButtonComponent";
import { createRequestBody, moveUserInfo } from "../../Common/Function/Function";
import useGetTaskInputSetting from "./useGetTaskInputSetting";
import React from "react";
import SpaceComponent from "../../Common/SpaceComponent";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


//引数の型
type propsType = {
    contentObj: taskContentDisplayType
}

//ユーザー名のスタイル
const UserNameSpan = styled.span<{ titleBgColor?: string }>`
    cursor:pointer;
    &:hover {
        color: blue;
        text-decoration: underline;
    }
`;

/**
 * useTaskConditionコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useTaskContent(props: propsType) {

    //ルーティング用
    const navigate = useNavigate();

    //ユーザー名のクリックイベント
    function clickUserNm() {

        moveUserInfo(props.contentObj.taskContent.userId, navigate);
    }

    //タスクのコンテンツリスト
    let contentList = useMemo(() => {
        return (
            <React.Fragment key={`${props.contentObj.taskContent.id}`}>
                {
                    props.contentObj.taskContent.registerTime &&
                    <React.Fragment>
                        <div>
                            {`登録日：${props.contentObj.taskContent.registerTime}`}
                        </div>
                        <SpaceComponent
                            space='2%'
                        />
                    </React.Fragment>
                }
                {
                    props.contentObj.taskContent.updTime &&
                    <React.Fragment>
                        <div>
                            {`更新日：${props.contentObj.taskContent.updTime}`}
                        </div>
                        <SpaceComponent
                            space='2%'
                        />
                    </React.Fragment>
                }
                {
                    props.contentObj.taskContent.statusLabel &&
                    <React.Fragment>
                        <div>
                            {`ステータス：${props.contentObj.taskContent.statusLabel}`}
                        </div>
                        <SpaceComponent
                            space='2%'
                        />
                    </React.Fragment>
                }
                {
                    props.contentObj.taskContent.priorityLabel &&
                    <React.Fragment>
                        <div>
                            {`優先度：${props.contentObj.taskContent.priorityLabel}`}
                        </div>
                        <SpaceComponent
                            space='2%'
                        />
                    </React.Fragment>
                }
                {
                    props.contentObj.taskContent.userName &&
                    <React.Fragment>
                        <div>
                            作成ユーザー：<UserNameSpan onClick={clickUserNm}>{`${props.contentObj.taskContent.userName}`}</UserNameSpan>
                        </div>
                        <SpaceComponent
                            space='2%'
                        />
                    </React.Fragment>
                }
            </React.Fragment>
        )
    }, [props.contentObj]);

    return {
        contentList
    }
}

export default useTaskContent;