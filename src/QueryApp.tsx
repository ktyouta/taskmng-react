import './App.css';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import Login from './Login/Login';
import Content from './Content/Content';
import { useCookies } from "react-cookie";
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools";
import useQueryApp from './useQueryApp';
import CenterLoading from './Common/CenterLoading';
import { LOGIN_PATH } from './Header/Const/HeaderConst';


function QueryApp() {

    console.log(`QueryApp render`);

    const {
        cookies,
    } = useQueryApp();

    return (
        <Routes>
            {/* クッキーが存在する場合：ホーム画面に遷移
          クッキーが存在しない場合：ログイン画面に遷移 */}
            <Route
                path={LOGIN_PATH}
                element={Object.keys(cookies).length ? <Navigate to="/" /> : <Login />}
            />
            <Route
                path="/*"
                element={Object.keys(cookies).length ? <Content /> : <Navigate to={LOGIN_PATH} />}
            />
        </Routes>
    );
}

export default QueryApp;
