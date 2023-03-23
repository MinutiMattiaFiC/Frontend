import React, {useCallback, useEffect, useState} from "react";
import {Container, Row, Col, Badge, Button, Card} from "react-bootstrap";
import { Comment,Post,User } from '../components/interface/types';
import useApi from "../components/hooks/useApi";
import { useParams,useLocation } from "react-router-dom";
import FormAddComment from "../components/Obj/FormAddComment";
import Modal from "../components/Obj/Modal";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import useToken from "../components/hooks/useToken";
interface RouteParams {
    [param: string]: string | undefined;
    post_id: string;
    comment: string | "";
}

type DataInfoType = Post & { user: User }
const onLoad = 3; //commenti caricati alla volta

const SinglePost = () => {
    const [postData, setPostData] = useState<DataInfoType>( );
    const [comments, setComments] = useState<Comment[]>([]);
    const [modalShow, setModalShow] = useState(false);
    const [buttonStatus, setButtonStatus] = useState(false);

    const apiToken = useToken();
    const {fetchGet} = useApi();
    const {post_id} = useParams<RouteParams>();

    const onSaveComment = useCallback((comment : Comment) =>{
        setComments(prevComments => {
            return [comment,...prevComments]
        });
    },[comments]);

    useEffect(() => {
        fetchGet(`posts/${post_id}?comments=${onLoad}`).then((response) => {
            setPostData(response.data.data);
            setComments((response.data.data.comment))
        });
    }, [post_id]);

     const handleIncrementComment = useCallback (() => {
         setButtonStatus(true)
        const lastComment = comments[comments.length - 1];
        const last_comment_id = lastComment.id;
        fetchGet(`posts/load/${post_id}?comments=${onLoad}&last_comment_id=${last_comment_id}`).then((response) => {
            const newComments = response.data.data;
            setComments(prevComments => prevComments.concat(newComments));
            if(Array.isArray(newComments) && newComments.length !== 0){
                setButtonStatus(false)
            }
        });
    },[comments]);

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
                    {apiToken && <FormAddComment
                        postId={post_id}
                        onSave={onSaveComment}
                    />}
                    <h2 className="my-4">Comments</h2>
                    {
                        comments.map((comment) => (
                            <Card key={comment.id} className="my-4">
                                <Card.Body>
                                    <Card.Text>{comment.content}
                                        <FontAwesomeIcon
                                            onClick={() => setModalShow(true)}
                                            icon={faEye} />
                                        <Modal
                                            show={modalShow}
                                            onHide={() => setModalShow(false)}
                                            title = {comment.user_id}
                                            content = {comment.content}
                                        />
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted">Comment by {comment.user_id}</small>
                                </Card.Footer>
                            </Card>
                        ))
                    }
                    {
                        !comments && <p>No comments yet</p>
                    }
                    <Button
                        disabled={buttonStatus}
                        variant="primary"
                        onClick={handleIncrementComment}
                    >
                        {'see more comments'}
                    </Button>
                </Col>
                <Col md={4}>
                    <Card><Card.Body>
                            <Card.Title>About the author</Card.Title>
                            <Card.Text>{postData?.user.email}<Badge bg="primary">
                                {postData?.user.subscription}
                            </Badge>{' '}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default SinglePost;
