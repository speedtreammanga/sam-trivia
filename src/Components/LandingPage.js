import React from "react"

export default function LandingPage(props) {  
  return (
    <main className="LandingPage">
			<h1 className="landingpage--title">QuizBiz</h1>
			<p className="landingpage--desc"><strong>Pros:</strong> You can impress your loved ones with your useless knowledge!<br/><strong>Cons:</strong> You could embarrass yourself in front of them by not being able to answer an easy question...</p>

      <button onClick={props.startQuizz} className="landingpage--button">Start quiz</button>

        <p>Number of questions:</p>
      <div className="nbQuestions-section">
        <input className="slider-nbQuestions" step="1" onChange={props.handleSlider} type="range" min={1} max={50} defaultValue={props.nbQuestions} list="tickmarks" id="slider-nbQuestions" name="slider-nbQuestions"/>
        <label htmlFor="slider-nbQuestions">{props.nbQuestions}</label>
      </div>

      {props.isPopupActive && 
      <div className="popupWindow">
        <div className="flex-row">
          <h3>Not so fast, smarty pants...</h3>
          <button className="popupWindow--button" onClick={props.closePopup}>X</button>
        </div>
        <p className="popupDesc">It clearly says <strong>'Max : 50'</strong>, why would you try to pull a fast one on us like that...?</p>
      </div>}
    </main>
  );
}

