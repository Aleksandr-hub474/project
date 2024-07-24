document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('dataForm');
    const dataList = document.getElementById('dataList');
    const debug = document.getElementById('debug');
    const apiKey = '$2a$10$FMWW347IDh8nMSpouB2d4O90mpOi2m/bSxz.p8YhWg48z9mBSMzAm';
    const binId = '66a0fddead19ca34f88c2fbd';
    const url = `https://api.jsonbin.io/v3/b/${binId}`;

    // Function to append debug messages
    function appendDebug(message) {
        const p = document.createElement('p');
        p.textContent = message;
        debug.appendChild(p);
    }

    // Function to load saved data from JSONBin and display it
    async function loadData() {
        appendDebug('Loading data...');
        try {
            const response = await fetch(url, {
                headers: {
                    'X-Master-Key': apiKey
                }
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            appendDebug('Data loaded successfully');
            displayData(data.record.data);
        } catch (error) {
            appendDebug('Error loading data: ' + error);
            console.error('Error loading data:', error);
        }
    }

    // Function to display data in the list
    function displayData(data) {
        dataList.innerHTML = ''; // Clear current list
        data.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            dataList.appendChild(li);
        });
        appendDebug('Data displayed');
    }

    // Function to save data to JSONBin
    async function saveData(data) {
        appendDebug('Saving data...');
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': apiKey
                },
                body: JSON.stringify({ data })
            });
            if (!response.ok) throw new Error('Network response was not ok');
            appendDebug('Data saved successfully');
            loadData();
        } catch (error) {
            appendDebug('Error saving data: ' + error);
            console.error('Error saving data:', error);
        }
    }

    // Event listener for form submission
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        appendDebug('Form submitted');
        const dataInput = document.getElementById('dataInput').value;
        try {
            const currentDataResponse = await fetch(url, {
                headers: {
                    'X-Master-Key': apiKey
                }
            });
            if (!currentDataResponse.ok) throw new Error('Network response was not ok');
            const currentData = await currentDataResponse.json();
            appendDebug('Current data loaded');
            const updatedData = currentData.record.data;
            updatedData.push(dataInput);
            saveData(updatedData);
            form.reset(); // Clear the form input
        } catch (error) {
            appendDebug('Error fetching current data: ' + error);
            console.error('Error fetching current data:', error);
        }
    });

    // Load data when page is loaded
    loadData();
});
