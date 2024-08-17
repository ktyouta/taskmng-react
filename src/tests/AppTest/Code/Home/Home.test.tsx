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

describe(Home, () => {

    test("ホーム画面が表示されている", async () => {

        CustomRender(<Home />);

        await waitFor(() => {
            expect(screen.getByText("ホーム")).toBeInTheDocument();
        });

    });
});