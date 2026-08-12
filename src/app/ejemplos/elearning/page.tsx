'use client';

import { useState } from 'react';
import { useAdmin } from './hooks/useAdmin';
import Nav from './components/Nav';
import Hero from './components/Hero';
import CoursesGrid from './components/CoursesGrid';
import CourseDetail from './components/CourseDetail';
import LessonView from './components/LessonView';
import QuizCard from './components/QuizCard';
import ProfileCard from './components/ProfileCard';
import Certificate from './components/Certificate';
import Footer from './components/Footer';

export default function ElearningPage() {
  const admin = useAdmin();

  const {
    view,
    cursoActual,
    leccionActual,
    progresoCursoActual,
    cursos,
    badges,
    progreso,
    nivel,
    cursosCompletados,
    alumnoNombre,
    alumnoAvatar,
    marcarLeccionCompletada,
    marcarQuizCompletado,
    actualizarPerfil,
    cerrarCurso,
    abrirLeccion,
    cerrarQuiz,
    abrirCurso,
    iniciarQuiz,
    abrirCertificado,
    cerrarCertificado,
    update,
    reset,
  } = admin;

  const [perfilAbierto, setPerfilAbierto] = useState(false);

  return (
    <>
      <Nav
        adminState={admin}
        onUpdate={update}
        onReset={reset}
        onOpenProfile={() => setPerfilAbierto(true)}
      />

      {view === 'home' && (
        <>
          <Hero onCtaClick={() => {
            document.getElementById('cursos')?.scrollIntoView({ behavior: 'smooth' });
          }} />
          <CoursesGrid
            cursos={cursos}
            progreso={progreso}
            onSelectCurso={abrirCurso}
          />
        </>
      )}

      {view === 'curso' && cursoActual && progresoCursoActual && (
        <CourseDetail
          curso={cursoActual}
          progreso={progresoCursoActual}
          onOpenLeccion={abrirLeccion}
          onTomarQuiz={iniciarQuiz}
          onVolver={cerrarCurso}
          onVerCertificado={abrirCertificado}
        />
      )}

      {view === 'leccion' && leccionActual && (
        <LessonView
          leccion={leccionActual}
          onCompletar={() => {
            if (cursoActual) {
              marcarLeccionCompletada(cursoActual.id, leccionActual.id);
            }
          }}
          onVolver={() => {
            if (cursoActual) admin.abrirCurso(cursoActual.id);
            else cerrarCurso();
          }}
        />
      )}

      {view === 'quiz' && cursoActual && (
        <QuizCard
          quiz={cursoActual.quiz}
          onCompletar={(puntaje) => {
            marcarQuizCompletado(cursoActual.id, puntaje);
            abrirCertificado();
          }}
          onCerrar={cerrarQuiz}
        />
      )}

      {view === 'certificado' && cursoActual && (
        <Certificate
          alumnoNombre={alumnoNombre}
          cursoTitulo={cursoActual.titulo}
          onCerrar={cerrarCertificado}
        />
      )}

      <Footer />

      {perfilAbierto && (
        <ProfileCard
          nombre={alumnoNombre}
          avatar={alumnoAvatar}
          nivel={nivel}
          cursosCompletados={cursosCompletados}
          badges={badges}
          onActualizar={actualizarPerfil}
          onCerrar={() => setPerfilAbierto(false)}
        />
      )}
    </>
  );
}
