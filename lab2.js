//Shandeepa Wickramasinghe
var gl;
var Tx=0.0, Ty=0.0, Tz=0.0;
var n;

window.onload = function init() {
 //Retrieve <canvas> element
 var canvas = document.getElementById( "gl-canvas" );

 //Get the rendering context for WebGL
 gl = WebGLUtils.setupWebGL(canvas);
 if (!gl) {
 console.log('Failed to get the rendering context for WebGL');
 return;
 }
 gl.viewport( 0, 0, canvas.width, canvas.height );
 gl.clearColor( 0.0, 0.0, 0.0, 1.0 ); 

// Create shading program
 var program = initShaders( gl, "vertex-shader", "fragment-shader" );
 gl.useProgram( program );
 gl.program = program;

 // initVertexBuffers() is on the next slide
 n = initVertexBuffers(gl);
 if (n < 0) {
 console.log('Failed to set the vertex information');
 return;
 } 

  window.onkeydown = function(event)
 {

        var key = String.fromCharCode(event.keyCode);
 
       switch(key)
 
{

          case 'A':
            
 Tx=-0.5, Ty=0.0, Tz=0.0;
        break;


       case 'S':
            
 Tx=0.0, Ty=-0.5, Tz=0.0;
        break;


case 'D':
            
 Tx=0.5, Ty=0.0, Tz=0.0;
        break;


case 'W':
            
 Tx=0.0, Ty=0.5, Tz=0.0;
        break;


case '1':
            
 Tx=0.0, Ty=0.0, Tz=0.0;
        break;


       }


//init();
 n = initVertexBuffers(gl);
    render();
    };



// Specify the color for clearing <canvas>
 gl.clearColor(0.0, 0.0, 0.0, 1.0);
 // Clear <canvas>
 gl.clear(gl.COLOR_BUFFER_BIT);
 // Draw the rectangle
 gl.drawArrays(gl.TRIANGLES, 0, n);
render();
}

function initVertexBuffers(gl) {
 var verticesColors = new Float32Array([
 // Vertex coordinates and color
 0.0,0.0, 1.0, 0.0, 0.0,
 0.5, 0.0, 0.0, 1.0, 0.0,
 0.5, 0.5, 0.0, 0.0, 1.0,
0.0,0.0,1.0, 0.0, 0.0,
0.0,0.5,0.0, 1.0, 0.0,
-0.5,0.5,0.0, 0.0, 1.0,
0.0,0.0, 1.0, 0.0, 0.0,
-0.5,0.0,0.0, 1.0, 0.0,
-0.5,-0.5,0.0, 0.0, 1.0,
0.0,0.0,1.0, 0.0, 0.0,
0.0,-0.5,0.0, 1.0, 0.0,
0.5,-0.5,0.0, 0.0, 1.0

 ]);
 var n = 12;
 // Create a buffer object
 var vertexColorBuffer = gl.createBuffer();
 if (!vertexColorBuffer) {
 console.log('Failed to create the buffer object');
 return false;
 }
 // continued 
// Bind the buffer object to target
 gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
 gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);
 var FSIZE = verticesColors.BYTES_PER_ELEMENT;
 //Get the storage location of a_Position, assign & enable buffer
 var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
 if (a_Position < 0) {
 console.log('Failed to get the storage location of a_Position');
 return -1;
 } 

gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 5, 0);
 gl.enableVertexAttribArray(a_Position);
 // Enable the assignment of the buffer object

//var Tx=0.5, Ty=0.0, Tz=0.0;
var u_Translation = gl.getUniformLocation(gl.program,'u_Translation');
gl.uniform4f(u_Translation,Tx,Ty,Tz,0.0);

 // Get the storage location of a_Color, assign buffer and enable
 var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
 if(a_Color < 0) {
 console.log('Failed to get the storage location of a_Color');
 return -1;
 }


 gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 5, FSIZE * 2);
 gl.enableVertexAttribArray(a_Color);
 // Enable the assignment of the buffer object
 // Unbind the buffer object
 gl.bindBuffer(gl.ARRAY_BUFFER, null);
 return n;
}


function render()

{

gl.clear(gl.COLOR_BUFFER_BIT);
 // Draw the rectangle
 gl.drawArrays(gl.TRIANGLES, 0, n);
}

