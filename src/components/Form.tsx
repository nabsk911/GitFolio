import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { availableSkills } from "../utils/skills";
import { markdownGenerator } from "../utils/markdownGenerator";
import type { Skill } from "../utils/markdownGenerator";
import { X } from "lucide-react";

const Form = ({
  setMarkdown,
}: {
  setMarkdown: Dispatch<SetStateAction<undefined | string>>;
}) => {
  const [intro, setIntro] = useState("Hey! I'm Nabin Khanal.");
  const [username, setUsername] = useState("nabsk911");
  const [coverURL, setCoverURl] = useState(
    "https://media.giphy.com/media/2AYQQJsqDrDHy/giphy.gif?cid=ecf05e479zwtxz5mnjv6gs0noeeawug1sza4if454gxwdp76&ep=v1_gifs_related&rid=giphy.gif&ct=g"
  );
  const [aboutMe, setAboutMe] = useState(
    "I'm a passionate frontend developer who loves building sleek, responsive web apps. I enjoy working with React and TypeScript, and I'm currently diving deeper into system programming with C."
  );
  const [skills, setSkills] = useState<Skill[]>([
    { name: "React", iconPath: "react/react-original.svg" },
    { name: "TypeScript", iconPath: "typescript/typescript-original.svg" },
    { name: "JavaScript", iconPath: "javascript/javascript-original.svg" },
    { name: "HTML5", iconPath: "html5/html5-original.svg" },
    { name: "CSS3", iconPath: "css3/css3-original.svg" },
  ]);
  const [filteredSkills, setFilteredSkills] = useState(availableSkills);
  const [searchQuery, SetSearchQuery] = useState("");
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
    <div className="space-y-8 w-full  h-auto md:h-[85vh]  border border-border rounded-radius p-4 md:w-1/2 overflow-scroll ">
      <div className="space-y-1">
        <label htmlFor="intro" className="labelStyle">
          Intro
        </label>
        <input
          name="intro"
          type="text"
          className="inputStyle"
          placeholder={intro}
          onChange={(e) => setIntro(e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="github-username" className="labelStyle">
          GitHub Username
        </label>
        <input
          name="github-username"
          type="text"
          className="inputStyle"
          placeholder="nabsk911"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="cover-url" className="labelStyle">
          Cover Image/GIF URL
        </label>
        <textarea
          name="cover-url"
          className="inputStyle resize-none overflow-scroll"
          rows={3}
          placeholder="https://media.giphy.com/media/lgTpcy4dkdUc0/giphy.gif"
          onChange={(e) => setCoverURl(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="about-me" className="labelStyle">
          About Me
        </label>
        <textarea
          name="about-me"
          className="inputStyle resize-none"
          rows={5}
          placeholder={aboutMe}
          onChange={(e) => setAboutMe(e.target.value)}
        />
      </div>

      <div>
        <label className="labelStyle">GitHub Activities</label>
        <div className="inputStyle flex gap-8 flex-wrap">
          <label className="flex items-center cursor-pointer space-x-2 bg-background border border-border px-2 py-1 rounded-radius">
            <input
              type="checkbox"
              className="accent-background cursor-pointer"
              checked={showStats}
              onChange={(e) => setShowStats(e.target.checked)}
            />
            <span>GitHub Stats</span>
          </label>

          <label className="flex items-center cursor-pointer space-x-2 bg-background border border-border px-2 py-1 rounded-radius">
            <input
              type="checkbox"
              className="accent-background cursor-pointer"
              checked={showMostUsedLanguage}
              onChange={(e) => setShowMostUsedLangauge(e.target.checked)}
            />
            <span>Most Used Languages</span>
          </label>

          <label className="flex items-center cursor-pointer space-x-2 bg-background border border-border px-2 py-1 rounded-radius">
            <input
              type="checkbox"
              className="accent-background cursor-pointer"
              checked={showStreaks}
              onChange={(e) => setShowStreaks(e.target.checked)}
            />
            <span>GitHub Streak</span>
          </label>
        </div>
      </div>

      <div className="space-y-1 relative">
        <label htmlFor="skills" className="labelStyle">
          Technical Skills
        </label>
        <div className="inputStyle">
          {skills.map((skill) => (
            <div
              key={skill.iconPath}
              className="inline-flex space-x-2  m-2 bg-background border border-border px-2 py-1 rounded-radius"
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

        <div className="max-h-80 min:h-content overflow-scroll inputStyle relative">
          <div className=" bg-input sticky -top-2 py-2">
            <input
              type="text"
              className="inputStyle text-foreground"
              placeholder="Search Skills"
              value={searchQuery}
              onChange={(e) => SetSearchQuery(e.target.value)}
            />
          </div>
          {Object.keys(filteredSkills).length > 0 ? (
            Object.entries(filteredSkills).map(([category, skillList]) => (
              <div key={category} className="mb-2">
                <p className="font-semibold text-sm">{category}</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {skillList.map((skill) => (
                    <label
                      key={skill.iconPath}
                      className="flex items-center cursor-pointer  space-x-2 bg-input border border-border py-1 px-2 rounded-radius"
                    >
                      <input
                        type="checkbox"
                        className="accent-background  cursor-pointer"
                        checked={skills.some(
                          (s) => s.iconPath === skill.iconPath
                        )}
                        onChange={() => toggleSkill(skill)}
                      />{" "}
                      <span>{skill.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 mt-1">
              No skills match your search
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;
