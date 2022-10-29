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
      <p>
        Última atualização:
        {' '}
        {getCurrentDateTime()}
      </p>
    </div>
  );
}

export default App;
