const res = require('express/lib/response')
const db = require('../db')

function moreProcessing(num) {
  if (num > 1000) {
    throw new Error('num too big')
  }
}

// top level function declaration
function reports(num) {

  
  // res obj from express is a dependency
  // if we need to pass it in
  // this function is couple to express
  


    // multiline sql makes it easier to read
    // not the most efficient query
    // but showcasing more what database is capable off
        
    
  let sql = `
    select * 
    from reports;
  `
    // old style async fn that take callbacks & does not return promises
    // they're not composable
    // instead of old style callback
    // pg library also supports promise interface
    // we are going to use it
    // so that whoever is calling Station.random() can decide later
    // what they want to do with the response from the database
    
    
    // db.query() returns a promise that we're returning to the caller
    
  return db.query(sql).then(res => res.rows)
}



function stats() {
  let sql = `
  select date, time, user_input 
  from reports;
  `

  return db.query(sql)
}


const Report = {
  reports,
  stats
}

module.exports = Report