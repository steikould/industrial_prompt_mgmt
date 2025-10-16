const { marked } = require('marked');
const DOMPurify = require('isomorphic-dompurify');

/**
 * Transforms markdown to email-friendly HTML for Substack.
 * - Converts markdown to HTML.
 * - Sanitizes HTML to allow only a safe subset of tags.
 * - Wraps the content in a basic email template.
 *
 * @param {object} frontmatter - The frontmatter metadata.
 * @param {string} content - The markdown content.
 * @returns {object} - An object containing the HTML content and subject.
 */
function transformForSubstack(frontmatter, content) {
    console.log('🚀 Transforming for Substack...');

    const { title } = frontmatter;

    // 1. Convert markdown to HTML
    const rawHtml = marked(content);

    // 2. Sanitize HTML for email clients
    const cleanHtml = DOMPurify.sanitize(rawHtml, {
        USE_PROFILES: { html: true },
        ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a', 'img', 'blockquote', 'code', 'pre'],
    });

    // 3. Create a simple, responsive email template
    const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                img { max-width: 100%; height: auto; }
                body { font-family: sans-serif; line-height: 1.6; }
            </style>
        </head>
        <body>
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h1>${title}</h1>
                ${cleanHtml}
            </div>
        </body>
        </html>
    `;

    console.log('✅ Substack transformation complete.');
    return {
        subject: title || 'New Blog Post',
        html: emailHtml,
    };
}

module.exports = transformForSubstack;