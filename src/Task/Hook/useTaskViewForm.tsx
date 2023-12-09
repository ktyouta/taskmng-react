import { createRef, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import ENV from '../../env.json';
import { bodyObj, comboType, generalDataType, inputMasterSettingType, inputSettingType, refConditionType, refInfoType } from "../../Common/Type/CommonType";
import { refType } from "../../Common/BaseInputComponent";
import useMutationWrapper, { errResType, resType } from "../../Common/Hook/useMutationWrapper";
import useQueryClientWrapper from "../../Common/Hook/useQueryClientWrapper";
import { taskContentDisplayType, taskListType, viewTaskType } from "../Type/TaskType";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";
import { buttonType } from "../../Common/ButtonComponent";
import { buttonObjType } from "../../Master/MasterEditFooter";
import { createRequestBody } from "../../Common/Function/Function";
import useGetTaskInputSetting from "./useGetTaskInputSetting";
import React from "react";
import SpaceComponent from "../../Common/SpaceComponent";
import TaskContent from "../TaskContent";
import VerticalSpaceComponent from "../../Common/VerticalSpaceComponent";
import styled from "styled-components";
import HorizonLabelItemComponent from "../../Common/HorizonLabelItemComponent";


//表示欄のスタイル
const ValueSpan = styled.span`
    width:80%
`;

//引数の型
type propsType = {
    viewTaskList: viewTaskType[],
}


/**
 * useTaskConditionコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useTaskViewForm(props: propsType) {

    //タスクのコンテンツリスト
    let viewList = useMemo(() => {
        return props.viewTaskList.map((element, index) => {
            return (
                <HorizonLabelItemComponent
                    title={element.title}
                    width="20%"
                    key={`dynamicform-${index}`}
                >
                    <ValueSpan>
                        {element.value}
                    </ValueSpan>
                </HorizonLabelItemComponent>
            );
        });
    }, [props.viewTaskList]);

    return {
        viewList
    }
}

export default useTaskViewForm;