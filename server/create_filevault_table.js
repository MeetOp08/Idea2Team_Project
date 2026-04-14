const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "idea2team",
});

db.connect((err) => {
  if (err) return console.error(err);

  const query = `
    CREATE TABLE IF NOT EXISTS workspace_files (
        id INT AUTO_INCREMENT PRIMARY KEY,
        workspace_id INT NOT NULL,
        uploader_id INT NOT NULL,
        file_name VARCHAR(255) NOT NULL,
        file_path VARCHAR(255) NOT NULL,
        file_size INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  db.query(query, (err) => {
    if (err) console.error(err);
    else console.log("workspace_files table created successfully!");
    process.exit();
  });
});
