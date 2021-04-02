var drawingData = [];

function setup() {
  createCanvas(400, 400);
  httpGet('/drawingjson', "json", function(data) {
    console.log(data);
    for (var i = 0; i < data.length; i++ ) {
      ellipse(data[i].x, data[i].y, 10, 10);
    }
  });
}

function draw() {
  //background(220);
  if (mouseIsPressed) {
    rect(mouseX,mouseY,20,20);
    drawingData.push({x:mouseX, y:mouseY});
    httpGet("/drawingsubmit?x="+mouseX+"&y="+mouseY, function(data) {
      //console.log(data);
      for (var i = 0; i < data.length; i++ ) {
        ellipse(data[i].x, data[i].y, 10, 10);
      }
    }, function(r) {console.log(r)});
  }
}

function mousePressed() {

}