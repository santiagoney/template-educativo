/*
    main.js by napoleonbonaparte.tez
       bajo licencia CC0
     
        Este código está hecho para ser modificado
        Se desalienta la publicación de proyectos sin modificaciones 
        o con pocas modificaciones con respecto al código original
        
        
*/

// El proyecto tiene incorporados una cabeza, ojos, nariz y boca
// usaremos esas variables para decirle a la computadora cuáles ir dibujando
// estas variables son donde van a residir las imágenes 
let head,eyes,nose,mouth;

//acá vamos a elegir algunos números aleatorios para que escojan nuestras imágenes 

// fxhash() es la variable a usar para esto
// const es usado para indicar que estas variables aleatorias no van a cambiar 

const head_seed = Math.floor(fxrand()*1.5);
const eyes_seed = Math.floor(fxrand()*1.5);
const nose_seed = Math.floor(fxrand()*2.5);
const mouth_seed = Math.floor(fxrand()*3.5);

//vamos a usar algunos colores aleatorios para la cara
//aquí elegiremos los números que vamos a usar para esos colores aleatorios

let color_seeds =[];
// precisamos cuatro colores
// for loop es útil cuando queremos que algo se repita
for (i=0;i<4;i++) {
    //  el método push agregará cosas al final del arreglo (aka lista)
   
    color_seeds.push(fxrand());
}

// vamos a usar 360 como número para el rango de matiz

let hues = 360

// creemos una colección de variables aleatorias que usaremos para hacer algunos triángulos

let random_seeds = [];
// ahora creemos una colección con un nmero aleatorio de elementos (entre 5000 y 6000)

for (i=0;i<5000+fxrand()*1000;i++) {
    random_seeds.push(fxrand());
}

// elijamos un número de formas (triángulos)
const shapesNumber = 100+fxrand()*100;

function preload() {
    // cargar todas las imágenes
    //  acá usaremos la función loadImage de p5js
    //  along with a helper function called piece
    //  check out the helper function code in ./js/functions.js
    //  here we are using string interpolation, notice the use of backticks
    // in javascript there are several ways to mark a string like ",', or `
    // only the last one is used for string interpolation
    head = loadImage(piece(`head${head_seed}`));
    eyes = loadImage(piece(`eyes${eyes_seed}`));
    nose = loadImage(piece(`nose${nose_seed}`));
    mouth = loadImage(piece(`mouth${mouth_seed}`));
}

function setup() {
    // Determine the maximum square that will fit in the window
    // we are doing this to make sure the image appears as large as possible inside our window
    // this is done using a helper fuction, again found in ./js/functions.js
    sqsize = squareSize()
    // createCanvas is a built-in p5 function that will make the canvas for us to draw on
    createCanvas(sqsize, sqsize);
    // if your work is a still image you can use noLoop (a built in p5 function)
    // this will prevent the image from redrawing over and over again (cpu intensive)
    // if your work is animated, you probably need to disable the next line
    // you can do so using the double slashes you see in front of this and many other lines
    // you can also just delete the line
    noLoop();
}
  
function draw() {
    // setting a background color for the canvas
    // this is a built-in p5 function
    background(100);
    // The call to squareSize below looks familiar. Why did we do this again?
    // because the old sqsize variable was declared inside a function...
    // it doesn't exist outside that function's scope.
    sqsize = squareSize();
    // lets add some random equilateral triangles to the image
    // push and pop are used to make sure we don't interfere with settings
    // use them together to preserve things like fill/stroke, etc
    push()
    colorMode(HSB,360)
    for (i=0;i<shapesNumber;i++) {
        // since we are going to use 5 random seeds each time
        // we need to keep track of the right place to start in the list
        index = i * 5;
        // first lets pick a fill color
        // we'll have the triangles a little less bright and saturated
        // so that the face will stand out over the top
        // in your project you'll probably do something totally else
        fill(random_seeds[index]*360,180,180);
        // next lets choose the x and y positions
        // we will do this relative to the overall size of the  image
        x_pos = sqsize*random_seeds[index+1]
        y_pos = sqsize*random_seeds[index+2]
        // Next lets choose the size of the equliateral triangle
        // if you check the source code you can see this number
        // will be the radius (distance from the center to the vertex)
        r = 0.1*sqsize*random_seeds[index+3]
        // finally lets pick the rotation of the triangle
        // if you check the source code you can see we will provide
        // an angle in radians
        t = PI*random_seeds[index+4]
        // now we can call those values in the equilateral triangle function
        equilateralTriangle(x_pos,y_pos,r,t);
    }
    // here the loop for making triangles closes, so we use pop to return to our normal settings
    pop()
    // Put all of your pieces in the list so you can run operations
    // on all of them. Lists are a useful data structure to "loop" over. 
    parts = [head,eyes,nose,mouth];
    // reziseAll is a helper function, so find its code in ./js/functions.js
    resizeAll(parts,sqsize);
    // hueshift is a helper function, check its source in ./js/functions.js
    // in this example we will shift each part by a random color amount
    // we are leaving the brightness alone for this project, you should experiment with it
    hueShiftImage(head,color_seeds[0]*hues,100);
    hueShiftImage(eyes,color_seeds[1]*hues,100);
    hueShiftImage(nose,color_seeds[2]*hues,100);
    hueShiftImage(mouth,color_seeds[3]*hues,100);
    // drawAll is another helper function, be sure to check its source code
    drawAll(parts,0,0);
    // assuming your project is a simple PFP, you can allow fxpreview to take the snapshot
    // if your artwork is animated you should
    fxpreview();
}
