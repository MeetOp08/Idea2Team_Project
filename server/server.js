const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const mysql = require("mysql2");
const path = require("path");
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use("/public", express.static("public"));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "idea2team",
});

db.connect((err) => {
  if (err) {
    console.error("Connection Failed❌ and error is:", err);
  } else {
    console.log("Connected to the database successfully!✅");
  }
});
//admin login
app.post("/api/admin-login", (req, res) => {
  const email = req.body.email.trim();
  const password = req.body.password.trim();

  console.log("Admin Email:", email);
  console.log("Admin Password:", password);

  const query = "SELECT * FROM admin WHERE email = ? AND password = ?";
  db.query(query, [email, password], (err, results) => {
    if (email === "patelmeet52271@gmail.com" && password === "Meet@0811P_") {
      return res.json({
        message: "Admin Login Successful",
        email: email,
        admin_id: 1,
      });
    } else if (results && results.length > 0) {
      return res.json({
        message: "Admin Login Successful",
        email: email,
        admin_id: results[0].admin_id,
      });
    } else {
      return res.json({
        message: "Invalid Admin Credentials",
      });
    }
  });
});

app.post("/api/register", (req, res) => {
  const { full_name, email, password, phone, role } = req.body;

  // Validate required fields
  if (!full_name || !email || !password || !phone || !role) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
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

    const insertQuery =
      "INSERT INTO users (full_name, email, password, phone, role, status) VALUES (?, ?, ?, ?, ?, 'active')";
    db.query(
      insertQuery,
      [full_name, email, password, phone, role],
      (err, result) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ message: "Server error during registration" });
        }
        res.status(201).json({ message: "User registered successfully!" });
      },
    );
  });
});

app.post("/api/login", (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
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
        role: user.role,
      },
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
      return res
        .status(404)
        .json({ message: "No account associated with this email" });
    }
    // In a real app, generate a reset token and email it.
    return res.json({
      message: "Password reset link has been sent (simulated).",
    });
  });
});
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
app.post("/api/post-project", upload.single("upload_file"), (req, res) => {
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
    duration_weeks,
    team_members_required,
  } = req.body;
  const upload_file = req.file ? req.file.filename : null;
  const sql = `
        INSERT INTO projects
        (founder_id,title,description,category,required_skills,
        project_stage,collaboration_type,experience_level,
        budget_min,budget_max,duration_weeks,team_members_required,upload_file)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)
    `;

  db.query(
    sql,
    [
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
      duration_weeks,
      team_members_required,
      upload_file,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Insert Failed" });
      }

      res.json({ success: true });
    },
  );
});
app.post("/api/apply-project", (req, res) => {
  const { project_id, freelancer_id, proposal_message, expected_salary } =
    req.body;

  console.log(req.body);

  const query = `
    INSERT INTO applications
    (project_id, freelancer_id, proposal_message, expected_salary)
    VALUES (?,?,?,?)
    `;

  db.query(
    query,
    [project_id, freelancer_id, proposal_message, expected_salary],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Error inserting application",
        });
      }

      res.json({
        success: true,
        message: "Application submitted successfully",
      });
    },
  );
});
// 23-03-2026 enter, update, and edit profile data 
app.post("/api/profile", upload.single("image"), (req, res) => {
  const {
    user_id, title, location, bio,
    contact_info, skills, experience,
    github, linkedin
  } = req.body;

  const image = req.file ? req.file.filename : req.body.image;

  const query = `
        INSERT INTO profiles (
            user_id, title, location, bio, 
            contact_info, skills, experience, 
            github, linkedin, image
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            title = VALUES(title),
            location = VALUES(location),
            bio = VALUES(bio),
            contact_info = VALUES(contact_info),
            skills = VALUES(skills),
            experience = VALUES(experience),
            github = VALUES(github),
            linkedin = VALUES(linkedin),
            image = VALUES(image)
    `;

  db.query(query, [
    user_id, title, location, bio,
    contact_info, skills, experience,
    github, linkedin, image
  ], (err) => {
    if (err) {
      console.error("SQL Error in Profile POST:", err);
      return res.status(500).json({ message: "Error saving profile" });
    }
    res.json({ success: true, message: "Profile saved successfully" });
  });
});

app.put("/api/profile/:user_id", (req, res) => {
  const { user_id } = req.params;
  const {
    title, location, bio,
    contact_info, skills, experience,
    github, linkedin, image
  } = req.body;

  const query = `
        UPDATE profiles
        SET title = ?, location = ?, bio = ?, 
            contact_info = ?, skills = ?, experience = ?, 
            github = ?, linkedin = ?, image = ?
        WHERE user_id = ?`;

  db.query(query, [
    title, location, bio,
    contact_info, skills, experience,
    github, linkedin, image,
    user_id
  ], (err, result) => {
    if (err) {
      console.error("SQL Error in Profile PUT:", err);
      return res.status(500).json({ message: "Error updating profile" });
    }
    res.status(200).json({ success: true, message: "Profile updated successfully" });
  });
});

app.get("/api/profile/:user_id", (req, res) => {
  const { user_id } = req.params;

  const query = `
        SELECT users.full_name, users.email, profiles.*
        FROM users
        LEFT JOIN profiles ON users.user_id = profiles.user_id
        WHERE users.user_id = ?
    `;

  db.query(query, [user_id], (err, result) => {
    if (err) {
      console.error("SQL Error in Profile GET:", err);
      return res.status(500).json({ message: "Error fetching profile" });
    }
    res.status(200).json(result[0] || {});
  });
});
app.get("/api/Manage-Users", (req, res) => {
  const query = `SELECT *FROM users`;
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: "An error occurred while fetching users. Please try again.",
      });
    } else {
      res.status(200).json({
        message: "Users data fetched successfully!",
        data: result,
      });
    }
  });
});
app.get("/api/userinfo/:id", (req, res) => {
  const userId = req.params.id;
  const query = `SELECT * FROM users WHERE user_id = ?`;
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message:
          "An error occurred while fetching user info. Please try again.",
      });
    } else {
      res.status(200).json({
        message: "User info fetched successfully!",
        data: result[0],
      });
    }
  });
});
app.get("/api/admininfo/:id", (req, res) => {
  const userId = req.params.id;
  const query = `SELECT * FROM admin WHERE admin_id = ?`;
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message:
          "An error occurred while fetching user info. Please try again.",
      });
    } else {
      res.status(200).json({
        message: "User info fetched successfully!",
        data: result[0],
      });
    }
  });
});
app.get("/api/myProject/:id", (req, res) => {
  const founder_id = req.params.id;

  console.log("Founder ID:", founder_id);

  const query = "SELECT * FROM projects WHERE founder_id=?";

  db.query(query, [founder_id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: "Error fetching projects",
      });
    }

    res.json({
      success: true,
      data: result,
    });
  });
});

app.get("/api/manage-project", (req, res) => {
  const query = `SELECT * FROM projects`;

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: "An error occurred while fetching users. Please try again.",
      });
    } else {
      res.status(200).json({
        message: "Project fetched successfully!",
        data: result,
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
      data: result[0],
    });
  });
});
app.get("/api/projects", (req, res) => {
  const query = `
        SELECT projects.*, users.full_name AS founder_name
        FROM projects
        JOIN users ON projects.founder_id = users.user_id WHERE projects.status = 'active'
    `;

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        message: "Error during fetching data.",
      });
    }

    res.json({
      message: "Successfully data fetched.",
      data: result,
    });
  });
});
app.get("/api/info-projects/:id", (req, res) => {
  const project_id = req.params.id;
  console.log("Project_Id:", project_id);
  const query = `SELECT * FROM projects WHERE project_id=?`;
  db.query(query, [project_id], (err, result) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: "Error Occoure in fatching data" });
    }
    res.json({
      success: true,
      data: result[0],
    });
  });
});
app.get("/api/info-application/:id", (req, res) => {
  const founder_id = req.params.id;
  console.log("founder_id:", founder_id);

  const query = `SELECT c.application_id, a.full_name,b.title,c.proposal_message,expected_salary,c.status 
  FROM users as a,projects as b,applications as c where a.user_id = c.freelancer_id  and
   b.project_id = c.project_id and b.founder_id=?`;
  db.query(query, [founder_id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: "Error fetching applications",
      });
    }
    res.json({
      success: true,
      data: result,
    });
  });
});
app.get("/api/freelancer/myapplication/:id", (req, res) => {
  const id = req.params.id;
  console.log("freelancer_id:", id);

  const query = `SELECT p.project_id, u.full_name, u.email as email, u.phone as phone, p.title, p.description, a.status FROM users as u,projects as p,applications as a 
    WHERE u.user_id = p.founder_id AND p.project_id = a.project_id AND freelancer_id = ?`;

  db.query(query, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: "Error fatching data",
      });
    }
    res.json({
      success: true,
      data: result,
    });
  });
});

app.get("/api/founder/dashboard/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  const query = `SELECT 
  (SELECT COUNT(*) FROM projects WHERE founder_id=?) AS totalProjects ,
  (SELECT COUNT(*) FROM projects WHERE founder_id=? AND status = 'active') AS activeProjects,
  (SELECT COUNT(*) FROM applications a JOIN projects p ON a.project_id = p.project_id WHERE founder_id=? ) AS totalApplications,
  (SELECT COUNT(*) FROM applications a JOIN projects p ON a.project_id = p.project_id AND a.status='accepted' WHERE founder_id=?) AS acceptedFreelancers`;

  db.query(query, [id, id, id, id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: "Error in Data fatching"
      })
    }
    console.log(result)
    res.json({
      success: true,
      message: "Successfully fatched",
      data: result[0]
    })
  })
})

app.get("/api/freelancer/dashboard/:id", (req, res) => {
  const freelancer_id = req.params.id;

  const query = `SELECT 
                  (SELECT COUNT(*) FROM applications a JOIN projects p ON a.project_id = p.project_id WHERE freelancer_id=?) AS appliedProjects, 
                  (SELECT COUNT(*) FROM applications WHERE status="accepted" AND freelancer_id=?) AS acceptedProjects,
                  (SELECT COUNT(*) FROM applications WHERE status="rejected" AND freelancer_id=?) AS rejetced,
                  (SELECT COUNT(*) FROM applications WHERE status="pending" AND freelancer_id=?) AS pending,
                  (SELECT COUNT(*) FROM applications a JOIN projects p ON a.project_id=p.project_id WHERE p.status="active" AND freelancer_id=?) AS activeProjects`;

  db.query(query, [freelancer_id, freelancer_id, freelancer_id, freelancer_id, freelancer_id], (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).json({
        message: "Error occured during fatching data"
      })
    }
    res.json({
      success: true,
      message: "Successfully fatched",
      data: result[0]
    })
  })
})
app.get("/api/admin/stats", (req, res) => {
  const query = `SELECT 
        (SELECT COUNT(*) FROM users) AS totalUsers,
        (SELECT COUNT(*) FROM projects) AS totalProjects,
        (SELECT COUNT(*) FROM projects WHERE status = 'active') AS activeProjects,
        (SELECT COUNT(*) FROM applications) AS totalApplications,
        (SELECT COUNT(*) FROM users WHERE role = 'freelancer') as totalFreelancers,
        (SELECT COUNT(*) FROM users WHERE role = 'founder') as totalFounders,
        (SELECT COUNT(*) FROM users WHERE status = 'blocked') as blockedUsers`;

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error fetching admin stats" });
    }
    res.json(result[0]);
  });
});

app.get("/api/admin/recent-activity", (req, res) => {
  const recentProjectsQuery = "SELECT title, created_at FROM projects ORDER BY created_at DESC LIMIT 5";
  const recentUsersQuery = "SELECT full_name, role, created_at FROM users ORDER BY created_at DESC LIMIT 5";

  db.query(recentProjectsQuery, (err, projectResults) => {
    if (err) return res.status(500).json({ message: "Error fetching recent projects" });

    db.query(recentUsersQuery, (err, userResults) => {
      if (err) return res.status(500).json({ message: "Error fetching recent users" });

      res.json({
        recentProjects: projectResults,
        recentUsers: userResults
      });
    });
  });
});
app.get("/api/founder/dashboard/recent-freelancer/:id", (req, res) => {
  const id = req.params.id;

  const Query = `SELECT u.full_name,u.role,p.title,a.applied_at 
  FROM users as u,projects as p ,applications as a 
  WHERE u.user_id = a.freelancer_id 
  AND p.project_id = a.project_id 
  AND p.founder_id = ?
  ORDER BY a.applied_at DESC LIMIT 4`;

  db.query(Query, [id], (err, Results) => {
    if (err) {
      return res.status(500).json({
        message: "Error fetching recent users"
      });
    }

    return res.json({
      data: Results
    });
  });
});
app.get("/api/freelancer/dashboard/recent-project/:id", (req, res) => {
  const id = req.params.id;

  const query = `SELECT p.title,p.created_at,p.required_skills,u.full_name 
  FROM projects as p,users as u 
  WHERE u.user_id = p.founder_id 
  ORDER BY p.project_id DESC LIMIT 3;`;

  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error fetching recent projects"
      });
    }

    return res.json({
      success: true,
      data: result
    });
  });
});
app.put("/api/block-user/:id", (req, res) => {
  const userId = req.params.id;

  const query = ` UPDATE users SET status = IF(status = 'active', 'blocked', 'active') WHERE user_id = ?;`;

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
    duration_weeks,
    team_members_required,
  } = req.body;

  const query = `
        UPDATE projects SET 
            title = ?,
            description = ?,
            required_skills = ?,
            budget_min = ?,
            budget_max = ?,
            duration_weeks = ?,
            team_members_required = ?
        WHERE project_id = ?
    `;

  db.query(
    query,
    [
      title,
      description,
      required_skills,
      budget_min,
      budget_max,
      duration_weeks,
      team_members_required,
      projectId,
    ],
    (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Error updating project" });
      }

      res.json({ message: "Project updated successfully" });
    },
  );
});

app.put("/api/application/accept/:id", (req, res) => {
  const applicationId = req.params.id;
  console.log("Application ID:", applicationId);
  const query =
    "UPDATE applications SET status = 'accepted' WHERE application_id = ?";
  db.query(query, [applicationId], (err, result) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: "Error updating application status" });
    }
    res.json({ success: true, message: "Application accepted successfully" });
  });
});

app.put("/api/application/reject/:id", (req, res) => {
  const applicationId = req.params.id;
  const query =
    "UPDATE applications SET status = 'rejected' WHERE application_id = ?";
  db.query(query, [applicationId], (err, result) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: "Error updating application status" });
    }
    res.json({ success: true, message: "Application rejected successfully" });
  });
});

app.delete("/api/project/:id", (req, res) => {
  const projectId = req.params.id;
  const query = "DELETE FROM projects WHERE project_id=?";

  db.query(query, [projectId], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "delete failed" });
    }
    res.json({ message: "Project deleted successfully" });
  });
});
app.post("/api/founder-profile", upload.single("image"), (req, res) => {
  const {
    user_id, phone, location, bio,
    company_name, company_website,
    industry, company_size, company_description
  } = req.body;

  // Use uploaded file filename if exists, otherwise keep existing image value
  const image = req.file ? req.file.filename : req.body.image;

  const query = `
        INSERT INTO founder_profiles (
            user_id, phone, location, bio, 
            company_name, company_website, 
            industry, company_size, company_description, image
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            phone = VALUES(phone),
            location = VALUES(location),
            bio = VALUES(bio),
            company_name = VALUES(company_name),
            company_website = VALUES(company_website),
            industry = VALUES(industry),
            company_size = VALUES(company_size),
            company_description = VALUES(company_description),
            image = VALUES(image)
    `;

  db.query(query, [
    user_id, phone, location, bio,
    company_name, company_website,
    industry, company_size, company_description, image
  ], (err) => {
    if (err) {
      console.error("SQL Error in Founder Profile POST:", err);
      return res.status(500).json({ message: "Error saving founder profile" });
    }
    res.json({
      success: true,
      message: "Founder Profile saved successfully",
      image: image
    });
  });
});

app.get("/api/founder-profile/:user_id", (req, res) => {
  const { user_id } = req.params;

  const query = `
        SELECT users.full_name, users.email, founder_profiles.*
        FROM users
        LEFT JOIN founder_profiles ON users.user_id = founder_profiles.user_id
        WHERE users.user_id = ?
    `;

  db.query(query, [user_id], (err, result) => {
    if (err) {
      console.error("SQL Error in Founder Profile GET:", err);
      return res.status(500).json({ message: "Error fetching founder profile" });
    }
    res.status(200).json(result[0] || {});
  });
});

const PORT = 1337;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
