import useApi from "../components/hooks/useApi";

import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import{Post,User} from "../components/interface/types";
import { Link } from "react-router-dom";


const PostPage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [users,setUser] = useState<User[]>([]);
    const {fetchGet,fetchPost} = useApi();

    useEffect(() => {
        fetchGet('posts').then((response) => {
            setPosts(response.data.data);
            setUser(response.data.data);
        });
    }, []);

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
                                <Card.Text>{post.content}</Card.Text>
                                <Link to={`/posts/${post.id}?Comment=0`}>
                                    <Button variant="primary">Leggi di più</Button>
                                </Link>
                            </Card.Body>
                            <Card.Footer className="text-muted">
                                <Card.Text>{post.full_name}</Card.Text>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};
export default PostPage;