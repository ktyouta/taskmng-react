import './App.css';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import Login from './Login/Login';
import Content from './Content/Content';
import { useCookies } from "react-cookie";
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {

  //認証クッキー
  const [cookies] = useCookies();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        {/* クッキーが存在する場合：ホーム画面に遷移
        クッキーが存在しない場合：ログイン画面に遷移 */}
        <Route path="/login" element={Object.keys(cookies).length ? <Navigate to="/" /> : <Login />} />
        <Route path="/*" element={Object.keys(cookies).length ? <Content /> : <Navigate to="/login" />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
