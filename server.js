const express = require('express')
const app = express()
const cors = require('cors');
app.use(cors())
const db = require("./db")

// using environment variables
const PORT = process.env.PORT || 8000
const Report = require('./models/report.js');
const { reports } = require('./models/report.js');



// using middleware to serve static files
// mainly for client side js that runs in the browser
// bascially how project 1 works
app.use(express.static('public'))

app.use(express.json())

app.get('/api/reports', (req, res) => {
  const coords = {
        botLat: req.query.botLat,
        topLat: req.query.topLat,
        botLng: req.query.botLng,
        topLng: req.query.topLng
      }
  const result = Report.getReportsInBounds(coords)
  result.then((dbRes) => {
    res.json(dbRes.rows);
  });
})

app.get('/api/info', (req, res) => {
  res.json({ message: 'welcome to the safehaven json api'})
})

app.get('/api/reports/stats', (req, res) => {
  Report.stats()
    .then(dbRes => {
      res.json(dbRes.rows)
    })
})

app.post("/api/reports", (req, res) => {
  let newReport = req.body;
  console.log(newReport)
  Report.create(newReport);
  console.log("new report added!")
  
})

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
})

// fundamentals - crucial for reading docs & example code
// code readability - tell a story - easier even for yourself when reading after 3 weeks
// following instructions - professional & reliable
// take small steps towards your goal - wisdom 
// understand the architecture - big picture stuff 
// understand the problem - takes time but neccessary
// mindset - effects your form
// refactoring - it's not the first step
// abstractions - if you can do all the above
