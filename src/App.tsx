import './App.css';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import Login from './Login/Login';
import Content from './Content/Content';
import { useCookies } from "react-cookie";
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools";
import QueryApp from './QueryApp';


//React-Query用
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});


function App() {

  console.log(`App render`);

  return (
    <QueryClientProvider client={queryClient}>
      <QueryApp />
      {/* React-query devtool */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
