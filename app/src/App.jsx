import React from 'react';
import Projects from './components/Projects';
import Services from './components/Services';
import Certificates from './components/Certificates';

function App() {
  return (
    <div className="bg-white">
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-800">Sharif Abubakar</h1>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <Projects />
        <Services />
        <Certificates />
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2025 Sharif Abubakar. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
