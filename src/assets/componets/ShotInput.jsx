import React, { useState } from 'react';
import { calculateSG } from '../lib/strokesGainedEngine';
import { saveRound } from '../lib/db';
import RoundSummary from './RoundSummary';

export default function ShotInput() {
  const [shots, setShots] = useState([]);
  const [distance, setDistance] = useState('');
  const [lie, setLie] = useState('tee');
  const [endDist, setEndDist] = useState('');
  const [isPutt, setIsPutt] = useState(false);
  const [summary, setSummary] = useState(null);

  function addShot() {
    const start = parseInt(distance);
    const end = parseInt(endDist);

    if (!start || !end) return;

    const sg = calculateSG(start, end, lie, isPutt);
    setShots([...shots, { distance: start, lie, endDist: end, isPutt, sg }]);

    setDistance('');
    setEndDist('');
    setIsPutt(false);
  }

  async function finishRound() {
    const putting = shots.filter(s => s.isPutt).reduce((sum, s) => sum + s.sg, 0);
    const teeToGreen = shots.filter(s => !s.isPutt).reduce((sum, s) => sum + s.sg, 0);
    const totalSG = putting + teeToGreen;

    const getZoneSG = (max) =>
      shots.filter(s => !s.isPutt && s.distance <= max).reduce((s, x) => s + x.sg, 0);

    const round = {
      shots,
      putting,
      teeToGreen,
      driving: shots.filter(s => s.lie === 'tee').reduce((s, x) => s + x.sg, 0),
      inside50: getZoneSG(50),
      inside100: getZoneSG(100),
      inside150: getZoneSG(150),
      inside200: getZoneSG(200),
      totalSG
    };

    await saveRound(round);
    setSummary(round);
    setShots([]);
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Enter Shot</h2>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          placeholder="Start Distance (yards/feet)"
          className="p-2 border rounded"
        />
        <select value={lie} onChange={(e) => setLie(e.target.value)} className="p-2 border rounded">
          <option value="tee">Tee</option>
          <option value="fairway">Fairway</option>
          <option value="rough">Rough</option>
          <option value="sand">Sand</option>
          <option value="recovery">Recovery</option>
          <option value="green">Green (putt)</option>
        </select>
        <input
          type="number"
          value={endDist}
          onChange={(e) => setEndDist(e.target.value)}
          placeholder="End Distance"
          className="p-2 border rounded"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isPutt}
            onChange={() => setIsPutt(!isPutt)}
          />
          Is Putt?
        </label>
      </div>
      <button onClick={addShot} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">Add Shot</button>
      <button onClick={finishRound} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Finish Round</button>

      <ul className="mt-4 space-y-1">
        {shots.map((s, i) => (
          <li key={i} className="text-sm">
            {s.lie} from {s.distance} → {s.endDist} | SG: {s.sg.toFixed(2)}
          </li>
        ))}
      </ul>

      {summary && <RoundSummary round={summary} />}
    </div>
  );
}

