import { createRef, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import { memoContentDisplayType, memoListType } from "../Type/MemoType";
import React from "react";
import SpaceComponent from "../../Common/SpaceComponent";


//引数の型
type propsType = {
    contentObj: memoContentDisplayType
}


/**
 * useMemoConditionコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useMemoContent(props: propsType) {

    //メモのコンテンツリスト
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

export default useMemoContent;