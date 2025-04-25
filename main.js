window.addEventListener('DOMContentLoaded', (event) => {
    // Display the calendar after the page loads
    const calendarElement = document.getElementById('calendar');
    const adminLink = document.getElementById('admin-link');
    const backButton = document.getElementById('back-button');
    
    // Fetch data from your Google Apps Script
    fetch('https://script.google.com/macros/s/AKfycbw4G86YsWDyrrPU8J16k6_dIjXJ89hswDWfkolDEQR4OvfbnMAMaETPEEjxT9bPwhI/exec')
        .then(response => response.json())
        .then(data => {
            console.log(data);  // Log the data to inspect
            const registrations = data.registrations || [];
            const counts = data.counts || {};

            // Add the session slots to the calendar
            generateCalendar(counts);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    // Function to generate the calendar with session availability
    function generateCalendar(counts) {
        const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
        const times = ['Morning', 'Afternoon', 'Evening'];

        // Build a grid for weeks and times
        const calendarGrid = document.createElement('table');
        calendarGrid.classList.add('calendar-grid');

        // Add headers
        const headerRow = calendarGrid.insertRow();
        headerRow.insertCell().textContent = 'Time / Week';
        weeks.forEach(week => {
            const th = document.createElement('th');
            th.textContent = week;
            headerRow.appendChild(th);
        });

        // Add time slots
        times.forEach(time => {
            const row = calendarGrid.insertRow();
            const timeCell = row.insertCell();
            timeCell.textContent = time;

            weeks.forEach(week => {
                const key = `${week}__${time}`;
                const count = counts[key] || 0;
                const maxCapacity = 14; // Set your max capacity
                const remainingSlots = maxCapacity - count;

                const cell = row.insertCell();
                cell.textContent = `${remainingSlots} slots`;

                if (remainingSlots <= 0) {
                    cell.style.backgroundColor = 'red';  // Full session
                    cell.style.pointerEvents = 'none';
                } else {
                    cell.style.backgroundColor = 'lightgreen';  // Available session
                }

                // Add click event to allow booking if slots are available
                if (remainingSlots > 0) {
                    cell.addEventListener('click', () => {
                        const confirmed = confirm(`Do you want to book a slot for ${week} - ${time}?`);
                        if (confirmed) {
                            bookSlot(week, time);
                        }
                    });
                }
            });
        });

        calendarElement.appendChild(calendarGrid);
    }

    // Function to handle slot booking
    function bookSlot(week, time) {
        // Logic to handle booking slot (could involve calling another API, form submission, etc.)
        alert(`You have booked a slot for ${week} - ${time}`);
    }

    // Admin link functionality
    if (adminLink) {
        adminLink.addEventListener('click', function() {
            window.location.href = 'admin.html';
        });
    }

    // Back button functionality
    if (backButton) {
        backButton.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
});
