const axios = require('axios');

/**
 * Publishes a post to Medium.
 *
 * @param {object} postData - The post data transformed for Medium.
 * @returns {Promise<string>} - The URL of the published Medium post.
 */
async function publishToMedium(postData) {
    console.log('🚀 Publishing to Medium...');

    const { MEDIUM_TOKEN } = process.env;
    if (!MEDIUM_TOKEN) {
        throw new Error('Missing Medium environment variable (MEDIUM_TOKEN).');
    }

    const api = axios.create({
        baseURL: 'https://api.medium.com/v1',
        headers: {
            'Authorization': `Bearer ${MEDIUM_TOKEN}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });

    try {
        // 1. Get the authenticated user's ID
        console.log('Getting Medium user ID...');
        const { data: { data: me } } = await api.get('/me');
        const userId = me.id;
        console.log(`Authenticated as Medium user: ${me.username} (${userId})`);

        // 2. Create the post
        const { data: { data: newPost } } = await api.post(`/users/${userId}/posts`, postData);

        console.log(`✅ Successfully published to Medium: ${newPost.url}`);
        return newPost.url;
    } catch (error) {
        console.error('❌ Error publishing to Medium:', error.message);
        if (error.response) {
            console.error('API Response:', error.response.data);
        }
        throw error;
    }
}

module.exports = publishToMedium;