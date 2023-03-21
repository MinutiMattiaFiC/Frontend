import {useEffect, useState} from "react";
import {Container, Row, Col, Badge, Button, Card} from "react-bootstrap";
import { Comment,Post,User } from '../components/interface/types';
import useApi from "../components/hooks/useApi";
import { useParams,useLocation } from "react-router-dom";

interface RouteParams {
    [param: string]: string | undefined;
    post_id: string;
    comment: string | "";
}



type DataInfoType = (Post & { comment: Comment[], user: User }) | undefined

    const SinglePost = () => {
    const [postData, setPostData] = useState<DataInfoType>( undefined);
    const {fetchGet} = useApi();
    const { post_id } = useParams<RouteParams>();
    const location = useLocation();
    const commentCount = new URLSearchParams(location.search).get("comment") ?? "";


        useEffect(() => {
            const encodedComment = encodeURIComponent(commentCount ?? "");
            fetchGet(`posts/${post_id}?comments=${encodedComment}`).then((response) => {
                setPostData(response.data.data);
            });
        }, [fetchGet, post_id, commentCount]);
        const handleIncrementComment = () => {
            const newCommentCount = 5 + (parseInt(commentCount) || 0); // converte in numero e incrementa di 5, se è NaN allora imposta a 0
            const newUrl = `/posts/${post_id}?comment=${newCommentCount}`;
            window.location.assign(newUrl);
        };

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

                    <h2 className="my-4">Comments</h2>
                    {Array.isArray(postData?.comment) ?
                        postData?.comment.map((comment) => (
                            <Card key={comment.id} className="my-4">
                                <Card.Body>
                                    <Card.Text>{comment.content}</Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted">Comment by {comment.user_id}</small>
                                </Card.Footer>
                            </Card>
                        ))
                        : <p>No comments yet.</p>
                    }
                    <Button
                        variant="primary"
                        onClick={handleIncrementComment}
                    >
                        {'see more comment'}
                    </Button>

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
        </Container>);
};

export default SinglePost;
