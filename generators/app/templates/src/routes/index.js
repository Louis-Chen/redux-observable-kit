import React from 'react';
import { Route } from 'react-router-dom';
import { Home } from '../page/home/containers/home';


const PageRoute = () => (
  <div>
    <Route exact path="/" component={Home} />
  </div>
);
export default PageRoute;
