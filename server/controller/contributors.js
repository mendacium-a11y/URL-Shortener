
const allContributors = async (req, res) => {
  const token = process.env.CONTRIBUTORS_TOKEN;
  const page = 1;
  const perPage = 100;
  const owner = "mendacium-a11y";
  const repo = "Shortify";

  const url = `https://api.github.com/repos/${owner}/${repo}/contributors?page=${page}&per_page=${perPage}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Node.js",
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API responded with status ${response1.status}`);
    }

    const contributorsData = await response.json();

    // Send the data back to the client
    res.json({
      success: true,
      data: contributorsData,
    });
  } catch (error) {
    console.error(`Error while fetching the contributors data: ${error}`);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export default allContributors;
