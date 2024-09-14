import { setupServer } from "msw/node";
import { AuthHandlers } from "./Common/Mocks/AuthHandlers";
import { LoginHandlers } from "./Login/Mocks/LoginHandlers";
import { HomeHandlers } from "./Home/Mocks/HomeHandlers";
import { GeneralHandlers } from "./Common/Mocks/GeneralHandlers";
import { CategoryHandlers } from "./Common/Mocks/CategoryHandlers";
import { MastertableHandlers } from "./Common/Mocks/MastertableHandlers";
import { TaskHandlers } from "./Task/Mocks/TaskHandlers";
import { SearchconditionHandlers } from "./Task/Mocks/SearchconditionHandllers";
import { TaskContentSettingHandlers } from "./Task/Mocks/TaskContentSettingHandler";
import { TaskDetailHandlers } from "./Task/Mocks/TaskDetailHandlers";
import { TaskInputSettingHandlers } from "./Task/Mocks/TaskInputSettingHandlers";

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
    SearchconditionHandlers,
    TaskHandlers,
    TaskContentSettingHandlers,
    TaskDetailHandlers,
    TaskInputSettingHandlers
];