document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('dataForm');
    const dataList = document.getElementById('dataList');

    // Function to load saved data from LocalStorage and display it
    function loadData() {
        dataList.innerHTML = ''; // Clear current list
        const data = JSON.parse(localStorage.getItem('data')) || [];
        data.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            dataList.appendChild(li);
        });
    }

    // Function to save data to LocalStorage
    function saveData(data) {
        const existingData = JSON.parse(localStorage.getItem('data')) || [];
        existingData.push(data);
        localStorage.setItem('data', JSON.stringify(existingData));
        loadData();
    }

    // Event listener for form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const dataInput = document.getElementById('dataInput').value;
        saveData(dataInput);
        form.reset(); // Clear the form input
    });

    // Load data when page is loaded
    loadData();
});
