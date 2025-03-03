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
    { school: "Humber Polytechnic", degree: "Diploma in Computer Programming", year: "2024-2025" },
    { school: "CIBERTEC Private Higher Institute", degree: "Diploma in Graphic Design", year: "2008-2011" },
  ],
  experience: [
    { company: "National Newspaper Company", role: "Infographic Designer", year: "2011 - 2020" }
  ],
  relevant_experience: [
    "Created infographics and designs for several newspapers and magazines, enhancing visual communication and publication design.",
    "Presented complex data in a visually engaging and easily understandable format.",
    "Developed innovative designs that captured audience attention.",
    "Aligned visual content with written narratives for journalist, editors.",
    "Managed multiple projects and deadlines under a high-pressure environment.",
    "Adjusted designs and concepts based on feedback and changing editorial needs."
  ],
  overview: [
    "I'm a Computer Programming student with a strong foundation in Java, object-oriented programming, data structures, and SQL data management. Currently, I’m working on projects involving Java, Python, web development with React, and mobile app development with React Native, while continuously expanding my technical expertise.",
    "What distinguishes me is my commitment to delivering high-quality results and my ability to adapt to new challenges. I perform well in collaborative environments where I can contribute my ideas while being open to learning from others. My experiences working on group projects have taught me the importance of communication, respect for diverse perspectives, and maintaining a positive, solution-oriented mindset even under pressure. I always seek to bring a creative and innovative approach to challenges."
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