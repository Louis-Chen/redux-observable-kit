import React from 'react';
import { Link } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';

import PagesRouter from './routes';

const App = () => {
  return (
    <div>
      <header>
        <Link to="/">Home</Link>
        <Link to="/about-us">About</Link>
      </header>
      <main>
        <PagesRouter />
      </main>
    </div>
  );
};

export default App;
