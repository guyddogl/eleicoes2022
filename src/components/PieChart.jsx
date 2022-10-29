import React from 'react';
import PropTypes from 'prop-types';
import ApexChart from 'react-apexcharts';

export default function PieChart(props) {
  const { dataTSE, getCandColor, getCandName } = props;

  const options = {
    labels: dataTSE.length > 0
    && [getCandName(dataTSE[0].nm), getCandName(dataTSE[1].nm)],
    colors: dataTSE.length > 0 && getCandColor(),
  };

  const series = dataTSE.length > 0 && [
    Number(dataTSE[0].pvap.replace(',', '.')),
    Number(dataTSE[1].pvap.replace(',', '.')),
  ];

  return (
    <ApexChart
      options={options}
      series={series}
      width="400px"
      type="pie"
    />
  );
}

PieChart.propTypes = {
  dataTSE: PropTypes.arrayOf(PropTypes.shape().isRequired).isRequired,
  getCandColor: PropTypes.func.isRequired,
  getCandName: PropTypes.func.isRequired,
};
