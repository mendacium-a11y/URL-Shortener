const allContributors = async (req, res) => {
    console.log("Fetching contributors...");
    
    const token = process.env.CONTRIBUTORS_TOKEN;
    if (!token) {
        return res.status(500).json({
            success: false,
            error: "GitHub token not configured"
        });
    }

    const page = 1;
    const perPage = 100;
    const owner = "mendacium-a11y";
    const repo = "Shortify";

    const url = `https://api.github.com/repos/${owner}/${repo}/contributors?page=${page}&per_page=${perPage}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`, // Changed to Bearer token
                Accept: "application/vnd.github.v3+json",
                "User-Agent": "Node.js",
            },
        });

        if (!response.ok) {
            throw new Error(`GitHub API responded with status ${response.status}`);
        }

        const contributorsData = await response.json();

        // Transform the data to match your frontend expectations
        const transformedData = contributorsData.map(contributor => ({
            id: contributor.id,
            name: contributor.login,
            avatar_url: contributor.avatar_url,
            contributions: contributor.contributions,
            profile_url: contributor.html_url,
            role: 'Contributor'
        }));

        res.json({
            success: true,
            data: transformedData
        });
    } catch (error) {
        console.error(`Error while fetching the contributors data:`, error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

export default allContributors;