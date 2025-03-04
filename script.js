document.addEventListener('DOMContentLoaded', function() {
    // Get all form elements
    const loanAmountInput = document.getElementById('loan-amount');
    const loanAmountSlider = document.getElementById('loan-amount-slider');
    const interestRateInput = document.getElementById('interest-rate');
    const interestRateSlider = document.getElementById('interest-rate-slider');
    const loanTermInput = document.getElementById('loan-term');
    const loanTermSlider = document.getElementById('loan-term-slider');
    const insuranceRateInput = document.getElementById('insurance-rate');
    const insuranceRateSlider = document.getElementById('insurance-rate-slider');
    
    // Get result elements
    const monthlyPaymentEl = document.getElementById('monthly-payment');
    const principalPaymentEl = document.getElementById('principal-payment');
    const interestPaymentEl = document.getElementById('interest-payment');
    const insurancePaymentEl = document.getElementById('insurance-payment');
    const totalCostEl = document.getElementById('total-cost');
    const borrowedAmountEl = document.getElementById('borrowed-amount');
    const totalInterestEl = document.getElementById('total-interest');
    const totalInsuranceEl = document.getElementById('total-insurance');
    
    // Amortization table elements
    const showTableBtn = document.getElementById('show-table-btn');
    const amortizationTableContainer = document.getElementById('amortization-table-container');
    const amortizationTbody = document.getElementById('amortization-tbody');
    
    // Sync sliders and input fields
    function syncInputs(input, slider) {
        slider.value = input.value;
    }
    
    function syncSliders(slider, input) {
        input.value = slider.value;
    }
    
    // Input event listeners
    loanAmountInput.addEventListener('input', function() {
        syncInputs(loanAmountInput, loanAmountSlider);
        calculateLoan();
    });
    
    loanAmountSlider.addEventListener('input', function() {
        syncSliders(loanAmountSlider, loanAmountInput);
        calculateLoan();
    });
    
    interestRateInput.addEventListener('input', function() {
        syncInputs(interestRateInput, interestRateSlider);
        calculateLoan();
    });
    
    interestRateSlider.addEventListener('input', function() {
        syncSliders(interestRateSlider, interestRateInput);
        calculateLoan();
    });
    
    loanTermInput.addEventListener('input', function() {
        syncInputs(loanTermInput, loanTermSlider);
        calculateLoan();
    });
    
    loanTermSlider.addEventListener('input', function() {
        syncSliders(loanTermSlider, loanTermInput);
        calculateLoan();
    });
    
    insuranceRateInput.addEventListener('input', function() {
        syncInputs(insuranceRateInput, insuranceRateSlider);
        calculateLoan();
    });
    
    insuranceRateSlider.addEventListener('input', function() {
        syncSliders(insuranceRateSlider, insuranceRateInput);
        calculateLoan();
    });
    
    // Show/hide amortization table
    showTableBtn.addEventListener('click', function() {
        if (amortizationTableContainer.classList.contains('hidden')) {
            amortizationTableContainer.classList.remove('hidden');
            showTableBtn.textContent = 'Masquer le tableau';
            generateAmortizationTable();
        } else {
            amortizationTableContainer.classList.add('hidden');
            showTableBtn.textContent = 'Afficher le tableau';
        }
    });
    
    // Format number as currency
    function formatCurrency(amount) {
        return new Intl.NumberFormat('fr-FR', { 
            style: 'currency', 
            currency: 'EUR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2 
        }).format(amount);
    }
    
    // Calculate monthly payment
    function calculateMonthlyPayment(principal, annualRate, years) {
        const monthlyRate = annualRate / 100 / 12;
        const totalPayments = years * 12;
        
        // If rate is 0, simple division
        if (monthlyRate === 0) {
            return principal / totalPayments;
        }
        
        // Standard amortization formula
        return principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
               (Math.pow(1 + monthlyRate, totalPayments) - 1);
    }
    
    // Calculate monthly insurance
    function calculateMonthlyInsurance(principal, annualInsuranceRate) {
        return (principal * annualInsuranceRate / 100) / 12;
    }
    
    // Main calculation function
    function calculateLoan() {
        // Get values from inputs
        const principal = parseFloat(loanAmountInput.value);
        const annualRate = parseFloat(interestRateInput.value);
        const years = parseInt(loanTermInput.value);
        const annualInsuranceRate = parseFloat(insuranceRateInput.value);
        
        // Calculate monthly payments
        const monthlyPrincipalAndInterest = calculateMonthlyPayment(principal, annualRate, years);
        const monthlyInsurance = calculateMonthlyInsurance(principal, annualInsuranceRate);
        const totalMonthlyPayment = monthlyPrincipalAndInterest + monthlyInsurance;
        
        // Calculate first month's breakdown
        const monthlyInterest = (principal * annualRate / 100) / 12;
        const monthlyPrincipal = monthlyPrincipalAndInterest - monthlyInterest;
        
        // Calculate totals
        const totalPayments = years * 12;
        const totalPaid = totalMonthlyPayment * totalPayments;
        const totalInterestPaid = (monthlyPrincipalAndInterest * totalPayments) - principal;
        const totalInsurancePaid = monthlyInsurance * totalPayments;
        
        // Update results
        monthlyPaymentEl.textContent = formatCurrency(totalMonthlyPayment);
        principalPaymentEl.textContent = formatCurrency(monthlyPrincipal);
        interestPaymentEl.textContent = formatCurrency(monthlyInterest);
        insurancePaymentEl.textContent = formatCurrency(monthlyInsurance);
        
        totalCostEl.textContent = formatCurrency(totalPaid);
        borrowedAmountEl.textContent = formatCurrency(principal);
        totalInterestEl.textContent = formatCurrency(totalInterestPaid);
        totalInsuranceEl.textContent = formatCurrency(totalInsurancePaid);
        
        // If table is visible, update it
        if (!amortizationTableContainer.classList.contains('hidden')) {
            generateAmortizationTable();
        }
    }
    
    // Generate amortization table by year
    function generateAmortizationTable() {
        // Clear existing table
        amortizationTbody.innerHTML = '';
        
        // Get values from inputs
        const principal = parseFloat(loanAmountInput.value);
        const annualRate = parseFloat(interestRateInput.value);
        const years = parseInt(loanTermInput.value);
        const annualInsuranceRate = parseFloat(insuranceRateInput.value);
        
        const monthlyRate = annualRate / 100 / 12;
        const totalPayments = years * 12;
        const monthlyPayment = calculateMonthlyPayment(principal, annualRate, years);
        const monthlyInsurance = calculateMonthlyInsurance(principal, annualInsuranceRate);
        
        let remainingBalance = principal;
        let yearlyInterestPaid = 0;
        let yearlyPrincipalPaid = 0;
        let yearlyInsurancePaid = 0;
        
        // Calculate for each year
        for (let year = 1; year <= years; year++) {
            yearlyInterestPaid = 0;
            yearlyPrincipalPaid = 0;
            yearlyInsurancePaid = 0;
            
            // Calculate for each month in the year
            for (let month = 1; month <= 12; month++) {
                if ((year - 1) * 12 + month <= totalPayments) {
                    const interestForMonth = remainingBalance * monthlyRate;
                    const principalForMonth = monthlyPayment - interestForMonth;
                    
                    yearlyInterestPaid += interestForMonth;
                    yearlyPrincipalPaid += principalForMonth;
                    yearlyInsurancePaid += monthlyInsurance;
                    
                    remainingBalance -= principalForMonth;
                }
            }
            
            // Skip the last year if the balance is practically zero
            if (remainingBalance < 0.01) {
                remainingBalance = 0;
            }
            
            // Create table row
            const row = document.createElement('tr');
            
            const yearCell = document.createElement('td');
            yearCell.textContent = year;
            row.appendChild(yearCell);
            
            const balanceCell = document.createElement('td');
            balanceCell.textContent = formatCurrency(Math.max(0, remainingBalance));
            row.appendChild(balanceCell);
            
            const interestCell = document.createElement('td');
            interestCell.textContent = formatCurrency(yearlyInterestPaid);
            row.appendChild(interestCell);
            
            const principalCell = document.createElement('td');
            principalCell.textContent = formatCurrency(yearlyPrincipalPaid);
            row.appendChild(principalCell);
            
            const insuranceCell = document.createElement('td');
            insuranceCell.textContent = formatCurrency(yearlyInsurancePaid);
            row.appendChild(insuranceCell);
            
            amortizationTbody.appendChild(row);
            
            // If balance is zero, break out of the loop
            if (remainingBalance <= 0) {
                break;
            }
        }
    }
    
    // Initial calculation
    calculateLoan();
}); 