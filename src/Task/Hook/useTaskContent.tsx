import { createRef, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import ENV from '../../env.json';
import { bodyObj, comboType, generalDataType, inputMasterSettingType, inputSettingType, refConditionType, refInfoType } from "../../Common/Type/CommonType";
import { refType } from "../../Common/BaseInputComponent";
import useMutationWrapper, { errResType, resType } from "../../Common/Hook/useMutationWrapper";
import useQueryClientWrapper from "../../Common/Hook/useQueryClientWrapper";
import { taskContentDisplayType, taskListType } from "../Type/TaskType";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";
import { buttonType } from "../../Common/ButtonComponent";
import { createRequestBody } from "../../Common/Function/Function";
import useGetTaskInputSetting from "./useGetTaskInputSetting";
import React from "react";
import SpaceComponent from "../../Common/SpaceComponent";


//引数の型
type propsType = {
    contentObj: taskContentDisplayType
}


/**
 * useTaskConditionコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useTaskContent(props: propsType) {

    //タスクのコンテンツリスト
    let contentList = useMemo(() => {
        return props.contentObj.content.map((element) => {
            return (
                <React.Fragment key={`${element.label}-${element.value}-${props.contentObj.id}`}>
                    <div>
                        {`${element.label}：${element.value}`}
                    </div>
                    <SpaceComponent
                        space='2%'
                    />
                </React.Fragment>
            )
        });
    }, [props.contentObj]);

    return {
        contentList
    }
}

export default useTaskContent;