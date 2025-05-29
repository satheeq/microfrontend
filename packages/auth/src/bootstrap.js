import React from 'react';
import ReactDOM from 'react-dom';
import {createMemoryHistory, createBrowserHistory} from 'history';
import App from './App';

const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath]
    });

    if (onNavigate) {
        history.listen(onNavigate); // Notify the container on navigation changes
    }

    ReactDOM.render(<App history={history}/>, el);
    
    return {
        onParentNavigate: ({ pathname: nextPathName}) => {
            const { pathname } = history.location;

            console.log('<auth> parent navigating to ', nextPathName);

            if (pathname !== nextPathName) {
                history.push(nextPathName);
            }
        }
    }
};

if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#auth-dev-root');

    if (devRoot) {
        mount(devRoot, {defaultHistory: createBrowserHistory()});
    }
}

export {mount};