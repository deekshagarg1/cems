const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.studentRegister = (req,res)=>{

const {name,email,password,enrollment_no,course,semester} = req.body

const hash = bcrypt.hashSync(password,10)

const sql = `
INSERT INTO students
(name,email,password,enrollment_no,course,semester)
VALUES (?,?,?,?,?,?)
`

db.query(sql,[name,email,hash,enrollment_no,course,semester],(err)=>{

if(err) return res.status(400).json(err)

res.json({message:"Student Registered"})

})

}



exports.studentLogin = (req,res)=>{

const {email,password} = req.body

db.query("SELECT * FROM students WHERE email=?",[email],(err,result)=>{

if(result.length==0){
return res.status(401).json({message:"Student not found"})
}

const student = result[0]

const match = bcrypt.compareSync(password,student.password)

if(!match){
return res.status(401).json({message:"Wrong password"})
}

const token = jwt.sign(
{id:student.student_id,role:"student"},
process.env.JWT_SECRET
)

res.json({token})

})

}




exports.facultyRegister = (req, res) => {
  const { name, email, password, designation } = req.body;

  const hash = bcrypt.hashSync(password, 10);

  const sql = `
    INSERT INTO faculty (name, email, password, designation)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [name, email, hash, designation], (err) => {
    if (err) return res.status(400).json(err);
    res.json({ message: "Faculty Registered" });
  });
};

exports.facultyLogin = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM faculty WHERE email = ?", [email], (err, result) => {
    if (err) return res.status(500).json({ message: "Server error" });

    if (result.length === 0) {
      return res.status(401).json({ message: "Faculty not found" });
    }

    const faculty = result[0];
    const match = bcrypt.compareSync(password, faculty.password);

    if (!match) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: faculty.faculty_id, role: "faculty" },
      process.env.JWT_SECRET
    );

    res.json({ token });
  });
};

exports.adminLogin = (req, res) => {
  const { name, password } = req.body;

  db.query("SELECT * FROM admin WHERE name = ?", [name], (err, result) => {
    if (err) {
      console.error("Admin login DB error:", err); // ← terminal mein dekho
      return res.status(500).json({ message: "Server error", detail: err.message });
    }

    if (result.length === 0) {
      return res.status(401).json({ message: "Admin not found" });
    }

    const admin = result[0];
    const match = bcrypt.compareSync(password, admin.password);

    if (!match) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: admin.admin_id, role: "admin" },
      process.env.JWT_SECRET
    );

    res.json({ token });
  });
};