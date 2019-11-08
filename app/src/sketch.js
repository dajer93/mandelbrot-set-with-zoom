import * as p5 from 'p5';

let images = []
let zoom = 2;
const maxIterations = 10000;

let s = (sketch) => {  
  window.sketch = sketch;
  sketch.setup = () => {
    sketch.createCanvas(800, 600);
    sketch.pixelDensity(1);
    sketch.frameRate(30);
  }

  sketch.draw = () => {
    sketch.loadPixels();
    let start = sketch.millis();
    if (typeof images[zoom] === "undefined" ) {
      let w = 2;
      let h = (w * sketch.height) / sketch.width;
      
      let offsetX = 0.4;
      let offsetY = 0.193938;
      let minx = -w*zoom+offsetX;
      let maxx = w*zoom+offsetX;
      let miny = -h*zoom+offsetY;
      let maxy = h*zoom+offsetY;
      for(var x = 0; x < sketch.width; x++){
        for(var y = 0; y < sketch.height; y++){
          
          var realPart = sketch.map(x, 0, sketch.width, minx, maxx);
          var imagPart = sketch.map(y, 0, sketch.height, miny, maxy);
          var Creal = realPart;
          var Cimag = imagPart;
          
          var n = 0;
          
          while(n < maxIterations) {
            var rr = realPart * realPart - imagPart * imagPart;
            var ii = 2 * realPart * imagPart;
            realPart = rr + Creal;
            imagPart = ii + Cimag;
            
            n++;
            var z = sketch.abs(realPart + imagPart);
            if(z > 4) {
              break;
            }
            
          }
          
          var r = sketch.map(sketch.log(n), 0, 0.5*sketch.log(maxIterations), 0, 200);
          // var g = map(n/maxIterations, 1/maxIterations, 1, 50, 120);
          // var b = map(n, 0, maxIterations, 0, 100);
          var g = 60;
          var b = 90;
        
          if (n == maxIterations) {
            r = 0;
            g = 0;
            b = 10;
          }
          
          var pix = (x + y * sketch.width) * 4;
          sketch.pixels[pix + 0] = r != 0 ? r : 0;
          sketch.pixels[pix + 1] = g != 0 ? g : 0;
          sketch.pixels[pix + 2] = b != 0 ? b : 0;
          sketch.pixels[pix + 3] = 255;
          images[zoom] = sketch.pixels;
        }
      }
    } else {
      for(var x = 0; x < sketch.width; x++){
        for(var y = 0; y < sketch.height; y++){
          var pix = (x + y * sketch.width) * 4;
          sketch.pixels[pix + 0] = images[zoom][pix + 0];
          sketch.pixels[pix + 1] = images[zoom][pix + 1];
          sketch.pixels[pix + 2] = images[zoom][pix + 2];
          sketch.pixels[pix + 3] = 255;
        }
      }
    }
    let end = sketch.millis();
    let renderTime = end-start;
    console.log(renderTime + " milliseconds");
    sketch.updatePixels();
    
    sketch.strokeWeight(4);
    sketch.stroke(0);
    sketch.fill(255);
    sketch.textSize(22);
    sketch.text("UP ARROW - zoom in", 10, 30);
    sketch.text("DOWN ARROW - zoom out", 10, 50);
    sketch.strokeWeight(2);
    sketch.textSize(16);
    sketch.text("zoom: "+zoom, 10, 70);
    sketch.textSize(14);
    sketch.text("Max iterations: " + maxIterations, 10, 90);
    sketch.text("Render time: " + sketch.round(renderTime) + " ms", 10, 110);
    //zoom = zoom / 1.1;
    sketch.noLoop();
  }

  sketch.keyPressed = () => {
    if(sketch.keyCode == sketch.DOWN_ARROW) {
      zoom = zoom * 2;
    }
    if(sketch.keyCode == sketch.UP_ARROW) {
      zoom = zoom / 2;
    }
    sketch.loop();
  }
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

const P5 = new p5(s, "p5-container");
