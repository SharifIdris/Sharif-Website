import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import NotFound from './NotFound';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    // Fetch the blog post with the matching slug
    fetch(`/api/blog/${slug}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load post');
        }
        return response.json();
      })
      .then(post => {
        setPost(post);
        
        // Fetch all posts to find related ones
        return fetch('/api/blog')
          .then(response => response.json())
          .then(data => {
            // Find related posts (same category, excluding current post)
            const related = data
              .filter(p => p.category === post.category && p.slug !== post.slug)
              .slice(0, 3);
            setRelatedPosts(related);
          });
      })
      .catch(err => {
        console.error('Error fetching post:', err);
        setError(err.message);
        
        // Fallback data for development/demo purposes
        if (slug === 'top-5-ai-tools') {
          setPost({
            id: 1,
            title: 'Top 5 AI Tools for Virtual Assistants in 2023',
            description: 'Discover the most powerful AI tools that can help virtual assistants boost productivity and deliver better results.',
            image: '/images/blog-1.jpg',
            date: '2023-10-15',
            readTime: '5 min read',
            category: 'AI Tools',
            featured: true,
            slug: 'top-5-ai-tools',
            content: `
# Top 5 AI Tools for Virtual Assistants in 2023

As a virtual assistant, leveraging the right AI tools can significantly enhance your productivity and the value you provide to clients. Here are the top 5 AI tools that every virtual assistant should consider incorporating into their workflow in 2023.

## 1. ChatGPT (OpenAI)

ChatGPT has revolutionized how virtual assistants handle communication and content creation. This powerful language model can help with:

- Drafting emails and responses
- Creating social media content
- Summarizing long documents
- Generating creative ideas
- Answering research questions

The key to using ChatGPT effectively is learning how to craft proper prompts that yield the best results for your specific needs.

## 2. Notion AI

Notion AI integrates artificial intelligence directly into the popular Notion workspace, allowing virtual assistants to:

- Summarize meeting notes automatically
- Draft content within your workspace
- Improve writing with AI-powered editing suggestions
- Generate action items from meeting transcripts
- Create structured content from rough ideas

This tool is particularly valuable for VAs who already use Notion for project management and client organization.

## 3. Zapier with AI Integrations

Zapier has expanded its automation capabilities with AI integrations, enabling virtual assistants to:

- Create complex workflows that incorporate AI tools
- Automatically process and categorize emails
- Extract data from documents and forms
- Trigger AI-powered responses based on specific events
- Connect various AI services without coding knowledge

The power of Zapier lies in connecting different services to create seamless workflows.

## 4. Otter.ai

For virtual assistants who handle meetings and calls, Otter.ai provides:

- Real-time transcription of meetings
- Speaker identification in conversations
- Automated meeting summaries
- Searchable transcripts
- Integration with Zoom, Google Meet, and other platforms

This tool saves hours of manual note-taking and ensures you never miss important details from client meetings.

## 5. Midjourney

For virtual assistants who need to create visual content, Midjourney offers:

- AI-generated images from text descriptions
- Custom visual content for social media
- Concept visualization for presentations
- Mood boards and design inspiration
- Quick mockups for client approval

Visual content is increasingly important, and Midjourney allows VAs to create professional-looking images without graphic design skills.

## Conclusion

The landscape of AI tools is evolving rapidly, and staying current with these technologies can give virtual assistants a significant competitive advantage. By incorporating these tools into your workflow, you can offer more value to clients, handle more complex tasks, and potentially increase your rates based on these enhanced capabilities.

Remember that AI tools should augment your skills, not replace them. The most successful virtual assistants use AI to handle routine tasks while focusing their human expertise on strategy, relationship building, and tasks requiring emotional intelligence.
            `
          });
          setError(null);
        } else if (slug === 'monetizing-creativity-with-ai-clones-virtual-influencers-smart-product-demos') {
          setPost({
            id: 2,
            title: 'How to Monetize Your Creativity with AI Clones',
            description: 'Learn how to leverage AI technology to create digital versions of yourself that can generate income while you sleep.',
            image: '/images/blog-2.jpg',
            date: '2023-09-22',
            readTime: '8 min read',
            category: 'Business',
            featured: false,
            slug: 'monetizing-creativity-with-ai-clones-virtual-influencers-smart-product-demos',
            content: `
# How to Monetize Your Creativity with AI Clones

The concept of creating digital versions of yourself—AI clones—is no longer science fiction. Today's technology allows creators to develop virtual representations that can generate income through various channels. Here's how you can monetize your creativity using AI clones.

## What Are AI Clones?

AI clones are digital representations of yourself that can mimic your appearance, voice, writing style, or creative approach. Using machine learning algorithms, these clones can create content, interact with audiences, or perform tasks that would normally require your direct involvement.

## Monetization Strategies

### 1. Virtual Influencer Marketing

Create an AI version of yourself that can:
- Promote products on social media
- Engage with followers consistently
- Appear in multiple campaigns simultaneously
- Work across different time zones without fatigue

Brands are increasingly partnering with virtual influencers due to their reliability and novelty factor. Your AI clone can represent products that align with your personal brand while you focus on other creative endeavors.

### 2. Digital Content Creation

Your AI clone can help scale your content production:
- Generate articles, blog posts, or newsletters in your writing style
- Create variations of your visual artwork or designs
- Produce music that matches your compositional style
- Develop scripts or outlines for videos

This allows you to increase your output without sacrificing quality or your distinctive creative voice.

### 3. Virtual Consulting and Coaching

Train an AI clone to provide basic consulting services:
- Answer frequently asked questions
- Provide introductory guidance in your area of expertise
- Offer preliminary assessments before clients work with you directly
- Scale your knowledge to serve more clients

This creates a tiered service model where your AI handles initial interactions, and you focus on high-value, personalized consulting.

### 4. Product Demonstrations

Use your AI clone for product demonstrations:
- Create interactive tutorials for your digital products
- Develop personalized product tours
- Offer 24/7 demonstration capabilities on your website
- Customize demos based on customer interests

This enhances the customer experience while freeing you from repetitive demonstration tasks.

## Ethical Considerations

When creating and monetizing AI clones, consider these ethical guidelines:

1. **Transparency**: Always disclose when content is created by an AI clone rather than you directly.
2. **Authenticity**: Ensure your AI clone accurately represents your values and expertise.
3. **Quality Control**: Regularly review your AI clone's output to maintain standards.
4. **Privacy**: Be mindful of how your personal data is used to train your AI clone.

## Getting Started

1. **Choose Your Clone Type**: Decide whether you want a text-based, voice-based, or visual AI clone.
2. **Select the Right Platform**: Research companies specializing in AI clone development like HourOne, Synthesia, or Descript.
3. **Gather Training Data**: Provide high-quality samples of your work, voice recordings, or videos.
4. **Develop a Monetization Strategy**: Identify which methods align best with your brand and audience.
5. **Start Small**: Test your AI clone with limited projects before scaling up.

## Conclusion

AI clones represent a frontier in creative monetization, allowing you to leverage your unique style and expertise at scale. While the technology continues to evolve, early adopters have the opportunity to establish new business models and revenue streams that blend human creativity with artificial intelligence.

Remember that your AI clone should complement your work rather than replace your authentic human connection with your audience. The most successful creators use AI clones strategically, focusing on applications where automation adds value while maintaining personal involvement in areas where human touch matters most.
            `
          });
          setError(null);
        } else {
          // Keep the error state for truly missing posts
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [slug]);

  // Simple Markdown renderer (for demo purposes)
  const renderMarkdown = (markdown) => {
    if (!markdown) return null;
    
    // Split the markdown into lines
    const lines = markdown.split('\n');
    const result = [];
    let inList = false;
    let listItems = [];
    
    lines.forEach((line, index) => {
      // Heading 1
      if (line.startsWith('# ')) {
        if (inList) {
          result.push(<ul key={`list-${index}`} className="list-disc ml-6 mb-4">{listItems}</ul>);
          inList = false;
          listItems = [];
        }
        result.push(<h1 key={index} className="text-3xl font-bold mt-8 mb-4">{line.substring(2)}</h1>);
      }
      // Heading 2
      else if (line.startsWith('## ')) {
        if (inList) {
          result.push(<ul key={`list-${index}`} className="list-disc ml-6 mb-4">{listItems}</ul>);
          inList = false;
          listItems = [];
        }
        result.push(<h2 key={index} className="text-2xl font-bold mt-6 mb-3">{line.substring(3)}</h2>);
      }
      // Heading 3
      else if (line.startsWith('### ')) {
        if (inList) {
          result.push(<ul key={`list-${index}`} className="list-disc ml-6 mb-4">{listItems}</ul>);
          inList = false;
          listItems = [];
        }
        result.push(<h3 key={index} className="text-xl font-bold mt-5 mb-2">{line.substring(4)}</h3>);
      }
      // Unordered list item
      else if (line.startsWith('- ')) {
        inList = true;
        listItems.push(<li key={`item-${index}`} className="mb-2">{line.substring(2)}</li>);
      }
      // Empty line
      else if (line.trim() === '') {
        if (inList) {
          result.push(<ul key={`list-${index}`} className="list-disc ml-6 mb-4">{listItems}</ul>);
          inList = false;
          listItems = [];
        }
        result.push(<br key={index} />);
      }
      // Regular paragraph
      else {
        if (inList) {
          result.push(<ul key={`list-${index}`} className="list-disc ml-6 mb-4">{listItems}</ul>);
          inList = false;
          listItems = [];
        }
        result.push(<p key={index} className="mb-4">{line}</p>);
      }
    });
    
    // Add any remaining list items
    if (inList) {
      result.push(<ul key="list-final" className="list-disc ml-6 mb-4">{listItems}</ul>);
    }
    
    return result;
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
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
              <span>•</span>
              <span className="text-blue-500">{post.category}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-auto"
              />
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
              {renderMarkdown(post.content)}
            </motion.div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                <span className="text-gray-700 font-medium">Tags:</span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {post.category}
                </span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  AI Tools
                </span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  Technology
                </span>
              </div>
            </div>

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
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={relatedPost.image} 
                      alt={relatedPost.title} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      <Link to={`/blog/${relatedPost.slug}`} className="hover:text-blue-500 transition-colors duration-300">
                        {relatedPost.title}
                      </Link>
                    </h3>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>{relatedPost.date}</span>
                      <span>{relatedPost.readTime}</span>
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