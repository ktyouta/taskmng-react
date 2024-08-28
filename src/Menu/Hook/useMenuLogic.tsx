import useGetViewName from '../../Common/Hook/useGetViewName';
import { clientMenuListAtom, userInfoAtom } from '../../Content/Hook/useContentLogic';
import { useGlobalAtomValue } from '../../Common/Hook/useGlobalAtom';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import { filterCategoryInfo } from '../Function/MenuFunction';


//選択中のメニューのスタイル
const SelectedDiv = styled.div<{ bgColor?: string }>`
    color: white;
    padding: 8px 16px;
    text-decoration: none;
    border-bottom: 1px solid #ffa500;
`;


function useMenuLogic() {

    //クライアント用メニューリスト
    const menu = useGlobalAtomValue(clientMenuListAtom);
    //メニュー名
    const [selectedMenu] = useGetViewName({ menu });
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
        let cnt = 0;
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
            if (element.name === selectedMenu) {
                cssName += "selected";
            }
            return (
                <li key={`${element.path}-${index}`} className={cssName}>
                    {
                        element.name === selectedMenu ?
                            <SelectedDiv
                                data-testid={element.id}
                            >
                                {element.name}
                            </SelectedDiv>
                            :
                            <Link
                                to={element.path}
                                className="menu-link"
                                data-testid={element.id}
                            >
                                {element.name}
                            </Link>
                    }
                </li>
            )
        });

        return tmpMenuList;
    }, [menu, selectedMenu, userInfo]);

    return { menu, selectedMenu, menuList };
}

export default useMenuLogic;
