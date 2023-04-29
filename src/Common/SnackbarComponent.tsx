import * as React from 'react'
import { Snackbar } from '@mui/material'
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert'

/** スナックバーの表示をカスタマイズ */
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

//引数の型
type props = {
    open: boolean
    message: string
    severity?: AlertColor
    onClose?: () => void
}


export const SnackbarComponent: React.FC<props> = ({
    open, message, severity = 'info', onClose
}) => {
    return (
        <Snackbar
            open={open}
            onClose={onClose}
            style={{ position: "initial" }}
        >
            <Alert
                severity={severity}
                style={{
                    width: "50vw",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginBottom: "2%",
                    overflowWrap: "break-word",
                    textAlign:"left"
                }}>
                {message}
            </Alert>
        </Snackbar>
    )
}