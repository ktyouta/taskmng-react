import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../../../../Login/Login";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import QueryClientComponent from "../../Utils/Components/QueryClientComponent";
import Content from "../../../../Content/Content";
import { LOGIN_PATH } from "../../../../Header/Const/HeaderConst";
import QueryApp from "../../../../QueryApp";
import ENV from '../../../../env.json';
import CustomRender from "../../Utils/Code/CustomRender";
import Home from "../../../../Home/Home";
import { vi } from "vitest";
import LoginedRender from "../../Utils/Code/LoginedRender";


/**
 * ホーム画面のテストコード
 */
describe('コンポーネントのレンダリングチェック', () => {


    test('Homeコンポーネントのレンダリングが実行される', () => {

        // console.logのモックを作成
        const logSpy = vi.spyOn(console, 'log');

        CustomRender(<Home />);

        expect(logSpy).toHaveBeenCalledWith('Home render');

        // スパイしたconsole.logを元に戻す
        logSpy.mockRestore();
    });

    test('HomeHistoryコンポーネントのレンダリングが実行される', () => {

        const logSpy = vi.spyOn(console, 'log');

        CustomRender(<Home />);

        expect(logSpy).toHaveBeenCalledWith('HomeHistory render');

        logSpy.mockRestore();
    });

    test('HomeHistoryContentListコンポーネントのレンダリングが実行される', async () => {

        const logSpy = vi.spyOn(console, 'log');

        CustomRender(<Home />);

        await waitFor(() => {
            expect(logSpy).toHaveBeenCalledWith('HomeHistoryContentList render');

            logSpy.mockRestore();
        });
    });

    test('HomeGraphコンポーネントのレンダリングが実行される', async () => {

        const logSpy = vi.spyOn(console, 'log');

        CustomRender(<Home />);

        await waitFor(() => {
            expect(logSpy).toHaveBeenCalledWith('HomeGraph render');

            logSpy.mockRestore();
        });
    });

    test('HomeHistoryLineGraphコンポーネントのレンダリングが実行される', async () => {

        const logSpy = vi.spyOn(console, 'log');

        CustomRender(<Home />);

        await waitFor(() => {
            expect(logSpy).toHaveBeenCalledWith('HomeHistoryLineGraph render');

            logSpy.mockRestore();
        });
    });

    test('HomeHistoryContentコンポーネントのレンダリングが実行される', async () => {

        const logSpy = vi.spyOn(console, 'log');

        CustomRender(<Home />);

        await waitFor(() => {
            expect(logSpy).toHaveBeenCalledWith('HomeHistoryContent render');

            logSpy.mockRestore();
        });
    });

    test('HomeStatusBarGraphコンポーネントのレンダリングが実行される', async () => {

        // console.logのモックを作成
        const logSpy = vi.spyOn(console, 'log');

        CustomRender(<Home />);

        await waitFor(() => {
            expect(logSpy).toHaveBeenCalledWith('HomeStatusBarGraph render');

            // スパイしたconsole.logを元に戻す
            logSpy.mockRestore();
        });
    });

});


describe('ホーム画面の表示チェック', () => {

    test("プロジェクトホームが表示されている", async () => {

        CustomRender(<Home />);

        await waitFor(() => {
            expect(screen.getByText("プロジェクトホーム")).toBeInTheDocument();
        });
    });

    test("タスクチャートが表示されている", async () => {

        CustomRender(<Home />);

        await waitFor(() => {
            expect(screen.getByText("タスクチャート")).toBeInTheDocument();
        });
    });

    test("対象年が存在する", async () => {

        CustomRender(<Home />);

        await waitFor(() => {

            expect(screen.getByText("対象年")).toBeInTheDocument();
        });
    });

    test("ステータスが存在する", async () => {

        CustomRender(<Home />);

        await waitFor(() => {

            expect(screen.getByText("ステータス")).toBeInTheDocument();
        });
    });

    test("年が存在する", async () => {

        CustomRender(<Home />);

        await waitFor(() => {

            expect(screen.getByText("年")).toBeInTheDocument();
        });
    });

    test("対象年のコンボボックスが存在する", async () => {

        CustomRender(<Home />);

        await waitFor(() => {

            // ラベル「対象年」に関連付けられた要素を取得
            const comboBox = screen.getByLabelText('対象年');

            // 取得した要素が <select> タグであることを確認
            expect(comboBox.tagName).toBe('SELECT');
        });
    });

    test("ステータスのコンボボックスが存在する", async () => {

        CustomRender(<Home />);

        await waitFor(() => {

            // ラベル「対象年」に関連付けられた要素を取得
            const comboBox = screen.getByLabelText('ステータス');

            // 取得した要素が <select> タグであることを確認
            expect(comboBox.tagName).toBe('SELECT');
        });
    });
});


describe("コンボボックス(ステータス)の切り替えチェック", () => {

    test("選択肢を「優先度」に変更", async () => {

        const logSpy = vi.spyOn(console, 'log');

        CustomRender(<Home />);

        await waitFor(() => {
            // コンボボックスを取得
            const comboBox = screen.getByLabelText('ステータス');

            // 初期状態の表示を確認
            expect(screen.getByText('ステータス')).toBeInTheDocument();

            // コンボボックスの選択肢を優先度に変更
            fireEvent.change(comboBox, { target: { value: '2' } });
            expect(logSpy).toHaveBeenCalledWith('HomePriorityBarGraph render');

            logSpy.mockRestore();
        });
    });

    test("選択肢を「状態」に変更", async () => {

        const logSpy = vi.spyOn(console, 'log');

        CustomRender(<Home />);

        await waitFor(() => {
            // コンボボックスを取得
            const comboBox = screen.getByLabelText('ステータス');

            // 初期状態の表示を確認
            expect(screen.getByText('ステータス')).toBeInTheDocument();

            // コンボボックスの選択肢を状態に変更
            fireEvent.change(comboBox, { target: { value: '1' } });
            expect(logSpy).toHaveBeenCalledWith('HomeStatusBarGraph render');

            logSpy.mockRestore();
        });
    });
});


describe("コンボボックス(対象年)の切り替えチェック", () => {

    test("選択肢を「2022」に変更(対象データなし)した後、データが存在しない旨のメッセージが表示されること",
        async () => {

            const logSpy = vi.spyOn(console, 'log');

            CustomRender(<Home />);

            await waitFor(() => {
                // コンボボックスを取得
                const comboBox = screen.getByLabelText('対象年');

                // 初期状態の表示を確認
                expect(screen.getByText('対象年')).toBeInTheDocument();

                // コンボボックスの選択肢を2022に変更
                fireEvent.change(comboBox, { target: { value: '2022' } });
                expect(screen.getByText("対象年のデータが存在しません。")).toBeInTheDocument();

                logSpy.mockRestore();
            });
        });

    test("選択肢を「2023」に変更した後、2023年のデータが表示されること", async () => {

        const logSpy = vi.spyOn(console, 'log');

        CustomRender(<Home />);

        await waitFor(() => {
            // コンボボックスを取得
            const comboBox = screen.getByLabelText('対象年');

            // 初期状態の表示を確認
            expect(screen.getByText('対象年')).toBeInTheDocument();

            // コンボボックスの選択肢を2023に変更
            fireEvent.change(comboBox, { target: { value: '2023' } });
            expect(screen.getByText(/作業日時：2023/)).toBeInTheDocument();

            logSpy.mockRestore();
        });
    });

    test("選択肢を「2024」に変更した後、2024年のデータが表示されること", async () => {

        const logSpy = vi.spyOn(console, 'log');

        CustomRender(<Home />);

        await waitFor(() => {
            // コンボボックスを取得
            const comboBox = screen.getByLabelText('対象年');

            // 初期状態の表示を確認
            expect(screen.getByText('対象年')).toBeInTheDocument();

            // コンボボックスの選択肢を2023に変更
            fireEvent.change(comboBox, { target: { value: '2024' } });
            expect(screen.getByText(/作業日時：2024/)).toBeInTheDocument();

            logSpy.mockRestore();
        });
    });

});