import { setupServer } from "msw/node";
import { AuthHandlers } from "./Common/Mocks/AuthHandlers";
import { LoginHandlers } from "./Login/Mocks/LoginHandlers";
import { HomeHandlers } from "./Home/Mocks/HomeHandlers";
import { GeneralHandlers } from "./Common/Mocks/GeneralHandlers";
import { CategoryHandlers } from "./Common/Mocks/CategoryHandlers";
import { MastertableHandlers } from "./Common/Mocks/MastertableHandlers";

/**
 * Mocks内のハンドラー設定
 */
export const APIServerList = [
    AuthHandlers,
    LoginHandlers,
    HomeHandlers,
    GeneralHandlers,
    CategoryHandlers,
    MastertableHandlers,
];