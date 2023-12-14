const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <b>Number of exercises {sum}</b>

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part,id) => <Part key={id} part={part}/>)}
    </>
  )
}


const Course = ({course}) => {
  const {id, name, parts} = course
  var totalExercises = course.parts.reduce((total, current) => total + current.exercises, 0)
  return (
    <>
      <Header course={name}/>
      <Content parts={parts}/>
      <Total sum={totalExercises}/>
    </>
  )
}

export default Course
