import React, { useState } from 'react';

const Header = (props) => {
  return (
    <div>
      <h1>{props.text}</h1>
    </div>
  );
};

const Button = (props) => {
  return (
    <div>
      <button onClick={props.onClick}>{props.text}</button>
    </div>
  );
};

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.feeling}</td>
    </tr>
  );
}

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad;
  const average = all === 0 ? 0 : (props.good - props.bad) / all;
  const positive = all === 0 ? 0 : (props.good / all) * 100;

  return (
    <div>
      {all === 0 ? <p>No feedback given</p> :
        <table>
          <tbody>
            <StatisticsLine text={'good'} feeling={props.good} />
            <StatisticsLine text={'neutral'} feeling={props.neutral} />
            <StatisticsLine text={'bad'} feeling={props.bad} />
            <StatisticsLine text={'all'} feeling={all} />
            <StatisticsLine text={'average'} feeling={average} />
            <StatisticsLine text={'positive'} feeling={positive + ' %'} />
          </tbody>
        </table>
      }
    </div>
  );
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header text={'give feedback'} />
      <div style={{ display: 'flex', gap: '10px' }}>
        <Button text={'good'} onClick={() => setGood(good + 1)} />
        <Button text={'neutral'} onClick={() => setNeutral(neutral + 1)} />
        <Button text={'bad'} onClick={() => setBad(bad + 1)} />
      </div>

      <Header text={'statistics'} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
