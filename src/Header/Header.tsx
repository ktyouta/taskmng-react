import '../App.css';
import './css/Header.css';
import ButtonComponent from '../Common/ButtonComponent';
import useHeader from './Hook/useHeader';
import { menuListType } from '../Common/Hook/useGetViewName';

type propsType = {
  menu: menuListType[],
  userName: string | undefined,
}

function Header(props: propsType) {

  //ヘッダのビジネスロジック
  const { headerTile, logout } = useHeader({ menu: props.menu });

  return (
    <div className="header">
      <span>
        {headerTile}
      </span>
      <div className="username-area">
        ユーザー：{props.userName ? props.userName : ""}
      </div>
      <ButtonComponent
        styleTypeNumber="LOGOUT"
        title={"ログアウト"}
        onclick={logout}
      />
    </div>
  );
}

export default Header;
