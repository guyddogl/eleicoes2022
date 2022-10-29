import React, { useState, useEffect } from 'react';
import Title from './components/Title';
import Header from './components/Header';
import PieChart from './components/PieChart';
import Footer from './components/Footer';
import CardCandidates from './components/CardCandidates';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const [loadAPI, setLoadAPI] = useState(true);

  const [dataTSE, setDataTSE] = useState({});

  const [urnasApuradas, setUrnasApuradas] = useState({ width: '0%' });

  const [turno, setTurno] = useState(2);

  useEffect(() => {
    setUrnasApuradas({ width: '0%' });
    setIsLoading(true);
    const URL_1º_TURNO = 'https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/br/br-c0001-e000544-r.json';
    const URL_2º_TURNO = 'https://resultados.tse.jus.br/oficial/ele2022/545/dados-simplificados/br/br-c0001-e000545-r.json';
    const getDataTSE = async () => {
      await fetch(turno === 1 ? URL_1º_TURNO : URL_2º_TURNO)
        .then((response) => response.json())
        .then((data) => {
          setDataTSE(data);
          // setUrnasApuradas({ width: `${Number(data.psa.replace(',', '.'))}%` });
          setTimeout(() => setUrnasApuradas({ width: `${Number(data.psa.replace(',', '.'))}%` }), 500);
        });
      setIsLoading(false);
    };
    getDataTSE();
  }, [loadAPI, turno]);

  const candInfo = {
    lula: {
      color: '#cc2626',
      info: 'PT - 13',
      photo: 'https://resultados.tse.jus.br/oficial/ele2022/545/fotos/br/280001607829.jpeg',
    },
    bolsonaro: {
      color: '#0d6efd',
      info: 'PL - 22',
      photo: 'https://resultados.tse.jus.br/oficial/ele2022/545/fotos/br/280001618036.jpeg',
    },
  };

  const getCandColor = () => {
    const { lula, bolsonaro } = candInfo;
    if (dataTSE.cand[0].nm.toLowerCase() === 'lula') return [lula.color, bolsonaro.color];
    return [bolsonaro.color, lula.color];
  };

  const getCandName = (cand) => {
    if (cand.toLowerCase() === 'lula') return 'Lula';
    return 'Bolsonaro';
  };

  return (
    <div className="container mt-4">
      <Title />
      <Header
        setLoadAPI={setLoadAPI}
        urnasApuradas={urnasApuradas}
        setTurno={setTurno}
        isLoading={isLoading}
        loadAPI={loadAPI}
        turno={turno}
      />
      {!isLoading && (
      <div className="row justify-content-center">
        <div className="col-12 col-lg-7">
          <PieChart dataTSE={dataTSE.cand} getCandColor={getCandColor} getCandName={getCandName} />
        </div>
        <div className="col-12 col-lg-5">
          <CardCandidates dataTSE={dataTSE.cand} candInfo={candInfo} />
        </div>
      </div>
      )}
      <Footer />
    </div>
  );
}

export default App;
