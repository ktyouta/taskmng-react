import { vi } from "vitest";
import CustomRender from "../../Common/Code/CustomRender";
import { TestTask } from "../Components/TestTask";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import LoginedRender from "../../Common/Code/LoginedRender";


/**
 * タスク画面のテストコード
 */
describe('コンポーネントのレンダリングチェック', () => {

    test('Taskコンポーネントのレンダリングが実行される', () => {

        // console.logのモックを作成
        const logSpy = vi.spyOn(console, 'log');

        CustomRender(<TestTask />);

        expect(logSpy).toHaveBeenCalledWith('Task render');

        // スパイしたconsole.logを元に戻す
        logSpy.mockRestore();
    });

});


describe('タスク画面の表示チェック', () => {

    test('リセットボタンが存在すること', () => {

        CustomRender(<TestTask />);

        //リセットボタンを取得
        const resetBtn = screen.getByRole('button', { name: 'リセット' });

        expect(resetBtn).toBeInTheDocument();
    });

    test("検索条件設定ボタンが存在すること", () => {

        CustomRender(<TestTask />);

        //検索条件設定ボタンを取得
        const searchSettingBtn = screen.getByRole('button', { name: '検索条件設定' });

        expect(searchSettingBtn).toBeInTheDocument();
    });

    test("検索ボタンが存在すること", () => {

        CustomRender(<TestTask />);

        //検索条件設定ボタンを取得
        const searchBtn = screen.getByRole('button', { name: '検索' });

        expect(searchBtn).toBeInTheDocument();
    });

    test("タスク作成ボタンが存在すること", () => {

        CustomRender(<TestTask />);

        //検索条件設定ボタンを取得
        const taskCreateBtn = screen.getByRole('button', { name: 'タスク作成' });

        expect(taskCreateBtn).toBeInTheDocument();
    });

    test("検索結果が存在すること", async () => {

        LoginedRender(<TestTask />);

        await waitFor(() => {

            expect(screen.getByText(/検索結果：/)).toBeInTheDocument();
        });
    });

    // test("コンテンツ内に詳細ボタンが存在すること", async () => {

    //     LoginedRender(<TestTask />);

    //     await waitFor(() => {

    //         //詳細ボタンを取得
    //         const taskCreateBtn = screen.getByRole('button', { name: '詳細' });

    //         expect(taskCreateBtn).toBeInTheDocument();
    //     });
    // });
});