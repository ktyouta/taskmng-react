import useGetViewName from '../../Common/Hook/useGetViewName';
import { useGlobalAtomValue } from '../../Common/Hook/useGlobalAtom';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import { filterCategoryInfo } from '../Function/MenuFunction';
import { MenuTestIdPrefix } from '../../tests/AppTest/Utils/DataTestId';
import { clientMenuListAtom, userInfoAtom } from '../../Content/Atom/ContentAtom';


//選択中のメニューのスタイル
const SelectedDiv = styled.div<{ bgColor?: string }>`
    color: white;
    padding: 8px 16px;
    text-decoration: none;
    border-bottom: 1px solid #ffa500;
`;

//引数の型
type propsType = {
    selectedMenu: string,
}

function useMenuLogic(props: propsType) {

    //クライアント用メニューリスト
    const menu = useGlobalAtomValue(clientMenuListAtom);
    //ユーザー情報
    const userInfo = useGlobalAtomValue(userInfoAtom);

    //画面に表示するメニュー
    const menuList = useMemo(() => {
        let tmpMenuList: JSX.Element[] = [];
        if (!menu || menu.length < 1) {
            return;
        }
        if (!userInfo) {
            return;
        }

        const userAuth = parseInt(userInfo.auth);

        //取得したカテゴリをユーザーの権限とプロパティでフィルターする
        let filterMenuList = filterCategoryInfo(menu, userAuth);

        tmpMenuList = filterMenuList.map((element, index) => {

            let cssName = "";
            //先頭のli
            if (index === 0) {
                cssName = "top-menu-li ";
            }
            //選択中のメニューを強調
            if (element.name === props.selectedMenu) {
                cssName += "selected";
            }
            return (
                <li
                    key={`${element.path}-${index}`}
                    className={cssName}
                >
                    {
                        element.name === props.selectedMenu ?
                            <SelectedDiv
                                data-testid={`${MenuTestIdPrefix}${element.id}`}
                            >
                                {element.name}
                            </SelectedDiv>
                            :
                            <Link
                                to={element.path}
                                className="menu-link"
                                data-testid={`${MenuTestIdPrefix}${element.id}`}
                            >
                                {element.name}
                            </Link>
                    }
                </li>
            )
        });

        return tmpMenuList;
    }, [menu, props.selectedMenu, userInfo]);

    return { menu, menuList };
}

export default useMenuLogic;
