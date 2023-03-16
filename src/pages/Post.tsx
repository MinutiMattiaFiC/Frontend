import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
}

const posts: Post[] = [
    {
        id: 1,
        title: 'Il mio primo post',
        content: 'Questo è il contenuto del mio primo post...',
        author: 'Mario Rossi',
    },
    {
        id: 2,
        title: 'Il mio secondo post',
        content: 'Questo è il contenuto del mio secondo post...',
        author: 'Luigi Verdi',
    },
];

const Post: React.FC = () => {
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
                                <Button variant="primary">Leggi di più</Button>
                            </Card.Body>
                            <Card.Footer className="text-muted">
                                Autore: {post.author}
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Post;
