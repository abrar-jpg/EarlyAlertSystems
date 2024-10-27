document.addEventListener("DOMContentLoaded", function () {
    // Data for the pie chart with additional factors
    const data = [
        { label: "Personal", value: 40, color: "#FF6384" },
        { label: "Financial", value: 35, color: "#36A2EB" },
        { label: "Family", value: 25, color: "#FFCE56" },
        { label: "Grades", value: 20, color: "#4BC0C0" },
        { label: "Other", value: 15, color: "#9966FF" }
    ];

    // Set up canvas
    const canvas = document.getElementById("pieCanvas");
    const ctx = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 30;

    // Calculate the total value of all slices
    const totalValue = data.reduce((acc, entry) => acc + entry.value, 0);

    // Draw each pie slice
    let startAngle = 0;
    data.forEach(entry => {
        // Calculate slice angle
        const sliceAngle = (entry.value / totalValue) * 2 * Math.PI;

        // Draw slice
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = entry.color;
        ctx.fill();

        // Calculate label position and percentage
        const labelAngle = startAngle + sliceAngle / 2;
        const labelX = centerX + (radius / 2 + 20) * Math.cos(labelAngle); // Closer to slice edge
        const labelY = centerY + (radius / 2 + 20) * Math.sin(labelAngle);
        const percentage = ((entry.value / totalValue) * 100).toFixed(1);

        // Format the label text
        const labelText = `${entry.label} (${percentage}%)`;

        // Draw label outside the pie with max width limit
        ctx.fillStyle = "#000";
        ctx.font = "10px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`${entry.label} (${percentage}%)`, labelX, labelY);

        // Update start angle for next slice
        startAngle += sliceAngle;
    });
});