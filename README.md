# 🔍 GitHub Hunt

A simple and elegant **GitHub User Hunt App** that lets you search for any GitHub user and view their profile details, repositories, followers, and following.  

![GitHub Hunt Preview](./preview.png) <!-- Replace with your screenshot -->

---

## ✨ Features
- 🔎 **Search Users**: Enter any GitHub username and fetch profile details instantly.  
- 👤 **Profile Info**: Displays profile picture, name, bio, location, company,and account creation date.  
- 📦 **Latest Repositories**: Fetches the 5 most recently created repositories.  
- 👥 **Followers & Following**: Shows user’s follower and following count with quick links.  
- 📊 **Public Stats**: View the number of public repositories, gists, and other stats.  
- ⚡ **Fast & Responsive**: Built with vanilla JavaScript and styled with CSS for smooth performance.  

---

## 📸 Screenshots
| Home Page | User Profile |
|-----------|--------------|
| ![Home](./screenshots/home.png) | ![Profile](./screenshots/profile.png) |

---

## 🛠️ Tech Stack
- **HTML5**  
- **CSS3** (Responsive Design)  
- **JavaScript (ES6+)**  
- **GitHub REST API**  

---
### 🔑 GitHub API Usage

# 📡 API Endpoints Used

| Purpose            | Endpoint                                                      |
|--------------------|---------------------------------------------------------------|
| Get user profile   | `GET /users/{username}`                                       |
| Get user repos     | `GET /users/{username}/repos?sort=created&per_page=5`         |
| Get followers      | `GET /users/{username}/followers`                             |
| Get following      | `GET /users/{username}/following`                             |
| Search users       | `GET /search/users?q={username}`                              |

## 🌟 Future Enhancements

**📈 Display contribution graphs using GitHub API or external libraries.**

**🔖 Add pagination for repositories.**

**🌙 Dark/Light mode toggle.**

**📱 Improve mobile responsiveness with better UI/UX**