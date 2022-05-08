import './css/main.css';
import {ElijahMissileCommand} from './ElijahMissileCommand';
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
        <Link id="emc_button" to="/emc"></Link>
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
      </Routes>
    </div>
  );
}

export default App;
