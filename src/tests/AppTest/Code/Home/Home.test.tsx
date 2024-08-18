import { render, screen, waitFor } from "@testing-library/react";
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


describe('コンポーネントのレンダリングチェック', () => {
    test('Homeコンポーネントのレンダリングが実行される', () => {

        // console.logのモックを作成
        const logSpy = vi.spyOn(console, 'log');

        CustomRender(<Home />);

        expect(logSpy).toHaveBeenCalledWith('Home render');

        // スパイしたconsole.logを元に戻す
        logSpy.mockRestore();
    });
});


describe('ホーム画面チェック', () => {

    test("ホーム画面が表示されている", async () => {

        LoginedRender(<Home />);

        await waitFor(() => {
            expect(screen.getByText("プロジェクトホーム")).toBeInTheDocument();
        });

    });
});