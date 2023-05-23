import React, { useState } from 'react';

function App() {
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedImageIndex, setDraggedImageIndex] = useState(null);
  const [previousPosition, setPreviousPosition] = useState({ x: 0, y: 0 });

  function handleImageUpload(event) {
    const uploadedImages = Array.from(event.target.files);
    const readerPromises = uploadedImages.map((image) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(image);
      });
    });

    Promise.all(readerPromises)
      .then((results) => {
        const newImages = results.map((result) => ({ src: result, position: { x: 0, y: 0 } }));
        setImages((prevImages) => [...prevImages, ...newImages]);
      })
      .catch((error) => {
        console.log('Error uploading images:', error);
      });
  }

  function handleMouseDown(event, index) {
    setIsDragging(true);
    setDraggedImageIndex(index);
    setPreviousPosition({ x: event.clientX, y: event.clientY });
  }

  function handleMouseMove(event) {
    if (isDragging && draggedImageIndex !== null) {
      const dx = event.clientX - previousPosition.x;
      const dy = event.clientY - previousPosition.y;

      setPreviousPosition({ x: event.clientX, y: event.clientY });

      setImages((prevImages) => {
        const updatedImages = [...prevImages];
        const draggedImage = updatedImages[draggedImageIndex];

        if (draggedImage && draggedImage.position) {
          draggedImage.position.x += dx;
          draggedImage.position.y += dy;
        }

        return updatedImages;
      });
    }
  }

  function handleMouseUp() {
    setIsDragging(false);
    setDraggedImageIndex(null);
  }

  return (
    <div>
      <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
      {images.map((image, index) => (
        <img
          key={index}
          src={image.src}
          alt="Uploaded"
          style={{
            position: 'absolute',
            top: image.position.y,
            left: image.position.x,
            cursor: 'move',
          }}
          onMouseDown={(event) => handleMouseDown(event, index)}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />
      ))}
    </div>
  );
}

export default App;
