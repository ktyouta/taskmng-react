import { setupServer } from "msw/node";
import { AuthHandlers } from "./Mocks/Auth/AuthHandlers";
import { LoginHandlers } from "./Mocks/Login/LoginHandlers";
import { HomeHandlers } from "./Mocks/Home/HomeHandlers";
import { GeneralHandlers } from "./Mocks/Common/GeneralHandlers";

export const APIServerList = [
    AuthHandlers,
    LoginHandlers,
    HomeHandlers,
    GeneralHandlers,
];