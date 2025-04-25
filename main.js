fetch("https://script.google.com/macros/s/AKfycbw4G86YsWDyrrPU8J16k6_dIjXJ89hswDWfkolDEQR4OvfbnMAMaETPEEjxT9bPwhI/exec")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("calendar-container");
    container.innerHTML = "";
    
    const sessionMap = {};
    data.registrations.forEach(entry => {
      const key = `${entry.Week} ${entry.Time}`;
      if (!sessionMap[key]) sessionMap[key] = { date: key, remaining: 15 };
      sessionMap[key].remaining--;
    });

    Object.values(sessionMap).forEach(session => {
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
