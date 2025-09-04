// const searchBtn = document.getElementById("searchBtn");
// const profileDiv = document.getElementById("profile");
// const reposDiv = document.getElementById("repos");

// searchBtn.addEventListener("click", () => {
//   const username = document.getElementById("username").value.trim();
//   if(username) {
//     fetchGitHubUser(username);
//   } else {
//     profileDiv.innerHTML = "<p>Please enter a username!</p>";
//     reposDiv.innerHTML = "";
//   }
// });

// async function fetchGitHubUser(username) {
//   profileDiv.innerHTML = "<p>Loading profile...</p>";
//   reposDiv.innerHTML = "<p>Loading repos...</p>";

//   try {
//     // Profile info
//     const userRes = await fetch(`https://api.github.com/users/${username}`);
//     if(userRes.status === 404){
//       profileDiv.innerHTML = "<p>User not found!</p>";
//       reposDiv.innerHTML = "";
//       return;
//     }
//     const user = await userRes.json();

//     // Latest repos
//     const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=created&per_page=5`);
//     const repos = await reposRes.json();

//     // Display profile
//     profileDiv.innerHTML = `
//       <div class="profile-card">
//         <img src="${user.avatar_url}" alt="${user.login}">
//         <div class="profile-info">
//           <div class="badges">
//             <span class="badge repos-badge">Public Repos: ${user.public_repos}</span>
//             <span class="badge gists-badge">Public Gists: ${user.public_gists}</span>
//             <span class="badge followers-badge">Followers: ${user.followers}</span>
//             <span class="badge following-badge">Following: ${user.following}</span>
//           </div>
//           <p>Company: ${user.company || 'N/A'}</p>
//           <p>Website/Blog: ${user.blog || 'N/A'}</p>
//           <p>Location: ${user.location || 'N/A'}</p>
//           <p>Member Since: ${new Date(user.created_at).toLocaleDateString()}</p>
//           <a href="${user.html_url}" target="_blank" class="view-profile-btn">View Profile</a>
//         </div>
//       </div>
//     `;

//     // Display repos
//     reposDiv.innerHTML = `<h3>Latest Repos</h3>`;
//     repos.forEach(repo => {
//       reposDiv.innerHTML += `
//         <div class="repo-item">
//           <a href="${repo.html_url}" target="_blank">${repo.name}</a>
//           <div class="repo-stats">
//             <span class="stars">Stars: ${repo.stargazers_count}</span>
//             <span class="watchers">Watchers: ${repo.watchers_count}</span>
//             <span class="forks">Forks: ${repo.forks_count}</span>
//           </div>
//         </div>
//       `;
//     });

//   } catch (err) {
//     profileDiv.innerHTML = "<p>Error fetching data!</p>";
//     reposDiv.innerHTML = "";
//     console.error(err);
//   }
// }
