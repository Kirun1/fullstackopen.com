import React, { useState } from 'react';

const Header = (props) => {
  return (
    <div>
      <h1>{props.text}</h1>
    </div>
  );
};

const Paragraph = (props) => {
  return (
    <div>
      <p>{props.text} {props.feeling}</p>
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
    <Paragraph text={props.text} feeling={props.feeling} />
  );
}

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad;
  const average = all === 0 ? 0 : (props.good - props.bad) / all;
  const positive = all === 0 ? 0 : (props.good / all) * 100;

  return (
    <div>
      <StatisticsLine text={'good'} feeling={props.good} />
      <StatisticsLine text={'neutral'} feeling={props.neutral} />
      <StatisticsLine text={'bad'} feeling={props.bad} />
      <StatisticsLine text={'all'} feeling={all} />
      <StatisticsLine text={'average'} feeling={average} />
      <StatisticsLine text={'positive'} feeling={`${positive}%`} />
    </div>
  );
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;
  const average = all === 0 ? 0 : (good - bad) / all;
  const positive = all === 0 ? 0 : (good / all) * 100;

  return (
    <div>
      <Header text={'give feedback'} />
      <div style={{ display: 'flex', gap: '10px' }}>
        <Button text={'good'} onClick={() => setGood(good + 1)} />
        <Button text={'neutral'} onClick={() => setNeutral(neutral + 1)} />
        <Button text={'bad'} onClick={() => setBad(bad + 1)} />
      </div>

      <Header text={'statistics'} />
      {all === 0 ? <p>No feedback given</p> : <Statistics good={good} neutral={neutral} bad={bad} />}
    </div>
  );
};

export default App;
