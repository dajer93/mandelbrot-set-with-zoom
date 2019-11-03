let zoom = 1;
const maxIterations = 10000;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  frameRate(30);
}

function draw() {
  loadPixels();
  let w = 2;
  let h = (w * height) / width;
  
  let offsetX = 0.4;
  let offsetY = 0.193938;
  let minx = -w*zoom+offsetX;
  let maxx = w*zoom+offsetX;
  let miny = -h*zoom+offsetY;
  let maxy = h*zoom+offsetY;
  let start = millis();
  for(var x = 0; x < width; x++){
    for(var y = 0; y < height; y++){
      
      var realPart = map(x, 0, width, minx, maxx);
      var imagPart = map(y, 0, height, miny, maxy);
      var Creal = realPart;
      var Cimag = imagPart;
      
      var n = 0;
      
      while(n < maxIterations) {
        var rr = realPart * realPart - imagPart * imagPart;
        var ii = 2 * realPart * imagPart;
        realPart = rr + Creal;
        imagPart = ii + Cimag;
        
        n++;
        var z = abs(realPart + imagPart);
        if(z > 4) {
          break;
        }
        
      }
      
      var r = map(log(n), 0, 0.5*log(maxIterations), 0, 200);
      // var g = map(n/maxIterations, 1/maxIterations, 1, 50, 120);
      // var b = map(n, 0, maxIterations, 0, 100);
      var g = 60;
      var b = 90;
    
      if (n == maxIterations) {
        r = 0;
        g = 0;
        b = 10;
      }
      
      var pix = (x + y * width) * 4;
      pixels[pix + 0] = r != 0 ? r : 0;
      pixels[pix + 1] = g != 0 ? g : 0;
      pixels[pix + 2] = b != 0 ? b : 0;
      pixels[pix + 3] = 255;
    }
  }
  let end = millis();
  console.log(end-start + " milliseconds");
  updatePixels();
  
  strokeWeight(4);
  stroke(255);
  fill(0);
  textSize(24);
  text("zoom: "+zoom, 10, 30);
  strokeWeight(2);
  textSize(16);
  text("UP ARROW - zoom in", 10, 50);
  text("DOWN ARROW - zoom out", 10, 70);
  //zoom = zoom / 1.1;
  noLoop();
}

function keyPressed(){
  if(keyCode == DOWN_ARROW) {
    zoom = zoom * 2;
  }
  if(keyCode == UP_ARROW) {
    zoom = zoom / 2;
  }
  text("loading...", 10, 380);
  loop();
}

/*
function mouseWheel(event) {
  if (event.delta > 0) {
    if (zoom > 1) {
      zoom = zoom * (zoom + 1);
    }
  } else {
    zoom = zoom / (zoom+1);
  }
  return false;
}*/
