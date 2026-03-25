'use client';

import { useState } from 'react';
import type { CreateCommentRequest, CreateCommentResponse } from '@/types/comments';

interface CommentFormProps {
  postSlug: string;
  locale: string;
  parentId?: string;
  onSuccess?: () => void;
}

export default function CommentForm({ postSlug, locale, parentId, onSuccess }: CommentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  
  const [formData, setFormData] = useState({
    author_name: '',
    author_email: '',
    author_company: '',
    content: '',
    consent_lgpd: false,
    consent_marketing: false,
    website: '', // Honeypot field
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consent_lgpd) {
      setSubmitStatus({
        type: 'error',
        message: locale === 'pt' 
          ? 'Você precisa aceitar os termos de privacidade para comentar.' 
          : 'You must accept the privacy terms to comment.'
      });
      return;
    }

    if (!formData.content.trim()) {
      setSubmitStatus({
        type: 'error',
        message: locale === 'pt' 
          ? 'Por favor, escreva seu comentário.' 
          : 'Please write your comment.'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const requestBody: CreateCommentRequest = {
        post_slug: postSlug,
        author_name: formData.author_name.trim(),
        author_email: formData.author_email.trim().toLowerCase(),
        author_company: formData.author_company.trim() || undefined,
        content: formData.content.trim(),
        parent_id: parentId, // Add parentId if it exists
        consent_lgpd: true,
        consent_marketing: formData.consent_marketing,
        website: formData.website, // Honeypot - should be empty
      };

      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const result: CreateCommentResponse = await response.json();

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: locale === 'pt' 
            ? 'Comentário enviado com sucesso! Aparecerá após moderação.' 
            : 'Comment submitted successfully! Will appear after moderation.'
        });
        
        // Reset form
        setFormData({
          author_name: '',
          author_email: '',
          author_company: '',
          content: '',
          consent_lgpd: false,
          consent_marketing: false,
          website: '',
        });
        
        // Call success callback
        onSuccess?.();
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || (locale === 'pt' 
            ? 'Erro ao enviar comentário. Tente novamente.' 
            : 'Error sending comment. Please try again.')
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: locale === 'pt' 
          ? 'Erro de conexão. Tente novamente.' 
          : 'Connection error. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot field - hidden from users but bots might fill it */}
      <input
        type="text"
        name="website"
        value={formData.website}
        onChange={handleChange}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="author_name" className="block text-sm font-medium text-slate-300 mb-1">
            {locale === 'pt' ? 'Nome *' : 'Name *'}
          </label>
          <input
            type="text"
            id="author_name"
            name="author_name"
            value={formData.author_name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder={locale === 'pt' ? 'Seu nome' : 'Your name'}
          />
        </div>
        
        <div>
          <label htmlFor="author_email" className="block text-sm font-medium text-slate-300 mb-1">
            {locale === 'pt' ? 'Email *' : 'Email *'}
          </label>
          <input
            type="email"
            id="author_email"
            name="author_email"
            value={formData.author_email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder={locale === 'pt' ? 'seu@email.com' : 'your@email.com'}
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="author_company" className="block text-sm font-medium text-slate-300 mb-1">
          {locale === 'pt' ? 'Empresa (opcional)' : 'Company (optional)'}
        </label>
        <input
          type="text"
          id="author_company"
          name="author_company"
          value={formData.author_company}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          placeholder={locale === 'pt' ? 'Sua empresa' : 'Your company'}
        />
      </div>
      
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-slate-300 mb-1">
          {locale === 'pt' ? 'Comentário *' : 'Comment *'}
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-vertical"
          placeholder={locale === 'pt' ? 'Escreva seu comentário...' : 'Write your comment...'}
        />
      </div>
      
      <div className="space-y-3">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="consent_lgpd"
              name="consent_lgpd"
              type="checkbox"
              checked={formData.consent_lgpd}
              onChange={handleChange}
              required
              className="w-4 h-4 text-cyan-600 bg-slate-800 border-slate-600 rounded focus:ring-cyan-500 focus:ring-2"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="consent_lgpd" className="text-slate-300">
              {locale === 'pt' 
                ? 'Aceito os termos de privacidade e autorizo o tratamento dos meus dados conforme a LGPD. *' 
                : 'I accept the privacy terms and authorize the processing of my data according to GDPR. *'}
            </label>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="consent_marketing"
              name="consent_marketing"
              type="checkbox"
              checked={formData.consent_marketing}
              onChange={handleChange}
              className="w-4 h-4 text-cyan-600 bg-slate-800 border-slate-600 rounded focus:ring-cyan-500 focus:ring-2"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="consent_marketing" className="text-slate-300">
              {locale === 'pt' 
                ? 'Quero receber conteúdos e novidades da INOVAWAY (opcional)' 
                : 'I want to receive content and news from INOVAWAY (optional)'}
            </label>
          </div>
        </div>
      </div>
      
      {submitStatus && (
        <div className={`p-3 rounded-md ${submitStatus.type === 'success' ? 'bg-green-900/50 border border-green-800' : 'bg-red-900/50 border border-red-800'}`}>
          <p className={submitStatus.type === 'success' ? 'text-green-200' : 'text-red-200'}>
            {submitStatus.message}
          </p>
        </div>
      )}
      
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-green-600 text-white font-medium rounded-md hover:from-cyan-500 hover:to-green-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {locale === 'pt' ? 'Enviando...' : 'Sending...'}
            </span>
          ) : (
            locale === 'pt' ? 'Enviar Comentário' : 'Send Comment'
          )}
        </button>
      </div>
    </form>
  );
}