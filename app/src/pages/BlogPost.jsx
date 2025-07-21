import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import client from '../contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { motion } from 'framer-motion';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    client.getEntries({
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1
    })
    .then(response => {
      if (response.items.length > 0) {
        const post = response.items[0];
        setPost(post);
        
        // Fetch related posts if tags exist
        if (post.fields.tags) {
          client.getEntries({
            content_type: 'blogPost',
            'fields.tags[in]': post.fields.tags.join(','),
            limit: 3,
            'sys.id[ne]': post.sys.id
          })
          .then(relatedResponse => {
            setRelatedPosts(relatedResponse.items);
          });
        }
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

  if (loading) return (
    <div className="flex justify-center py-20">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (error) return <div className="error">Error: {error.message}</div>;
  if (!post) return <div className="error">Post not found</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header Section */}
      <section className="pt-32 pb-16 bg-blue-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center"
          >
            <Link 
              to="/blog" 
              className="inline-flex items-center text-blue-500 hover:text-blue-700 mb-6 transition-colors duration-300"
            >
              <svg 
                className="w-4 h-4 mr-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 19l-7-7 7-7" 
                />
              </svg>
              Back to Blog
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{post.fields.title}</h1>
            <div className="flex justify-center items-center text-gray-600 space-x-4">
              <span>
                {post.fields.date ? new Date(post.fields.date).toLocaleDateString() : 'Date not available'}
              </span>
              {post.fields.tags && post.fields.tags.length > 0 && (
                <>
                  <span>•</span>
                  <div className="flex flex-wrap gap-2">
                    {post.fields.tags.map(tag => (
                      <span key={tag} className="bg-blue-100 text-blue-500 px-2 py-1 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      {post.fields.featuredImage && (
        <section className="py-8">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={post.fields.featuredImage.fields.file.url} 
                  alt={post.fields.featuredImage.fields.title} 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Content */}
      <section className="py-8 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="prose prose-lg max-w-none"
            >
              {post.fields.content && documentToReactComponents(post.fields.content)}
            </motion.div>

            {/* Tags */}
            {post.fields.tags && post.fields.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-gray-700 font-medium">Tags:</span>
                  {post.fields.tags.map(tag => (
                    <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Share this post</h3>
              <div className="flex space-x-4">
                <a 
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.fields.title)}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#1DA1F2] flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                  aria-label="Share on Twitter"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a 
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.fields.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#0077B5] flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                  aria-label="Share on LinkedIn"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#3B5998] flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                  aria-label="Share on Facebook"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Related Posts</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {relatedPosts.map(relatedPost => (
                <motion.div
                  key={relatedPost.sys.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  {relatedPost.fields.featuredImage && (
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={relatedPost.fields.featuredImage.fields.file.url} 
                        alt={relatedPost.fields.featuredImage.fields.title} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      <Link to={`/blog/${relatedPost.fields.slug}`} className="hover:text-blue-500 transition-colors duration-300">
                        {relatedPost.fields.title}
                      </Link>
                    </h3>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>
                        {relatedPost.fields.date ? new Date(relatedPost.fields.date).toLocaleDateString() : 'Date not available'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </motion.div>
  );
}
