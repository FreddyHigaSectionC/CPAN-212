import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [selectedSection, setSelectedSection] = useState('overview');
  const [overview, setOverview] = useState([]);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [relevantExperience, setRelevantExperience] = useState([]);
  const [skill, setSkill] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [honor, setHonor] = useState([]);
  const [displaySingleImage, setDisplaySingleImage] = useState(null);
  const [displayImage, setDisplayImage] = useState(null);
  const [displayBackground, setDisplayBackground] = useState(null);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [displaySkillImages, setDisplaySkillImages] = useState([]);
  const [displayHonorImages, setDisplayHonorImages] = useState([]);

  useEffect(() => {
    fetchMultipleFiles('skill', setDisplaySkillImages);
    fetchMultipleFiles('honor', setDisplayHonorImages);
    fetchSingleFile('humber.jpg', setDisplayImage);
    fetchSingleFile('profile.png', setDisplaySingleImage);
    fetchSingleFile('background.jpg', setDisplayBackground);
    fetchEducation();
    fetchExperience();
    fetchRelevantExperience();
    fetchOverview();
    fetchSkill();
    fetchHobbies();
    fetchHonor();
  }, []);

  const fetchSingleFile = async (filename, setImageState) => {
    try {
      const response = await fetch(
        `http://localhost:8000/fetch/single/${filename}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch background image');
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);

      setImageState(imageUrl);
    } catch (error) {
      console.error('Error fetching background image:', error);
    }
  };

  const fetchMultipleFiles = async (category, setImageState) => {
    try {
      const response = await fetch(
        `http://localhost:8000/fetch/multiple/${category}`
      );
      const filenames = await response.json();

      console.log(`Fetched filenames for ${category}:`, filenames);

      const imageUrls = filenames.map(
        (filename) => `http://localhost:8000/uploads/${category}/${filename}`
      );

      setImageState(imageUrls);
    } catch (error) {
      console.error(`Error fetching images for ${category}:`, error);
    }
  };

  const fetchEducation = async () => {
    try {
      const response = await fetch(`http://localhost:8000/getEdu`);
      const data = await response.json();
      setEducation(data);
    } catch (error) {
      console.error('Error fetching education data:', error);
    }
  };

  const fetchExperience = async () => {
    try {
      const response = await fetch(`http://localhost:8000/getExp`);
      const data = await response.json();
      setExperience(data);
    } catch (error) {
      console.error('Error fetching experience data:', error);
    }
  };

  const fetchRelevantExperience = async () => {
    try {
      const response = await fetch(`http://localhost:8000/getRelevantExp`);
      const data = await response.json();
      setRelevantExperience(data);
    } catch (error) {
      console.error('Error fetching relevant experience data:', error);
    }
  };

  const fetchOverview = async () => {
    try {
      const response = await fetch(`http://localhost:8000/getOverview`);
      const data = await response.json();
      console.log('Fetched Overview:', data);
      setOverview(data.overview);
    } catch (error) {
      console.error('Error fetching overview data:', error);
    }
  };

  const fetchSkill = async () => {
    try {
      const response = await fetch(`http://localhost:8000/getSkill`);
      const data = await response.json();
      console.log('Fetched Skill:', data);
      setSkill(data);
    } catch (error) {
      console.error('Error fetching skill data:', error);
    }
  };

  const fetchHobbies = async () => {
    try {
      const response = await fetch(`http://localhost:8000/getHobbies`);
      const data = await response.json();
      console.log('Fetched Hobbies:', data);
      setHobbies(data);
    } catch (error) {
      console.error('Error fetching skill data:', error);
    }
  };

  const fetchHonor = async () => {
    try {
      const response = await fetch(`http://localhost:8000/getHonor`);
      const data = await response.json();
      console.log('Fetched Honor:', data);
      setHonor(data);
    } catch (error) {
      console.error('Error fetching honor data:', error);
    }
  };

  const handleLinkedin = () => {
    window.open(
      'https://www.linkedin.com/in/freddyhiga/',
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleGithub = () => {
    window.open(
      'https://github.com/FreddyHigaSectionC',
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div
      className='container'
      style={{
        backgroundImage: `url(${displayBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
        transition: 'background 0.8s ease-in-out',
      }}
    >
      <div className='contentContainer'>
        <div className='imageContainer'>
          {displaySingleImage ? (
            <img
              src={displaySingleImage}
              alt='Profile'
              style={{ marginTop: '10px' }}
              className={`profile-image ${profileLoaded ? 'loaded' : ''}`}
              onLoad={() => setProfileLoaded(true)}
            />
          ) : (
            <p>Loading image...</p>
          )}
        </div>

        <div className='resumeContainer'>
          <h1 className='spacer'>My Online Resume</h1>

          <div className='buttonContainer spacer'>
            <button
              className={selectedSection === 'overview' ? 'active' : ''}
              onClick={() => setSelectedSection('overview')}
            >
              Overview
            </button>
            <button
              className={selectedSection === 'education' ? 'active' : ''}
              onClick={() => setSelectedSection('education')}
            >
              Education
            </button>
            <button
              className={selectedSection === 'experience' ? 'active' : ''}
              onClick={() => setSelectedSection('experience')}
            >
              Experience
            </button>
            <button
              className={selectedSection === 'skills' ? 'active' : ''}
              onClick={() => setSelectedSection('skills')}
            >
              Skills
            </button>
            <button
              className={selectedSection === 'hobbies' ? 'active' : ''}
              onClick={() => setSelectedSection('hobbies')}
            >
              Hobbies
            </button>
            <button
              className={selectedSection === 'honor' ? 'active' : ''}
              onClick={() => setSelectedSection('honor')}
            >
              Honor & awards
            </button>
          </div>

          {/* {selectedSection === 'overview' && (
            <>
              <h2>Overview</h2>
              <p className='overviewText'>{overview}</p>
            </>
          )} */}

          {selectedSection === 'overview' && (
            <>
              <h2>Overview</h2>
              {overview.map((over, index) => (
                <p className='overviewText' key={index}>
                  {over}
                </p>
              ))}
            </>
          )}

          {selectedSection === 'education' && (
            <>
              <h2>Education</h2>
              <div>
                {displayImage ? (
                  <img
                    src={displayImage}
                    alt='Humber College'
                    style={{
                      width: 'auto',
                      height: '380px',
                      borderRadius: '10px',
                      marginBottom: '5px',
                    }}
                  />
                ) : (
                  <p>Loading image...</p>
                )}
              </div>

              <ul>
                {education.map((edu, index) => (
                  <li key={index}>
                    {edu.school} | {edu.degree} | ({edu.year})
                  </li>
                ))}
              </ul>
            </>
          )}

          {selectedSection === 'experience' && (
            <>
              <h2>Experience</h2>
              {experience.map((exp, index) => (
                <p key={index}>
                  <span style={{ fontWeight: 'bold', color: '#a8c0ff' }}>
                    {exp.company} - {exp.role} ({exp.year})
                  </span>
                </p>
              ))}

              <ul>
                {relevantExperience.map((relexp, index) => (
                  <li key={index}>{relexp}</li>
                ))}
              </ul>
            </>
          )}

          {selectedSection === 'skills' && (
            <>
              <h2>Skills</h2>

              <div className='imageRow'>
                {displaySkillImages.length > 0 ? (
                  displaySkillImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Skill ${index}`}
                      className='fetched-image'
                    />
                  ))
                ) : (
                  <p>Loading images...</p>
                )}
              </div>

              <ul>
                {skill
                  .filter((sk) => sk.technicalSkill)
                  .map((sk, index) => (
                    <li key={index}>
                      <span style={{ fontWeight: 'bold', color: '#a8c0ff' }}>
                        Technical Skills:{' '}
                      </span>
                      {sk.technicalSkill}
                    </li>
                  ))}
              </ul>

              <ul>
                {skill
                  .filter((sk) => sk.softSkill)
                  .map((sk, index) => (
                    <li key={index}>
                      <span style={{ fontWeight: 'bold', color: '#a8c0ff' }}>
                        Soft Skills:{' '}
                      </span>
                      {sk.softSkill}
                    </li>
                  ))}
              </ul>
            </>
          )}

          {selectedSection === 'hobbies' && (
            <>
              <h2>Hobbies</h2>
              <ul>
                {hobbies.map((hobby, index) => (
                  <li key={index}>{hobby}</li>
                ))}
              </ul>
            </>
          )}

          {selectedSection === 'honor' && (
            <>
              <h2>Honor & Awards</h2>

              <div className='honorRow'>
                {displayHonorImages.length > 0 ? (
                  displayHonorImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Honor ${index}`}
                      className='fetched-honorImage'
                    />
                  ))
                ) : (
                  <p>Loading images...</p>
                )}
              </div>

              <ul style={{ display: 'flex', gap: '65px' }}>
                {honor.map((honor, index) => (
                  <li key={index}>{honor}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
      <div className='linkContainer'>
        <p>Visit: </p>
        <button onClick={handleLinkedin}>LinkedIn</button>
        <button onClick={handleGithub}>GitHub</button>
      </div>
    </div>
  );
}

export default App;
