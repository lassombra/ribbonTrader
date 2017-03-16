import Profile from './profile';
import Router from 'application/router';
import React from 'react';

Router.setHandler('/profile', () => <Profile />, 'userProfile');