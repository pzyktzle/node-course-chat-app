const path = require('path');
const express = require('express');

// console.log(__dirname + '\\..\\public'); // contains ".." in path
// const publicPath = path.join(__dirname, '../public');
// console.log(publicPath); // does not contain ".." in path

const port = process.env.PORT || 3000;
var app = express();

// app.use('/', express.static(path.join(__dirname, '../public')));
//
// app.get('/', (req, res) => {
//   res.sendFile('/index.hmtl');
// });

 app.use(express.static(path.join(__dirname, '../public')));

app.listen(port, () => {
  console.log(`Server up on port ${port}`);
})
