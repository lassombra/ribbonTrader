import Home from './home';
import React from 'react';

import Router from 'application/router';
Router.setHandler('/', () => <Home />, 'home');