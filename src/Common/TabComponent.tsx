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


type TabState = {
    activeKey: string;
    addItem: (title: string, key: string, children: ReactNode) => void;
};


const TabContext = createContext<TabState>({
    activeKey: "",
    addItem: () => { },
});

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

export function Tab(props: propsType) {

    //選択しているタブのキー
    const [activeKey, setActiveKey] = useState(props.tabObj[0].key);
    //タブのリスト
    const [tabs, setTabs] = useState<tabType[]>([]);

    //タブを追加
    const addTab = useCallback((title: string, key: string, children: ReactNode) => {
        setTabs((tabs) => {
            if (tabs.findIndex((item) => item.key === key) > 0) {
                return tabs;
            } else {
                return [...tabs, { title, key, children }];
            }
        });
    }, []);

    const state = useMemo<TabState>(() => {
        return {
            activeKey,
            addItem: addTab,
        }
    },
        [activeKey, tabs]
    );

    return (
        <TabContext.Provider value={state}>
            <TabWrapDiv>
                {tabs.map(({ title, key }) => (
                    <TabTitleDiv
                        key={key}
                        isActive={activeKey === key}
                        onClick={() => setActiveKey(key)}
                    >
                        {title}
                    </TabTitleDiv>
                ))}
            </TabWrapDiv>
            {
                tabs.map(({ title, key, children }) => {
                    return (
                        <TabItem
                            key={key}
                            title={title}
                            children={children}
                        />
                    )
                })
            }
        </TabContext.Provider>
    );
};


//タブ内のコンテンツ
function TabItem(props: tabType) {
    const { activeKey, addItem } = useContext(TabContext);

    useLayoutEffect(() => {
        addItem(props.title, props.key, props.children);
    }, []);

    return props.key === activeKey ? <>{props.children}</> : null;
};