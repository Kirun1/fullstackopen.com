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
      <button onClick={props.onclick}>{props.text}</button>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header text={'give feedback'} />
      <div style={{ display: 'flex', gap: '10px' }}>
        <Button text={'good'} onclick={() => setGood(good + 1)} />
        <Button text={'neutral'} onclick={() => setNeutral(neutral + 1)} />
        <Button text={'bad'} onclick={() => setBad(bad + 1)} />
      </div>

      <Header text={'statistics'} />
      <Paragraph text={'good'} feeling={good} />
      <Paragraph text={'neutral'} feeling={neutral} />
      <Paragraph text={'bad'} feeling={bad} />
    </div>
  );
};

export default App;
