import React, { useState, useEffect } from 'react';
import getCurrentDateTime from './utils/date';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const [dataTSE, setDataTSE] = useState({});

  useEffect(() => {
    const URL = 'https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/br/br-c0001-e000544-r.json';
    const getDataTSE = async () => {
      await fetch(URL)
        .then((response) => response.json())
        .then((data) => setDataTSE(data));
      setIsLoading(false);
    };
    getDataTSE();
  }, []);

  console.log(dataTSE);
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      <div className="progress" style={{ height: '40px' }}>
        <div
          className="progress-bar progress-bar-striped progress-bar-animated bg-secondary"
          role="progressbar"
          aria-label="Example with label"
          style={{ width: '25%' }}
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          Urnas apuradas: 25%
        </div>
      </div>
      <p>
        Última atualização:
        {' '}
        {getCurrentDateTime()}
      </p>
    </div>
  );
}

export default App;
