const path = require('path');

/**
 * Transforms markdown frontmatter and content into a JSON format for the portfolio.
 *
 * @param {object} frontmatter - The frontmatter metadata from the markdown file.
 * @param {string} content - The markdown content of the post.
 * @param {string} filePath - The original file path of the markdown file.
 * @returns {object} - The transformed post object in JSON format.
 */
function transformForPortfolio(frontmatter, content, filePath) {
    console.log('🚀 Transforming for portfolio...');

    const { title, date, tags, excerpt, coverImage, featured } = frontmatter;

    if (!title) {
        throw new Error(`Missing required 'title' frontmatter in ${filePath}`);
    }

    // Generate a slug from the title (e.g., "My New Post" -> "my-new-post")
    const slug = (frontmatter.slug || title)
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

    // Calculate reading time
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    let readingTime = Math.ceil(wordCount / wordsPerMinute);

    // Add time for images (e.g., 12s for 1st, 11s for 2nd, etc.)
    const imageCount = (content.match(/!\[(.*?)\]\((.*?)\)/g) || []).length;
    let imageTime = 0;
    for (let i = 1; i <= imageCount; i++) {
        imageTime += Math.max(3, 13 - i);
    }
    readingTime += Math.ceil(imageTime / 60);

    const transformedPost = {
        slug,
        title: title || 'Untitled Post',
        date: date ? new Date(date).toISOString() : new Date().toISOString(),
        tags: tags || [],
        excerpt: excerpt || '',
        coverImage: coverImage || null,
        featured: featured || false,
        readingTime: `${readingTime} min read`,
        content: content,
    };

    console.log('✅ Portfolio transformation complete.');
    return {
        slug,
        json: JSON.stringify(transformedPost, null, 2),
    };
}

module.exports = transformForPortfolio;