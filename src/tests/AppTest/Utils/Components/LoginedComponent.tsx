import React, { ReactNode, useEffect } from "react";
import { useGlobalAtom } from "../../../../Common/Hook/useGlobalAtom";
import { userInfoType } from "../../../../Common/Type/CommonType";
import { clientMenuListAtom, userInfoAtom } from "../../../../Content/Hook/useContentLogic";

type propsType = {
    children: ReactNode
}

function LoginedComponent(props: propsType) {

    // ユーザー情報
    const [userInfo, setUserInfoAtom] = useGlobalAtom<userInfoType | undefined>(userInfoAtom);
    //クライアント用メニューリスト
    const [clientMenuList, setClientMenuList] = useGlobalAtom(clientMenuListAtom);

    useEffect(() => {

        setUserInfoAtom({
            userId: "f",
            userName: "テスト管理者",
            auth: "3",
            iconUrl: "http://localhost:3000/img/standard/testimg1.png"
        });

        setClientMenuList([
            {
                id: "CATEGORY-1",
                name: "ホーム",
                path: "/",
                componentName: "Home",
                auth: "1",
                isHidden: "0",
            },
            {
                id: "CATEGORY-3",
                name: "マスタ編集",
                path: "/master",
                componentName: "Master",
                auth: "2",
                isHidden: "0",
            },
            {
                id: "CATEGORY-4",
                name: "新規マスタ追加",
                path: "/addmaster",
                componentName: "AddMaster",
                auth: "2",
                isHidden: "0",
            },
            {
                id: "CATEGORY-5",
                name: "タスク管理",
                path: "/task",
                componentName: "Task",
                auth: "1",
                isHidden: "0",
            },
            {
                id: "CATEGORY-6",
                name: "メモ管理",
                path: "/memo",
                componentName: "Memo",
                auth: "1",
                isHidden: "0",
            },
            {
                name: "作業履歴",
                path: "/history",
                componentName: "History",
                auth: "3",
                isHidden: "0",
                id: "CATEGORY-9",
            },
            {
                id: "CATEGORY-7",
                name: "設定",
                path: "/setting",
                componentName: "Setting",
                auth: "3",
                isHidden: "0",
            },
            {
                name: "ユーザー情報",
                path: "/user",
                componentName: "User",
                auth: "1",
                isHidden: "1",
                id: "CATEGORY-8",
            }
        ]);

    }, []);

    return (
        <React.Fragment>
            {props.children}
        </React.Fragment>
    );
}

export default LoginedComponent;