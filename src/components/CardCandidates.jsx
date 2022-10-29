import React from 'react';
import PropTypes from 'prop-types';

export default function CardCandidates(props) {
  const { dataTSE, candInfo } = props;

  return (
    <>
      {dataTSE.map((candidato, index) => (
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
    </>
  );
}

CardCandidates.propTypes = {
  dataTSE: PropTypes.arrayOf(PropTypes.shape().isRequired).isRequired,
  candInfo: PropTypes.objectOf(PropTypes.shape().isRequired).isRequired,
};
