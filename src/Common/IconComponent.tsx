import { IconType } from 'react-icons';
import { IconComponentDataTestId } from '../tests/AppTest/Utils/DataTestId';

//引数の型
type propsType = {
    icon: IconType,
    onclick?: () => void,
    bgColor?: string,
    size?: string,
    dataTestId?: string
}

function IconComponent(props: propsType) {

    console.log("IconComponent render");

    const Icon = props.icon;

    return (
        <Icon
            onClick={props.onclick}
            style={{ cursor: 'pointer', color: props.bgColor ?? '' }}
            size={props.size}
            data-testid={props.dataTestId ?? IconComponentDataTestId}
        />
    );
}

export default IconComponent;