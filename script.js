document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('dataForm');
    const dataList = document.getElementById('dataList');
    const apiKey = 'your-api-key';
    const binId = 'your-bin-id';
    const url = `https://api.jsonbin.io/v3/b/${binId}`;

    // Function to load saved data from JSONBin and display it
    async function loadData() {
        try {
            const response = await fetch(url, {
                headers: {
                    'X-Master-Key': apiKey
                }
            });
            const data = await response.json();
            displayData(data.record.data);
        } catch (error) {
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
    }

    // Function to save data to JSONBin
    async function saveData(data) {
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': apiKey
                },
                body: JSON.stringify({ data })
            });
            if (response.ok) {
                loadData();
            } else {
                console.error('Failed to save data');
            }
        } catch (error) {
            console.error('Error saving data:', error);
        }
    }

    // Event listener for form submission
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const dataInput = document.getElementById('dataInput').value;
        const currentDataResponse = await fetch(url, {
            headers: {
                'X-Master-Key': apiKey
            }
        });
        const currentData = await currentDataResponse.json();
        const updatedData = currentData.record.data;
        updatedData.push(dataInput);
        saveData(updatedData);
        form.reset(); // Clear the form input
    });

    // Load data when page is loaded
    loadData();
});
