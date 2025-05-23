import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { availableSkills } from "../utils/skills";
import { markdownGenerator } from "../utils/markdownGenerator";
import type { Skill } from "../utils/markdownGenerator";
import { Search, X } from "lucide-react";

const Form = ({
  setMarkdown,
}: {
  setMarkdown: Dispatch<SetStateAction<undefined | string>>;
}) => {
  const [intro, setIntro] = useState("Hey! I'm Nabin Khanal.");
  const [username, setUsername] = useState("nabsk911");
  const [coverURL, setCoverURl] = useState("https://i.imgur.com/geNGqFT.jpeg");
  const [aboutMe, setAboutMe] = useState(
    `I'm a frontend developer focused on building web experiences that are smooth and engaging. I enjoy taking designs and making them interactive and user-friendly. A lot of what I do involves bringing interfaces to life with fluid animations and subtle interactions, and I often use Motion for that.

## Currently Learning

-  Advanced animation techniques  
-  Performance optimization strategies
-  System programming with C`
  );
  const [skills, setSkills] = useState<Skill[]>([
    { name: "React", iconPath: "react/react-original.svg" },
    { name: "TypeScript", iconPath: "typescript/typescript-original.svg" },
    { name: "JavaScript", iconPath: "javascript/javascript-original.svg" },
    { name: "HTML5", iconPath: "html5/html5-original.svg" },
    { name: "CSS3", iconPath: "css3/css3-original.svg" },
  ]);
  const [filteredSkills, setFilteredSkills] = useState(availableSkills);
  const [searchQuery, setSearchQuery] = useState("");
  const [showStats, setShowStats] = useState(true);
  const [showMostUsedLanguage, setShowMostUsedLangauge] = useState(true);
  const [showStreaks, setShowStreaks] = useState(true);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredSkills(availableSkills);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered: typeof availableSkills = {};

      Object.entries(availableSkills).forEach(([category, skills]) => {
        const matched = skills.filter((s) =>
          s.name.toLowerCase().includes(query)
        );
        if (matched.length > 0) filtered[category] = matched;
      });

      setFilteredSkills(filtered);
    }
  }, [searchQuery]);

  const toggleSkill = (skill: Skill) => {
    const exists = skills.some((s) => s.iconPath === skill.iconPath);
    if (exists) {
      setSkills(skills.filter((s) => s.iconPath !== skill.iconPath));
    } else {
      setSkills([...skills, skill]);
    }
  };

  useEffect(() => {
    const md = markdownGenerator(
      intro,
      username,
      coverURL,
      aboutMe,
      skills,
      showStats,
      showMostUsedLanguage,
      showStreaks
    );
    setMarkdown(md);
  }, [
    intro,
    username,
    coverURL,
    aboutMe,
    skills,
    showStats,
    showMostUsedLanguage,
    showStreaks,
  ]);

  return (
    <section className="space-y-8 w-full h-auto md:h-[85vh] border border-border rounded-radius p-4 md:w-1/2 overflow-scroll">
      {/* Introduction */}
      <div className="space-y-2">
        <label className="block" htmlFor="intro">
          Introduction Message
        </label>
        <input
          id="intro"
          type="text"
          className="inputStyle"
          value={intro}
          placeholder="Hey! I'm Nabin Khanal."
          onChange={(e) => setIntro(e.target.value)}
          maxLength={100}
        />
        <p className="text-xs text-gray-500">{intro.length}/100 characters</p>
      </div>

      {/* GitHub Username */}
      <div className="space-y-2">
        <label className="block" htmlFor="github-username">
          GitHub Username
        </label>
        <input
          id="github-username"
          type="text"
          className="inputStyle"
          value={username}
          placeholder="your-github-username"
          onChange={(e) =>
            setUsername(e.target.value.replace(/[^a-zA-Z0-9-]/g, ""))
          }
          pattern="[a-zA-Z0-9-]+"
        />
        <p className="text-xs text-gray-500">
          Only letters, numbers, and hyphens allowed
        </p>
      </div>

      {/* Cover URL */}
      <div className="space-y-2">
        <label className="block" htmlFor="cover-url">
          Cover Image/GIF URL
        </label>
        <textarea
          id="cover-url"
          className="inputStyle resize-none"
          value={coverURL}
          placeholder="https://example.com/your-cover-image.gif"
          onChange={(e) => setCoverURl(e.target.value)}
        />
        <p className="text-xs text-gray-500">
          Tip: Make sure the URL ends with .jpg, .png, .jpeg or .gif for proper
          display.
        </p>
      </div>

      {/* About Me */}
      <div className="space-y-2">
        <label className="block" htmlFor="about-me">
          About Me
        </label>
        <textarea
          id="about-me"
          className="inputStyle resize-none"
          rows={8}
          value={aboutMe}
          placeholder="Tell visitors about yourself, your interests, and what you're working on..."
          onChange={(e) => setAboutMe(e.target.value)}
          maxLength={1000}
        />
        <p className="text-xs text-gray-500">
          {aboutMe.length}/1000 characters
        </p>
      </div>

      {/* GitHub Activities */}
      <div className="space-y-2">
        <label className="block">GitHub Activities</label>
        <p className="text-sm text-gray-600">
          Choose which GitHub statistics to display on your profile
        </p>
        <div className="inputStyle flex gap-8 flex-wrap">
          <label className="checkboxLabel">
            <input
              type="checkbox"
              className="accent-primary cursor-pointer w-4 h-4"
              checked={showStats}
              onChange={(e) => setShowStats(e.target.checked)}
            />
            <span>GitHub Stats</span>
          </label>
          <label className="checkboxLabel">
            <input
              type="checkbox"
              className="accent-primary cursor-pointer w-4 h-4"
              checked={showMostUsedLanguage}
              onChange={(e) => setShowMostUsedLangauge(e.target.checked)}
            />
            <span>Most Used Languages</span>
          </label>
          <label className="checkboxLabel">
            <input
              type="checkbox"
              className="accent-primary cursor-pointer w-4 h-4"
              checked={showStreaks}
              onChange={(e) => setShowStreaks(e.target.checked)}
            />
            <span>GitHub Streak</span>
          </label>
        </div>
      </div>

      {/* Skills */}
      <div className="space-y-2 relative">
        <label className="block">Technical Skills</label>
        {/* Selected Skills */}
        <div className="inputStyle">
          {skills.map((skill) => (
            <div
              key={skill.iconPath}
              className="inline-flex space-x-2 m-2 bg-background border border-border px-2 py-1 rounded-radius"
            >
              <span>{skill.name}</span>
              <X
                className="cursor-pointer"
                size={20}
                strokeWidth={1.5}
                onClick={() => toggleSkill(skill)}
              />
            </div>
          ))}
        </div>

        {/* Skill Search */}
        <div className="max-h-80 min:h-content overflow-scroll inputStyle relative">
          <div className="bg-input sticky -top-2 py-2">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-placeholder"
                size={16}
              />
              <input
                type="text"
                className="w-full px-3 py-2 border bg-input ring-ring border-border rounded-radius  placeholder-placeholder text-foreground pl-8"
                placeholder="Search skills (e.g., React, Python, Docker...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Filtered Skills */}
          {Object.keys(filteredSkills).length > 0 ? (
            Object.entries(filteredSkills).map(([category, skillList]) => (
              <section key={category} className="mb-2">
                <p className="font-semibold text-sm">{category}</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {skillList.map((skill) => (
                    <label
                      key={skill.iconPath}
                      className="flex items-center cursor-pointer space-x-2 bg-input border border-border py-1 px-2 rounded-radius"
                    >
                      <input
                        type="checkbox"
                        className="accent-primary cursor-pointer"
                        checked={skills.some(
                          (s) => s.iconPath === skill.iconPath
                        )}
                        onChange={() => toggleSkill(skill)}
                      />
                      <span>{skill.name}</span>
                    </label>
                  ))}
                </div>
              </section>
            ))
          ) : (
            <p className="text-sm text-gray-500 mt-1">
              No skills match your search
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Form;
