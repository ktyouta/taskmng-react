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

            //name要素が表示されていることの確認
            categoryInfo.forEach((element) => {

                //ログインユーザーの権限でルーティングを切り替える
                if (parseInt(element.auth) > testUserAuth) {
                    return;
                }
                //非表示メニュー
                if (element.isHidden === "1") {
                    return;
                }

                expect(screen.getByText(element.name)).toBeInTheDocument();
            });
        });
    });
});