var t = serverquotes;

// [
//   "my name is something",
//   "hello nothing",
//   "strange days"
// ]

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  for (var i = 0; i < t.length; i++) {
    text(t[i],mouseX,10*i);
  }
  
}