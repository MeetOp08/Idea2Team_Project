const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "idea2team"
});

db.connect((err) => {
    if (err) {
        console.error("Connection Failed❌ and error is:", err);
    } else {
        console.log("   Connected to the database successfully!✅");
    }
});

app.post("/api/register", (req, res) => {
    console.log
    const { role, full_name, email, password, phone } = req.body;

    const query = "INSERT INTO users(role,full_name,email,password,phone) VALUES(?,?,?,?,?)";

    db.query(query, [role, full_name, email, password, phone], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "An error occurred while creating your account. Please try again."
            })
        } else {
            console.log(result);
            return res.status(201).json({
                message: "Your account has been created successfully!",
                UserId: result.insertId

            })
        }
    })
})
app.post("/api/post-project", (req, res) => {
    console.log("Received project data:", req.body);
    const { title,
            description,
            category,
            required_skills,
            project_stage,
            collaboration_type,
            experience_level,
            budget_min,
            budget_max,
            duration_weeks } = req.body;
    const founder_id = 19; 
    const query = "INSERT INTO projects(founder_id, title, description,category,required_skills,project_stage,collaboration_type,experience_level,budget_min,budget_max,duration_weeks) VALUES(?,?,?,?,?,?,?,?,?,?,?)";
    db.query(query, [founder_id, title, description, category, required_skills, project_stage, collaboration_type, experience_level, budget_min, budget_max, duration_weeks], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "An error occurred while posting your project. Please try again."
            })
        } else {
            console.log(result);
            return res.status(201).json({
                message: "Your project has been posted successfully!",
                ProjectId: result.insertId
            })
        }
    })
});
const PORT = 1337;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
