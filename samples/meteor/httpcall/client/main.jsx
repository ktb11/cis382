import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from '../imports/ui/App.jsx';

Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});


/* Project created using:

- In top level folder:
    meteor create httpcall
- Change to httpcall folder:
    meteor npm install
    meteor npm install --save react react-dom
    meteor add http
- Transpile and run
    meteor --port $IP:PORT

*/
