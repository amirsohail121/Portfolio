import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaDocker,
  FaHtml5,
  FaCss3Alt,
  FaBootstrap,
  FaNpm,
  FaAws,
} from "react-icons/fa";
import {
  SiJavascript,
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiPostman,
  SiSocketdotio,
  SiJsonwebtokens,
  SiCplusplus,
  SiPython,
  SiMysql,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

export const skills = {
  Frontend: [
    { name: "React", icon: FaReact },
    { name: "HTML5", icon: FaHtml5 },
    { name: "CSS3", icon: FaCss3Alt },
    { name: "Bootstrap", icon: FaBootstrap },
    { name: "Tailwind CSS", icon: SiTailwindcss },
  ],
  Backend: [
    { name: "Node.js", icon: FaNodeJs },
    { name: "Express.js", icon: SiExpress },
    { name: "REST APIs", icon: null },
    { name: "JWT", icon: SiJsonwebtokens },
  ],
  Database: [
    { name: "MongoDB", icon: SiMongodb },
    { name: "Mongoose", icon: null },
    { name: "MySQL", icon: SiMysql },
  ],
  Tools: [
    { name: "Git", icon: FaGitAlt },
    { name: "GitHub", icon: FaGithub },
    { name: "VS Code", icon: VscVscode },
    { name: "Postman", icon: SiPostman },
    { name: "npm", icon: FaNpm },
  ],
};

export const programming = [
  { name: "JavaScript", icon: SiJavascript },
  { name: "C++", icon: SiCplusplus },
  { name: "Python", icon: SiPython },
];

export const strengths = [
  "Problem Solving",
  "Writing Clean & Maintainable Code",
  "REST API Development",
  "Responsive Web Design",
  "Continuous Learning",
];
