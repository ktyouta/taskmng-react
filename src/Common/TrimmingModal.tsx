import { Button, Modal } from "react-bootstrap";

export const TrimmingModal = ({
    show,
    setShow,
    saveCroppedImg,
    children,
}: any) => {
    const handleClose = () => setShow(false);

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>トリミング</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">{children}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    キャンセル
                </Button>
                <Button variant="primary" onClick={saveCroppedImg}>
                    登録
                </Button>
            </Modal.Footer>
        </Modal>
    );
};