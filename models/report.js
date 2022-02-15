const res = require('express/lib/response')
const db = require('../db')

function moreProcessing(num) {
  if (num > 1000) {
    throw new Error('num too big')
  }
}

// top level function declaration
function reports() {
  let sql = `
    SELECT * 
    FROM reports;
  `
  return db.query(sql).then(res => res.rows)
}

function getReportsInBounds(mapBounds) {
  let sql = `SELECT * FROM reports 
  WHERE (lat BETWEEN ${mapBounds.botLat} AND ${mapBounds.topLat}) 
  AND (lng BETWEEN ${mapBounds.botLng} AND ${mapBounds.topLng});`;
  console.log(sql);
  return db.query(sql)
}


function stats() {
  let sql = `
  SELECT date, time, user_input 
  FROM reports;
  `

  return db.query(sql)
}

function create({email, lat, lng, date, time, user_input}) {
  let sql = `INSERT INTO reports (user_email, lat, lng, date, time, user_input, authenticated) VALUES ($1, $2, $3, $4, $5, $6, $7);`
  let values = [email, lat, lng, date, time, user_input, false]
  db.query(sql, values);
}


const Report = {
  reports,
  getReportsInBounds,
  stats,
  create
}

module.exports = Report