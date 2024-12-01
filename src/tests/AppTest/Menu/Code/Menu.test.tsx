import { vi } from "vitest";
import CustomRender from "../../Common/Code/CustomRender";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Header from "../../../../Header/Header";
import LoginedComponent from "../../Common/Components/LoginedComponent";
import LoginedRender from "../../Common/Code/LoginedRender";
import { TestHeader } from "../../Header/Components/TestHeader";
import { authInfo } from "../../TestDatas";
import { HeaderTestIdPrefix, HeadNaviTestId, IconComponentDataTestId, MenuAreaTestId, MenuCloseIconTestId, MenuTestIdPrefix, NaviBackgroundDivTestId, NaviLogoutTestId, NaviUserInfoTestId, ScreenTestIdPrefix, UserIconComponentDataTestId } from "../../DataTestId";
import userEvent from "@testing-library/user-event";
import QueryApp from "../../../../QueryApp";
import Menu from "../../../../Menu/Menu";
import { filterCategoryInfo } from "../../../../Menu/Function/MenuFunction";
import { menuListType } from "../../../../Common/Type/CommonType";
import { MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from 'history';
import { TestMenu } from "../Components/TestMenu";
import React from "react";
import CATEGORY_INFO from '../../../../../public/json/setting/menu.json';


/**
 * メニューのテストコード
 */
describe('コンポーネントのレンダリングチェック', () => {

    test('Menuコンポーネントのレンダリングが実行される', () => {

        // console.logのモックを作成
        const logSpy = vi.spyOn(console, 'log');

        CustomRender(<TestMenu />);

        expect(logSpy).toHaveBeenCalledWith('Menu render');

        // スパイしたconsole.logを元に戻す
        logSpy.mockRestore();
    });

});


describe('メニューの表示チェック', () => {

    test("APIから取得したカテゴリのnameがメニューに表示されていること", async () => {

        LoginedRender(
            <TestMenu />
        );

        await waitFor(() => {

            //権限とプロパティでフィルターする
            let filteredCategoryInfo: menuListType[] = filterCategoryInfo(CATEGORY_INFO);

            //name要素が表示されていることの確認
            filteredCategoryInfo.forEach((element) => {

                expect(screen.getByText(element.name)).toBeInTheDocument();
            });
        });
    });
});


describe("メニューの選択チェック", async () => {

    //ユーザーイベント
    const user = userEvent.setup();
    //権限とプロパティでフィルターする
    let filteredCategoryInfo: menuListType[] = filterCategoryInfo(CATEGORY_INFO);

    //表示可能カテゴリが存在しない場合
    if (!filteredCategoryInfo || filteredCategoryInfo.length === 0) {
        fail("表示可能カテゴリが存在しません。設定を確認してください。");
    }

    filteredCategoryInfo.forEach((element: menuListType) => {

        test(`メニューの${element.name}を選択した際に、${element.name}画面に遷移すること`, async () => {

            LoginedRender(<QueryApp />);

            //testidをからリンク要素を取得
            const linkElement = screen.getByTestId(`${MenuTestIdPrefix}${element.id}`);

            //リンク押下
            await user.click(linkElement);

            //選択したメニューの画面が表示されることを確認する
            await waitFor(() => {
                expect(screen.getByTestId(`${ScreenTestIdPrefix}${element.id}`)).toBeInTheDocument();
            });
        });
    });

});


describe("ハンバーガーメニューの開閉チェック", () => {

    test("メニューのクローズアイコン押下時にメニューが閉じること", async () => {

        LoginedRender(<QueryApp />);

        //メニューエリア要素を取得
        const MenuAreaElement = screen.getByTestId(MenuAreaTestId);
        //メニューのクローズアイコン要素を取得
        const MenuCloseElement = screen.getByTestId(IconComponentDataTestId);

        //初期状態でメニューが表示されていることを確認
        expect(MenuAreaElement).not.toHaveStyle({ transform: 'translateX(-100%)' });

        //アイコンをクリック
        await userEvent.click(MenuCloseElement);

        await waitFor(() => {

            //メニューが閉じることを確認
            expect(MenuAreaElement).toHaveStyle({ transform: 'translateX(-100%)' });
        });
    });
});