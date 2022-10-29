import React, { useState, useEffect } from 'react';
import ApexChart from 'react-apexcharts';
import getCurrentDateTime from './utils/date';

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

  const options = {
    labels: Object.keys(dataTSE).length > 0
    && [getCandName(dataTSE.cand[0].nm), getCandName(dataTSE.cand[1].nm)],
    colors: Object.keys(dataTSE).length > 0 && getCandColor(),
  };

  const series = Object.keys(dataTSE).length > 0 && [
    Number(dataTSE.cand[0].pvap.replace(',', '.')),
    Number(dataTSE.cand[1].pvap.replace(',', '.')),
  ];

  return (
    <div className="container mt-4">
      <h6 className="text-center">Eleições 2022</h6>
      <h3 className="text-center">Eleição para Presidente - BR</h3>
      <div className="border p-3 rounded-3 my-4">
        <span className="d-block">
          Resultados em tempo real
        </span>
        <span className="d-block text-muted" style={{ fontSize: '0.8em' }}>
          Última atualização:
          {' '}
          {getCurrentDateTime()}
        </span>
        <div className="progress my-3" style={{ height: '40px' }}>
          <div
            className="progress-bar progress-bar-striped progress-bar-animated bg-secondary progress-bar-text"
            role="progressbar"
            style={isLoading ? ({ width: '0%' }) : urnasApuradas}
          >
            Apuração:
            {' '}
            {urnasApuradas.width}
          </div>
        </div>
        <div className="row justify-content-around align-items-center">
          <div className="col-6">
            <button
              type="button"
              className={`btn btn-sm btn-${turno === 2 ? 'outline-secondary' : 'secondary'} ${isLoading && 'disabled'} me-2`}
              onClick={() => setTurno(1)}
            >
              1º Turno
            </button>
            <button
              type="button"
              className={`btn btn-sm btn-${turno === 2 ? 'secondary' : 'outline-secondary'} ${isLoading && 'disabled'}`}
              onClick={() => setTurno(2)}
            >
              2º Turno
            </button>
          </div>
          <div className="col-6 text-end">
            {isLoading
              ? (
                <button
                  type="button"
                  className="btn btn-md btn-secondary disabled"
                  style={{ width: '135px' }}
                  onClick={() => setLoadAPI(!loadAPI)}
                >
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                  Atualizando
                </button>
              )
              : (
                <button
                  type="button"
                  className="btn btn-md btn-secondary"
                  style={{ width: '135px' }}
                  onClick={() => setLoadAPI(!loadAPI)}
                >
                  <i className="fa-solid fa-rotate-right me-2" />
                  Atualizar
                </button>
              )}
          </div>
        </div>
      </div>
      {!isLoading && (
      <div className="row justify-content-center">
        <div className="col-12 col-lg-7">
          <ApexChart
            options={options}
            series={series}
            width="400px"
            type="pie"
          />
        </div>
        <div className="col-12 col-lg-5">
          {dataTSE.cand.map((candidato, index) => (
            index < 2 && (
            <div key={candidato.nm} className="px-3 py-2">
              {candidato.nm.toLowerCase() === 'lula' ? (
                <div className="row border rounded-3 p-2 justify-content-center align-items-center">
                  <div className="col-3">
                    <img src={candInfo.lula.photo} alt={candidato.nm} className="img-fluid border border-danger photo-candidato" />
                  </div>
                  <div className="col-4">
                    <span className="d-block">Lula</span>
                    <span className="d-block text-muted">{candInfo.lula.info}</span>
                  </div>
                  <div className="col-5 text-end">
                    <span className="d-block">
                      {candidato.pvap.replace(',', '.')}
                      %
                    </span>
                    <div className="progress my-1" style={{ height: '2px' }}>
                      <div
                        className="progress-bar bg-danger"
                        style={{ width: `${candidato.pvap.replace(',', '.')}%` }}
                        role="progressbar"
                        aria-label="Basic example"
                        aria-valuenow="75"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      />
                    </div>
                    <span className="d-block text-muted" style={{ fontSize: '0.8em' }}>
                      {candidato.vap}
                      {' '}
                      votos
                    </span>
                  </div>
                </div>
              ) : (
                <div className="row border rounded-3 p-2 justify-content-center align-items-center">
                  <div className="col-3">
                    <img src={candInfo.bolsonaro.photo} alt={candidato.nm} className="img-fluid border border-primary photo-candidato" />
                  </div>
                  <div className="col-4">
                    <span className="d-block">Bolsonaro</span>
                    <span className="d-block text-muted">{candInfo.bolsonaro.info}</span>
                  </div>
                  <div className="col-5 text-end">
                    <span className="d-block">
                      {candidato.pvap.replace(',', '.')}
                      %
                    </span>
                    <div className="progress my-1" style={{ height: '2px' }}>
                      <div
                        className="progress-bar bg-primary"
                        style={{ width: `${candidato.pvap.replace(',', '.')}%` }}
                        role="progressbar"
                        aria-label="Basic example"
                        aria-valuenow="75"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      />
                    </div>
                    <span className="d-block text-muted" style={{ fontSize: '0.8em' }}>
                      {candidato.vap}
                      {' '}
                      votos
                    </span>
                  </div>
                </div>
              )}
            </div>
            )
          ))}
        </div>
      </div>
      )}
      <div className="row mt-3">
        <div className="col-12 text-center text-muted" style={{ fontSize: '0.8em' }}>
          <p>
            <a href="https://linkedin.com/in/guyddogl" target="_blank" className="link-dark" style={{ textDecoration: 'none' }} rel="noreferrer">
              &lt;
              {' '}
              <i className="fa-brands fa-linkedin" />
              {' '}
              guyddogl &frasl; &gt;
            </a>
          </p>
          <p>
            A fonte das informações desta página é o Tribunal Superior Eleitoral
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
