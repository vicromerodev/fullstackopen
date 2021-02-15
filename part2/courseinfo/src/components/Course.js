const Header = ({ name }) => <h1>{name}</h1>;

const Content = ({ parts }) =>
  parts.map((part) => (
    <p key={part.id}>
      {part.name} {part.exercises}
    </p>
  ));

const Total = ({ parts }) => {
  const total = parts.reduce((acc, obj) => acc + obj.exercises, 0);
  return (
    <p>
      <strong>Number of exercises {total}</strong>
    </p>
  );
};

export const Course = ({ course }) => (
  <>
    <Header name={course.name} id={course.id} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>
);
