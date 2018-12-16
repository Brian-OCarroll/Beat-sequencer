import React from 'react';
import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom';

//STILL NEED TO ADD PATHS
//MAKE THE SAVED BEATS PAGE DYNAMIC. ONLY AVAILABLE AFTER SIGNIN
//REFER TO
// https://stackoverflow.com/questions/34607841/react-router-nav-bar-example
export default function TopNav(props) {
  return (
      <Router>
          <nav>
                <ul className="clearfix">
                    <li>
                        {/* {insert pathnames} */}
                        <Link aria-label className="homePage" to="/homepage path">Home</Link>
                    </li>
                    <li>
                        <Link aria-label="makeBeats" className="beatsPage" to="/beats page path">Create</Link>
                    </li>
                    <li>
                    <Link aria-label="SavedBeats" className="savedBeats" to="/saved beats page path">Create</Link>
                    </li>
                </ul>
            </nav>
      </Router> 
  );
}