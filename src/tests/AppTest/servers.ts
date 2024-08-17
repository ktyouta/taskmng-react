import { setupServer } from "msw/node";
import { AuthHandlers } from "./Mocks/Auth/AuthHandlers";
import { LoginHandlers } from "./Mocks/Login/LoginHandlers";
import { HomeHandlers } from "./Mocks/Home/HomeHandlers";
import { GeneralHandlers } from "./Mocks/Common/GeneralHandlers";
import { CategoryHandlers } from "./Mocks/Common/CategoryHandlers";
import { MastertableHandlers } from "./Mocks/Common/MastertableHandlers";

export const APIServerList = [
    AuthHandlers,
    LoginHandlers,
    HomeHandlers,
    GeneralHandlers,
    CategoryHandlers,
    MastertableHandlers,
];