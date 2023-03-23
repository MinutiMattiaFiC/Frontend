import useApi from "../components/hooks/useApi";

import React, {useCallback, useEffect, useState} from 'react';
import {Container, Row, Col, Card, Button, Badge} from 'react-bootstrap';
import {Comment, Post, User} from "../components/interface/types";
import { Link } from "react-router-dom";
import Stack from "react-bootstrap/Stack";
import ModalDelete from "../components/Obj/ModalDelete";
import useUser from "../components/hooks/useUser";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import ModalEditComment from "../components/Obj/ModalEditComment";
import ModalEditPost from "../components/Obj/ModalEditPost";


const PostPage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const {fetchGet,fetchPost} = useApi();
    const [modalErrorShow , setModalErrorShow] = useState();
    const [modalEditShow , setModalEditShow] = useState();

    useEffect(() => {
        fetchGet('posts').then((response) => {
            setPosts(response.data.data);
        });
    }, []);

    const onEditPost = useCallback((postToEdit: Post) => {
        setPosts(prevPosts => {
            return prevPosts.map(post => {
                if (post === postToEdit) {
                    return { ...post, content: postToEdit.content,title:postToEdit.title };
                }
                return post;
            });
        });
    }, [posts]);
    const onDeletePost = useCallback((postToDelete: Post) => {
        setPosts(prevPosts => {
            return prevPosts.filter(post => post !== postToDelete);
        });
    }, [posts]);
    return (
        <Container>
            <Row>
                <Col>
                    <h1>Benvenuti nel nostro blog!</h1>
                </Col>
            </Row>
            <Row>
                {posts.map((post) => (
                    <Col md={4} key={post.id}>
                        <Card className="my-3">
                            <Card.Body>
                                <Card.Title>{post.title}</Card.Title>
                                    <Card.Text>{post.content}
                                        {(useUser().id === post.user_id) && (
                                            <>
                                                <FontAwesomeIcon
                                                    // @ts-ignore
                                                    onClick={() => setModalErrorShow(post.id)}
                                                    icon={faTrash}/>
                                                <FontAwesomeIcon
                                                    // @ts-ignore
                                                    onClick={() => setModalEditShow(post.id)}
                                                    icon={faEdit}/>
                                            </>
                                        )}
                                    </Card.Text>
                                <Link to={`/posts/${post.id}?Comment=0`}>
                                    <Button variant="primary">Leggi di più</Button>
                                </Link>
                            </Card.Body>
                            <ModalDelete
                                // @ts-ignoreon
                                element ={post}
                                show={modalErrorShow === post.id}
                                // @ts-ignore
                                onHide={() => setModalErrorShow(null)}
                                title={"Pay attention"}
                                content={"Are you sure to delete this post?"}
                                url={`posts/${post.id}`}
                                onDelete={onDeletePost}
                            />
                            <ModalEditPost
                                show={modalEditShow === post.id}
                                // @ts-ignore
                                onHide={() => setModalEditShow(null)}
                                url={`posts/${post.id}`}
                                element={post}
                                onEdit={onEditPost}
                            />
                            <Card.Footer className="text-muted">
                                <Card.Text>{post.full_name}</Card.Text>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Stack direction="horizontal" gap={3}>
                <Link to="/posts/new">
                    <Button variant="primary">Crea un nuovo post</Button>
                </Link>
            </Stack>

        </Container>
    );
};
export default PostPage;