import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';
import { useNavigate } from 'react-router-dom'; // for navigation

const CandidateSearch: React.FC = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const navigate = useNavigate(); // React Router hook for navigation

  useEffect(() => {
    fetchCandidate();
  }, []);

  const fetchCandidate = async () => {
    const candidates = await searchGithub();
    if (candidates.length > 0) {
      const username = candidates[0].login;
      const detailedCandidate = await searchGithubUser(username);
      setCandidate(detailedCandidate);
    }
  };

  const saveCandidate = () => {
    if (candidate) {
      const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      const updatedCandidates = [...savedCandidates, candidate];
      localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
      fetchCandidate();
    }
  };

  const skipCandidate = () => {
    fetchCandidate();
  };


  return (
    <div className="candidate-search-container">
      <h1>Candidate Search</h1>
      {candidate ? (
        <div className="candidate-card">
          <div className="candidate-image">
            <img src={candidate.avatar_url} alt={candidate.name} />
          </div>
          <div className="candidate-details">
            <h2>{candidate.name}</h2>
            <p>Username: {candidate.login}</p>
            <p>Location: {candidate.location}</p>
            <p>Email: {candidate.email}</p>
            <p>Company: {candidate.company}</p>
            <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
              View Profile
            </a>
          </div>
          <div className="card-buttons">
            <button className="save-btn" onClick={saveCandidate}>Save</button>
            <button className="skip-btn" onClick={skipCandidate}>Skip</button>
          </div>
        </div>
      ) : (
        <p>No more candidates available</p>
      )}
    </div>
  );
};


export default CandidateSearch;
