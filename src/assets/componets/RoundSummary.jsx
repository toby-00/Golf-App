import React from 'react';

export default function RoundSummary({ round }) {
  if (!round) return null;

  const {
    teeToGreen,
    putting,
    inside50,
    inside100,
    inside150,
    inside200,
    driving,
    totalSG
  } = round;

  return (
    <div className="mt-8 border p-4 rounded bg-gray-100">
      <h2 className="text-lg font-bold mb-2">Round Summary</h2>
      <ul className="space-y-1">
        <li><strong>Total SG:</strong> {totalSG.toFixed(2)}</li>
        <li><strong>Tee to Green:</strong> {teeToGreen.toFixed(2)}</li>
        <li><strong>Putting:</strong> {putting.toFixed(2)}</li>
        <li><strong>Driving:</strong> {driving.toFixed(2)}</li>
        <li><strong>Inside 50:</strong> {inside50.toFixed(2)}</li>
        <li><strong>Inside 100:</strong> {inside100.toFixed(2)}</li>
        <li><strong>Inside 150:</strong> {inside150.toFixed(2)}</li>
        <li><strong>Inside 200:</strong> {inside200.toFixed(2)}</li>
      </ul>
    </div>
  );
}

