import '../App.css';
import './css/Menu.css';
import { Link } from 'react-router-dom';
import useMenuLogic from './Hook/useMenuLogic';


function Menu() {

  //メニューのビジネスロジック
  const {
    menuList, } = useMenuLogic();

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
