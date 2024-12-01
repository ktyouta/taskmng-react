import { useGlobalAtomValue } from '../../Common/Hook/useGlobalAtom';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import { filterCategoryInfo, getMainSubCategoryDom } from '../Function/MenuFunction';
import { MenuTestIdPrefix } from '../../tests/AppTest/DataTestId';
import { clientMenuListAtom, userInfoAtom } from '../../Content/Atom/ContentAtom';
import { menuListType } from '../../Common/Type/CommonType';
import IconComponent from '../../Common/IconComponent';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";


//選択中のメニューのスタイル
const SelectedDiv = styled.div`
    color: white;
    padding: 8px 16px;
    text-decoration: none;
    border-bottom: 1px solid #ffa500;
    background-color: #1b2538;
    display:flex;
    justify-content: center;
    align-items: center;
`;

//メニューのliのスタイル
const MenuLi = styled.li<{ isTopLine?: boolean }>`
  border-top:${({ isTopLine }) => (isTopLine ? "1px solid #ffa500" : "")};
  & > a {
    display:flex;
    justify-content: center;
    align-items: center;
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

//親カテゴリのスタイル
const SubCategoryParentDiv = styled.div`
    color: #000000;
    padding: 8px 16px;
    border-bottom: 1px solid #ffa500;
    &:hover {
        background-color: #1b2538;
        color: white;
    }
    box-sizing: border-box;
    align-items: center;
    display:flex;
    justify-content: center;
    position: relative;
`;

//メニューのスタイル
const MenuDiv = styled.div<{ isSelected: boolean }>`
    padding: 8px 16px;
    border-bottom: 1px solid #ffa500;
    display:flex;
    justify-content: center;
    align-items: center;
    color: ${({ isSelected }) => (isSelected ? "white" : "#000000")};
    background-color:${({ isSelected }) => (isSelected ? "#1b2538" : "inherit")};
`;


//引数の型
type propsType = {
    selectedMenuId: string,
}

function useMenuLogic(props: propsType) {

    //クライアント用メニューリスト
    const menu = useGlobalAtomValue(clientMenuListAtom);
    //サブカテゴリ表示ID
    const [dispSubCateogryIdList, setDispSubCateogryIdList] = useState<string[]>([]);


    //画面に表示するメニュー
    const menuList = useMemo(() => {

        let tmpMenuList: JSX.Element[] = [];

        if (!menu || menu.length < 1) {
            return;
        }

        //取得したカテゴリをユーザーの権限とプロパティでフィルターする
        let filterMenuList: menuListType[] = filterCategoryInfo(menu);

        tmpMenuList = filterMenuList.map((element, index) => {

            return (
                <MenuLi
                    key={`${element.path}-${index}`}
                    isTopLine={index === 0}
                >
                    {
                        //サイドメニューのリストを作成
                        getMainSubCategoryDom(
                            element,
                            dispSubCateogryIdList,
                            props.selectedMenuId,
                            element.path,
                            setDispSubCateogryIdList
                        )
                    }
                </MenuLi>
            )
        });

        return tmpMenuList;
    }, [menu, props.selectedMenuId, dispSubCateogryIdList]);

    return { menu, menuList };
}

export default useMenuLogic;
