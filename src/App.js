import './css/main.css';
import {ElijahMissileCommand} from './ElijahMissileCommand/ElijahMissileCommand';
import { Muth } from './TheMuthIsLuth/TheMuthIsLuth';
import {Routes, Route, Link} from 'react-router-dom';



function Writeup() {
  return (
    <div id="explanation">
      <h1 className="writeup">You should pick me for the listener league.</h1>
      <div className="writeup">
        <p>
          Am I great at fantasy football?  No. In fact:
        </p>
        <ul>
          <li>
            I've lost to my two year-old in both years he's played in our family league. 
          </li>
          <li>
            I traded AWAY Cooper Kupp last year for Dalvin Cook in one league.  
          </li>
        </ul> 
        <p>
          Unlucky? Maybe. Foolish?  Absolutely. 
        </p>
        <p>
          You don't want to read a ton of text, so let me just say this: I love fantasy football
          and I love the show.  My wife introduced me to your show a few years ago and I've been 
          a weekly listener ever since. I would love to be a part of the listener league.  Enjoy these
          games I've created for you in exchange for considering me for a spot!!!
        </p>
      </div>
      <nav id="game_buttons">
        <Link className="game_button" id="emc_button" to="/emc"></Link>
        <Link className="game_button" id="muth_button" to="/muth"></Link>
        <Link className="game_button" id="chef_button" to="/muth"></Link>
      </nav>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Writeup />} />
        <Route path="emc" element={<ElijahMissileCommand />} />
        <Route path="muth" element={<Muth />} />
      </Routes>
    </div>
  );
}

export default App;
