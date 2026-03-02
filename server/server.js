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
//admin login
app.post("/api/admin-login", (req, res) => {

    const email = req.body.email.trim();
    const password = req.body.password.trim();

    console.log("Admin Email:", email);
    console.log("Admin Password:", password);

    const query = "SELECT * FROM admin WHERE email = ? AND password = ?";
    const admin_id = 1;
    db.query(`${query}`, [admin_id, email, password], (err, results) => {
        if (email === "patelmeet52271@gmail.com" && password === "Meet@0811P_") {
            return res.json({
                message: "Admin Login Successful",
                email: email
            });
        } else {
            return res.json({
                message: "Invalid Admin Credentials"
            });
        }
    });
});

app.post("/api/register", (req, res) => {
    const { full_name, email, password, phone, role } = req.body;

    // Validate required fields
    if (!full_name || !email || !password || !phone || !role) {
        return res.status(400).json({ message: "Please provide all required fields" });
    }

    const checkQuery = "SELECT * FROM users WHERE email = ?";
    db.query(checkQuery, [email], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Server error" });
        }
        if (result.length > 0) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const insertQuery = "INSERT INTO users (full_name, email, password, phone, role, status) VALUES (?, ?, ?, ?, ?, 'active')";
        db.query(insertQuery, [full_name, email, password, phone, role], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Server error during registration" });
            }
            res.status(201).json({ message: "User registered successfully!" });
        });
    });
});

app.post("/api/login", (req, res) => {

    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: "Please provide email and password" });
    }

    const email = req.body.email.trim();
    const password = req.body.password.trim();

    const query = "SELECT * FROM users WHERE email=? AND password=?";

    db.query(query, [email, password], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Server error" });
        }

        if (result.length === 0) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const user = result[0];

        if (user.status === "blocked") {
            return res.status(403).json({ message: "Your account is blocked" });
        }

        // ✅ SEND ONLY REQUIRED DATA
        res.json({
            success: true,
            user: {
                user_id: user.user_id,
               fullname: user.full_name,
                email: user.email,
                role: user.role
            }
        });
    });
});
// Forgot Password Endpoint
app.post("/api/forgot-password", (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Server error" });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "No account associated with this email" });
        }
        // In a real app, generate a reset token and email it.
        return res.json({ message: "Password reset link has been sent (simulated)." });
    });
});

app.post("/api/post-project", (req, res) => {

    const {
        founder_id,
        title,
        description,
        category,
        required_skills,
        project_stage,
        collaboration_type,
        experience_level,
        budget_min,
        budget_max,
        duration_weeks
    } = req.body;

    const sql = `
        INSERT INTO projects
        (founder_id,title,description,category,required_skills,
        project_stage,collaboration_type,experience_level,
        budget_min,budget_max,duration_weeks)
        VALUES (?,?,?,?,?,?,?,?,?,?,?)
    `;

    db.query(sql, [
        founder_id,
        title,
        description,
        category,
        required_skills,
        project_stage,
        collaboration_type,
        experience_level,
        budget_min,
        budget_max,
        duration_weeks
    ], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Insert Failed" });
        }

        res.json({ success: true });
    });
});
app.get("/api/Manage-Users", (req, res) => {
    const query = `SELECT *FROM users`;
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "An error occurred while fetching users. Please try again."
            })
        } else {
            res.status(200).json({
                message: "Users data fetched successfully!",
                data: result
            });
        }
    })

})

app.get("/api/myProject/:id", (req, res) => {

    const founder_id = req.params.id;

    console.log("Founder ID:", founder_id);

    const query = "SELECT * FROM projects WHERE founder_id=?";

    db.query(query, [founder_id], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error fetching projects"
            });
        }

        res.json({
            success: true,
            data: result
        });
    });
});

app.get("/api/manage-project", (req, res) => {

    const query = `SELECT * FROM projects`;

    db.query(query, (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "An error occurred while fetching users. Please try again."
            });
        } else {
            res.status(200).json({
                message: "Project fetched successfully!",
                data: result
            });
        }
    });
});
app.get("/api/editproject/:id", (req, res) => {

    const projectId = req.params.id;

    const query = "SELECT * FROM projects WHERE project_id=?";

    db.query(query, [projectId], (err, result) => {

        if (err) {
            return res.status(500).json({ message: "Error fetching project" });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.json({
            success: true,
            data: result[0]
        });
    });
});
app.put("/api/block-user/:id", (req, res) => {

    const userId = req.params.id;

    const query = `
                    UPDATE users SET status = IF(status = 'active', 'blocked', 'active') WHERE user_id = ?;
`;

    db.query(query, [userId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Error updating user status" });
        }
        res.json({ message: "User status updated successfully" });
    });
});
app.put("/api/status-project/:id", (req, res) => {

    const projectId = req.params.id;

    const query = `
                    UPDATE projects SET status = IF(status = 'active', 'closed', 'active') WHERE project_id = ?;   
`;

    db.query(query, [projectId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Error updating project status" });
        }
        res.json({ message: "Project status updated successfully" });
    });
});

app.put("/api/founder/edit-project/:id", (req, res) => {

    const projectId = req.params.id;

    const {
        title,
        description,
        required_skills,
        budget_min,
        budget_max,
        duration_weeks
    } = req.body;

    const query = `
        UPDATE projects SET 
            title = ?,
            description = ?,
            required_skills = ?,
            budget_min = ?,
            budget_max = ?,
            duration_weeks = ?
        WHERE project_id = ?
    `;

    db.query(query, [
        title,
        description,
        required_skills,
        budget_min,
        budget_max,
        duration_weeks,
        projectId
    ], (err) => {

        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Error updating project" });
        }

        res.json({ message: "Project updated successfully" });
    });
});

app.delete("/api/project/:id",(req,res)=>{
    const projectId = req.params.id;
    const query= "DELETE FROM projects WHERE project_id=?";

    db.query(query,[projectId],(err)=>{
        if(err){
            console.log(err);
            return res.status(500).json({ message : "delete failed"});
        }
        res.json({message:"Project deleted successfully"});
    })
})

const PORT = 1337;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
