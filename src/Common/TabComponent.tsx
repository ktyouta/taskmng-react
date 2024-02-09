import React from "react";
import {
    createContext,
    memo,
    PropsWithChildren,
    ReactNode,
    useCallback,
    useContext,
    useLayoutEffect,
    useMemo,
    useState,
    VFC,
} from "react";

import styled from "styled-components";


//タブタイトルの外側のdiv
const TabWrapDiv = styled.div`
    display: flex;
    justify-content: space-around;
    gap: 3px;
`;

//タブタイトルのdiv
const TabTitleDiv = styled.div<{ isActive: boolean }>`
    background-color: ${({ isActive }) => (isActive ? "#ffe600" : "")};
    width: 100%;
    text-align: center;
    cursor: pointer;
`;


//タブの表示用の型
type tabType = {
    key: string,
    title: string,
    children: ReactNode
}

//引数の型
type propsType = {
    tabObj: tabType[]
}

//タブコンテンツの引数の型
type tabItemPropsType = {
    key: string,
    title: string,
    children: ReactNode,
    activeKey: string,
}

export function Tab(props: propsType) {

    //選択しているタブのキー
    const [activeKey, setActiveKey] = useState(props.tabObj &&
        props.tabObj.length > 0
        ? props.tabObj[0].key
        : "");


    return (
        <React.Fragment>
            <TabWrapDiv>
                {
                    props.tabObj &&
                    props.tabObj.length > 0 &&
                    props.tabObj.map(({ title, key }) => (
                        <TabTitleDiv
                            key={key}
                            isActive={activeKey === key}
                            onClick={() => setActiveKey(key)}
                        >
                            {title}
                        </TabTitleDiv>
                    ))
                }
            </TabWrapDiv>
            {
                props.tabObj &&
                props.tabObj.length > 0 &&
                props.tabObj.map(({ title, key, children }) => {
                    return (
                        <TabItem
                            key={key}
                            title={title}
                            children={children}
                            activeKey={activeKey}
                        />
                    )
                })
            }
        </React.Fragment>
    );
};


//タブ内のコンテンツ
function TabItem(props: tabItemPropsType) {
    return props.key === props.activeKey ? <React.Fragment>{props.children}</React.Fragment> : null;
};