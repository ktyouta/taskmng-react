import * as React from 'react'
import { Snackbar } from '@mui/material'
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert'
import { useEffect } from 'react'
import IconComponent from './IconComponent'
import { RxCross1 } from 'react-icons/rx'

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
    focusRef?: React.RefObject<HTMLElement>
}


export const SnackbarBaseComponent: React.FC<propsType> = (props) => {

    return (
        <Snackbar
            open={props.open}
            onClose={props.onClose}
            style={{ position: "initial", ...props.outerStyle }}
            ref={props.focusRef}
        >
            <Alert
                severity={props.severity}
                style={{
                    position: "relative",
                    overflowWrap: "break-word",
                    textAlign: "left",
                    display: "flex",
                    alignItems: "center",
                    ...props.innerStyle,
                }}>
                {props.message}
                {
                    props.onClose &&
                    <IconComponent
                        icon={RxCross1}
                        onclick={props.onClose}
                        style={{
                            "text-align": "right",
                            "position": "absolute",
                            "right": "2%",
                            "top": "32%"
                        }}
                    />
                }
            </Alert>
        </Snackbar>
    )
}