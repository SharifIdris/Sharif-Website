import { useEffect, useState } from 'react';
import client from '../contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Link } from 'react-router-dom';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    client.getEntries({
      content_type: 'blogPost',
      order: '-fields.date',
      select: 'fields.title,fields.slug,fields.date,fields.excerpt,fields.featuredImage'
    })
    .then(response => {
      setPosts(response.items);
      setLoading(false);
    })
    .catch(err => {
      setError(err);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="loading">Loading blog posts...</div>;
  if (error) return <div className="error">Error loading posts: {error.message}</div>;

  return (
    <div className="blog-list">
      {posts.map(post => (
        <article key={post.sys.id} className="blog-post">
          {post.fields.featuredImage && (
            <img 
              src={post.fields.featuredImage.fields.file.url}
              alt={post.fields.featuredImage.fields.title}
              className="post-image"
            />
          )}
          <h2 className="post-title">
            <Link to={`/blog/${post.fields.slug}`}>{post.fields.title}</Link>
          </h2>
          <p className="post-date">
            {post.fields.date ? new Date(post.fields.date).toLocaleDateString() : 'Date not available'}
          </p>
          <div className="post-excerpt">
            {documentToReactComponents(post.fields.excerpt)}
          </div>
          <Link to={`/blog/${post.fields.slug}`} className="read-more">
            Read more →
          </Link>
        </article>
      ))}
    </div>
  );
}
