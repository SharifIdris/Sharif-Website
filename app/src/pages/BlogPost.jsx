import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import client from '../contentful';
import NotFound from './NotFound';

const BlogPost = () => {
  const { slug } = useParams(); // This will be the entry ID
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    client.getEntry(slug)
      .then((response) => {
        setPost({ ...response.fields, id: response.sys.id });
        
        // Fetch related posts
        if (response.fields.tags && response.fields.tags.length > 0) {
          client.getEntries({
            content_type: 'blogPost',
            'fields.tags[in]': response.fields.tags.join(','),
            'sys.id[ne]': slug,
            limit: 3
          })
          .then(relatedResponse => {
            setRelatedPosts(relatedResponse.items.map(p => ({ ...p.fields, id: p.sys.id })));
          });
        }
      })
      .catch(err => {
        console.error('Error fetching post:', err);
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [slug]);

  const renderOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { title, description, file } = node.data.target.fields;
        const mimeType = file.contentType;
        const url = file.url;

        if (mimeType.startsWith('image/')) {
          return <img src={url} alt={description || title} className="my-8 rounded-lg shadow-lg" />;
        }
      },
      [INLINES.ASSET_HYPERLINK]: (node) => {
        const { title, file } = node.data.target.fields;
        return <a href={file.url} target="_blank" rel="noopener noreferrer">{node.content[0].value}</a>;
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error && !post) {
    return <NotFound />;
  }

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
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>
            <div className="flex justify-center items-center text-gray-600 space-x-4">
              <span>{new Date(post.publishDate).toLocaleDateString()}</span>
              {post.tags && post.tags.length > 0 && (
                <>
                  <span>•</span>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <span key={tag} className="bg-blue-100 text-blue-500 px-2 py-1 rounded-full text-sm">{tag}</span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image or Video */}
      <section className="py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-lg overflow-hidden shadow-lg">
              {post.embeddedVideoUrl ? (
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={post.embeddedVideoUrl.replace("watch?v=", "embed/")}
                    title={post.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              ) : post.videoFileUpload ? (
                 <video controls className="w-full h-auto">
                    <source src={post.videoFileUpload.fields.file.url} type={post.videoFileUpload.fields.file.contentType} />
                    Your browser does not support the video tag.
                </video>
              ) : post.featuredImage && (
                <img 
                  src={post.featuredImage.fields.file.url} 
                  alt={post.title} 
                  className="w-full h-auto"
                />
              )}
            </div>
          </div>
        </div>
      </section>

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
              {documentToReactComponents(post.body, renderOptions)}
            </motion.div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-gray-700 font-medium">Tags:</span>
                  {post.tags.map(tag => (
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
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#1DA1F2] flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                  aria-label="Share on Twitter"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a 
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`}
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
              {relatedPosts.map((relatedPost) => (
                <motion.div
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  {relatedPost.featuredImage && (
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={relatedPost.featuredImage.fields.file.url} 
                        alt={relatedPost.title} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      <Link to={`/blog/${relatedPost.id}`} className="hover:text-blue-500 transition-colors duration-300">
                        {relatedPost.title}
                      </Link>
                    </h3>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>{new Date(relatedPost.publishDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Enjoyed this article?</h2>
              <p className="text-gray-600 mb-8">
                Subscribe to my newsletter to get the latest articles, tutorials, and updates delivered straight to your inbox.
              </p>
              <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <motion.button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-md transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default BlogPost;
