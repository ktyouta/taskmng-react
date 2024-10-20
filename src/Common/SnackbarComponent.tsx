import * as React from 'react'
import { Snackbar } from '@mui/material'
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert'
import { useEffect } from 'react'

/** スナックバーの表示をカスタマイズ */
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

//引数の型
type propsType = {
    open: boolean
    message: string
    severity?: AlertColor
    onClose?: () => void,
    outerStyle?: { [key: string]: string },
    innerStyle?: { [key: string]: string },
    noFocus?: boolean,
}


export const SnackbarComponent: React.FC<propsType> = (props) => {

    const focusRef = React.useRef<HTMLElement>(null);

    //コンポーネント表示時にスクロールする
    useEffect(() => {
        if (!props.noFocus && focusRef.current) {
            focusRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, []);

    return (
        <Snackbar
            open={props.open}
            onClose={props.onClose}
            style={{ position: "initial", ...props.outerStyle }}
            ref={focusRef}
        >
            <Alert
                severity={props.severity}
                style={{
                    overflowWrap: "break-word",
                    textAlign: "left",
                    ...props.innerStyle,
                }}>
                {props.message}
            </Alert>
        </Snackbar>
    )
}