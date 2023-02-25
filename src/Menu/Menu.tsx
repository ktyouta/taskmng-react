import '../App.css';
import './css/Menu.css';
import { Link } from 'react-router-dom';
import useGetViewName, { menuListType } from '../Common/Hook/useGetViewName';

type propsType = {
  menu: menuListType[]
}

function Menu(props: propsType) {

  //メニュー名
  const [selectedMenu] = useGetViewName({ menu: props.menu });

  return (
    <div className="menu">
      {
        props.menu && props.menu.length > 0 &&
        <ul className='menu-ul'>
          {props.menu.map((element, i) => {
            let cssName = "";
            //先頭のli
            if (i === 0) {
              cssName = "top-menu-li ";
            }
            //選択中のメニューを強調
            if (element.name === selectedMenu) {
              cssName += "selected";
            }
            return (
              <li key={`${element.url}-${i}`} className={cssName}>
                <Link to={element.url} className="menu-link">{element.name}</Link>
              </li>
            );
          })}
        </ul>
      }
    </div>
  );

}

export default Menu;
