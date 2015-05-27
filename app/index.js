import React from 'react';
import Router from 'react-router'
import Dispatcher from './Dispatcher'
import routes from './routes'

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.getElementById('root'));
});
