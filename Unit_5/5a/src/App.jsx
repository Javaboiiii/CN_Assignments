import { useState } from 'react'
import './App.css'

function App() {
  const [subjects, setSubjects] = useState([
    { id: 1, name: 'Subject 1', mse: '', ese: '' },
    { id: 2, name: 'Subject 2', mse: '', ese: '' },
    { id: 3, name: 'Subject 3', mse: '', ese: '' },
    { id: 4, name: 'Subject 4', mse: '', ese: '' },
  ])

  const [results, setResults] = useState(null)

  const handleInputChange = (id, field, value) => {
    // Validate input - only allow numbers
    if (value !== '' && (isNaN(value) || value < 0)) {
      return
    }

    setSubjects(subjects.map(subject => 
      subject.id === id ? { ...subject, [field]: value } : subject
    ))
  }

  const handleSubjectNameChange = (id, value) => {
    setSubjects(subjects.map(subject => 
      subject.id === id ? { ...subject, name: value } : subject
    ))
  }

  const calculateResults = () => {
    const calculatedResults = subjects.map(subject => {
      const mse = parseFloat(subject.mse) || 0
      const ese = parseFloat(subject.ese) || 0
      
      // MSE is 30% weightage, ESE is 70% weightage
      const mseWeighted = (mse * 0.30)
      const eseWeighted = (ese * 0.70)
      const total = mseWeighted + eseWeighted
      
      return {
        ...subject,
        mseWeighted: mseWeighted.toFixed(2),
        eseWeighted: eseWeighted.toFixed(2),
        total: total.toFixed(2),
        grade: getGrade(total)
      }
    })

    setResults(calculatedResults)
  }

  const getGrade = (total) => {
    if (total >= 90) return 'A+'
    if (total >= 80) return 'A'
    if (total >= 70) return 'B+'
    if (total >= 60) return 'B'
    if (total >= 50) return 'C'
    if (total >= 40) return 'D'
    return 'F'
  }

  const resetForm = () => {
    setSubjects([
      { id: 1, name: 'Subject 1', mse: '', ese: '' },
      { id: 2, name: 'Subject 2', mse: '', ese: '' },
      { id: 3, name: 'Subject 3', mse: '', ese: '' },
      { id: 4, name: 'Subject 4', mse: '', ese: '' },
    ])
    setResults(null)
  }

  const isFormValid = () => {
    return subjects.every(subject => 
      subject.mse !== '' && subject.ese !== '' && 
      parseFloat(subject.mse) <= 100 && parseFloat(subject.ese) <= 100
    )
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Student Marks Entry System</h1>
        <p className="subtitle">Enter MSE (30%) and ESE (70%) marks for four subjects</p>
      </header>

      <div className="marks-container">
        <div className="marks-form">
          <h2>Enter Marks</h2>
          <div className="info-banner">
            <p><strong>MSE:</strong> Mid-Semester Exam (30% weightage)</p>
            <p><strong>ESE:</strong> End-Semester Exam (70% weightage)</p>
          </div>

          {subjects.map(subject => (
            <div key={subject.id} className="subject-card">
              <div className="subject-header">
                <input 
                  type="text"
                  className="subject-name-input"
                  value={subject.name}
                  onChange={(e) => handleSubjectNameChange(subject.id, e.target.value)}
                  placeholder="Subject Name"
                />
              </div>
              
              <div className="marks-inputs">
                <div className="input-group">
                  <label>MSE Marks (out of 100)</label>
                  <input 
                    type="number"
                    min="0"
                    max="100"
                    value={subject.mse}
                    onChange={(e) => handleInputChange(subject.id, 'mse', e.target.value)}
                    placeholder="0-100"
                    className={subject.mse !== '' && parseFloat(subject.mse) > 100 ? 'error' : ''}
                  />
                  {subject.mse !== '' && parseFloat(subject.mse) > 100 && (
                    <span className="error-message">Max 100</span>
                  )}
                </div>

                <div className="input-group">
                  <label>ESE Marks (out of 100)</label>
                  <input 
                    type="number"
                    min="0"
                    max="100"
                    value={subject.ese}
                    onChange={(e) => handleInputChange(subject.id, 'ese', e.target.value)}
                    placeholder="0-100"
                    className={subject.ese !== '' && parseFloat(subject.ese) > 100 ? 'error' : ''}
                  />
                  {subject.ese !== '' && parseFloat(subject.ese) > 100 && (
                    <span className="error-message">Max 100</span>
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="button-group">
            <button 
              className="btn btn-primary"
              onClick={calculateResults}
              disabled={!isFormValid()}
            >
              Calculate Results
            </button>
            <button 
              className="btn btn-secondary"
              onClick={resetForm}
            >
              Reset
            </button>
          </div>
        </div>

        {results && (
          <div className="results-section">
            <h2>Results</h2>
            
            <div className="results-grid">
              {results.map(result => (
                <div key={result.id} className="result-card">
                  <h3>{result.name}</h3>
                  <div className="result-details">
                    <div className="result-row">
                      <span className="label">MSE Score:</span>
                      <span className="value">{result.mse} × 30% = {result.mseWeighted}</span>
                    </div>
                    <div className="result-row">
                      <span className="label">ESE Score:</span>
                      <span className="value">{result.ese} × 70% = {result.eseWeighted}</span>
                    </div>
                    <div className="result-row total">
                      <span className="label">Total:</span>
                      <span className="value">{result.total}/100</span>
                    </div>
                    <div className={`grade grade-${result.grade.replace('+', 'plus')}`}>
                      Grade: {result.grade}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="summary-card">
              <h3>Overall Summary</h3>
              <div className="summary-content">
                <div className="summary-item">
                  <span className="summary-label">Average:</span>
                  <span className="summary-value">
                    {(results.reduce((sum, r) => sum + parseFloat(r.total), 0) / results.length).toFixed(2)}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Highest:</span>
                  <span className="summary-value">
                    {Math.max(...results.map(r => parseFloat(r.total))).toFixed(2)}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Lowest:</span>
                  <span className="summary-value">
                    {Math.min(...results.map(r => parseFloat(r.total))).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
