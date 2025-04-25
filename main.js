fetch("https://script.google.com/macros/s/AKfycbw4G86YsWDyrrPU8J16k6_dIjXJ89hswDWfkolDEQR4OvfbnMAMaETPEEjxT9bPwhI/exec")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("calendar-container");
    container.innerHTML = "";
    data.sessions.forEach(session => {
      if (session.remaining > 0) {
        const btn = document.createElement("button");
        btn.textContent = session.date + " (" + session.remaining + " spots left)";
        btn.onclick = () => {
          document.querySelectorAll("button").forEach(b => b.classList.remove("selected-date"));
          btn.classList.add("selected-date");
        };
        container.appendChild(btn);
      }
    });
  });
