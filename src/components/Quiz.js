import React, { useState , useEffect } from 'react';
import './Quiz.css'; // Ensure you have styling for the quiz and result page
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// Full question data for each category
const questionsData = {
  'GK Social': [
    { question: 'What is the capital of France?', options: ['Paris', 'Rome', 'Berlin', 'Madrid'], answer: 'Paris', type: 'single' },
    { question: 'Who wrote "To Kill a Mockingbird"?', options: ['Harper Lee', 'J.K. Rowling', 'Mark Twain', 'Ernest Hemingway'], answer: 'Harper Lee', type: 'single' },
    { question: 'Which country is known as the Land of the Rising Sun?', options: ['China', 'Japan', 'South Korea', 'Thailand'], answer: 'Japan', type: 'single' },
    { question: 'Which of the following are primary colors?', options: ['Red', 'Blue', 'Green', 'Yellow'], answer: ['Red', 'Blue', 'Yellow'], type: 'multiple' },
    { question: 'Is the Great Wall of China visible from space?', options: ['True', 'False'], answer: 'False', type: 'single' },
    { question: 'Who is known as the father of modern physics?', options: ['Isaac Newton', 'Albert Einstein', 'Galileo Galilei', 'Niels Bohr'], answer: 'Albert Einstein', type: 'single' },
    { question: 'Which famous playwright wrote "Romeo and Juliet"?', options: ['William Shakespeare', 'Christopher Marlowe', 'Ben Jonson', 'George Bernard Shaw'], answer: 'William Shakespeare', type: 'single' },
    { question: 'What is the largest mammal in the world?', options: ['Elephant', 'Blue Whale', 'Giraffe', 'Shark'], answer: 'Blue Whale', type: 'single' },
    { question: 'Which of the following is a programming language?', options: ['Python', 'HTML', 'CSS', 'SQL'], answer: 'Python', type: 'single' },
    { question: 'Which planet is closest to the Sun?', options: ['Venus', 'Mars', 'Mercury', 'Earth'], answer: 'Mercury', type: 'single' },
  ],
  'GK Geography': [
    { question: 'Which is the largest continent by area?', options: ['Africa', 'Asia', 'Europe', 'North America'], answer: 'Asia', type: 'single' },
    { question: 'What is the longest river in the world?', options: ['Amazon', 'Nile', 'Yangtze', 'Mississippi'], answer: 'Nile', type: 'single' },
    { question: 'Which country has the most volcanoes?', options: ['United States', 'Indonesia', 'Japan', 'Iceland'], answer: 'Indonesia', type: 'single' },
    { question: 'Which of these is a desert?', options: ['Sahara', 'Amazon Rainforest', 'Great Lakes', 'Rocky Mountains'], answer: 'Sahara', type: 'single' },
    { question: 'The city of Istanbul is located in which two continents?', options: ['Europe and Asia', 'Europe and Africa', 'Asia and Africa', 'Europe and Australia'], answer: 'Europe and Asia', type: 'single' },
    { question: 'Which ocean is the largest?', options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'], answer: 'Pacific Ocean', type: 'single' },
    { question: 'Mount Everest is located in which mountain range?', options: ['Himalayas', 'Alps', 'Rockies', 'Andes'], answer: 'Himalayas', type: 'single' },
    { question: 'What is the smallest country in the world?', options: ['Monaco', 'Vatican City', 'San Marino', 'Liechtenstein'], answer: 'Vatican City', type: 'single' },
    { question: 'Which country is known as the "Land of the Midnight Sun"?', options: ['Sweden', 'Norway', 'Finland', 'Denmark'], answer: 'Norway', type: 'single' },
    { question: 'Which river runs through Egypt?', options: ['Nile', 'Tigris', 'Euphrates', 'Yangtze'], answer: 'Nile', type: 'single' },
  ],
  'React': [
    { 
      question: 'What is the purpose of the useState hook in React?', 
      options: ['To manage state in functional components', 'To handle side effects in components', 'To manage component lifecycle', 'To fetch data from an API'], 
      answer: 'To manage state in functional components', 
      type: 'single' 
  },
  { 
      question: 'Which of the following is a correct way to pass props in React?', 
      options: ['<Component props={data} />', '<Component data={props} />', '<Component {...props} />', '<Component props:data />'], 
      answer: '<Component {...props} />', 
      type: 'single' 
  },
  { 
      question: 'What does JSX stand for?', 
      options: ['JavaScript XML', 'JavaScript Extension', 'JavaScript Extra', 'JavaScript Expression'], 
      answer: 'JavaScript XML', 
      type: 'single' 
  },
  { 
      question: 'Which of the following methods is used to update the state in a React component?', 
      options: ['setState()', 'updateState()', 'modifyState()', 'changeState()'], 
      answer: 'setState()', 
      type: 'single' 
  },
  { 
      question: 'Which of the following are React lifecycle methods?', 
      options: ['componentDidMount', 'useEffect', 'componentWillUnmount', 'componentDidUpdate'], 
      answer: ['componentDidMount', 'componentWillUnmount', 'componentDidUpdate'], 
      type: 'multiple' 
  },
  { 
      question: 'What is a React component?', 
      options: ['A function or class that optionally accepts inputs and returns a React element', 'A method used to render HTML', 'An event handler', 'A tool for CSS styling'], 
      answer: 'A function or class that optionally accepts inputs and returns a React element', 
      type: 'single' 
  },
  { 
      question: 'Which hook is used to handle side effects in a React functional component?', 
      options: ['useEffect', 'useState', 'useReducer', 'useCallback'], 
      answer: 'useEffect', 
      type: 'single' 
  },
  { 
      question: 'Which of the following are valid ways to handle events in React?', 
      options: ['Using arrow functions', 'Using event binding in the constructor', 'Using inline function calls', 'All of the above'], 
      answer: 'All of the above', 
      type: 'single' 
  },
  { 
      question: 'What is the purpose of keys in React?', 
      options: ['To uniquely identify elements in a list', 'To manage component state', 'To trigger re-renders', 'To handle user input'], 
      answer: 'To uniquely identify elements in a list', 
      type: 'single' 
  },
  { 
      question: 'Which of the following are valid React hooks?', 
      options: ['useContext', 'useMemo', 'useRef', 'useStore'], 
      answer: ['useContext', 'useMemo', 'useRef'], 
      type: 'multiple' 
  }
  ],
  'JavaScript': [
    { question: 'What does the `typeof` operator return for an array?', options: ['object', 'array', 'list', 'undefined'], answer: 'object', type: 'single' },
    { question: 'Which method is used to convert a string to an integer in JavaScript?', options: ['parseInt()', 'toInteger()', 'parseNumber()', 'convertToInt()'], answer: 'parseInt()', type: 'single' },
    { question: 'What is the output of `console.log(0.1 + 0.2 === 0.3)`?', options: ['true', 'false', 'undefined', 'NaN'], answer: 'false', type: 'single' },
    { question: 'Which keyword is used to declare a variable in JavaScript?', options: ['var', 'let', 'const', 'All of the above'], answer: 'All of the above', type: 'single' },
    { question: 'What does the `this` keyword refer to in a JavaScript function?', options: ['The global object', 'The function itself', 'The object that owns the function', 'The function\'s parameters'], answer: 'The object that owns the function', type: 'single' },
    { question: 'How do you add a property to an object in JavaScript?', options: ['object.property = value', 'object.add(property, value)', 'object.set(property, value)', 'object.insert(property, value)'], answer: 'object.property = value', type: 'single' },
    { question: 'What is a closure in JavaScript?', options: ['A function that has access to its own scope, the outer function\'s scope, and the global scope', 'A way to handle asynchronous code', 'A function that returns another function', 'A special type of loop'], answer: 'A function that has access to its own scope, the outer function\'s scope, and the global scope', type: 'single' },
    { question: 'Which method is used to add an element to the end of an array?', options: ['push()', 'pop()', 'shift()', 'unshift()'], answer: 'push()', type: 'single' },
    { question: 'What will be the output of `console.log([] + [])`?', options: ['""', '[]', 'undefined', 'NaN'], answer: '""', type: 'single' },
    { question: 'Which of the following is a correct way to create a new array in JavaScript?', options: ['let arr = [];', 'let arr = new Array();', 'Both of the above', 'None of the above'], answer: 'Both of the above', type: 'single' },
  ],
  'NodeJs': [
    { question: 'What is Node.js primarily used for?', options: ['Server-side scripting', 'Client-side scripting', 'Database management', 'File manipulation'], answer: 'Server-side scripting', type: 'single' },
  { question: 'Which of the following is a Node.js runtime?', options: ['V8 Engine', 'JavaScript Engine', 'JVM', 'SpiderMonkey'], answer: 'V8 Engine', type: 'single' },
  { question: 'Which module is used to handle file operations in Node.js?', options: ['fs', 'path', 'http', 'os'], answer: 'fs', type: 'single' },
  { question: 'What is the purpose of the `require()` function in Node.js?', options: ['To load and cache modules', 'To create new modules', 'To handle asynchronous operations', 'To process HTTP requests'], answer: 'To load and cache modules', type: 'single' },
  { question: 'How do you handle asynchronous operations in Node.js?', options: ['Callbacks', 'Promises', 'Async/Await', 'All of the above'], answer: 'All of the above', type: 'single' },
  { question: 'What is the `event loop` in Node.js?', options: ['A mechanism for handling asynchronous operations', 'A way to create multiple threads', 'A method to handle file system operations', 'A type of database'], answer: 'A mechanism for handling asynchronous operations', type: 'single' },
  { question: 'Which package manager is commonly used with Node.js?', options: ['npm', 'yarn', 'bower', 'composer'], answer: 'npm', type: 'single' },
  { question: 'What is the purpose of the `package.json` file in a Node.js project?', options: ['To manage project dependencies', 'To store environment variables', 'To configure HTTP settings', 'To define server routes'], answer: 'To manage project dependencies', type: 'single' },
  { question: 'What does `npm install` do?', options: ['Installs all the dependencies listed in `package.json`', 'Uninstalls packages', 'Updates Node.js', 'Compiles code'], answer: 'Installs all the dependencies listed in `package.json`', type: 'single' },
  { question: 'How can you handle HTTP requests in Node.js?', options: ['Using the `http` module', 'Using the `fs` module', 'Using the `path` module', 'Using the `events` module'], answer: 'Using the `http` module', type: 'single' },
  ],
  'Java': [
    { question: 'What is the default value of a boolean variable in Java?', options: ['true', 'false', 'null', '0'], answer: 'false', type: 'single' },
    { question: 'Which keyword is used to define a constant in Java?', options: ['final', 'const', 'static', 'immutable'], answer: 'final', type: 'single' },
    { question: 'What does the `public static void main(String[] args)` method represent in a Java application?', options: ['The entry point of the program', 'A method to initialize variables', 'A method to handle exceptions', 'A method to start a thread'], answer: 'The entry point of the program', type: 'single' },
    { question: 'Which of the following is not a primitive data type in Java?', options: ['int', 'boolean', 'String', 'char'], answer: 'String', type: 'single' },
    { question: 'How do you create a new object of a class in Java?', options: ['Using the `new` keyword', 'Using the `create` keyword', 'Using the `init` keyword', 'Using the `generate` keyword'], answer: 'Using the `new` keyword', type: 'single' },
  ],
  'C++': [
    { question: 'Which of the following is used to define a class in C++?', options: ['class', 'struct', 'object', 'typedef'], answer: 'class', type: 'single' },
    { question: 'What is the default access specifier for members of a class in C++?', options: ['public', 'private', 'protected', 'none'], answer: 'private', type: 'single' },
    { question: 'How do you declare a pointer in C++?', options: ['int* ptr;', 'ptr int;', 'pointer int;', 'int ptr;'], answer: 'int* ptr;', type: 'single' },
    { question: 'Which operator is used to access members of a class using a pointer to an object in C++?', options: ['.', '->', '::', '&'], answer: '->', type: 'single' },
    { question: 'What is the purpose of the `virtual` keyword in C++?', options: ['To create a virtual method', 'To make a method callable from outside the class', 'To enable polymorphism', 'To declare a method as static'], answer: 'To enable polymorphism', type: 'single' },
  ],
  'Books': [
    { question: 'Which book by Colleen Hoover became a bestseller in 2023?', options: ['Verity', 'It Ends with Us', 'Reminders of Him', 'November 9'], answer: 'Reminders of Him', type: 'single' },
    { question: 'What is the main theme of the book "The Seven Husbands of Evelyn Hugo" by Taylor Jenkins Reid?', options: ['A Hollywood star’s rise and fall', 'A romance between two young lovers', 'A fantasy world of magic', 'A historical account of war'], answer: 'A Hollywood star’s rise and fall', type: 'single' },
    { question: 'Which 2023 novel by Emily Henry features a love story set during a summer vacation?', options: ['People We Meet on Vacation', 'Book Lovers', 'Happy Place', 'Beach Read'], answer: 'Happy Place', type: 'single' },
    { question: 'In which genre is the book "Fourth Wing" by Rebecca Yarros classified?', options: ['Science Fiction', 'Fantasy', 'Romance', 'Mystery'], answer: 'Fantasy', type: 'single' },
    { question: 'What is the title of the new book by Brit Bennett that continues the story of "The Mothers"?', options: ['The Vanishing Half', 'The Family Across the Street', 'The Secret Keeper', 'The Sisters'], answer: 'The Vanishing Half', type: 'single' },
  ],
};

const Quiz = ({ category, onQuizEnd }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showReadyMessage, setShowReadyMessage] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState({ correct: 0, incorrect: 0 });
  const [timer, setTimer] = useState(0);

  const questions = questionsData[category] || [];

  useEffect(() => {
    if (showReadyMessage || showResult) return;

    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [showReadyMessage, showResult]);

  if (questions.length === 0) {
    return (
      <div className="no-questions-container">
        <h2>No questions available for this category.</h2>
        <button onClick={() => onQuizEnd()}>Back to Home</button>
      </div>
    );
  }

  const question = questions[currentQuestionIndex];

  const handleAnswerClick = (option) => {
    setUserAnswers(prevAnswers => {
      const updatedAnswers = { ...prevAnswers };
      const questionIndex = currentQuestionIndex;

      if (question.type === 'single') {
        updatedAnswers[questionIndex] = option;
      } else {
        const currentAnswers = updatedAnswers[questionIndex] || [];
        if (currentAnswers.includes(option)) {
          updatedAnswers[questionIndex] = currentAnswers.filter(ans => ans !== option);
        } else {
          updatedAnswers[questionIndex] = [...currentAnswers, option];
        }
      }
      return updatedAnswers;
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResults();
      setShowResult(true);
    }
  };

  const handleReadyClick = () => {
    setShowReadyMessage(false);
  };

  const calculateResults = () => {
    let correct = 0;
    let incorrect = 0;

    questions.forEach((question, index) => {
      const correctAnswer = question.type === 'single' ? question.answer : new Set(question.answer);
      const userAnswer = question.type === 'single' ? userAnswers[index] : new Set(userAnswers[index] || []);

      if (question.type === 'single') {
        if (userAnswer === correctAnswer) {
          correct++;
        } else {
          incorrect++;
        }
      } else {
        const userAnswerSet = new Set(userAnswer);
        const isCorrect = [...userAnswerSet].every(ans => correctAnswer.has(ans)) && userAnswerSet.size === correctAnswer.size;

        if (isCorrect) {
          correct++;
        } else {
          incorrect++;
        }
      }
    });

    setResults({ correct, incorrect });
  };

  if (showResult) {
    const { correct, incorrect } = results;
    const totalQuestions = correct + incorrect;
    const percentageCorrect = (correct / totalQuestions) * 100;

    return (
      <div className="result-container">
        <div className="result-summary">
          <div className="avatar-container">
            <div className="avatar">👤</div>
          </div>
          <CircularProgressbar
            value={percentageCorrect}
            text={`${correct}/${totalQuestions}`}
            styles={buildStyles({
              textColor: '#000',
              pathColor: '#4db8ff',
              trailColor: '#f3f3f3',
            })}
          />
          <div className="result-text">
            <h2>Quiz Results</h2>
            <p>Correct Answers: {correct}</p>
            <p>Incorrect Answers: {incorrect}</p>
          </div>
        </div>
        <button onClick={() => onQuizEnd()}>Back to Home</button>
      </div>
    );
  }

  if (showReadyMessage) {
    return (
      <div className="quiz-container">
        <h2>Are You Ready to Test Your Skills in {category}?</h2>
        <button onClick={handleReadyClick}>Start Quiz</button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="question-container">
        <div className="question-header">
          <span className="question-number">Question {currentQuestionIndex + 1}</span>
          <span className="timer">Time: {Math.floor(timer / 60)}:{('0' + (timer % 60)).slice(-2)}</span>
        </div>
        <div className="question-box">
          <p className="question-text">{question.question}</p>
          <div className="options-container">
            {question.options.map((option, index) => {
              const isSelected = (question.type === 'single') ? userAnswers[currentQuestionIndex] === option : (userAnswers[currentQuestionIndex] || []).includes(option);
              const isCorrect = question.answer === option;
              const optionClass = isSelected ? (isCorrect ? 'option correct' : 'option incorrect') : 'option';

              return (
                <div 
                  key={index} 
                  className={`option-container ${optionClass}`}
                  onClick={() => handleAnswerClick(option)}
                >
                  <input
                    type={question.type === 'single' ? 'radio' : 'checkbox'}
                    name="option"
                    value={option}
                    checked={isSelected}
                    readOnly
                  />
                  <label>{option}</label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <button onClick={handleNextQuestion} className="next-button">
        {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
      </button>
    </div>
  );
};

export default Quiz;