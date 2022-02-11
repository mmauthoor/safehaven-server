const express = require('express')
const app = express()
const cors = require('cors');
app.use(cors())
const db = require("./db")

// using environment variables
const PORT = process.env.PORT || 8000
const Report = require('./models/report.js');
const { reports } = require('./models/report.js');

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
    console.log(dbRes.rows)
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
  var redirect = { redirect: "/resources" }
  if (newReport.email){
    return res.json(redirect)
  }
  
})

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
})
