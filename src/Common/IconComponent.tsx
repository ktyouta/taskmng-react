import { IconType } from 'react-icons';

//引数の型
type propsType = {
    icon: IconType,
    onclick: () => void,
    bgColor?: string,
}

function IconComponent(props: propsType) {

    const Icon = props.icon;

    return (
        <Icon onClick={props.onclick} style={{ cursor: 'pointer', color: props.bgColor ?? '' }} />
    );
}

export default IconComponent;