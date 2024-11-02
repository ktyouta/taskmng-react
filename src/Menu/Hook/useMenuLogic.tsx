import useGetViewName from '../../Common/Hook/useGetViewName';
import { useGlobalAtomValue } from '../../Common/Hook/useGlobalAtom';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import { filterCategoryInfo } from '../Function/MenuFunction';
import { MenuTestIdPrefix } from '../../tests/AppTest/DataTestId';
import { clientMenuListAtom, userInfoAtom } from '../../Content/Atom/ContentAtom';


//選択中のメニューのスタイル
const SelectedDiv = styled.div`
    color: white;
    padding: 8px 16px;
    text-decoration: none;
    border-bottom: 1px solid #ffa500;
    background-color: #1b2538;
`;

//メニューのliのスタイル
const MenuLi = styled.li<{ isTopLine?: boolean }>`
  border-top:${({ isTopLine }) => (isTopLine ? "1px solid #ffa500" : "")};
  & > a {
    display: block;
    color: #000000;
    padding: 8px 16px;
    text-decoration: none;
    border-bottom: 1px solid #ffa500;
    &:hover {
        background-color: #1b2538;
        color: white;
    }
  }
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

            return (
                <MenuLi
                    key={`${element.path}-${index}`}
                    isTopLine={index === 0}
                >
                    {
                        //選択中のメニューを強調
                        element.name === props.selectedMenu ?
                            <SelectedDiv
                                data-testid={`${MenuTestIdPrefix}${element.id}`}
                            >
                                {element.name}
                            </SelectedDiv>
                            :
                            <Link
                                to={element.path}
                                data-testid={`${MenuTestIdPrefix}${element.id}`}
                            >
                                {element.name}
                            </Link>
                    }
                </MenuLi>
            )
        });

        return tmpMenuList;
    }, [menu, props.selectedMenu, userInfo]);

    return { menu, menuList };
}

export default useMenuLogic;
