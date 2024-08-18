import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import QueryClientComponent from "../Components/QueryClientComponent";
import CustomRender from "./CustomRender";
import Login from "../../../../Login/Login";
import userEvent from "@testing-library/user-event";
import { cleanup, render, renderHook, screen, waitFor } from "@testing-library/react";
import useLoginLogic from "../../../../Login/Hook/useLoginLogic";
import useContentLogic from "../../../../Content/Hook/useContentLogic";
import ENV from '../../../../env.json';
import LoginedComponent from "../Components/LoginedComponent";


function LoginedRender(children: ReactNode, initialEntries?: string[]) {

    return render(
        <QueryClientComponent
            initialEntries={initialEntries}
        >
            <LoginedComponent>
                {children}
            </LoginedComponent>

        </QueryClientComponent>
    );
}

export default LoginedRender;