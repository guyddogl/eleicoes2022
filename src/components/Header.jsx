import React from 'react';
import PropTypes from 'prop-types';
import getCurrentDateTime from '../utils/date';

export default function Header(props) {
  const {
    setLoadAPI, urnasApuradas, setTurno, isLoading, loadAPI, turno,
  } = props;

  return (
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
  );
}

Header.propTypes = {
  setLoadAPI: PropTypes.func.isRequired,
  urnasApuradas: PropTypes.objectOf(PropTypes.string).isRequired,
  setTurno: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  loadAPI: PropTypes.bool.isRequired,
  turno: PropTypes.number.isRequired,
};
