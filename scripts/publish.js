const fs = require('fs/promises');
const path = require('path');
const matter = require('gray-matter');

// Transformers
const transformForPortfolio = require('./transformers/portfolio');
const transformForMedium = require('./transformers/medium');
const transformForSubstack = require('./transformers/substack');
const transformForTwitter = require('./transformers/twitter');

// Publishers
const publishToGitHub = require('./publishers/github');
const publishToMedium = require('./publishers/medium');
const publishToSubstack = require('./publishers/substack');
const publishToTwitter = require('./publishers/twitter');

const { argv } = require('process');

/**
 * Main orchestration function.
 * @param {string} postsDir - The directory containing markdown posts.
 */
async function main(postsDir) {
    console.log('Starting blog publication process...');

    if (!postsDir) {
        throw new Error('The posts directory must be provided as an argument.');
    }

    // In a real GitHub Actions workflow, you'd get this from the event payload.
    // For this script, we'll read all files from the provided posts directory.
    const files = await fs.readdir(postsDir);
    const markdownFiles = files.filter(file => file.endsWith('.md'));

    if (markdownFiles.length === 0) {
        console.log('No markdown files found to publish.');
        return;
    }

    for (const file of markdownFiles) {
        const filePath = path.join(postsDir, file);
        console.log(`\n--- Processing: ${file} ---`);

        try {
            const fileContent = await fs.readFile(filePath, 'utf8');
            const { data: frontmatter, content } = matter(fileContent);

            // Sequentially execute publishing tasks. If one fails, the chain stops for that file.
            const { slug, json } = transformForPortfolio(frontmatter, content, filePath);
            await publishToGitHub(slug, json);

            const mediumData = transformForMedium(frontmatter, content);
            const mediumUrl = await publishToMedium(mediumData);

            const substackData = transformForSubstack(frontmatter, content);
            await publishToSubstack(substackData);

            if (mediumUrl) {
                const twitterData = transformForTwitter(frontmatter, mediumUrl);
                await publishToTwitter(twitterData);
            } else {
                console.warn('⚠️ Skipping Twitter publication because Medium URL was not returned.');
            }

        } catch (error) {
            console.error(`\n🚨 Halting processing for ${file} due to critical error: ${error.message}`);
            // In a real scenario, you might want to add more robust error reporting here.
            // Continue to the next file.
        }
    }

    console.log('\n✅ All files processed.');
}

// Check for environment variables before running
const requiredEnv = [
    'PORTFOLIO_REPO_TOKEN',
    'PORTFOLIO_REPO',
    'MEDIUM_TOKEN',
    'TWITTER_API_KEY',
    'TWITTER_API_SECRET',
    'TWITTER_ACCESS_TOKEN',
    'TWITTER_ACCESS_SECRET',
    'BLOG_BASE_URL',
];

const missingEnv = requiredEnv.filter(v => !process.env[v]);

if (missingEnv.length > 0) {
    console.error('❌ Missing required environment variables:');
    missingEnv.forEach(v => console.error(`   - ${v}`));
    process.exit(1);
}

// The first two arguments are 'node' and the script path.
const postsDirArg = argv[2] || path.join(__dirname, '../posts');

main(postsDirArg).catch(error => {
    console.error('\n💥 An unexpected error terminated the process:', error);
    process.exit(1);
});