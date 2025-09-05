

document.getElementById("year").textContent = new Date().getFullYear();

// Theme Management
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem('github-finder-theme') || 'light';
    this.init();
  }

  init() {
    this.applyTheme();
    this.setupToggle();
  }

  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.theme);
    this.updateToggleIcon();
  }

  updateToggleIcon() {
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    
    if (this.theme === 'dark') {
      icon.className = 'fas fa-sun';
    } else {
      icon.className = 'fas fa-moon';
    }
  }

  toggle() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('github-finder-theme', this.theme);
    this.applyTheme();
  }

  setupToggle() {
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', () => this.toggle());
  }
}

// GitHub API Handler
class GitHubFinder {
  constructor() {
    this.searchBtn = document.getElementById("searchBtn");
    this.profileDiv = document.getElementById("profile");
    this.reposDiv = document.getElementById("repos");
    this.usernameInput = document.getElementById("username");
    this.init();
  }

  init() {
    this.searchBtn.addEventListener("click", () => this.handleSearch());
    this.usernameInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.handleSearch();
    });
  }

  handleSearch() {
    const username = this.usernameInput.value.trim();
    if (username) {
      this.fetchGitHubUser(username);
    } else {
      this.showError("Please enter a username!");
      this.reposDiv.innerHTML = "";
    }
  }

  showError(message) {
    this.profileDiv.innerHTML = `
      <div class="error-message fade-in">
        <i class="fas fa-exclamation-triangle"></i>
        <p>${message}</p>
      </div>
    `;
  }

  showLoading() {
    this.profileDiv.innerHTML = `
      <div class="loading-card fade-in">
        <div class="loading-header">
          <div class="skeleton" style="width: 150px; height: 150px; border-radius: 50%;"></div>
          <div class="loading-info">
            <div class="skeleton" style="width: 200px; height: 2rem; margin-bottom: 1rem;"></div>
            <div class="skeleton" style="width: 150px; height: 1.5rem; margin-bottom: 1rem;"></div>
            <div class="skeleton" style="width: 300px; height: 1rem;"></div>
          </div>
        </div>
      </div>
    `;
    
    this.reposDiv.innerHTML = `
      <div class="repos-loading fade-in">
        <div class="skeleton" style="width: 200px; height: 2rem; margin-bottom: 1.5rem;"></div>
        ${Array(3).fill(0).map(() => `
          <div class="skeleton" style="height: 120px; margin-bottom: 1rem; border-radius: 1rem;"></div>
        `).join('')}
      </div>
    `;
  }

  async fetchGitHubUser(username) {
    this.showLoading();

    try {
      // Fetch user profile
      const userRes = await fetch(`https://api.github.com/users/${username}`);
      if (userRes.status === 404) {
        this.showError("User not found! Please check the username and try again.");
        this.reposDiv.innerHTML = "";
        return;
      }
      
      if (!userRes.ok) {
        throw new Error(`HTTP ${userRes.status}: ${userRes.statusText}`);
      }
      
      const user = await userRes.json();

      // Fetch repositories
      const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
      const repos = await reposRes.json();

      this.displayProfile(user);
      this.displayRepos(repos);

    } catch (err) {
      console.error('Error fetching GitHub data:', err);
      this.showError("Error fetching data! Please check your connection and try again.");
      this.reposDiv.innerHTML = "";
    }
  }

  displayProfile(user) {
    const joinDate = new Date(user.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    this.profileDiv.innerHTML = `
      <div class="profile-card fade-in">
        <div class="profile-header">
          <div class="profile-avatar">
            <img src="${user.avatar_url}" alt="${user.name || user.login}" loading="lazy">
          </div>
          <div class="profile-basic">
            <h2 class="profile-name">${user.name || user.login}</h2>
            <p class="profile-username">@${user.login}</p>
            ${user.bio ? `<p class="profile-bio">${user.bio}</p>` : ''}
          </div>
        </div>

        <div class="badges">
          <div class="badge repos-badge">
            <i class="fas fa-code-branch"></i>
            <span>${user.public_repos} Repos</span>
          </div>
          <div class="badge gists-badge">
            <i class="fas fa-file-code"></i>
            <span>${user.public_gists} Gists</span>
          </div>
          <div class="badge followers-badge">
            <i class="fas fa-users"></i>
            <span>${user.followers} Followers</span>
          </div>
          <div class="badge following-badge">
            <i class="fas fa-user-plus"></i>
            <span>${user.following} Following</span>
          </div>
        </div>

        <div class="profile-details">
          ${user.company ? `
            <div class="detail-item">
              <i class="fas fa-building detail-icon"></i>
              <span class="detail-text">${user.company}</span>
            </div>
          ` : ''}
          
          ${user.location ? `
            <div class="detail-item">
              <i class="fas fa-map-marker-alt detail-icon"></i>
              <span class="detail-text">${user.location}</span>
            </div>
          ` : ''}
          
          ${user.blog ? `
            <div class="detail-item">
              <i class="fas fa-link detail-icon"></i>
              <a href="${user.blog.startsWith('http') ? user.blog : 'https://' + user.blog}" 
                 target="_blank" class="detail-text" style="text-decoration: none; color: var(--primary-color);">
                ${user.blog}
              </a>
            </div>
          ` : ''}
          
          ${user.email ? `
            <div class="detail-item">
              <i class="fas fa-envelope detail-icon"></i>
              <span class="detail-text">${user.email}</span>
            </div>
          ` : ''}
          
          <div class="detail-item">
            <i class="fas fa-calendar-alt detail-icon"></i>
            <span class="detail-text">Joined ${joinDate}</span>
          </div>
        </div>

        <div style="text-align: center;">
          <a href="${user.html_url}" target="_blank" class="view-profile-btn">
            <i class="fab fa-github"></i>
            <span>View GitHub Profile</span>
            <i class="fas fa-external-link-alt"></i>
          </a>
        </div>
      </div>
    `;
  }

  displayRepos(repos) {
    if (!repos || repos.length === 0) {
      this.reposDiv.innerHTML = `
        <div class="repos-section fade-in">
          <div class="repos-header">
            <h3><i class="fas fa-code-branch"></i> No Public Repositories</h3>
          </div>
          <p class="text-center" style="color: var(--text-secondary); padding: 2rem;">
            This user doesn't have any public repositories yet.
          </p>
        </div>
      `;
      return;
    }

    let reposHTML = `
      <div class="repos-section fade-in">
        <div class="repos-header">
          <h3><i class="fas fa-code-branch"></i> Latest Repositories</h3>
        </div>
        <div class="repos-grid">
    `;

    repos.forEach(repo => {
      const updatedDate = new Date(repo.updated_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });

      const language = repo.language || 'Unknown';
      const description = repo.description || 'No description available';

      reposHTML += `
        <div class="repo-item">
          <div class="repo-header">
            <i class="fas fa-code repo-icon"></i>
            <div class="repo-info">
              <a href="${repo.html_url}" target="_blank" class="repo-name">${repo.name}</a>
              <p class="repo-description">${description}</p>
            </div>
          </div>
          
          <div class="repo-meta" style="margin-bottom: 1rem;">
            <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
              ${language !== 'Unknown' ? `
                <span style="display: flex; align-items: center; gap: 0.375rem; color: var(--text-secondary); font-size: 0.875rem;">
                  <i class="fas fa-circle" style="color: var(--primary-color); font-size: 0.5rem;"></i>
                  ${language}
                </span>
              ` : ''}
              <span style="color: var(--text-muted); font-size: 0.875rem;">
                <i class="fas fa-clock"></i> Updated ${updatedDate}
              </span>
            </div>
          </div>

          <div class="repo-stats">
            <div class="stat-item stars">
              <i class="fas fa-star"></i>
              <span>${repo.stargazers_count}</span>
            </div>
            <div class="stat-item watchers">
              <i class="fas fa-eye"></i>
              <span>${repo.watchers_count}</span>
            </div>
            <div class="stat-item forks">
              <i class="fas fa-code-branch"></i>
              <span>${repo.forks_count}</span>
            </div>
          </div>
        </div>
      `;
    });

    reposHTML += `
        </div>
      </div>
    `;

    this.reposDiv.innerHTML = reposHTML;
  }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
  new GitHubFinder();

  // Add some interactive enhancements
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.getElementById('username').blur();
    }
  });

  
  // Add loading state to search button
  const searchBtn = document.getElementById('searchBtn');
  const originalSearchHandler = searchBtn.onclick;
  
  searchBtn.addEventListener('click', function() {
    this.classList.add('loading');
    this.disabled = true;
    
    setTimeout(() => {
      this.classList.remove('loading');
      this.disabled = false;
    }, 1000);
  });
});
