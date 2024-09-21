import { IconType } from 'react-icons';
import { IconComponentDataTestId } from '../tests/AppTest/DataTestId';

//引数の型
type propsType = {
    icon: IconType,
    onclick?: () => void,
    bgColor?: string,
    size?: string,
    dataTestId?: string,
    style?: { [key: string]: string },
}

function IconComponent(props: propsType) {

    console.log("IconComponent render");

    const Icon = props.icon;

    return (
        <Icon
            onClick={props.onclick}
            style={{ cursor: !!props.onclick ? 'pointer' : '', color: props.bgColor ?? '', ...props.style }}
            size={props.size}
            data-testid={props.dataTestId ?? IconComponentDataTestId}
        />
    );
}

export default IconComponent;