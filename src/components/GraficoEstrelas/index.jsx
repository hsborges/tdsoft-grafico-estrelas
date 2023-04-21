/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveLine } from '@nivo/line';
/**
 * Componente que representa o gráfico de estrelas.
 * Descrição completa está no README.md.
 *
 * PS: O código abaixo é apenas um esqueleto para vocês implementarem.
 *     Vocês podem (e devem) alterar tudo que quiserem, menos a interface
 *     Além disso, usem dos componentes que forem necessários, para issio importem o pacote junto aos "imports".
 */

const agruparDados = (dados, agrupamento) => {
  let data = [];
  const dadosAgrupados = dados.reduce((acc, dado) => {
    if (agrupamento === 'dia') {
      data = dado.starred_at.toLocaleDateString();
    } else if (agrupamento === 'mes') {
      data = dado.starred_at.toLocaleDateString('pt-BR', { month: 'numeric', year: 'numeric' });
    } else if (agrupamento === 'ano') {
      data = dado.starred_at.toLocaleDateString('pt-BR', { year: 'numeric' });
    }
    // agrupar por ano-semana
    else if (agrupamento === 'semana') {
      const ano = dado.starred_at.getFullYear();
      const dia = dado.starred_at.getDate();
      const mes = dado.starred_at.getMonth();
      data = new Date(ano, mes, dia);
      const diaSemana = data.getDay();
      const primeiroDiaSemana = data.getDate() - diaSemana + (diaSemana === 0 ? -6 : 1);
      const dataInicioSemana = new Date(data.setDate(primeiroDiaSemana));
      const dataFimSemana = new Date(dataInicioSemana);
      dataFimSemana.setDate(dataFimSemana.getDate() + 6);
      data = `${dataInicioSemana.toLocaleDateString('pt-BR', { day: 'numeric', month: 'numeric', year: 'numeric' })}-${dataFimSemana.toLocaleDateString('pt-BR', { day: 'numeric', month: 'numeric', year: 'numeric' })}`;
    }

    if (acc[data]) {
      acc[data] += 1;
    } else {
      acc[data] = 1;
    }
    return acc;
  }, {});

  data = Object.keys(dadosAgrupados).map((key) => ({
    x: key,
    y: dadosAgrupados[key]
  }));

  return [
    {
      id: 'Quantidade de estrelas',
      data
    }
  ];
}

const normalizarDados = (dados, escala) => {


  // Normalizar valores em dados por escala logarítmica ou linear
  dados[0].data.forEach((dado) => {
    if (escala === 'log') {
      dado.y = Math.log(dado.y);
    }
  }
  );

}

const GraficoDeLinhas = ({ data, scale }) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    colors={{ scheme: 'category10' }}
    sliceTooltip={({ slice }) => {
      return (
        <div className="tooltip">
          {slice.points.map((point) => (
            <div
              key={point.id}
              style={{
                fontFamily: 'sans-serif',
                color: 'black',
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '10px'
              }}
            >
              <strong>{point.serieId}</strong><br />
              Data: {point.data.xFormatted}
              <br />
              Total de estrela: {point.data.yFormatted}
            </div>
          ))}

        </div>)
    }}
    yScale={{
      type: 'linear',
      min: 'auto',
      max: 'auto',
      stacked: false,
      reverse: false
    }}
    yFormat=" >-.2f"
    axisTop={null}
    lineWidth={3}
    axisRight={null}
    axisBottom={{
      tickValues: [data[0].data[0].x, data[0].data[data[0].data.length - 1].x],
      spaceBetween: 10,
      orient: 'bottom',
    }}
    enablePointLabel={true}
    enableGridX={false}
    enableGridY={true}
    axisLeft={{
      orient: 'left',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'count',
      legendOffset: -40,
      legendPosition: 'middle'
    }}
    pointSize={10}
    pointColor={{ theme: 'background' }}
    pointBorderWidth={1}
    pointBorderColor={{ from: 'serieColor' }}
    pointLabelYOffset={-12}
    enableCrosshair={true}
    crosshairType={'x'}
    useMesh={true}
  />
)

export function GraficoEstrelas(props) {
  const dadosAgrupados = agruparDados(props.estrelas, props.agrupamento);
  const dadosNormalizados = normalizarDados(dadosAgrupados, props.escala);
  return (
    <div style={{ width: '80vw', height: '50vh' }}>
      <GraficoDeLinhas data={dadosAgrupados} scale={props.escala} />
    </div>
  );
}

const normalizarDados = (dados, escala) => {
  dados[0].data.forEach((dado) => {
    if (escala === 'log') {
      dado.y = Math.log(dado.y);
    }
  }
  );
  return dados;
}

const GraficoDeLinhas = ({ data }) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    colors={{ scheme: 'category10' }}
    sliceTooltip={({ slice }) => {
      return (
        <div className="tooltip">
          {slice.points.map((point) => (
            <div
              key={point.id}
              style={{
                fontFamily: 'sans-serif',
                color: 'black',
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '10px'
              }}
            >
              <strong>{point.serieId}</strong><br />
              Data: {point.data.xFormatted}
              <br />
              Total de estrela: {point.data.yFormatted}
            </div>
          ))}

        </div>)
    }}
    yScale={{
      type: 'linear',
      min: 'auto',
      max: 'auto',
      stacked: false,
      reverse: false
    }}
    yFormat=" >-.2f"
    axisTop={null}
    lineWidth={3}
    axisRight={null}
    axisBottom={{
      tickValues: [data[0].data[0].x, data[0].data[data[0].data.length - 1].x],
      spaceBetween: 10,
      orient: 'bottom',
    }}
    enablePointLabel={true}
    enableGridX={false}
    enableGridY={true}
    axisLeft={{
      orient: 'left',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'count',
      legendOffset: -40,
      legendPosition: 'middle'
    }}
    pointSize={10}
    pointColor={{ theme: 'background' }}
    pointBorderWidth={1}
    pointBorderColor={{ from: 'serieColor' }}
    pointLabelYOffset={-12}
    enableCrosshair={true}
    crosshairType={'x'}
    useMesh={true}
  />
)

export function GraficoEstrelas(props) {
  const dadosAgrupados = agruparDados(props.estrelas, props.agrupamento);
  const dadosNormalizados = normalizarDados(dadosAgrupados, props.escala);
  return (
    <div style={{ width: '80vw', height: '50vh' }}>
      <GraficoDeLinhas data={dadosNormalizados} scale={props.escala} />
    </div>
  );
}


// Definição dos tipos das propriedades recebidas.

GraficoEstrelas.propTypes = {
  estrelas: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.string.isRequired,
      starred_at: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
  agrupamento: PropTypes.oneOf(['dia', 'semana', 'mes', 'ano']),
  escala: PropTypes.oneOf(['linear', 'log']),
};

GraficoDeLinhas.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      color: PropTypes.string,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          x: PropTypes.string,
          y: PropTypes.number,
        })
      ),
    })
  ),
  scale: PropTypes.oneOf(['linear', 'log']),
};

// Definição dos valores padrão das propriedades.
GraficoEstrelas.defaultProps = {
  agrupamento: 'dia',
  escala: 'linear',
};
