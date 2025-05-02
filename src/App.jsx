import ShotInput from './components/ShotInput';
import RoundSummary from './components/RoundSummary';
import ChartView from './components/ChartView';

export default function App() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Golf Strokes Gained Tracker</h1>
      <ShotInput />
      <RoundSummary />
      <ChartView />
    </div>
  );
}
