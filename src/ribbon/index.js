import React from 'react';
import Display from './display';
import Edit from './edit';
import Router from 'application/router';

Router.setHandler('/ribbon/:id', ({id}) => <Display id={id} />, 'displayRibbon');
Router.setHandler('/ribbon/edit/:id', ({id}) => <Edit id={id != 'new' ? id : undefined} />, 'editRibbon');