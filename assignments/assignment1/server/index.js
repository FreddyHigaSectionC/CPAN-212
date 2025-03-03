import express from "express";
import cors from "cors";
import path from "path";
import fetch_router from "./routers/fetch_router.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/fetch", fetch_router);

const resumeData = {
  education: [
    { school: "Humber Polytechnic", degree: "Diploma in Software Engineering", year: "2018 - 2019" },
    { school: "University of Lima", degree: "Degree in Systems Engineering", year: "2013 - 2017" },
  ],
  experience: [
    { company: "Global Tech Media", role: "UI/UX Designer", year: "2020 - 2025" }
  ],
  relevant_experience: [
    "Designed user-friendly interfaces and experiences for web and mobile applications, improving usability and engagement.",
    "Developed wireframes, prototypes, and visual assets for various digital platforms.",
    "Conducted user research and usability testing to enhance product design.",
    "Collaborated with developers and product managers to align design with technical requirements.",
    "Managed multiple design projects, ensuring consistency with brand guidelines.",
    "Adapted designs based on user feedback, analytics, and emerging design trends."
  ],
  overview: [
    "I’m a Software Engineering student with a solid background in Python, C++, object-oriented programming, algorithms, and database management with MySQL and PostgreSQL. Currently, I am working on projects involving full-stack web development (React, Node.js), mobile app development (Flutter), and machine learning applications in Python, continuously expanding my technical skill set.",
    "What sets me apart is my dedication to writing clean, efficient code and my ability to quickly adapt to new technologies. I thrive in team-based environments, where I actively contribute my ideas while embracing feedback to refine and improve my work. My experience in collaborative software development has reinforced my appreciation for effective communication, teamwork, and problem-solving under tight deadlines. I bring a creative and analytical mindset, always striving to develop user-friendly and impactful software solutions."
  ],
  skill: [
    { technicalSkill: "Java, JavaScript, HTML/CSS, SQL, React Native, Python, Linux, Photoshop, and Illustrator" },
    { softSkill: "Problem-Solving, team collaboration, adaptability, attention to detail, and time management" },
  ],
  hobbies: [
    "Watch video tutorials to continuously enhance my coding skills and stay updated on new technologies.",
    "Play video games to develop quick decision-making skills and strategic planning."
  ],
  honor: [
    "Dean’s Honour List for the Winter 2024 term",
    "Dean's Honour List for the Summer 2024 term"
  ]
};

app.get("/", (req, res) => {
  res.send("Welcome to my Website")
})

app.get("/getOverview", (req, res) => {
  res.json({ overview: resumeData.overview });
})

app.get("/getEdu", (req, res) => {
  res.send(resumeData.education)
});

app.get("/getExp", (req, res) => {
  res.send(resumeData.experience)
});

app.get("/getRelevantExp", (req, res) => {
  res.send(resumeData.relevant_experience)
});

app.get("/getSkill", (req, res) => {
  res.json(resumeData.skill);
})

app.get("/profile-image", (req, res) => {
  res.sendFile(path.join(__dirname, "uploads", "profile.png"));
});

app.get("/getHobbies", (req, res) => {
  res.json(resumeData.hobbies);
})

app.get("/getHonor", (req, res) => {
  res.json(resumeData.honor);
})

app.get("/api-list", (req, res) => {
  const apiList = {
    fetch_routes: ["/fetch/single", "/fetch/multiple"],
  };

  res.send(apiList);
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

app.use("", (req, res) => {
  res.status(404).send("Page not found");
});