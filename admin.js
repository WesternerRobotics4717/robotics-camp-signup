document.getElementById("admin-panel").innerHTML = "<p>Fetching...</p>";
fetch("https://script.google.com/macros/s/AKfycbw4G86YsWDyrrPU8J16k6_dIjXJ89hswDWfkolDEQR4OvfbnMAMaETPEEjxT9bPwhI/exec?action=view")
  .then(res => res.json())
  .then(data => {
    const panel = document.getElementById("admin-panel");
    panel.innerHTML = "";
    data.registrations.forEach((entry, idx) => {
      const div = document.createElement("div");
      div.innerHTML = \';
        <p><strong>\${entry.studentName}</strong> - \${entry.date}</p>
        <button onclick="removeClient(\${idx})">Remove</button>\';
      panel.appendChild(div);
    });
  });

function removeClient(index) {
  fetch("https://script.google.com/macros/s/AKfycbw4G86YsWDyrrPU8J16k6_dIjXJ89hswDWfkolDEQR4OvfbnMAMaETPEEjxT9bPwhI/exec", {
    method: "POST",
    body: JSON.stringify({ action: "remove", index })
  })
    .then(res => res.text())
    .then(msg => alert("Removed: " + msg));
}
