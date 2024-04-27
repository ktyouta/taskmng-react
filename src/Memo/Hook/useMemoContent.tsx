import { createRef, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import { memoContentDisplayType, memoListType } from "../Type/MemoType";
import React from "react";
import SpaceComponent from "../../Common/SpaceComponent";
import TagButtonComponent from "../../Common/TagButtonComponent";


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
        return (
            <React.Fragment key={`${props.contentObj.id}`}>
                <div>
                    {`登録日：${props.contentObj.content.registerTime}`}
                </div>
                <SpaceComponent
                    space='2%'
                />
                <div>
                    {`更新日：${props.contentObj.content.updTime}`}
                </div>
                <SpaceComponent
                    space='2%'
                />
                <div>
                    {`作成ユーザー：${props.contentObj.content.userNm}`}
                </div>
            </React.Fragment>
        )
    }, [props.contentObj]);

    //タグのコンテンツリスト
    let tagList = useMemo(() => {
        return props.contentObj.tagList.map((element) => {
            return (
                <React.Fragment>
                    <TagButtonComponent
                        title={element.label}
                        onclick={element.onClickTag}
                    />
                    <SpaceComponent
                        space={"1%"}
                    />
                </React.Fragment>
            )
        });
    }, [props.contentObj]);

    return {
        contentList,
        tagList,
    }
}

export default useMemoContent;