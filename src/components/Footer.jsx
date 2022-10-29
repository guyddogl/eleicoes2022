import React from 'react';
import Author from './Author';

export default function Footer() {
  return (
    <div className="row mt-3">
      <div className="col-12 text-center text-muted" style={{ fontSize: '0.8em' }}>
        <p>
          <Author />
        </p>
        <p>
          A fonte das informações desta página é o Tribunal Superior Eleitoral
        </p>
      </div>
    </div>
  );
}
