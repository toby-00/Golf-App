document.getElementById('golfForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get input values
    const hole = parseInt(document.getElementById('hole').value);
    const drive = parseFloat(document.getElementById('drive').value);
    const iron = parseFloat(document.getElementById('iron').value);
    const putts = parseInt(document.getElementById('putts').value);
    const puttLength = parseFloat(document.getElementById('puttLength').value);

    // PGA benchmark data (simplified example, you can expand this)
    const pgaData = {
        drive: { 10: 2.20, 15: 2.30, 20: 2.40, 25: 2.45, 30: 2.50, 50: 2.65, 100: 2.92 },
        iron: { 10: 3.31, 15: 3.61, 20: 4.86, 30: 5.75, 50: 7.53, 100: 3.80 },
        putts: { 1: 1.04, 2: 1.13, 3: 1.23, 4: 1.34, 5: 1.42, 6: 1.50, 8: 1.56, 9: 1.61, 10: 1.78 }
    };

    // Get PGA benchmark for the given inputs
    const driveBenchmark = pgaData.drive[drive] || 2.50;
    const ironBenchmark = pgaData.iron[iron] || 5.75;
    const puttBenchmark = pgaData.putts[putts] || 1.04;

    // Calculate strokes gained
    const sgDrive = driveBenchmark - (drive / 100);
    const sgIron = ironBenchmark - (iron / 10);
    const sgPutts = puttBenchmark - (puttLength / 10);

    const totalStrokesGained = sgDrive + sgIron + sgPutts;

    // Display results
    document.getElementById('results').innerHTML = `
        <p>For hole ${hole},</p>
        <p><strong>Strokes Gained:</strong> ${totalStrokesGained.toFixed(2)}</p>
        <p><strong>Drive Benchmark:</strong> ${driveBenchmark}</p>
        <p><strong>Iron Benchmark:</strong> ${ironBenchmark}</p>
        <p><strong>Putt Benchmark:</strong> ${puttBenchmark}</p>
    `;
});
