import { Col, Container, Row } from "react-bootstrap";
import { SelectPicture } from "./SelectPicture";


export const InputProfilePicture = () => {
    const types = [1, 2, 3];

    return (
        <Container>
            <Row>
                {types.map((type) => {
                    return (
                        <Col xs={4} md={4} key={type}>
                            <SelectPicture type={type} />
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );
};