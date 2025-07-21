<<<<<<< HEAD
import { useEffect, useState } from 'react';
import client from '../contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Link } from 'react-router-dom';
=======
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import contentService from '../services/contentService';
>>>>>>> 60ead12f862ff689e00601aff94221316bac59c3

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
<<<<<<< HEAD
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
=======
    contentService.getBlogPosts()
      .then((allPosts) => {
        setPosts(allPosts.sort((a, b) => new Date(b.date || b.publishDate) - new Date(a.date || a.publishDate)));
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching blog posts:', error);
        setIsLoading(false);
      });
>>>>>>> 60ead12f862ff689e00601aff94221316bac59c3
  }, []);

  if (loading) return <div className="loading">Loading blog posts...</div>;
  if (error) return <div className="error">Error loading posts: {error.message}</div>;

  return (
<<<<<<< HEAD
    <div className="blog-list">
      {posts.map(post => (
        <article key={post.sys.id} className="blog-post">
          {post.fields.featuredImage && (
            <img 
              src={post.fields.featuredImage.fields.file.url}
              alt={post.fields.featuredImage.fields.title}
              className="post-image"
            />
=======
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Blog</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Insights, tutorials, and updates on AI, virtual assistance, and web development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts Section (only show if there are featured posts) */}
      {featuredPosts.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Featured Posts</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="md:flex">
                    <div className="md:w-2/5">
                      <img 
                        src={post.image?.fields?.file?.url || post.image} 
                        alt={post.title} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-6 md:w-3/5">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {post.tags && post.tags.map(tag => (
                          <span key={tag} className="text-sm text-blue-500 font-medium bg-blue-100 px-2 py-1 rounded-full">{tag}</span>
                        ))}
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mt-2 mb-3">
                        <Link to={`/blog/${post.id}`} className="hover:text-blue-500 transition-colors duration-300">
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 mb-4">{post.summary}</p>
                      <div className="flex items-center text-gray-500 text-sm">
                        <span>{new Date(post.date || post.publishDate).toLocaleDateString()}</span>
                      </div>
                      <Link 
                        to={`/blog/${post.id}`} 
                        className="mt-4 inline-flex items-center text-blue-500 hover:text-blue-700 font-medium transition-colors duration-300"
                      >
                        Read More
                        <svg 
                          className="w-4 h-4 ml-1" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M9 5l7 7-7 7" 
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filter Section */}
      <section className="py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {tags.map((tag, index) => (
              <motion.button
                key={index}
                onClick={() => setFilter(tag)}
                className={`px-6 py-2 rounded-full transition-colors duration-300 capitalize ${
                  filter === tag
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tag}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-8 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={post.image?.fields?.file?.url || post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {post.tags && post.tags.map(tag => (
                          <span key={tag} className="text-sm text-blue-500 font-medium bg-blue-100 px-2 py-1 rounded-full">{tag}</span>
                        ))}
                      </div>
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center text-gray-500 text-sm">
                          <span>{new Date(post.date || post.publishDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">
                        <Link to={`/blog/${post.id}`} className="hover:text-blue-500 transition-colors duration-300">
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 mb-4">{post.summary}</p>
                      <div className="flex justify-between items-center">
                        <Link 
                          to={`/blog/${post.id}`} 
                          className="inline-flex items-center text-blue-500 hover:text-blue-700 font-medium transition-colors duration-300"
                        >
                          Read More
                          <svg 
                            className="w-4 h-4 ml-1" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24" 
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M9 5l7 7-7 7" 
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-gray-600 text-lg">No posts found in this category.</p>
                </div>
              )}
            </>
>>>>>>> 60ead12f862ff689e00601aff94221316bac59c3
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
