(function() {
  const button = document.getElementById("startButton");

  button.addEventListener("click", function() {
    button.style.display = 'none';
    
    navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(stream);

      source.connect(analyser);
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      const canvas = document.createElement("canvas");
      document.body.appendChild(canvas);
      const ctx = canvas.getContext("2d");

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      function draw() {
        requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);
        
        // Clear the canvas
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Create psychedelic effects
        for(let i = 0; i < bufferLength; i++) {
          let barHeight = dataArray[i];
          
          // Amplification
          barHeight *= 3; // Adjust this multiplier to amplify the signal

          // Limiting barHeight to the canvas height
          barHeight = Math.min(barHeight, canvas.height);
          
          const hue = i + 100 * Math.sin(i);
          ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
          
          // Making bars taller and more vibrant by modifying the fillRect parameters
          ctx.fillRect(i * 6, canvas.height - barHeight, 4, barHeight);
        }
      }
      
      draw();
    })
    .catch(err => console.error(err));
  });
})();
