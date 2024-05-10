import { useRef } from "react";


type propsType<T> = {
    initValue: T
}

/**
 * 定数保持フック
 * @param props 
 */
function useConstValue<T>(props: propsType<T>) {

    const ref = useRef<{ value: T }>();

    if (ref.current?.value === undefined) {
        ref.current = {
            value: props.initValue
        };
    }

    return ref.current.value;
}

export default useConstValue;