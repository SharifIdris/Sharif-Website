import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import client from '../contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    client.getEntries({
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1
    })
    .then(response => {
      if (response.items.length > 0) {
        setPost(response.items[0]);
      } else {
        setError(new Error('Post not found'));
      }
      setLoading(false);
    })
    .catch(err => {
      setError(err);
      setLoading(false);
    });
  }, [slug]);

  if (loading) return <div className="loading">Loading post...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;
  if (!post) return <div className="error">Post not found</div>;

  return (
    <article className="blog-post">
      {post.fields.featuredImage && (
        <img
          src={post.fields.featuredImage.fields.file.url}
          alt={post.fields.featuredImage.fields.title}
          className="post-image"
        />
      )}
      <h1 className="post-title">{post.fields.title}</h1>
      <p className="post-date">
        {post.fields.date ? new Date(post.fields.date).toLocaleDateString() : 'Date not available'}
      </p>
      <div className="post-content">
        {post.fields.content ? documentToReactComponents(post.fields.content) : 'Content not available'}
      </div>
    </article>
  );
}
