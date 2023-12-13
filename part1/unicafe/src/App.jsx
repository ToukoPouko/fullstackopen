import { useState } from 'react'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const Header = ({text}) => <h1>{text}</h1>

const StatisticLine = ({text, value}) => {
  let secondCell = <td>{value}</td>
  if (text == "Positive") {
    secondCell = <td>{value} %</td>
  }
  return (
      <tr>
        <td>{text}</td>
        {secondCell}
      </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad

  if (total <= 0) {
    return (
      <div>
        <Header text="Statistics"/>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <Header text="Statistics"/>
      <table>
        <tbody>
        <StatisticLine text="Good" value={good}/>
        <StatisticLine text="Neutral" value={neutral}/>
        <StatisticLine text="Bad" value={bad}/>
        <StatisticLine text="Total" value={total}/>
        <StatisticLine text="Average" value={(1 * good + -1 * bad) / total}/>
        <StatisticLine text="Positive" value={good / total * 100}/>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
  }

  const reviews = new Array(3)
  reviews.concat(good)
  reviews.concat(neutral)
  reviews.concat(bad)

  return (
    <div>
      <Header text="Give Feedback"/>
      <Button handleClick={() => handleGoodClick()} text="good"/>
      <Button handleClick={() => handleNeutralClick()} text="neutral"/>
      <Button handleClick={() => handleBadClick()} text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
