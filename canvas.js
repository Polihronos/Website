document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('paintCanvas');
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let lastX = 0;
    let lastY = 0;
    let paintStrokes = [];

    // Function to handle painting
    function paint(event) {
        const stroke = {
            x1: lastX,
            y1: lastY,
            x2: event.clientX,
            y2: event.clientY,
            opacity: 1
        };

        lastX = event.clientX;
        lastY = event.clientY;

        paintStrokes.push(stroke);
        redrawCanvas();
    }

    // Redraw the canvas with decay
    function redrawCanvas() {
        ctx.clearRect(0, 0, width, height);

        paintStrokes.forEach(stroke => {
            ctx.beginPath();
            ctx.moveTo(stroke.x1, stroke.y1);
            ctx.lineTo(stroke.x2, stroke.y2);
            ctx.strokeStyle = `rgba(255, 0, 0, ${stroke.opacity})`;
            ctx.lineWidth = 10;  // Thicker line for paintbrush effect
            ctx.stroke();

            // Gradual decay for the stroke
            stroke.opacity -= 0.03;
        });

        // Remove strokes that are fully faded
        paintStrokes = paintStrokes.filter(stroke => stroke.opacity > 0);
    }

    // Event listener for mouse movement
    canvas.addEventListener('mousemove', function(event) {
        paint(event);
    });

    // Handle window resizing
    window.addEventListener('resize', function() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        redrawCanvas();
    });

    // Continuously redraw the canvas
    setInterval(redrawCanvas, 20);
});
