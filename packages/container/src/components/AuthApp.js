import {mount} from 'auth/AuthApp';
import React, {useEffect, useRef} from 'react';
import { useHistory } from 'react-router-dom';

export default ({onSignIn}) => {
    const ref = useRef(null);
    const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
        initialPath: history.location.pathname,
        onNavigate: ({pathname: nextPathName}) => {
            const { pathname } = history.location;

            if (pathname !== nextPathName) {
                console.log('auth app navigating', nextPathName);
                history.push(nextPathName);
            }
        },
        onSignIn
    });

    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
};