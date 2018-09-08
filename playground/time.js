const moment = require('moment');

// var date = moment();
// date.add(1, 'year').subtract(9, 'months');
// console.log(date.format('MMM Do, YYYY'));

var createdAt = 1000;
var date = moment(createdAt);
console.log(date.format('h:mm a'));
