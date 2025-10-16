/**
 * Transforms markdown for Medium.
 * - Cleans custom markdown syntax.
 * - Converts relative image paths to absolute URLs.
 * - Limits tags to a maximum of 5.
 *
 * @param {object} frontmatter - The frontmatter metadata.
 * @param {string} content - The markdown content.
 * @returns {object} - The transformed post for the Medium API.
 */
function transformForMedium(frontmatter, content) {
    console.log('🚀 Transforming for Medium...');

    const { title, tags, canonicalUrl } = frontmatter;
    const autoPublish = process.env.MEDIUM_AUTO_PUBLISH === 'true';
    const blogBaseUrl = process.env.BLOG_BASE_URL || '';

    // 1. Clean markdown content
    // Remove custom syntax like :::note ... :::
    let cleanedContent = content.replace(/:::.+?:::/gs, '');

    // 2. Convert relative image paths to absolute URLs
    // Assumes images are in /images/ folder relative to the base URL
    cleanedContent = cleanedContent.replace(/!\[(.*?)\]\((.*?)\)/g, (match, alt, src) => {
        if (src.startsWith('http')) {
            return match; // Already an absolute URL
        }
        const imageUrl = new URL(src, blogBaseUrl).href;
        return `![${alt}](${imageUrl})`;
    });

    // 3. Prepare data for Medium API
    const postData = {
        title: title || 'Untitled Post',
        contentFormat: 'markdown',
        content: `
# ${title}

${cleanedContent}
`,
        tags: tags ? tags.slice(0, 5) : [],
        publishStatus: autoPublish ? 'public' : 'draft',
        ...(canonicalUrl && { canonicalUrl }),
    };

    console.log('✅ Medium transformation complete.');
    return postData;
}

module.exports = transformForMedium;