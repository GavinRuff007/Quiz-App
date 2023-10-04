"use client"
import React, { useState, useEffect } from "react";
import { quiz } from "../data";

export default function Page() {
    const copyrightContainerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        background: "rgba(255, 255, 255, 0.8)", // Opacity
      };
      
      const copyrightStyle = {
        textAlign: "center",
        fontSize: "14px",
        color: "#333", // Text color
        padding: "10px", // Padding around the copyright notice
      };
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [timeRemaining, setTimeRemaining] = useState(30); // Initial time in seconds

  const { questions } = quiz;
  const { answers, correctAnswer } = questions[activeQuestion];

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeRemaining > 0) {
        setTimeRemaining((prevTime) => prevTime - 1);
      } else if (timeRemaining === 0) {
        // Time's up, go to the result page
        setShowResult(true);
      }
    }, 1000);

    // Cleanup the timer when the component unmounts
    return () => clearInterval(timer);
  }, [timeRemaining]);

  // Select And Check
  const onAnswerSelected = (answer, index) => {
    setChecked(true);
    setSelectedAnswerIndex(index);

    if (answer === correctAnswer) {
      setSelectedAnswer(true);
    } else {
      setSelectedAnswer(false);
    }
  };

  // Calculate score and increment to the next question
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
      setActiveQuestion((prev) => prev + 1);
      setTimeRemaining(30); // Reset the timer for the next question
    } else {
      // If it's the last question, go to the result page
      setShowResult(true);
    }

    setChecked(false);
  };

  return (
    <div className="container">
      <h1>صفحه آزمون</h1>
      <div>
        {!showResult ? (
          <h2>
            آزمون : {activeQuestion + 1} از <span>{questions.length}</span>
          </h2>
        ) : null}
      </div>
      <div>
        {!showResult ? (
          <div className="quiz-container">
            <h3>{questions[activeQuestion].question}</h3>
            <p className="timer">زمان باقی‌مانده: {timeRemaining} ثانیه</p>
            {answers.map((answer, index) => (
              <li
                key={index}
                onClick={() => onAnswerSelected(answer, index)}
                className={
                  selectedAnswerIndex === index ? "li-selected" : "li-hover"
                }
              >
                <span>{answer}</span>
              </li>
            ))}
            {checked ? (
              <button className="btn" onClick={nextQuestion}>
                {activeQuestion === questions.length - 1 ? "پایان" : "بعدی"}
              </button>
            ) : (
              <button
                className="btn-disabled"
                onClick={nextQuestion}
                disabled
              >
                {activeQuestion === questions.length - 1 ? "پایان" : "بعدی"}
              </button>
            )}
          </div>
        ) : (
          <div className="quiz-container">
            <h3>نتایج</h3>
            <h3>
              به طور کلی {((result.correctAnswers / questions.length) * 100).toFixed(2)}% سوالات جواب داده شده
            </h3>
            <p>کل سوالات: {questions.length}</p>
            <p>کل امتیاز: {result.score}</p>
            <p>سوالات درست: {result.correctAnswers}</p>
            <p>سوالات غلط: {result.wrongAnswers}</p>

            <button onClick={() => window.location.reload()}>
              شروع مجدد آزمون
            </button>
          </div>
        )}
      </div>
      <div style={copyrightContainerStyle}>
                <p style={copyrightStyle}> &copy; 2023 Parsa Eftekharmanesh  All rights reserved</p>
                </div>
    </div>
  );
}
