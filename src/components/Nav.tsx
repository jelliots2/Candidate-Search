import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <ul style={{ listStyleType: 'none', margin: 15, padding: 0 }}>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
      <ul style={{ listStyleType: 'none', margin: 15, padding: 0 }}>
        <li>
        <Link to="/SavedCandidates">Potential Candidates</Link>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
