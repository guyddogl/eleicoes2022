import React from 'react';
import getCurrentDateTime from './utils/date';

function App() {
  return (
    <div>
      <p>
        Última atualização:
        {' '}
        {getCurrentDateTime()}
      </p>
    </div>
  );
}

export default App;
