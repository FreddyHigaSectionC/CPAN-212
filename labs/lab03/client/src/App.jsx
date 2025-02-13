import { useState } from 'react';

const App = () => {
  // what do we need to track
  const [singleFile, setSingleFile] = useState(null);
  const [multipleFiles, setMultipleFiles] = useState([]);
  const [displaySingleImage, setDisplaySingleImage] = useState(null);
  const [displayMultipleImage, setDisplayMultipleImage] = useState(null);
  const [displayDog, setDisplayDog] = useState(null);
  const [message, setMessage] = useState('');

  // Handlers
  const handleSingleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSingleFile(e.target.files[0]);
    }
  };

  const handleMultipleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setMultipleFiles(Array.from(e.target.files));
    }
  };

  // fetch functions -> fetch a random single image
  const fetchSingleFile = async () => {
    try {
      const response = await fetch(`http://localhost:8000/fetch/single`);

      const blob = await response.blob(); // we made a blob - Binary Large Object
      // but thats not an image, so we need to make an image element

      // using createObjectURL
      const imageUrl = URL.createObjectURL(blob);
      setDisplaySingleImage(imageUrl);
    } catch (error) {
      console.error('Error fetching single file:', error);
    }
  };

  // fetch functions -> save single
  const handleSubmitSingleFile = async (e) => {
    e.preventDefault();
    if (!singleFile) {
      setMessage('Please select a file before uploading.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', singleFile);

      const response = await fetch(`http://localhost:8000/save/single`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Image upload failed');
      }
      setMessage('File uploaded successfully!');
    } catch (error) {
      console.log('Error:', error);
    }
  };

  // fetch functions -> save multiple [TODO]
  const handleSubmitMultipleFile = async (e) => {
    e.preventDefault();
    if (multipleFiles.length === 0) {
      setMessage('Please select files before uploading.');
      return;
    }

    try {
      const formData = new FormData();

      multipleFiles.forEach((file) => {
        formData.append('files', file);
      });

      const response = await fetch(`http://localhost:8000/save/multiple`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Images upload failed');
      }

      setMessage('Files have been uploaded');
    } catch (error) {
      console.log('Error', error);
    }
  };

  // fetch functions -> fetch multiple [TODO]
  const fetchMultipleFiles = async (e) => {
    e.preventDefault();

    if (multipleFiles.length === 0) {
      setMessage('Please select files before uploading.');
      return;
    }

    try {
      const formData = new FormData();
      multipleFiles.forEach((file) => formData.append('files', file));

      const response = await fetch('http://localhost:8000/fetch/multiple', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log('Fetched multiple files:', data); // Add this line to log the response

      if (!response.ok) {
        throw new Error(data.error || 'Files fetch failed');
      }

      setDisplayMultipleImage(
        data.map((file) => `http://localhost:8000/fetch/file/${file}`)
      );
    } catch (error) {
      console.error('Error fetching multiple files:', error);
    }
  };

  // fetch functions -> fetch dog image [TODO]

  const fetchDogImage = async () => {
    setMessage('');

    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');

      const data = await response.json();
      const imageUrl = data.message; // Directly use the image URL from the API

      setDisplayDog(imageUrl); // Set the image URL in state

      console.log();
    } catch (error) {
      console.error('Error fetching random dog image:', error);
    }
  };

  // fetch functions -> save dog image [TODO]

  const handleSubmitDogImage = async (e) => {
    e.preventDefault();

    try {
      // Fetch the random dog image
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await response.json();
      const imageUrl = data.message;

      // Download the image as a Blob
      const imageResponse = await fetch(imageUrl);
      const imageBlob = await imageResponse.blob();

      const file = new File([imageBlob], 'dog.jpg', { type: imageBlob.type });

      // Create FormData and append the image file
      const formData = new FormData();
      formData.append('file', file);

      // Upload to the server
      const uploadResponse = await fetch('http://localhost:8000/save/dog', {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadResponse.json();

      if (!uploadResponse.ok) {
        throw new Error(uploadData.error || 'Image upload failed');
      }

      setMessage('File uploaded successfully!');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <p>{message}</p>
      <h2>Fetch Single Random Image</h2>
      <button onClick={fetchSingleFile}>Fetch Single File</button>
      {displaySingleImage && (
        <div>
          <h3>Single File</h3>
          <img
            src={displaySingleImage}
            alt='Display Image'
            style={{ width: '200px', marginTop: '10px' }}
          />
        </div>
      )}
      <form onSubmit={handleSubmitSingleFile}>
        <h2>Upload Single File</h2>
        <input type='file' onChange={handleSingleFileChange} />
        <button type='submit'>Upload Single File</button>
      </form>

      <p>{message}</p>
      <h2>Fetch Multiple Random Image</h2>
      <button onClick={fetchMultipleFiles}>Fetch Multiple Files</button>
      {displayMultipleImage &&
        displayMultipleImage.map((file, index) => (
          <div key={index}>
            <h3>Multiple Files</h3>
            <img
              src={file}
              alt={`Display ${index}`}
              style={{ width: '200px', marginTop: '10px' }}
            />
          </div>
        ))}
      <form onSubmit={handleSubmitMultipleFile}>
        <h2>Upload Multiple Files</h2>
        <input type='file' multiple onChange={handleMultipleFileChange} />
        <button type='submit'>Upload Multiple File</button>
      </form>

      <p>{message}</p>
      <h2>Fetch Random Dog Image</h2>
      <button onClick={fetchDogImage}>Fetch Random Dog Image</button>
      {displayDog && (
        <div>
          <h3>Dog Image</h3>
          <img
            src={displayDog}
            alt='Display Dog'
            style={{ width: '200px', marginTop: '10px' }}
          />
        </div>
      )}

      <div>
        <div>
          <h2>Submit Dog Image</h2>
          <button onClick={handleSubmitDogImage}>Submit Dog Image</button>
        </div>
      </div>
    </div>
  );
};

export default App;
