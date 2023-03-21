import {useEffect, useState} from "react";
import {Container, Row, Col, Badge, Button, Card} from "react-bootstrap";
import { Comment,Post,User } from '../components/interface/types';
import useApi from "../components/hooks/useApi";

type DataInfoType = (Post & { comment: Comment[], user: User }) | undefined

const SinglePost = () => {
    const [postData, setPostData] = useState<DataInfoType>( undefined);
    const {fetchGet} = useApi();

    useEffect(() => {
        fetchGet('posts/1').then((response) => {
            setPostData(response.data.data)
        });
    }, []);


    return (
        <Container className="my-5">
            <Row>
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <Card.Title>{postData?.title}</Card.Title>
                            <Card.Text>{postData?.content}</Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">Posted by {postData?.user.full_name}</small>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card><Card.Body>
                            <Card.Title>About the author
                                <Badge bg="primary">
                                    {postData?.user.subscription}
                                </Badge>{' '}
                            </Card.Title>
                            <Card.Text>{postData?.user.email}</Card.Text>
                        </Card.Body>
                    </Card>

                </Col>

            </Row>
        </Container>
);
};

export default SinglePost;
