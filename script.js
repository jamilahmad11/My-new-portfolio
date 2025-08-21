// Init AOS
AOS.init();

// Current Year
document.getElementById("year").textContent = new Date().getFullYear();

// GitHub Button
document.getElementById("githubBtn").addEventListener("click", () => {
  window.open("https://github.com/jamilahmad11", "_blank");
});

// Auto Fetch GitHub Projects
const GITHUB_USERNAME = "jamilahmad11";

async function fetchGitHubProjects() {
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`);
    const repos = await response.json();

    const projectList = document.getElementById("project-list");
    projectList.innerHTML = ""; // clear previous data

    repos.forEach(repo => {
      if (!repo.fork) {
        // Auto-generate GitHub Pages live link
        const liveDemo = `https://${GITHUB_USERNAME}.github.io/${repo.name}/`;

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
          <div class="card-body">
            <h3>${repo.name}</h3>
            <p>${repo.description || "No description available."}</p>
            <a href="${repo.html_url}" target="_blank" class="btn-small">View on GitHub</a>
            <a href="${liveDemo}" target="_blank" class="btn-small">Project Output</a>
          </div>
        `;
        projectList.appendChild(card);
      }
    });
  } catch (error) {
    console.error("Error fetching repos:", error);
  }
}

fetchGitHubProjects();
