const { TwitterApi } = require('twitter-api-v2');

/**
 * Publishes a tweet or a thread to Twitter.
 *
 * @param {object} tweetData - The tweet data from the transformer.
 * @returns {Promise<string>} - The URL of the published tweet.
 */
async function publishToTwitter(tweetData) {
    console.log('🚀 Publishing to Twitter...');

    const {
        TWITTER_API_KEY,
        TWITTER_API_SECRET,
        TWITTER_ACCESS_TOKEN,
        TWITTER_ACCESS_SECRET,
    } = process.env;

    if (!TWITTER_API_KEY || !TWITTER_API_SECRET || !TWITTER_ACCESS_TOKEN || !TWITTER_ACCESS_SECRET) {
        throw new Error('Missing Twitter API environment variables.');
    }

    const client = new TwitterApi({
        appKey: TWITTER_API_KEY,
        appSecret: TWITTER_API_SECRET,
        accessToken: TWITTER_ACCESS_TOKEN,
        accessSecret: TWITTER_ACCESS_SECRET,
    });

    const rwClient = client.readWrite;
    const { mainTweet, thread } = tweetData;

    try {
        let tweetResult;
        if (thread) {
            console.log('Publishing as a thread...');
            tweetResult = await rwClient.v2.tweetThread([
                { text: mainTweet },
                { text: thread },
            ]);
        } else {
            console.log('Publishing a single tweet...');
            tweetResult = await rwClient.v2.tweet(mainTweet);
        }

        // The result for a thread is an array, for a single tweet it's an object.
        const publishedData = Array.isArray(tweetResult) ? tweetResult[0].data : tweetResult.data;
        const tweetId = publishedData.id;

        // We need to get the user's handle to construct the URL
        const { data: user } = await client.v2.me();
        const tweetUrl = `https://twitter.com/${user.username}/status/${tweetId}`;

        console.log(`✅ Successfully published to Twitter: ${tweetUrl}`);
        return tweetUrl;

    } catch (error) {
        console.error('❌ Error publishing to Twitter:', error.message);
        if (error.data) {
            console.error('API Response:', error.data);
        }
        throw error;
    }
}

module.exports = publishToTwitter;