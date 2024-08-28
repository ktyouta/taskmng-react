import { vi } from "vitest";
import CustomRender from "../../Utils/Code/CustomRender";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Header from "../../../../Header/Header";
import LoginedComponent from "../../Utils/Components/LoginedComponent";
import LoginedRender from "../../Utils/Code/LoginedRender";
import { TestHeader } from "../../Utils/Components/TestHeader";
import { authInfo, categoryInfo, noIconUserInfo, userInfo } from "../../Mocks/TestDatas";
import { HeadNaviTestId, IconComponentDataTestId, NaviBackgroundDivTestId, NaviLogoutTestId, NaviUserInfoTestId, UserIconComponentDataTestId } from "../../Utils/DataTestId";
import userEvent from "@testing-library/user-event";
import QueryApp from "../../../../QueryApp";
import Menu from "../../../../Menu/Menu";
import { filterCategoryInfo } from "../../../../Menu/Function/MenuFunction";
import { menuListType } from "../../../../Common/Type/CommonType";
import { MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from 'history';


/**
 * メニューのテストコード
 */
describe('コンポーネントのレンダリングチェック', () => {

    test('Menuコンポーネントのレンダリングが実行される', () => {

        // console.logのモックを作成
        const logSpy = vi.spyOn(console, 'log');

        CustomRender(<Menu />);

        expect(logSpy).toHaveBeenCalledWith('Menu render');

        // スパイしたconsole.logを元に戻す
        logSpy.mockRestore();
    });

});


describe('メニューの表示チェック', () => {

    test("APIから取得したカテゴリのnameがメニューに表示されていること", async () => {

        LoginedRender(
            <Menu />
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


describe("メニューの選択チェック", () => {
    test("メニュー選択時にヘッダのタイトルが変更されること", async () => {

        //メニューコンポーネント単体ではテスト不可のためQueryAppをレンダリング
        LoginedRender(
            <Menu />
        );

        //ユーザーイベントをセットアップ
        const user = userEvent.setup();
        //テストユーザーの権限を取得
        let testUserAuth = parseInt(authInfo.userInfo.auth);
        //権限とプロパティでフィルターする
        let filteredCategoryInfo: menuListType[] = filterCategoryInfo(categoryInfo, testUserAuth);

        //表示可能カテゴリが存在しない場合
        if (!filteredCategoryInfo || filteredCategoryInfo.length === 0) {
            fail("表示可能カテゴリが存在しません。");
        }

        await Promise.all(
            filteredCategoryInfo.map(async (element) => {

                // testidをからリンク要素を取得
                const linkElement = screen.getByTestId(element.id);

                // リンク押下
                await user.click(linkElement);

                //ヘッダのタイトルが変更されることを確認
                await waitFor(() => {
                    expect(screen.getByTestId(element.id).textContent).toBe(element.name);
                });
            })
        );
    });
});