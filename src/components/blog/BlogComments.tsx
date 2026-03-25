"use client";

import { useState, useEffect, useRef } from 'react';
import type { GetCommentsResponse } from '@/types/comments';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

interface BlogCommentsProps {
  postSlug: string;
  locale?: string;
}

export default function BlogComments({ postSlug, locale = 'pt' }: BlogCommentsProps) {
  const [comments, setComments] = useState<import('@/types/comments').Comment[]>([]);
  const [commentCount, setCommentCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Fetch comment count
  useEffect(() => {
    const fetchCommentCount = async () => {
      try {
        const response = await fetch(`/api/comments?slug=${encodeURIComponent(postSlug)}`);
        const data: GetCommentsResponse = await response.json();
        
        if (data.success) {
          setCommentCount(data.total);
          // Load comments immediately if there are any
          if (data.total > 0) {
            setComments(data.comments);
          }
        } else {
          setError(data.error || (locale === 'pt' ? 'Erro ao carregar comentários' : 'Error loading comments'));
        }
      } catch (err) {
        setError(locale === 'pt' ? 'Erro de conexão' : 'Connection error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCommentCount();
  }, [postSlug, locale]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Load comments when section becomes visible
  useEffect(() => {
    if (isVisible && commentCount > 0 && comments.length === 0) {
      const fetchComments = async () => {
        try {
          const response = await fetch(`/api/comments?slug=${encodeURIComponent(postSlug)}`);
          const data: GetCommentsResponse = await response.json();
          
          if (data.success) {
            setComments(data.comments);
          }
        } catch (err) {
          setError(locale === 'pt' ? 'Erro ao carregar comentários' : 'Error loading comments');
        }
      };

      fetchComments();
    }
  }, [isVisible, commentCount, comments.length, postSlug, locale]);

  const handleCommentSuccess = () => {
    // Refresh comments by incrementing the key to force re-render
    setComments([]); // Clear current comments
    setIsLoading(true);
    
    // Fetch updated comments
    const fetchUpdatedComments = async () => {
      try {
        const response = await fetch(`/api/comments?slug=${encodeURIComponent(postSlug)}`);
        const data: GetCommentsResponse = await response.json();
        
        if (data.success) {
          setComments(data.comments);
          setCommentCount(data.total);
        }
      } catch (err) {
        setError(locale === 'pt' ? 'Erro ao atualizar comentários' : 'Error updating comments');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUpdatedComments();
  };

  const getCommentText = (count: number) => {
    if (locale === 'pt') {
      return count === 1 ? '1 comentário' : `${count} comentários`;
    } else {
      return count === 1 ? '1 comment' : `${count} comments`;
    }
  };

  return (
    <div 
      ref={sectionRef}
      className="mt-12 pt-8 border-t border-slate-800"
      style={{
        borderTop: '1px solid transparent',
        backgroundImage: 'linear-gradient(to right, transparent, #06b6d4, #059669, transparent)',
        backgroundClip: 'content-box',
        backgroundOrigin: 'border-box',
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            {locale === 'pt' ? 'Comentários' : 'Comments'}
          </h2>
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-slate-400">
                {locale === 'pt' ? 'Carregando comentários...' : 'Loading comments...'}
              </span>
            </div>
          ) : error ? (
            <div className="text-red-400">
              {error}
            </div>
          ) : (
            <p className="text-slate-400">
              {getCommentText(commentCount)}
            </p>
          )}
        </div>

        {isVisible && (
          <div className="space-y-8">
            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
              <CommentList 
                postSlug={postSlug}
                comments={comments} 
                locale={locale}
                onReplySuccess={handleCommentSuccess}
              />
            </div>
            
            <div className="h-px bg-slate-800 my-8"></div>
            
            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold text-white mb-4">
                {locale === 'pt' ? 'Deixe um comentário' : 'Leave a comment'}
              </h3>
              <CommentForm 
                postSlug={postSlug} 
                locale={locale} 
                onSuccess={handleCommentSuccess}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}