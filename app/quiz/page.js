"use client";
import { useState, useEffect } from "react";
import { quiz } from "../data";
import Skeleton from "react-loading-skeleton";
export default function Page() {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(-1);
  const [checked, setChecked] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [answers, setAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const { questions } = quiz;
  // const { answers, correctAnswer } = questions[activeQuestion];
  useEffect(() => {
    setTimeout(() => {
      setAnswers(questions[activeQuestion].answers);
      setCorrectAnswer(questions[activeQuestion].correctAnswer);
    }, 2000);
  }, [result]);
  //Select and Check Answer
  const onAnswerSelected = (answer, index) => {
    setChecked(true);
    setSelectedAnswerIndex(index);

    if (answer === correctAnswer) {
      setSelectedAnswer(true);
      console.log("Correct Answer");
    } else {
      setSelectedAnswer(false);
      console.log("Wrong Answer");
    }
  };
  //Calculate Score and increment to next question
  const nextQuestion = () => {
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    );

    if (activeQuestion !== questions.length - 1) {
      setCorrectAnswer("");
      setAnswers([]);
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
      setChecked(false);
    }
  };

  return (
    <div className="container">
      <h1>Quiz</h1>
      <div>
        {!showResult ? (
          <h2>
            {activeQuestion + 1}/{questions.length}
          </h2>
        ) : null}
      </div>
      <div>
        {!showResult ? (
          <div className="quiz-container">
            <h3>{questions[activeQuestion].question}</h3>
            {answers.length > 0 ? (
              answers.map((answer, index) => (
                <li
                  key={index}
                  onClick={() => onAnswerSelected(answer, index)}
                  className={
                    selectedAnswerIndex === index ? "li-selected" : "li-hover"
                  }
                >
                  <span>{answer}</span>
                </li>
              ))
            ) : (
              <Skeleton />
            )}

            {checked ? (
              <button className="btn" onClick={nextQuestion}>
                {activeQuestion === questions.length - 1 ? "Submit" : "Next"}
              </button>
            ) : (
              <button className="btn" onClick={nextQuestion} disabled>
                {activeQuestion === questions.length - 1 ? "Submit" : "Next"}
              </button>
            )}
          </div>
        ) : (
          <div className="quiz-container">
            <h3>result</h3>
            <h3>Score:{(result.score / 25) * 100}% is answered</h3>
            {console.log("result:", result.score)}
            <p>All Questions: {questions.length}</p>
            <p>Overal Score:{result.score}</p>
            <p>Correct Answes: {result.correctAnswers}</p>
            <p>Wrong Answers: {result.wrongAnswers}</p>
            <button className="btn" onClick={() => window.location.reload()}>
              ReStart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
