import React from 'react';
import { decode } from '../utils';
import clsx from 'clsx';

export default function RenderedQuestions(props) {
	const { verifyMode, quizzItems, isMobile } = props;



  const quizzItemsElements = quizzItems.map((quizzItem, quizzItemIndex) => {
		const quizzItemID = quizzItem.id;
    return (
      <div key={`question::${quizzItemID}`} className={clsx({"quizzItem":true, "Mobile":isMobile})}>
        <p className="question">{decode(quizzItem.question)}</p>
        <div className="answers">
          {quizzItems[quizzItemIndex].allAnswers.map(
            (answerObject, answerIndex) => {
							const isAnswerSelected = props.selectedAnswers[quizzItemID] === answerIndex
              return (
                <p
									key={`question::${quizzItemID}-answer::${answerIndex}`}
                  className={clsx({
										'answer': true,
										'selected': isAnswerSelected,
										'disabled': verifyMode,
										'correct': verifyMode && isAnswerSelected && answerObject.valid,
										'incorrect': verifyMode && isAnswerSelected && !answerObject.valid,
										'itWasThisOne': verifyMode && !isAnswerSelected && answerObject.valid,
										'transparent': verifyMode && !isAnswerSelected && !answerObject.valid
									})}
                  onClick={() => !verifyMode && props.selectAnswer(quizzItemID, answerIndex)}
                >
                  {decode(answerObject.answer)}
                </p>
              );
            }
          )}
        </div>
      </div>
    );
  });

  return (
    <div className="QuizzPage">
      <button className="backToMainMenuButton" onClick={props.stopQuizz}>
        {'< Back to main menu'}
      </button>
      <h1 className="QuizzPage--title">QuizBiz!</h1>
			{props.isLoading && (
				<p className='loader'></p>
			)}
      {quizzItemsElements}
			{!props.isLoading && (
				<button
					className={clsx({
						'submitButton': true,
						'disabledSubmitButton': !verifyMode && (Object.keys(props.selectedAnswers).length !== quizzItems.length)
					})}
					onClick={props.verifyAnswers}
				>
					{verifyMode? "Play again" : "I'm done!"}
				</button>
			)}
    </div>
  );
}
