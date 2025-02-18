import { useState } from 'react';
import './App.css';

const App = () => {
  // what do we need to track
  const [singleFile, setSingleFile] = useState(null);
  const [multipleFiles, setMultipleFiles] = useState([]);
  const [displaySingleImage, setDisplaySingleImage] = useState(null);
  const [displayMultipleImage, setDisplayMultipleImage] = useState([]);
  const [displayDogImage, setDisplayDogImage] = useState('');
  const [message, setMessage] = useState('');

  // Handlers
  const handleSingleFileChange = (e) => {
    setMessage('');
    if (e.target.files.length > 0) {
      setSingleFile(e.target.files[0]);
    }
  };

  const handleMultipleFileChange = (e) => {
    setMessage('');
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
  const fetchMultipleFiles = async () => {
    try {
      // fetch -/fetch/multiple => [01, 02, 03]
      const response = await fetch('http://localhost:8000/fetch/multiple');
      const data = await response.json();
      console.log(data);
      // fetch -/fetch/file/filename variable
      const filePromises = data.map(async (filename) => {
        const fileResponse = await fetch(
          `http://localhost:8000/fetch/file/${filename}`
        );

        const fileBlob = await fileResponse.blob();
        console.log(fileBlob);
        const imageUrl = URL.createObjectURL(fileBlob);
        return imageUrl;
      });

      const imageUrls = await Promise.all(filePromises);
      setDisplayMultipleImage(imageUrls);
    } catch (error) {
      console.error(error);
    }
  };

  // fetch functions -> fetch dog image [TODO]
  const fetchDogImage = async () => {
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await response.json();
      setDisplayDogImage(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  // fetch functions -> save dog image [TODO]
  const saveDogImage = async () => {
    try {
      const fileResponse = await fetch(displayDogImage);
      const blob = await fileResponse.blob();

      const formData = new FormData();
      formData.append('file', blob, 'dog-image.jpg');

      // <button onCLick={saveDogImage}> Save it </button>

      const response = await fetch(`http://localhost:8000/save/single`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='container'>
      <p className='message'>{message}</p>
      <div className='fetchContainer'>
        <h2>Fetch Single Random Image</h2>
        <button onClick={fetchSingleFile}>Fetch Single File</button>
        {displaySingleImage && (
          <div>
            <h3>Single File</h3>
            <img
              className='image'
              src={displaySingleImage}
              alt='Display Image'
              style={{ width: '200px', marginTop: '10px' }}
            />
          </div>
        )}
      </div>
      <div className='fetchContainer'>
        <div className='subContainer'>
          <form onSubmit={handleSubmitSingleFile}>
            <h2>Upload Single File</h2>
            <input type='file' onChange={handleSingleFileChange} />
            <button type='submit'>Upload Single File</button>
          </form>
          <form onSubmit={handleSubmitMultipleFile}>
            <h2>Upload Multiple Files</h2>
            <input type='file' multiple onChange={handleMultipleFileChange} />
            <button type='submit'>Upload Multiple Files</button>
          </form>
        </div>
      </div>
      <div className='fetchContainer'>
        <h2>Fetch Multiple Random Image</h2>
        <button onClick={fetchMultipleFiles}>Fetch Multiple Files</button>
        {displayMultipleImage.length > 0 ? (
          <div className='image-container'>
            {displayMultipleImage.map((imageUrl, index) => (
              <div key={index} className='image-grid'>
                <img
                  className='image'
                  src={imageUrl}
                  style={{ width: '200px', marginTop: '10px' }}
                />
              </div>
            ))}
          </div>
        ) : (
          <p>No images to display</p>
        )}
      </div>
      <div className='fetchContainer'>
        <h2>Fetch Dog Image</h2>
        <button onClick={fetchDogImage}>Fetch Dog Image</button>
        {displayDogImage && (
          <div className='subContainer'>
            <img
              className='image'
              src={displayDogImage}
              style={{ width: '200px', marginTop: '10px' }}
            />
            <button onClick={saveDogImage}> Save it </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
