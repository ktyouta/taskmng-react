import { vi } from "vitest";
import CustomRender from "../../Common/Code/CustomRender";
import { TestTask } from "../Components/TestTask";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import LoginedRender from "../../Common/Code/LoginedRender";
import { PRE_TASK_ID } from "../../../../Task/Const/TaskConst";
import userEvent from "@testing-library/user-event";
import { TaskEditTestId, TaskViewTestId } from "../../DataTestId";


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

    test("コンテンツ内に詳細ボタンが存在すること", async () => {

        LoginedRender(<TestTask />);

        await waitFor(() => {

            //詳細ボタンを取得
            const taskDetailBtns = screen.getAllByRole('button', { name: '詳細' });

            //詳細ボタンが1つ以上あることを確認
            expect(taskDetailBtns.length).toBeGreaterThan(0);
        });
    });

    test("コンテンツにタスクIDが存在すること", async () => {

        LoginedRender(<TestTask />);

        await waitFor(() => {

            // タスクIDを取得する
            const elements = screen.getAllByText(new RegExp(PRE_TASK_ID));

            // 1つ以上存在することを確認
            expect(elements.length).toBeGreaterThan(0);
        });
    });
});


describe("タスク詳細モーダル表示チェック", () => {

    /**
     * 以下の操作を確認
     * 1.詳細ボタン押下でタスク詳細モーダルが閲覧モードで開くことを確認
     * 2.編集ボタン押下で編集モードに切り替わることを確認
     * 3.戻るボタン押下で閲覧モードのに切り替わることを確認
     * 4.閉じるボタン押下でタスク詳細モーダルが閉じることを確認
     */
    test("タスク詳細モーダルの開閉と編集モードへの切り替えができること", async () => {

        LoginedRender(<TestTask />);

        let taskDetailBtn = null;
        const user = userEvent.setup();

        await waitFor(() => {

            //詳細ボタンを取得
            const taskDetailBtns = screen.getAllByRole('button', { name: '詳細' });
            taskDetailBtn = taskDetailBtns[0];
        });

        if (!taskDetailBtn) {
            fail("詳細ボタンの取得に失敗しました。");
        }

        //詳細ボタンを押下
        await user.click(taskDetailBtn);

        await waitFor(() => {

            const taskViewElement = screen.getByTestId(TaskViewTestId);
            //タスク詳細モーダルが閲覧モードで表示されることを確認
            expect(taskViewElement).toBeInTheDocument();
        });

        //編集ボタンを取得
        const editBtn = screen.getByRole('button', { name: '編集' });
        expect(editBtn).toBeInTheDocument();
        //編集ボタン押下
        await user.click(editBtn);

        await waitFor(() => {

            const taskEditElement = screen.getByTestId(TaskEditTestId);
            //タスク編集モードが表示されることを確認
            expect(taskEditElement).toBeInTheDocument();
        });

        //戻るボタンを取得
        const backBtn = screen.getByRole('button', { name: '戻る' });
        expect(backBtn).toBeInTheDocument();
        //戻るボタンを押下
        await user.click(backBtn);

        await waitFor(() => {

            const taskViewElement = screen.getByTestId(TaskViewTestId);
            //タスク詳細モーダルが閲覧モードに戻ることを確認
            expect(taskViewElement).toBeInTheDocument();
        });

        //閉じるボタンを取得
        const closeBtn = screen.getByRole('button', { name: '閉じる' });
        expect(closeBtn).toBeInTheDocument();
        //閉じるボタン押下
        await user.click(closeBtn);

        await waitFor(() => {

            const taskViewElement = screen.queryByTestId(TaskViewTestId);
            //タスク詳細モーダルが閉じることを確認
            expect(taskViewElement).not.toBeInTheDocument();
        });
    });
});