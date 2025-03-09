import React from 'react';
import './App.css';
import ApplicationForm from './components/ApplicationForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Job Application Portal</h1>
      </header>
      <main>
        <ApplicationForm />
      </main>
      <footer>
        <p>&copy; 2025 Your Company</p>
      </footer>
    </div>
  );
}

export default App;