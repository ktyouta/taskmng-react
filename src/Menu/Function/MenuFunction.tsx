import styled from "styled-components";
import { menuListType } from "../../Common/Type/CommonType";
import { Link } from "react-router-dom";
import { MenuTestIdPrefix } from "../../tests/AppTest/DataTestId";
import IconComponent from "../../Common/IconComponent";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import React from "react";


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


//取得したカテゴリをフィルターする
export function filterCategoryInfo(menu: menuListType[], userAuth: number) {

    //ログインユーザーの権限と非表示メニューでルーティングを切り替える
    return menu.filter((element) => {

        //非表示メニュー
        if (element.isHidden === "1") {
            return false;
        }

        return true;
    });
}


/**
 * サイドメニューのリストを作成
 * @param menuObj メニューオブジェクト
 * @param dispSubCateogryIdList 選択した親メニューのIDリスト
 * @param selectedMenuId 選択したメニュー
 * @param preLinkPath リンクタグ設定用のパス
 * @param setDispSubCateogryIdList 選択した親メニューのIDリストのセッター
 * @returns 
 */
export function getMainSubCategoryDom(
    menuObj: menuListType,
    dispSubCateogryIdList: string[],
    selectedMenuId: string,
    preLinkPath: string,
    setDispSubCateogryIdList: React.Dispatch<React.SetStateAction<string[]>>,
) {

    //サブメニューを保持していない
    if (!menuObj.subCategoryList ||
        menuObj.subCategoryList.length === 0
    ) {

        //選択中のメニューを強調
        if (menuObj.id === selectedMenuId) {
            return (
                <SelectedDiv
                    data-testid={`${MenuTestIdPrefix}${menuObj.id}`}
                >
                    {menuObj.name}
                </SelectedDiv>
            );
        }
        else {
            return (
                <Link
                    to={preLinkPath}
                    data-testid={`${MenuTestIdPrefix}${menuObj.id}`}
                >
                    {menuObj.name}
                </Link>
            );
        }
    }

    //サブメニュー展開時
    if (dispSubCateogryIdList &&
        dispSubCateogryIdList.length > 0 &&
        dispSubCateogryIdList.some(item => item === menuObj.id)
    ) {

        return (
            <React.Fragment>
                {/* メインメニュー部分 */}
                {
                    <MenuDiv
                        data-testid={`${MenuTestIdPrefix}${menuObj.id}`}
                        isSelected={menuObj.subCategoryList.some(item => item.id === selectedMenuId)}
                        onClick={() => {
                            clickParentCategory(menuObj.id, setDispSubCateogryIdList)
                        }}
                    >
                        {menuObj.name}
                        <IconComponent
                            icon={IoIosArrowDown}
                            style={{
                                "position": "absolute",
                                "right": "5%",
                            }}
                        />
                    </MenuDiv>
                }
                {/* サブメニュー部分 */}
                {
                    menuObj.subCategoryList.map((element: menuListType) => {
                        return (
                            <React.Fragment>
                                {
                                    getMainSubCategoryDom(
                                        element,
                                        dispSubCateogryIdList,
                                        selectedMenuId,
                                        `${preLinkPath}${element.path}`,
                                        setDispSubCateogryIdList
                                    )
                                }
                            </React.Fragment>
                        )
                    })
                }
            </React.Fragment>
        )
    }

    //サブメニュー未展開時
    return (
        <MenuDiv
            data-testid={`${MenuTestIdPrefix}${menuObj.id}`}
            isSelected={menuObj.subCategoryList.some(item => item.id === selectedMenuId)}
            onClick={() => {
                clickParentCategory(menuObj.id, setDispSubCateogryIdList)
            }}
        >
            {menuObj.name}
            <IconComponent
                icon={IoIosArrowBack}
                style={{
                    "position": "absolute",
                    "right": "5%",
                }}
            />
        </MenuDiv>
    );
}


/**
 * 親カテゴリの押下イベント
 */
function clickParentCategory(
    categoryId: string,
    setDispSubCateogryIdList: React.Dispatch<React.SetStateAction<string[]>>
) {

    setDispSubCateogryIdList((prevDispSubCateogryIdList) => {

        let tmpDelTaskIdList = [];

        //サブカテゴリを閉じる
        if (prevDispSubCateogryIdList.some(e => e === categoryId)) {
            tmpDelTaskIdList = prevDispSubCateogryIdList.filter(e => e !== categoryId);
        }
        else {
            tmpDelTaskIdList = [...prevDispSubCateogryIdList, categoryId];
        }

        return tmpDelTaskIdList;
    });
}