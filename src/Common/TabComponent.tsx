import React from "react";
import {
    ReactNode,
    useState,
} from "react";
import styled from "styled-components";


//タブアイテムの外側のdiv
const TabBodyDiv = styled.div<{ height?: string }>`
    height:${({ height }) => (height ? height : "85%")};
    overflow-y: auto;
`;

//タブタイトルの外側のul
const TabWrapUl = styled.ul`
    display: flex;
    list-style: none;
    gap: 12px;
    box-shadow: 0 -1px 0 0 #808080 inset;
    padding: 0;
    margin-left: 5%;
`;

//タブタイトルのli
const TabTitleLi = styled.li<{ isActive: boolean }>`
    color:${({ isActive }) => (isActive ? "#00bfff" : "#808080")};
    border-bottom: ${({ isActive }) => (isActive ? "3px solid #00bfff" : "")};
    font-weight: ${({ isActive }) => (isActive ? "bold" : "")};
    text-align: center;
    cursor: pointer;
    width: fit-content;
`;

//タブコンテンツのdiv
const TabTitleItemDiv = styled.div<{ isActive: boolean }>`
    display:${({ isActive }) => (isActive ? "inline" : "none")};
`;


//タブの表示用の型
export type tabType = {
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
    attributeKey: string,
    title: string,
    children: ReactNode,
    activeKey: string,
}

export function TabComponent(props: propsType) {

    //選択しているタブのキー
    const [activeKey, setActiveKey] = useState(props.tabObj &&
        props.tabObj.length > 0
        ? props.tabObj[0].key
        : "");

    return (
        <React.Fragment>
            <TabWrapUl>
                {
                    props.tabObj &&
                    props.tabObj.length > 0 &&
                    props.tabObj.map(({ title, key }) => (
                        <TabTitleLi
                            key={key}
                            isActive={activeKey === key}
                            onClick={() => setActiveKey(key)}
                        >
                            {title}
                        </TabTitleLi>
                    ))
                }
            </TabWrapUl>
            <TabBodyDiv>
                {
                    props.tabObj &&
                    props.tabObj.length > 0 &&
                    props.tabObj.map(({ title, key, children }) => {
                        return (
                            <TabItem
                                attributeKey={key}
                                title={title}
                                children={children}
                                activeKey={activeKey}
                            />
                        )
                    })
                }
            </TabBodyDiv>
        </React.Fragment>
    );
};


//タブ内のコンテンツ
function TabItem(props: tabItemPropsType) {
    return (
        <TabTitleItemDiv
            isActive={props.attributeKey === props.activeKey}
        >
            {props.children}
        </TabTitleItemDiv>
    )
};