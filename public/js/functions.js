/*
    functions.js (All Rights Reserved @lydiamoonxx)
*/

// piece get the graphic asset with the given name
// notice that this function is designed to retrieve png files
// if you are using other file types you can make a new function
// based on this one

function piece(partName) {
    return `./assets/${partName}.png`;
}

// squareSize find the side length for the largest square that can fit in the window
// this makes use of p5's built in variables windowWidth and windowHeight
// it checks to see which is smaller (width or height)  returns that value

function squareSize() {
    let size = 0;
    if (windowWidth > windowHeight) {
        size = windowHeight;
    } else {
        size = windowWidth;
    }
    return size;
}

// hueShift shifts the hue and brightness of a given color

function hueShift(originalColor,hShift,bShift) {
    colorMode(HSB,360)
    let originalHue = hue(originalColor);
    let originalSat = saturation(originalColor);
    let originalBri = brightness(originalColor);
    let newHue = originalHue + hShift;
    let newBri = originalBri +bShift;
    while (newHue > 360) {
        newHue -= 360;
    }
    let newColor = color(newHue,originalSat+240,newBri);
    colorMode(RGB,255);
    return [red(newColor),green(newColor),blue(newColor),alpha(newColor)]
}

// hueShiftImage shifts the hue and brightness of a given image
// this is an advanced function, be sure to read about the pixel array
//   on the the p5 website's documentation

function hueShiftImage(image,hShift,bShift) {
    let size = squareSize();
    image.loadPixels()
    let d = pixelDensity();
    for (let x = 0; x < size;x++) {
        for (let y = 0; y < size;y++) {
            for (let i = 0; i < d; i++) {
                for (let j = 0; j < d; j++) {
                    index = 4 * ((j+y*d)*width*d+(i+x*d));
                    if (image.pixels[index+3] > 0) {
                        let r = image.pixels[index];
                        let g = image.pixels[index+1];
                        let b = image.pixels[index+2];
                        let a = image.pixels[index+3];
                        newRGBA = hueShift(color(r,g,b,a),hShift,bShift)
                        image.pixels[index] =  newRGBA[0];
                        image.pixels[index+1] = newRGBA[1];
                        image.pixels[index+2] = newRGBA[2];
                    }
                }
            }
        }
    }
    image.updatePixels();
}

// equilateralTriangle: make an equilateral triangle centered at the given point
//  requires a center point, a radius, and a direction to point

function equilateralTriangle(x,y,radius,theta) {
    push();
    translate(x,y);
    rotate(theta);
    gamma = PI/1.5;
    beginShape();
    for (n=0;n<=3;n++) {
        vertex(cos(gamma*n)*radius,sin(gamma*n)*radius);
    }
    vertex(radius,0)
    endShape(CLOSE);
    pop();
}

// resizeAll a function to resize all of the things
// this is a one line function that is written to help readability of your code

function resizeAll(listOfImages,size) {
    listOfImages.forEach(element => element.resize(size,size));
}

// drawAll put all the images on the canvas
// another one liner designed to increase readability

function drawAll(listOfImages,x,y) {
    listOfImages.forEach(element => image(element,x,y))
}