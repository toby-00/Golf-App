import React from 'react';
import ShotInput from './components/ShotInput';
import ChartView from './components/ChartView';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">🏌️ Golf Strokes Gained Tracker</h1>
      <ShotInput />
      <ChartView />
    </div>
  );
}

export default App;
