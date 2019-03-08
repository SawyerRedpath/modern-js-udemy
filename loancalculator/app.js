// Listen for submit
document.querySelector('#loan-form').addEventListener('submit', function (e) {
    // Hide results
    document.querySelector('#results').style.display = 'none';

    // Show loading
    document.querySelector('#loading').style.display = 'block';

    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

// Listen for clear results
document.querySelector('#clear-results').addEventListener('click', clearResults);

// Clear the results
function clearResults() {
    // Remove results from DOM
    document.querySelector('#results').remove();

    // Clear fields for better UX
    const inputs = document.querySelectorAll('#loan-form .form-control');

    inputs.forEach(element => {
        element.value = '';
    });
}

function calculateResults() {
    // UI Variables
    const amount = document.querySelector('#amount');
    const interest = document.querySelector('#interest');
    const years = document.querySelector('#years');
    const monthlyPayment = document.querySelector('#monthly-payment');
    const totalPayment = document.querySelector('#total-payment');
    const totalInterest = document.querySelector('#total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // Compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly) && principal > 0 && calculatedInterest > 0 && calculatedPayments > 0) {
        monthlyPayment.value = numberWithCommas(monthly.toFixed(2));
        totalPayment.value = numberWithCommas((monthly * calculatedPayments).toFixed(2));
        totalInterest.value = numberWithCommas(((monthly * calculatedPayments) - principal).toFixed(2));

        // Show results
        document.querySelector('#results').style.display = 'block';

        // Hide loader
        document.querySelector('#loading').style.display = 'none';
    } else {
        showError('Please check your numbers, they are invalid');
    }

}

// Put commas in numbers
function numberWithCommas(x) {
    return '$ ' + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Show error
function showError(error) {
    // Hide results
    document.querySelector('#results').style.display = 'none';

    // Hide loader
    document.querySelector('#loading').style.display = 'none';

    // Create a div
    const errorDiv = document.createElement('div');

    // Get elements that we will insert this into
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Add class 
    errorDiv.className = 'alert alert-danger';

    // Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // Insert error above heading
    card.insertBefore(errorDiv, heading);

    // Clear error after 3 seconds
    setTimeout(clearError, 3000);

}

// Clear error
function clearError() {
    document.querySelector('.alert').remove();
}