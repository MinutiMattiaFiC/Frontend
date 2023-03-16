import { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';

interface Post {
    title: string;
    content: string;
}


function Post() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8252/posts', { mode: 'no-cors' });
                if (!response.ok) {
                    throw new Error(`Response status ${response.status}`);
                }
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json();
                    setPosts(data);
                } else {
                    const data = await response.text();
                    console.log(data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {posts.map((post, index) => (
                <Card key={index}>
                    <Card.Header>{post.title}</Card.Header>
                    <Card.Body>
                        <Card.Text>{post.content}</Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}

export default Post;
