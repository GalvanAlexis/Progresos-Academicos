'use client';

import { useState } from 'react';
import type { Quiz } from '../hooks/useAdmin';

function Confetti() {
  return (
    <div className="sabor-confetti">
      {Array.from({ length: 20 }, (_, i) => (
        <span
          key={i}
          className="sabor-confetti-piece"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 0.5}s`,
            backgroundColor: ['#E86A33', '#4CAF50', '#5BA4E6', '#fbbf24', '#f472b6'][Math.floor(Math.random() * 5)],
          }}
        />
      ))}
      <style>{`
        .sabor-confetti {
          position: fixed; inset: 0; pointer-events: none; z-index: 1001;
        }
        .sabor-confetti-piece {
          position: absolute; top: -10px;
          width: 8px; height: 8px; border-radius: 2px;
          animation: saborConfettiFall 2s ease-in forwards;
        }
        @keyframes saborConfettiFall {
          to { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default function QuizCard({
  quiz,
  onCompletar,
  onCerrar,
}: {
  quiz: Quiz;
  onCompletar: (puntaje: number) => void;
  onCerrar: () => void;
}) {
  const [idx, setIdx] = useState(0);
  const [respuestas, setRespuestas] = useState<number[]>([]);
  const [mostroFeedback, setMostroFeedback] = useState(false);
  const [feedbackCorrecto, setFeedbackCorrecto] = useState(false);
  const [termino, setTermino] = useState(false);

  const pregunta = quiz.preguntas[idx];
  const esUltima = idx === quiz.preguntas.length - 1;
  const aciertos = respuestas.filter((r, i) => r === quiz.preguntas[i].correcta).length;

  function seleccionar(opcionIdx: number) {
    if (mostroFeedback) return;
    const nuevas = [...respuestas, opcionIdx];
    setRespuestas(nuevas);
    setFeedbackCorrecto(opcionIdx === pregunta.correcta);
    setMostroFeedback(true);
  }

  function avanzar() {
    if (esUltima) {
      setTermino(true);
    } else {
      setIdx((i) => i + 1);
      setMostroFeedback(false);
    }
  }

  function finalizar() {
    onCompletar(aciertos);
  }

  if (termino) {
    const aprobo = aciertos >= 3;
    return (
      <div className="sabor-modal-overlay">
        {aprobo && <Confetti />}
        <div className="sabor-modal sabor-quiz-result">
          <h2 className="sabor-result-title">
            {aprobo ? 'Felicidades!' : 'Casi!'}
          </h2>
          <p className="sabor-result-score">
            Acertaste <strong>{aciertos}</strong> de <strong>{quiz.preguntas.length}</strong>
          </p>
          {aprobo && <p className="sabor-result-badge">Has desbloqueado un nuevo badge!</p>}
          <div className="sabor-login-actions" style={{ justifyContent: 'center' }}>
            <button className="sabor-btn sabor-btn-secondary" onClick={onCerrar}>
              Seguir aprendiendo
            </button>
            {aprobo && (
              <button className="sabor-btn sabor-btn-primary" onClick={finalizar}>
                Ver certificado
              </button>
            )}
          </div>
        </div>
        <style>{`
          .sabor-quiz-result { text-align: center; max-width: 400px; }
          .sabor-result-title { font-size: 1.5rem; color: #2d2a24; margin: 0 0 12px; }
          .sabor-result-score { font-size: 1rem; color: #6b7280; margin: 0 0 8px; }
          .sabor-result-badge { font-size: 0.9rem; color: #E86A33; font-weight: 600; margin: 0 0 16px; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="sabor-modal-overlay">
      <div className="sabor-modal sabor-quiz-modal">
        <div className="sabor-quiz-header">
          <span className="sabor-quiz-counter">
            Pregunta {idx + 1} de {quiz.preguntas.length}
          </span>
          <span className="sabor-quiz-aciertos">
            {aciertos}/{idx + (mostroFeedback && !esUltima ? 1 : 0)} correctas
          </span>
        </div>

        <h3 className="sabor-quiz-pregunta">{pregunta.texto}</h3>

        <div className="sabor-quiz-opciones">
          {pregunta.opciones.map((op, i) => {
            const selected = respuestas[idx] === i;
            let cls = 'sabor-quiz-opcion';
            if (selected && mostroFeedback) {
              cls += i === pregunta.correcta ? ' sabor-opcion-correcta' : ' sabor-opcion-incorrecta';
            }
            return (
              <button
                key={i}
                className={cls}
                onClick={() => seleccionar(i)}
                disabled={mostroFeedback}
              >
                {op}
              </button>
            );
          })}
        </div>

        {mostroFeedback && (
          <div className={`sabor-quiz-feedback ${feedbackCorrecto ? 'sabor-feedback-bien' : 'sabor-feedback-mal'}`}>
            {feedbackCorrecto ? (
              <p>Correcto! 🎉</p>
            ) : (
              <p>La respuesta correcta era: <strong>{pregunta.opciones[pregunta.correcta]}</strong></p>
            )}
            <p className="sabor-quiz-explicacion">{pregunta.explicacion}</p>
            <button className="sabor-btn sabor-btn-primary" onClick={avanzar} style={{ marginTop: 10 }}>
              {esUltima ? 'Ver resultado' : 'Siguiente pregunta'}
            </button>
          </div>
        )}
      </div>

      <style>{`
        .sabor-quiz-modal { max-width: 500px; }
        .sabor-quiz-header {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 20px;
        }
        .sabor-quiz-counter {
          font-size: 0.85rem; color: #6b7280; font-weight: 600;
        }
        .sabor-quiz-aciertos {
          font-size: 0.85rem; color: #4CAF50; font-weight: 600;
        }
        .sabor-quiz-pregunta {
          font-size: 1.15rem; color: #2d2a24;
          margin: 0 0 16px; line-height: 1.4;
        }
        .sabor-quiz-opciones {
          display: flex; flex-direction: column; gap: 8px;
        }
        .sabor-quiz-opcion {
          padding: 12px 16px; border: 2px solid #e8e3de;
          border-radius: 12px; background: #faf8f5;
          font-size: 0.95rem; color: #2d2a24;
          cursor: pointer; text-align: left;
          transition: all 0.2s;
        }
        .sabor-quiz-opcion:hover:not(:disabled) {
          border-color: #E86A33; background: #fff4e5;
        }
        .sabor-opcion-correcta {
          border-color: #4CAF50 !important; background: #e8f5e9 !important;
        }
        .sabor-opcion-incorrecta {
          border-color: #e53935 !important; background: #ffebee !important;
        }
        .sabor-quiz-feedback {
          margin-top: 16px; padding: 16px; border-radius: 12px;
        }
        .sabor-feedback-bien {
          background: #e8f5e9; border: 1px solid #a5d6a7;
        }
        .sabor-feedback-mal {
          background: #fff4e5; border: 1px solid #f5d6b8;
        }
        .sabor-quiz-feedback p {
          margin: 0; color: #2d2a24;
        }
        .sabor-quiz-explicacion {
          font-size: 0.85rem; color: #6b7280; margin-top: 8px !important;
        }
      `}</style>
    </div>
  );
}
