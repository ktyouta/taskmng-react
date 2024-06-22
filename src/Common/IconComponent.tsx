import { IconType } from 'react-icons';

//引数の型
type propsType = {
    icon: IconType,
    onclick?: () => void,
    bgColor?: string,
    size?: string,
}

function IconComponent(props: propsType) {

    const Icon = props.icon;

    return (
        <Icon
            onClick={props.onclick}
            style={{ cursor: 'pointer', color: props.bgColor ?? '' }}
            size={props.size}
        />
    );
}

export default IconComponent;