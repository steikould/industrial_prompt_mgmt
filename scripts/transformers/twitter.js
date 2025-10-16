/**
 * Creates tweet text from blog post frontmatter.
 *
 * @param {object} frontmatter - The frontmatter metadata.
 * @param {string} mediumUrl - The URL of the published Medium post.
 * @returns {object} - An object containing the main tweet and an optional thread.
 */
function transformForTwitter(frontmatter, mediumUrl) {
    console.log('🚀 Transforming for Twitter...');

    const { title, tags, excerpt } = frontmatter;
    const emoji = '🚀';
    const url = mediumUrl || ''; // Use the Medium URL

    const MAX_TWEET_LENGTH = 280;
    const URL_LENGTH = 23; // Twitter's t.co URL length

    // Base text without URL or hashtags
    const baseText = `${emoji} New Post: ${title}`;

    // Prepare hashtags
    const hashtags = (tags || [])
        .slice(0, 3)
        .map(tag => `#${tag.replace(/-/g, '')}`)
        .join(' ');

    // Function to construct the final tweet
    const buildTweet = (text, tags) => {
        const remainingLength = MAX_TWEET_LENGTH - URL_LENGTH - 1; // -1 for space before URL
        let tweetText = text;
        if (tags) {
            tweetText += ` ${tags}`;
        }

        if (tweetText.length > remainingLength) {
            // If it's too long, truncate the text part
            const available = remainingLength - (tags ? ` ${tags}`.length : 0);
            tweetText = `${text.slice(0, available - 3)}...${tags ? ` ${tags}` : ''}`;
        }
        return `${tweetText} ${url}`;
    };

    let mainTweet = buildTweet(baseText, hashtags);

    // If the tweet is still too long even after truncation (e.g., long title), try without hashtags
    if (mainTweet.length > MAX_TWEET_LENGTH) {
        mainTweet = buildTweet(baseText, '');
    }

    // Prepare thread if excerpt exists
    let thread = null;
    if (excerpt) {
        thread = `Read the key takeaways below 👇\n\n${excerpt}`;
        if (thread.length > MAX_TWEET_LENGTH) {
            thread = truncate(thread, MAX_TWEET_LENGTH);
        }
    }

    console.log('✅ Twitter transformation complete.');
    return {
        mainTweet,
        thread, // This will be the second tweet in the thread
    };
}

module.exports = transformForTwitter;