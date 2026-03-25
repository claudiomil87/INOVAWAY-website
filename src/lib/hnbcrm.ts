/**
 * HNBCRM Integration — Blog Comment Lead Capture
 *
 * Sends a lead to HNBCRM when a blog visitor comments with
 * consent_marketing = true. Failures are silently caught to
 * never break the comment submission experience.
 *
 * API: https://tacit-chicken-195.convex.site/api/v1/inbound/lead
 */

const HNBCRM_API_URL = 'https://tacit-chicken-195.convex.site/api/v1/inbound/lead';
const HNBCRM_API_KEY = process.env.HNBCRM_API_KEY!;

export interface HNBCRMLeadPayload {
  authorName: string;
  authorEmail: string;
  authorCompany?: string | null;
  postSlug: string;
  commentExcerpt: string;
}

/**
 * Sends a blog comment lead to HNBCRM.
 * Safe to call without await — catches all errors internally.
 */
export async function sendCommentLeadToCRM(payload: HNBCRMLeadPayload): Promise<void> {
  try {
    const [firstName, ...rest] = payload.authorName.trim().split(' ');
    const lastName = rest.join(' ');

    const excerpt = payload.commentExcerpt.length > 200
      ? payload.commentExcerpt.slice(0, 200) + '...'
      : payload.commentExcerpt;

    const response = await fetch(HNBCRM_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': HNBCRM_API_KEY,
      },
      body: JSON.stringify({
        title: 'Blog Comment Lead',
        contact: {
          firstName: firstName || payload.authorName,
          lastName: lastName || '',
          email: payload.authorEmail,
          phone: '',
          company: payload.authorCompany || '',
        },
        message: `Comentou no post: ${payload.postSlug} - ${excerpt}`,
        // HNBCRM accepts: whatsapp, telegram, email, webchat, internal
        // Use 'webchat' with 'comment-lead' tag to identify blog comments
        channel: 'webchat',
        tags: ['blog', 'inovaway', 'organic', 'comment-lead'],
        temperature: 'warm',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'unknown');
      console.error('[HNBCRM] Lead submission failed:', response.status, errorText);
    } else {
      const data = await response.json().catch(() => ({}));
      console.log('[HNBCRM] Lead created:', data?.leadId || 'ok');
    }
  } catch (err) {
    // Never let CRM failures break the comment flow
    console.error('[HNBCRM] Unexpected error sending lead:', err);
  }
}
