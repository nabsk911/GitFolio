export type Skill = {
  name: string;
  iconPath: string;
};

export const markdownGenerator = function (
  intro: string,
  username: string,
  coverURL: string,
  aboutMe: string,
  skills: Skill[],
  showStats: boolean,
  showMostUsedLanguage: boolean,
  showStreaks: boolean
) {
  let md = "";

  if (intro.trim() !== "") {
    md += `# ${intro}\n\n`;
  }

  if (coverURL) {
    md += `<img src="${coverURL}" alt="cover image" style="width: 100%; height: auto;" />\n\n`;
  }

  if (aboutMe.trim() !== "") {
    md += `## 🧑‍💻 About Me\n\n${aboutMe}\n\n`;
  }

  if (skills && skills.length > 0) {
    md += `## 🛠️ Technical Skills\n\n<p align="left">\n`;
    skills.forEach(({ name, iconPath }) => {
      md += `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${iconPath}" alt="${name}" title="${name}" width="40" height="40" />\n`;
    });
    md += `</p>\n\n`;
  }

  if (showMostUsedLanguage || showStats || showStreaks) {
    if (username) {
      md += `## 📈 GitHub Activities\n\n`;
      md += `<table>\n`;
      md += `<tr>\n`;
      // Left column
      if (showStats || showStreaks) {
        md += `<td align="center" valign="top" width="50%">\n\n`;
      }
      if (showStats) {
        md += `**📊 GitHub Stats**\n\n`;
        md += `<img src="https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=onedark" alt="GitHub Stats" width="100%" />\n\n`;
      }

      if (showStreaks) {
        md += `**🔥 GitHub Streak**\n\n`;
        md += `<img src="https://streak-stats.demolab.com?user=${username}&theme=onedark" alt="GitHub Streak" width="100%" />\n\n`;
      }

      md += `</td>\n`;

      if (showMostUsedLanguage) {
        // Right column
        md += `<td align="center" valign="top" width="50%">\n\n`;
        md += `**📚 Top Languages**\n\n`;
        md += `<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=onedark" alt="Top Languages" width="100%" />\n\n`;
      }

      md += `</td>\n`;
      md += `</tr>\n`;
      md += `</table>\n\n`;
    }
  }

  return md;
};
