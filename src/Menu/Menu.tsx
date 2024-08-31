import '../App.css';
import './css/Menu.css';
import { Link } from 'react-router-dom';
import useMenuLogic from './Hook/useMenuLogic';

//引数の型
type propsType = {
  selectedMenu: string,
}

function Menu(props: propsType) {

  console.log("Menu render");

  //メニューのビジネスロジック
  const {
    menuList,
  } = useMenuLogic({ ...props });

  return (
    <div className="menu">
      <ul className='menu-ul'>
        {
          menuList && menuList.length > 0 &&
          menuList.map((element) => {
            return element;
          })
        }
      </ul>
    </div>
  );

}

export default Menu;
