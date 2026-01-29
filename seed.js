import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

import { User } from "./src/models/user.model.js";
import { Project } from "./src/models/project.model.js";

dotenv.config();

const seedData = async () => {
  try {
    
    const DB_NAME = "infoproject"; 
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log("DB connected");

    
    await User.deleteMany();
    await Project.deleteMany();

    
    const project1 = await Project.create({
      title: "Profile API System",
      description: "Backend API for managing user profiles using Node.js and MongoDB",
      links: ["https://github.com/NimitAgrawal2003"]
    });

    const project2 = await Project.create({
      title: "Query Search API",
      description: "Search and filter API using Express and MongoDB",
      links: ["https://github.com/NimitAgrawal2003"]
    });

   
    const hashedPassword = await bcrypt.hash("123456", 10);

    
    await User.create({
      name: "Nimit Agrawal",
      email: "nimit@test.com",
      password: hashedPassword,  
      education: "B.Tech Computer Science",
      skills: ["Node", "MongoDB", "Express", "JavaScript"],
      projects: [project1._id, project2._id],
      work: [
        {
          company: "Self Learning",
          role: "Full Stack Developer",
          duration: "2024 - Present"
        }
      ],
      links: {
        github: "https://github.com/NimitAgrawal2003",
        linkedin: "https://linkedin.com",
        portfolio: "https://portfolio.com"
      }
    });

    console.log("Seed data inserted successfully");

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedData();
