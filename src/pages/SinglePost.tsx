import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

interface Comment {
    id: number;
    author: string;
    text: string;
}

interface Post {
    id: number;
    title: string;
    author: string;
    body: string;
}

const SinglePost = () => {
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState<Comment[]>([
        {
            id: 1,
            author: "John",
            text: "Great post!",
        },
        {
            id: 2,
            author: "Jane",
            text: "Thanks for sharing!",
        },
    ]);

    const post: Post = {
        id: 1,
        title: "My First Blog Post",
        author: "Bob",
        body:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus nisi vitae diam malesuada iaculis. Fusce in velit massa. Sed at interdum odio. Nam feugiat dolor quis libero auctor consequat. Nullam id magna id risus tristique maximus. Integer interdum, tortor vitae efficitur suscipit, justo elit varius elit, a faucibus enim lectus quis massa.",
    };

    const handleCommentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!commentText.trim()) return;
        const newComment: Comment = {
            id: comments.length + 1,
            author: "You",
            text: commentText.trim(),
        };
        setComments([...comments, newComment]);
        setCommentText("");
    };

    return (
        <Container className="my-5">
            <Row>
                <Col>
                    <h1>{post.title}</h1>
            <p className="text-muted">
        By {post.author} | {new Date().toDateString()}
    </p>
    <p>{post.body}</p>
    </Col>
    </Row>
    <hr />
    <Row>
        <Col>
            <h4>Comments</h4>
    {comments.length > 0 ? (
        comments.map((comment) => (
            <div key={comment.id} className="my-3">
    <p className="text-muted">
        {comment.author} | {new Date().toLocaleString()}
        </p>
        <p>{comment.text}</p>
        <hr />
        </div>
    ))
    ) : (
        <p>No comments yet.</p>
    )}
    <Form onSubmit={handleCommentSubmit}>
    <Form.Group controlId="commentForm.ControlTextarea1">
        <Form.Label>Leave a Comment</Form.Label>
    <Form.Control
    as="textarea"
    rows={3}
    value={commentText}
    onChange={(event) => setCommentText(event.target.value)}
    />
    </Form.Group>
    <Button variant="primary" type="submit">
        Submit
        </Button>
        </Form>
        </Col>
        </Row>
        </Container>
);
};

export default SinglePost;
