async function generateCompliment() {
    try {
        const response = await fetch('https://complimentr.com/api');
        const data = await response.json();
        const compliment = data.compliment;
        document.getElementById('compliment').textContent = compliment;
    } catch (error) {
        console.error('Error fetching the compliment:', error);
        document.getElementById('compliment').textContent = 'Oops! Something went wrong. Try again.';
    }
}
