import { useState } from 'react';
import { practiceQuestions } from '../data/questions';
import { CheckCircle, XCircle } from 'lucide-react';

const PracticeTab = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const question = practiceQuestions[currentIndex];

  const handleSelect = (option: string) => {
    if (showExplanation) return;
    setSelectedOption(option);
  };

  const handleVerify = () => {
    if (!selectedOption) return;
    setShowExplanation(true);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    if (currentIndex < practiceQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const isCorrect = selectedOption === question.correctAnswer;

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md border border-slate-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Modo Práctica</h2>
        <span className="bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded-full text-sm">
          Pregunta {currentIndex + 1} de {practiceQuestions.length}
        </span>
      </div>

      <div className="mb-8">
        <span className="inline-block px-2 py-1 bg-slate-100 text-slate-500 text-xs font-bold rounded uppercase mb-3">
          Categoría: {question.category}
        </span>
        <h3 className="text-xl font-semibold text-slate-900 mb-6">{question.text}</h3>

        <div className="space-y-3">
          {question.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelect(opt)}
              disabled={showExplanation}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                selectedOption === opt
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
              } ${
                showExplanation && opt === question.correctAnswer
                  ? 'border-emerald-500 bg-emerald-50'
                  : ''
              } ${
                showExplanation && selectedOption === opt && !isCorrect
                  ? 'border-red-500 bg-red-50'
                  : ''
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {showExplanation && (
        <div className={`p-4 rounded-lg mb-6 flex gap-4 ${isCorrect ? 'bg-emerald-100 text-emerald-900' : 'bg-red-100 text-red-900'}`}>
          <div className="shrink-0 mt-1">
            {isCorrect ? <CheckCircle className="text-emerald-600" /> : <XCircle className="text-red-600" />}
          </div>
          <div>
            <h4 className="font-bold mb-1">{isCorrect ? '¡Correcto!' : 'Incorrecto'}</h4>
            <p className="text-sm">{question.explanation}</p>
          </div>
        </div>
      )}

      <div className="flex justify-end gap-4">
        {!showExplanation ? (
          <button
            onClick={handleVerify}
            disabled={!selectedOption}
            className="px-6 py-2 bg-blue-600 text-white font-bold rounded disabled:opacity-50 hover:bg-blue-700 transition-colors"
          >
            Verificar Respuesta
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={currentIndex === practiceQuestions.length - 1}
            className="px-6 py-2 bg-slate-800 text-white font-bold rounded disabled:opacity-50 hover:bg-slate-900 transition-colors"
          >
            Siguiente Pregunta
          </button>
        )}
      </div>
    </div>
  );
};

export default PracticeTab;
