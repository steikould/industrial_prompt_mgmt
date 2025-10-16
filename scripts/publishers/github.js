const { Octokit } = require('@octokit/rest');

/**
 * Publishes content to a GitHub repository.
 *
 * @param {string} slug - The slug for the post, used as the filename.
 * @param {string} jsonContent - The JSON content to be published.
 * @returns {Promise<string>} - The URL of the created or updated file.
 */
async function publishToGitHub(slug, jsonContent) {
    console.log('🚀 Publishing to GitHub portfolio...');

    const {
        PORTFOLIO_REPO_TOKEN: token,
        PORTFOLIO_REPO: repoFullName,
    } = process.env;

    if (!token || !repoFullName) {
        throw new Error('Missing GitHub environment variables (PORTFOLIO_REPO_TOKEN, PORTFOLIO_REPO).');
    }

    const [owner, repo] = repoFullName.split('/');
    if (!owner || !repo) {
        throw new Error('PORTFOLIO_REPO must be in the format "owner/repo".');
    }

    const octokit = new Octokit({ auth: token });
    const filePath = `src/content/posts/${slug}.json`;

    try {
        // Check if the file already exists to get its SHA
        let existingFile = null;
        try {
            const { data } = await octokit.repos.getContent({
                owner,
                repo,
                path: filePath,
            });
            existingFile = data;
        } catch (error) {
            if (error.status !== 404) {
                throw error;
            }
            // File doesn't exist, which is fine.
        }

        const { data } = await octokit.repos.createOrUpdateFileContents({
            owner,
            repo,
            path: filePath,
            message: `${existingFile ? 'Update' : 'Add'} post: ${slug}`,
            content: Buffer.from(jsonContent).toString('base64'),
            sha: existingFile ? existingFile.sha : undefined,
        });

        console.log(`✅ Successfully published to GitHub: ${data.content.html_url}`);
        return data.content.html_url;
    } catch (error) {
        console.error('❌ Error publishing to GitHub:', error.message);
        if (error.response) {
            console.error(error.response.data);
        }
        throw error;
    }
}

module.exports = publishToGitHub;