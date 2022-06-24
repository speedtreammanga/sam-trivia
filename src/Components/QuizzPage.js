import React from 'react';
import { nanoid, random } from 'nanoid';
import LandingPage from './LandingPage.js';
import RenderedQuestions from './RenderedQuestions.js';
import { decode } from '../utils.js';

export default function QuizzPage(props) {
  const [isInGame, setIsInGame] = React.useState(false);
  const [nbQuestions, setNbQuestions] = React.useState(10);
  const [isPopupActive, setIsPopupActive] = React.useState(false);
  const [quizzItems, setQuizzItems] = React.useState(null);
  const [selectedAnswers, setSelectedAnswers] = React.useState({});
  const [isVerifyMode, setIsVerifyMode] = React.useState(false);
  

  React.useEffect(() => {
    console.log('click', selectedAnswers);
  }, [selectedAnswers]);

  function handleSlider(event) {
    const { name, type, value, checked } = event.target;
    setNbQuestions(value);
  }

  function startQuizz() {
    getData();
    setIsInGame(true);
  }

  function stopQuizz() {
    resetGame()
  }

  function resetGame() {
      setIsInGame(false);
      setIsVerifyMode(false);
      setSelectedAnswers({});
      setQuizzItems(null)
  }

  function verifyAnswers() {
    if(!isVerifyMode){
      setIsVerifyMode(true) 
    } else{
      resetGame()
    }
  }

  function selectAnswer(quizzItemID, answerID) {
    setSelectedAnswers((prevState) => {
      return {
        ...prevState,
        [quizzItemID]: answerID,
      };
    });
  }

  function throwPopup() {
    setIsPopupActive(true);
  }
  function closePopup() {
    setIsPopupActive(false);
  }

  function scrambleArray(array) {
    array.sort(() => Math.random() - 0.5);
  }

  async function getData() {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=${nbQuestions}&encode=url3986`
    );
    const data = await response.json();

    let responseCode = data.response_code;
    let arrayOfItems = data.results;

    arrayOfItems = arrayOfItems.map((item, index) => {
      const goodAnswer_Object = {
        answer: item.correct_answer,
        valid: true,
      };
      const wrongAnswers_ArrayOfObject = item.incorrect_answers.map(
        (incorrectAnswer) => ({
          answer: incorrectAnswer,
          valid: false,
        })
      );

      return {
        id: index,
        category: item.category,
        difficulty: item.difficulty,
        type: item.type,
        question: item.question,
        wrongAnswers: wrongAnswers_ArrayOfObject,
        goodAnswer: goodAnswer_Object,
        allAnswers: [goodAnswer_Object, ...wrongAnswers_ArrayOfObject],
        nbAnswers: item.category === 'boolean' ? 2 : 4,
      };
    });

    arrayOfItems.forEach((item) => {
      scrambleArray(item.allAnswers);
    });

    console.log('response code to api request:', responseCode);
    console.log('QuizzItems', arrayOfItems);
    setQuizzItems(arrayOfItems);
  }

  return (
    <main className="Main">
      {!isInGame && (
        <LandingPage
          startQuizz={startQuizz}
          nbQuestions={nbQuestions}
          handleSlider={handleSlider}
        />
      )}
      {isInGame && (
        <RenderedQuestions
          isInGame={isInGame}
          verifyAnswers={verifyAnswers}
          verifyMode={isVerifyMode}
          selectAnswer={selectAnswer}
          startQuizz={startQuizz}
          stopQuizz={stopQuizz}
          selectedAnswers={selectedAnswers}
          quizzItems={quizzItems || []}
          isLoading={!quizzItems}
        />
      )}
    </main>
  );
}
