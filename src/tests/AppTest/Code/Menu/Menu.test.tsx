import { vi } from "vitest";
import CustomRender from "../../Utils/Code/CustomRender";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Header from "../../../../Header/Header";
import LoginedComponent from "../../Utils/Components/LoginedComponent";
import LoginedRender from "../../Utils/Code/LoginedRender";
import { TestHeader } from "../../Utils/Components/TestHeader";
import { authInfo, categoryInfo, noIconUserInfo, userInfo } from "../../Mocks/TestDatas";
import { HeaderTestIdPrefix, HeadNaviTestId, IconComponentDataTestId, MenuTestIdPrefix, NaviBackgroundDivTestId, NaviLogoutTestId, NaviUserInfoTestId, ScreenTestIdPrefix, UserIconComponentDataTestId } from "../../Utils/DataTestId";
import userEvent from "@testing-library/user-event";
import QueryApp from "../../../../QueryApp";
import Menu from "../../../../Menu/Menu";
import { filterCategoryInfo } from "../../../../Menu/Function/MenuFunction";
import { menuListType } from "../../../../Common/Type/CommonType";
import { MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from 'history';
import { TestMenu } from "../../Utils/Components/TestMenu";
import React from "react";


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

            //テストユーザーの権限を取得
            let testUserAuth = parseInt(authInfo.userInfo.auth);

            //権限とプロパティでフィルターする
            let filteredCategoryInfo: menuListType[] = filterCategoryInfo(categoryInfo, testUserAuth);

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
    //テストユーザーの権限
    let testUserAuth = parseInt(authInfo.userInfo.auth);
    //権限とプロパティでフィルターする
    let filteredCategoryInfo: menuListType[] = filterCategoryInfo(categoryInfo, testUserAuth);

    //表示可能カテゴリが存在しない場合
    if (!filteredCategoryInfo || filteredCategoryInfo.length === 0) {
        fail("表示可能カテゴリが存在しません。設定を確認してください。");
    }

    await Promise.all(
        filteredCategoryInfo.map(async (element, index) => {

            if (index === 0) {
                return;
            }

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
        })
    );

});