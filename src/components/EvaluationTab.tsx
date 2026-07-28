import React, { useState, useEffect } from 'react';
import { practiceQuestions, EVALUATION_KEY, TEACHER_KEY, PASSING_SCORE, Question } from '../data/questions';
import { Lock, User, FileText, CheckCircle, AlertTriangle, Clock, List, Trash2, ArrowLeft } from 'lucide-react';

interface EvaluationTabProps {
  onEvaluationStart: () => void;
  onEvaluationEnd: () => void;
}

const EvaluationTab: React.FC<EvaluationTabProps> = ({ onEvaluationStart, onEvaluationEnd }) => {
  const [hasAccess, setHasAccess] = useState(false);
  const [isTeacherPanel, setIsTeacherPanel] = useState(false);
  const [accessKey, setAccessKey] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentId, setStudentId] = useState('');
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  
  // Temporizador: 20 minutos = 1200 segundos
  const [timeLeft, setTimeLeft] = useState(1200);
  const [logs, setLogs] = useState<any[]>([]);

  // Cargar logs al iniciar
  useEffect(() => {
    const saved = localStorage.getItem('hemosim_eval_logs');
    if (saved) {
      setLogs(JSON.parse(saved));
    }
  }, []);

  // Efecto del temporizador
  useEffect(() => {
    if (hasAccess && !isFinished && timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (hasAccess && !isFinished && timeLeft === 0) {
      finishEvaluation();
    }
  }, [hasAccess, isFinished, timeLeft]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Panel de profesor
    if (accessKey === TEACHER_KEY) {
      setIsTeacherPanel(true);
      setErrorMsg('');
      return;
    }

    if (accessKey !== EVALUATION_KEY) {
      setErrorMsg('Clave de acceso incorrecta.');
      return;
    }
    if (studentName.trim().length < 3) {
      setErrorMsg('Por favor ingresa tu nombre completo.');
      return;
    }
    setErrorMsg('');
    
    // Unir banco, mezclar y tomar 20 aleatorias
    const allQuestions = [...practiceQuestions];
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    setSelectedQuestions(shuffled.slice(0, 20));
    
    setHasAccess(true);
    onEvaluationStart();
  };

  const handleAnswer = (option: string) => {
    setAnswers({
      ...answers,
      [selectedQuestions[currentIndex].id]: option
    });
  };

  const handleNext = () => {
    if (currentIndex < selectedQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      finishEvaluation();
    }
  };

  const finishEvaluation = () => {
    setIsFinished(true);
    
    // Calcular puntaje final
    let score = 0;
    selectedQuestions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) score++;
    });
    const percentage = Math.round((score / selectedQuestions.length) * 100);

    // Calcular tiempo invertido (1200 segundos menos lo que sobró)
    const timeSpentSeconds = 1200 - timeLeft;
    const timeSpentString = formatTime(timeSpentSeconds);

    // Guardar registro
    const newLog = {
      name: studentName,
      id: studentId,
      score,
      percentage,
      time: timeSpentString,
      date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
    };
    
    const updatedLogs = [...logs, newLog];
    setLogs(updatedLogs);
    localStorage.setItem('hemosim_eval_logs', JSON.stringify(updatedLogs));
  };



  const calculateScore = () => {
    let score = 0;
    selectedQuestions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) score++;
    });
    return score;
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (isTeacherPanel) {
    return (
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md border border-slate-200 mt-10">
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <Lock className="text-red-600" /> Panel de Control del Docente
            </h2>
            <p className="text-slate-500 text-sm mt-1">Registro de evaluaciones y calificaciones de estudiantes</p>
          </div>
          <button 
            onClick={() => {
              setIsTeacherPanel(false);
              setAccessKey('');
            }}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-semibold transition-colors bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg"
          >
            <ArrowLeft size={18} /> Salir del Panel
          </button>
        </div>

        <div className="bg-white rounded-lg border shadow-sm overflow-hidden mb-6">
          <div className="p-4 bg-slate-50 border-b flex justify-between items-center">
            <h3 className="font-bold text-slate-700 flex items-center gap-2"><List size={18}/> Registros Históricos ({logs.length})</h3>
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  if (confirm('¿Estás seguro de que quieres borrar todos los registros?')) {
                    setLogs([]);
                    localStorage.removeItem('hemosim_eval_logs');
                  }
                }}
                className="flex items-center gap-1 text-sm bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded transition-colors"
                disabled={logs.length === 0}
              >
                <Trash2 size={16} /> Limpiar Registros
              </button>
            </div>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {logs.length === 0 ? (
              <div className="p-10 text-center text-slate-500">
                <FileText className="mx-auto mb-3 opacity-20" size={48} />
                <p>No hay registros de evaluaciones todavía.</p>
              </div>
            ) : (
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-100 sticky top-0 z-10 shadow-sm">
                  <tr>
                    <th className="p-3 border-b text-slate-600">Estudiante</th>
                    <th className="p-3 border-b text-slate-600">ID / Cédula</th>
                    <th className="p-3 border-b text-slate-600">Nota</th>
                    <th className="p-3 border-b text-slate-600">Tiempo</th>
                    <th className="p-3 border-b text-slate-600">Fecha y Hora</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log, i) => (
                    <tr key={i} className="border-b hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-semibold text-slate-800">{log.name}</td>
                      <td className="p-3 text-slate-500 font-mono">{log.id || 'N/A'}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded font-bold ${log.score >= PASSING_SCORE ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                          {log.score}/20 ({log.percentage}%)
                        </span>
                      </td>
                      <td className="p-3 text-slate-600">{log.time || '--:--'}</td>
                      <td className="p-3 text-slate-500 text-xs">{log.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md border border-slate-200 mt-10">
        <div className="text-center mb-6">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="text-red-600" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Evaluación Formal</h2>
          <p className="text-slate-500 text-sm mt-2">Ingresa tus datos y la clave proporcionada por el docente para comenzar.</p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 text-red-700 p-3 rounded mb-4 text-sm flex items-center gap-2">
            <AlertTriangle size={16} /> {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Nombre Completo *</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 text-slate-400" size={18} />
              <input 
                type="text" required
                value={studentName} onChange={e => setStudentName(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border rounded focus:ring-2 focus:ring-red-500 focus:outline-none"
                placeholder="Ej. Juan Pérez"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Matrícula / Cédula (Opcional)</label>
            <div className="relative">
              <FileText className="absolute left-3 top-2.5 text-slate-400" size={18} />
              <input 
                type="text"
                value={studentId} onChange={e => setStudentId(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border rounded focus:ring-2 focus:ring-red-500 focus:outline-none"
                placeholder="Ej. 1234567890"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Clave de Acceso *</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 text-slate-400" size={18} />
              <input 
                type="password" required
                value={accessKey} onChange={e => setAccessKey(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border rounded focus:ring-2 focus:ring-red-500 focus:outline-none"
                placeholder="****"
              />
            </div>
          </div>
          <button type="submit" className="w-full bg-red-600 text-white font-bold py-2 rounded hover:bg-red-700 transition-colors mt-6">
            Ingresar a la Evaluación
          </button>
        </form>
      </div>
    );
  }

  if (isFinished) {
    const score = calculateScore();
    const isPassed = score >= PASSING_SCORE;
    const percentage = Math.round((score / selectedQuestions.length) * 100);

    return (
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md border border-slate-200 text-center mt-10">
        <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${isPassed ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
          {isPassed ? <CheckCircle size={48} /> : <AlertTriangle size={48} />}
        </div>
        
        <h2 className="text-3xl font-bold mb-2 text-slate-800">Resultados de Evaluación</h2>
        <p className="text-lg text-slate-600 mb-8">Estudiante: <span className="font-semibold">{studentName}</span> {studentId && `(${studentId})`}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <h3 className="text-sm text-slate-500 font-semibold mb-1">Puntaje Obtenido</h3>
            <p className="text-4xl font-black text-slate-800">{score} <span className="text-xl text-slate-400">/ {selectedQuestions.length}</span></p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <h3 className="text-sm text-slate-500 font-semibold mb-1">Porcentaje</h3>
            <p className="text-4xl font-black text-slate-800">{percentage}%</p>
          </div>
        </div>

        <div className={`p-4 rounded-lg font-bold text-lg mb-8 ${isPassed ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
          {isPassed 
            ? '¡Felicitaciones! Has aprobado la evaluación.' 
            : `No has alcanzado el puntaje mínimo requerido (${PASSING_SCORE} respuestas correctas).`}
        </div>

        <button 
          onClick={() => {
            onEvaluationEnd();
            window.location.reload();
          }}
          className="text-blue-600 hover:underline font-semibold"
        >
          Volver al inicio
        </button>

        {/* Notificación flotante de guardado */}
        <div className="fixed bottom-6 left-6 bg-white p-4 rounded-lg shadow-xl border-l-4 border-emerald-500 flex flex-col gap-1 z-50 animate-fade-in-up">
          <div className="flex items-center gap-2 text-emerald-700 font-bold mb-1">
            <CheckCircle size={18} />
            <span>Registro Guardado Exitosamente</span>
          </div>
          <p className="text-sm text-slate-600"><strong>Estudiante:</strong> {studentName}</p>
          <p className="text-sm text-slate-600"><strong>Nota:</strong> {score}/20</p>
          <p className="text-sm text-slate-600"><strong>Tiempo Invertido:</strong> {formatTime(1200 - timeLeft)} min</p>
        </div>
      </div>
    );
  }

  const question = selectedQuestions[currentIndex];
  const currentAnswer = answers[question.id];

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md border border-slate-200">
      <div className="flex justify-between items-end mb-6 border-b pb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Evaluación en Curso</h2>
          <p className="text-sm text-slate-500 mt-1">Estudiante: {studentName}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className={`flex items-center gap-1 font-mono font-bold text-lg px-3 py-1 rounded border ${timeLeft < 300 ? 'bg-red-100 text-red-700 border-red-300 animate-pulse' : 'bg-slate-100 text-slate-700 border-slate-300'}`}>
            <Clock size={18} /> {formatTime(timeLeft)}
          </span>
          <span className="bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded-full text-sm">
            Pregunta {currentIndex + 1} de {selectedQuestions.length}
          </span>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-slate-900 mb-6">{question.text}</h3>

        <div className="space-y-3">
          {question.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(opt)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                currentAnswer === opt
                  ? 'border-red-500 bg-red-50 font-semibold text-red-900'
                  : 'border-slate-200 hover:border-red-300 hover:bg-slate-50'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleNext}
          disabled={!currentAnswer}
          className="px-6 py-2 bg-red-600 text-white font-bold rounded disabled:opacity-50 hover:bg-red-700 transition-colors"
        >
          {currentIndex === selectedQuestions.length - 1 ? 'Finalizar Evaluación' : 'Siguiente'}
        </button>
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-slate-200 h-2 mt-8 rounded-full overflow-hidden">
        <div 
          className="bg-red-600 h-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / selectedQuestions.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default EvaluationTab;
