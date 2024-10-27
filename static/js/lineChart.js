// Set up data
const labels = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"];
const studentsAtRisk = [120, 140, 160, 180, 150, 130, 170, 190, 160];
const maxRisk = Math.max(...studentsAtRisk);

// Set up canvas
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Define margins and scaling factors
const margin = 40;
const graphWidth = canvasWidth - 2 * margin;
const graphHeight = canvasHeight - 2 * margin;
const xSpacing = graphWidth / (labels.length - 1);
const yScale = graphHeight / maxRisk;

// Draw X and Y axes
ctx.beginPath();
ctx.moveTo(margin, margin);
ctx.lineTo(margin, canvasHeight - margin);
ctx.lineTo(canvasWidth - margin, canvasHeight - margin);
ctx.stroke();

// Draw labels on Y axis
ctx.textAlign = "right";
ctx.textBaseline = "middle";
for (let i = 0; i <= maxRisk; i += 20) {
    const y = canvasHeight - margin - i * yScale;
    ctx.fillText(i, margin - 10, y);
    ctx.beginPath();
    ctx.moveTo(margin - 5, y);
    ctx.lineTo(margin + 5, y);
    ctx.stroke();
}

// Draw labels on X axis
ctx.textAlign = "center";
ctx.textBaseline = "top";
labels.forEach((label, i) => {
    const x = margin + i * xSpacing;
    ctx.fillText(label, x, canvasHeight - margin + 10);
});

// Draw line graph
ctx.beginPath();
ctx.strokeStyle = "green";
ctx.lineWidth = 2;
studentsAtRisk.forEach((value, i) => {
    const x = margin + i * xSpacing;
    const y = canvasHeight - margin - value * yScale;
    if (i === 0) {
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
    }
});
ctx.stroke();

// Draw data points
ctx.fillStyle = "black";
studentsAtRisk.forEach((value, i) => {
    const x = margin + i * xSpacing;
    const y = canvasHeight - margin - value * yScale;
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
});
