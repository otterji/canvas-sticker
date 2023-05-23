import React, { useRef, useEffect } from 'react';

function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
  
    // Variables to store the image position and dragging state
    let imageX = 50;
    let imageY = 50;
    let isDragging = false;
    let previousX = 0;
    let previousY = 0;
  
    // Create an image object
    const image = new Image();
    image.src = '/soodal.png'; // Replace 'image.jpg' with the actual filename and extension of your image
  
    // Draw the image on the canvas once it has loaded
    image.onload = () => {
      drawImage();
  
      // Add event listeners for mouse down, mouse move, and mouse up
      canvas.addEventListener('mousedown', handleMouseDown);
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseup', handleMouseUp);
    };
  
    // Function to draw the image at the current position
    function drawImage() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, imageX, imageY, 100, 100); // Adjust the dimensions as needed
    }
  
    function handleMouseDown(event) {
      const offsetX = event.offsetX;
      const offsetY = event.offsetY;
      if (
        offsetX >= imageX &&
        offsetX <= imageX + 100 && // Adjust the dimensions as needed
        offsetY >= imageY &&
        offsetY <= imageY + 100 // Adjust the dimensions as needed
      ) {
        isDragging = true;
        previousX = offsetX;
        previousY = offsetY;
      }
    }
    
  
    // Function to handle the mouse move event
    function handleMouseMove(event) {
      if (isDragging) {
        const offsetX = event.offsetX;
        const offsetY = event.offsetY;
        const dx = offsetX - previousX;
        const dy = offsetY - previousY;
        imageX += dx;
        imageY += dy;
        previousX = offsetX;
        previousY = offsetY;
        drawImage();
      }
    }
    
  
    // Function to handle the mouse up event
    function handleMouseUp() {
      isDragging = false;
    }
  
    // Clean up event listeners when the component unmounts
    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);
  
  

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    // Your canvas configuration and drawing code goes here
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} width={500} height={500} />
    </div>
  );
}

export default App;
