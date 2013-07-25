// @pjs preload must be used to preload the image so that it will be available when used in the sketch  
/* @pjs preload="data/dirt.jpg"; */

float[] x = new float[20];
float[] y = new float[20];
float segLength = 10;
PImage a;

void setup() {
  size(900, 240);
  smooth();
  a = loadImage("data/dirt.jpg");
}

void draw() {
  background(226);
  image( a, 0, 0 );
  dragSegment(0, mouseX - 8, mouseY - 8);
  for(int i=0; i < x.length-1; i++) {
    dragSegment(i+1, x[i], y[i]);
  }
}

void dragSegment(int i, float xin, float yin) {
  float dx = xin - x[i];
  float dy = yin - y[i];
  float angle = atan2(dy, dx);  
  x[i] = xin - cos(angle) * segLength;
  y[i] = yin - sin(angle) * segLength;
  //stroke(23, 79, 4, 220);
  
  pushMatrix();
  translate(x[i], y[i]);
  rotate(angle);
  
  color c;
  
  if ( i % 3 == 1 )
    c = color(0, 0, 0, int(random(255)));
  else if ( i % 3 == 2 )
    c = color(int(random(255)), int(random(255)), 0, int(random(255)));
  else
    c = color(int(random(255)), 0, 0, int(random(255)));

  stroke( c );
  strokeWeight(10 + i);
  line(0, 0, segLength, 0);
  
  if ( i == x.length - 1 )
  {
    fill( c );
    noStroke();
    beginShape(TRIANGLES);
    vertex(0, 5);
    vertex(-2 * segLength, 0);
    vertex(0, -5);
    endShape();
  }
  
  if ( i == 0 )
  {
   // stroke(0, 255);
   noStroke();
   fill(0, 255);
   ellipse(segLength, -2, 3, 3);
   ellipse(segLength, 2, 3, 3);
    //point(segLength, -2);
    //point(segLength, 2);
  }
  
  popMatrix();
}