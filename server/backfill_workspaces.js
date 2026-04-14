const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "idea2team",
});

db.connect((err) => {
  if (err) return console.error(err);
  console.log("Connected to DB to backfill workspaces!");

  // Find all accepted applications
  db.query(`
    SELECT a.project_id, a.freelancer_id, p.founder_id, p.title 
    FROM applications a 
    JOIN projects p ON a.project_id = p.project_id 
    WHERE a.status = 'accepted'
  `, (err, acceptedApps) => {
    if (err) return console.log(err);

    console.log(`Found ${acceptedApps.length} accepted applications.`);

    let processed = 0;
    if (acceptedApps.length === 0) {
      console.log("No accepted applications found to backfill.");
      process.exit();
    }

    acceptedApps.forEach((app) => {
      const { project_id, freelancer_id, founder_id, title } = app;

      // Check if workspace exists
      db.query("SELECT workspace_id FROM workspaces WHERE project_id = ?", [project_id], (err, wsData) => {
        if (wsData && wsData.length > 0) {
          // Add freelancer
          const workspace_id = wsData[0].workspace_id;
          db.query("INSERT INTO workspace_members (workspace_id, user_id, role) VALUES (?, ?, 'member') ON DUPLICATE KEY UPDATE role='member'", [workspace_id, freelancer_id], () => {});
          checkDone();
        } else {
          // Create workspace
          db.query("INSERT INTO workspaces (project_id, owner_id, name, description) VALUES (?, ?, ?, ?)", [project_id, founder_id, `Workspace for ${title}`, `Auto-generated workspace for ${title}`], (err, insertRes) => {
            if (!err) {
              const newWorkspaceId = insertRes.insertId;
              db.query("INSERT INTO workspace_members (workspace_id, user_id, role) VALUES (?, ?, 'admin')", [newWorkspaceId, founder_id], () => {});
              db.query("INSERT INTO workspace_members (workspace_id, user_id, role) VALUES (?, ?, 'member')", [newWorkspaceId, freelancer_id], () => {});
            }
            checkDone();
          });
        }
      });
    });

    function checkDone() {
      processed++;
      if (processed === acceptedApps.length) {
        console.log("Backfill complete! Workspaces synced.");
        process.exit();
      }
    }
  });
});
