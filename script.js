$(document).ready(function () {
//  $("body").on('input', '#interest_rate, #management_fees_amount', function () {
//         var inputElement = $(this)[0]; // Get the DOM element
    
//         // Get the current cursor position
//         var cursorPosition = inputElement.selectionStart;
    
//         // Get the input value
//         var inputValue = $(this).val();
    
//         // Check if the value already ends with '%'
//         if (!inputValue.endsWith('%')) {
//             // Update the input value with '%' appended
//             $(this).val(inputValue + '%');
    
//             // Set the cursor position before the '%'
//             inputElement.setSelectionRange(cursorPosition, cursorPosition);
//         }
//     });
    
    // Use a more general selector for the event binding
    $("body").on('input', '.amountInput', function () {
        var inputElement = this;
        var originalCursorPosition = inputElement.selectionStart;
    
        // Get the numeric value without non-numeric characters
        var numericValue = parseFloat($(this).val().replace(/[^0-9.-]/g, ''));
        // Check if the numeric value is NaN (not a number)
        if (isNaN(numericValue)) {
            // If NaN, set the input value to an empty string and exit the function
            $(this).val('');
            return;
        }
        // Get the input value before formatting
        var originalInputValue = $(this).val();
    
        // Format the numeric value with the '$' sign
        var formattedValue = '$' + numericValue.toLocaleString();
    
        // Check if the numeric value is 0 after deleting the first digit
        if (numericValue === 0 && originalInputValue.indexOf('0') === 1) {
            // Revert to the original input value and keep the cursor position
            $(this).val(originalInputValue);
            inputElement.setSelectionRange(originalCursorPosition, originalCursorPosition);
            return;
        }
    
        // Calculate the change in length due to formatting
        var lengthDiff = formattedValue.length - originalInputValue.length;
    
        // Update the input value
        $(this).val(formattedValue);
    
        // Calculate the new cursor position
        var newCursorPosition = originalCursorPosition + lengthDiff;
    
        // Set the cursor position after updating the input
        inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
    
        // Your other update functions here...
        updateDiscount();
        totalCashRequired();
        loanEstablishedExpense();
        propertyManagementFees();
        //updateTotalNetRent();
        //annualPropertyExpenses();
        calculatePMT();
        loanExpenses();
        annualRepaymentAmount();
        updateGraph(0.05);
        updateGraph(0.07);
        updateGraph(0.1);
    });



        function updateDiscount() {
        var marketValue = parseFloat($('#market-value').val().replace(/[^0-9.-]/g, '')) || 0;
        var purchasePrice = parseFloat($('#purchase-price').val().replace(/[^0-9.-]/g, '')) || 0;
        $('#widget-purchase-price').text('$' + purchasePrice.toLocaleString());
        if (marketValue > purchasePrice) {
            var discountAmount = marketValue - purchasePrice;
            var discountPercentage = marketValue !== 0 ? (discountAmount / marketValue) * 100 : 0;
             discountPercentage = (discountPercentage * 100) / 100;
            $('#discount-percent').text(discountPercentage.toFixed(2) + '%');
           discountAmount = (discountAmount * 100) / 100;
            $('#discount-price').text('$' + discountAmount.toLocaleString());
            $('.discount').show();
            $('.overprice').hide();
            $('#result-message').hide();
        } else if (marketValue < purchasePrice) {
            var overpricedAmount = purchasePrice - marketValue;
            var overpricedPercentage = marketValue !== 0 ? (overpricedAmount / marketValue) * 100 : 0;
            overpricedPercentage = (overpricedPercentage * 100) / 100;
            $('#overpriced-percent').text(overpricedPercentage.toFixed(2) + '%');
           overpricedAmount = (overpricedAmount * 100) / 100;
            $('#overpriced-price').text('$' + overpricedAmount.toLocaleString());
            $('.overprice').show();
            $('.discount').hide();
            $('#result-message').hide();
        }
        else {
            $('#result-message').show();
            $('#result-message').text("Purchasing at Market Price");
            $('.overprice').hide();
            $('.discount').hide();
        }
        loanEstablishedExpense();
    }
    
     
    // Function to update Total cash Required
    var totalCash ;
    function totalCashRequired() {

        // Get the values of 'totalcash Value' and 'Purchase Price'
        var downpayment = parseFloat($('#down-payment').val().replace(/[^0-9.-]/g, '')) || 0;
        var propertyImprovement = parseFloat($('#property-improvements').val().replace(/[^0-9.-]/g, '')) || 0;
        var legals = parseFloat($('#legals').val().replace(/[^0-9.-]/g, '')) || 0;
        var stampDutyCalculators = parseFloat($('#stamp-duty-calculator').val().replace(/[^0-9.-]/g, '')) || 0;
        var otherCosts = parseFloat($('#other-costs').val().replace(/[^0-9.-]/g, '')) || 0;
        var buyerAgentFees = parseFloat($('#buyer-agent-fees').val().replace(/[^0-9.-]/g, '')) || 0;

        // Calculate the Total Cash Required

        var totalCashRequired = downpayment + propertyImprovement + legals + stampDutyCalculators + otherCosts + buyerAgentFees;
        totalCash = totalCashRequired;
        $('#total-cash-required').text('$' + totalCashRequired.toLocaleString());
        $('#widget-cash-required').text('$' + totalCashRequired.toLocaleString());
         loanExpenses();
    }
    var totalPurchasePrice;
    //Funtion to update Loan Establishment Requirement
    function loanEstablishedExpense() {
        var loanEstablishedFees = parseFloat($('#loan-establishment-fee').val().replace(/[^0-9.-]/g, '')) || 0;
        var propertyValuation = parseFloat($('#property-valuation').val().replace(/[^0-9.-]/g, '')) || 0;
        var lenderMortgageInsurance = parseFloat($('#lender-mortgage-insurance').val().replace(/[^0-9.-]/g, '')) || 0;
        var otherLoanCosts = parseFloat($('#other-loan-costs').val().replace(/[^0-9.-]/g, '')) || 0;
// Format the values with '$' and commas
// $('#market-value').val(formatCurrency(marketValue));
// $('#loan-establishment-fee').val((loanEstablishedFees));

        var totalExpensesAmount = loanEstablishedFees + propertyValuation + lenderMortgageInsurance + otherLoanCosts;

        $('#total-expenses-amount').text('$' + totalExpensesAmount.toLocaleString());

        var purchasePrice = parseFloat($('#purchase-price').val().replace(/[^0-9.-]/g, '')) || 0;
        var propertyImprovement = parseFloat($('#property-improvements').val().replace(/[^0-9.-]/g, '')) || 0;
        var legals = parseFloat($('#legals').val().replace(/[^0-9.-]/g, '')) || 0;
        var stampDutyCalculators = parseFloat($('#stamp-duty-calculator').val().replace(/[^0-9.-]/g, '')) || 0;
        var otherCosts = parseFloat($('#other-costs').val().replace(/[^0-9.-]/g, '')) || 0;
        var buyerAgentFees = parseFloat($('#buyer-agent-fees').val().replace(/[^0-9.-]/g, '')) || 0;

        var total = purchasePrice + propertyImprovement + legals + stampDutyCalculators + otherCosts + buyerAgentFees;

        totalPurchasePrice = totalExpensesAmount + total;
        console.log(totalPurchasePrice);
        $('#total-purchasePrice').text('$' + totalPurchasePrice.toLocaleString());

        loanExpenses();

    }
    // function formatCurrency(amount) {
    //     // Format the number as currency with dollar sign and comma
    //     return '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    //     // return '$' + amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });

    // }
    // function parseFormattedNumber(value) {
    //     // Remove non-numeric characters and parse the number
    //     return parseInt(value.replace(/[^\d.-]/g, ''));
    //     // var n = parseInt($(this).val().replace(/\D/g, ''), 10);

    // }
    //propertyManagementFees
    var total;
     var annualRent;
    function propertyManagementFees() {

        var weeklyRent = parseFloat($('#weekly_rent').val().replace(/[^0-9.-]/g, '')) || 0;
        $('#monthly_rent').text('$' + Math.round(weeklyRent * 4.3).toLocaleString());

         annualRent = (weeklyRent * 52);
        $('#annual_rent').text('$' + Math.round(annualRent).toLocaleString());
        
        console.log("Annual"+annualRent);

        var propertyfeesRate = parseFloat($('#management_fees_amount').val()) || 0;
        $('#management_fees').text('$' + Math.round((weeklyRent * propertyfeesRate * 52) / 100).toLocaleString());


        var pmf = (weeklyRent * propertyfeesRate * 52) / 100;
        var rates = parseFloat($('#rate_amount').val().replace(/[^0-9.-]/g, '')) || 0;
        var buildingInsuranceAmt = parseFloat($('#building_insurance_amount').val().replace(/[^0-9.-]/g, '')) || 0;
        var landloardInsuranceAmt = parseFloat($('#landlord_insurance_amount').val().replace(/[^0-9.-]/g, '')) || 0;
        var startaFees = parseFloat($('#strata_fees_amount').val().replace(/[^0-9.-]/g, '')) || 0;
        var landTaxAmt = parseFloat($('#land_tax_amount').val().replace(/[^0-9.-]/g, '')) || 0;
        var MaintainanceAmt = parseFloat($('#maintenance_amount').val().replace(/[^0-9.-]/g, '')) || 0;

         total = pmf + rates + buildingInsuranceAmt + landloardInsuranceAmt + startaFees + landTaxAmt + MaintainanceAmt;
        console.log(total);
        $('#total-amount').text('$' + Math.round(total).toLocaleString());

         loanExpenses();
         annualRepaymentAmount();
    }

    // Function to calculate PMT
    function calculatePMT(annualRate, loanTerm, principal) {
        var monthlyRate = annualRate / 12 / 100; // to convert the annual interest rate from a percentage to a decimal
        console.log('monthly rate:',monthlyRate);
        var numberOfPayments = loanTerm * 12; // Convert loan term to number of payments

        // Calculate PMT using the formula
        var pmt = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

        // Return the calculated monthly payment with two decimal places
        // Check if the result is a valid number
        if (!isNaN(parseFloat(pmt)) && isFinite(pmt)) {
            console.log('pmt:', pmt);
            // Return the calculated monthly payment with two decimal places
            return pmt;
        } else {
            console.log('Invalid result for PMT calculation');
            // Return 0.00 or any default value in case of an invalid result
            return '0';
        }
    }

    //Loan Expenses
    var interestOnly;
    var principleInterest;
    var totalFundBorrowed;
    function loanExpenses(){
       
        var purchasePrice = parseFloat($('#purchase-price').val().replace(/[^0-9.-]/g, '')) || 0;
        var downpayment = parseFloat($('#down-payment').val().replace(/[^0-9.-]/g, '')) || 0;

        var loanEstablishedFees = parseFloat($('#loan-establishment-fee').val().replace(/[^0-9.-]/g, '')) || 0;
        var propertyValuation = parseFloat($('#property-valuation').val().replace(/[^0-9.-]/g, '')) || 0;
        var lenderMortgageInsurance = parseFloat($('#lender-mortgage-insurance').val().replace(/[^0-9.-]/g, '')) || 0;
        var otherLoanCosts = parseFloat($('#other-loan-costs').val().replace(/[^0-9.-]/g, '')) || 0;

        totalFundBorrowed = purchasePrice-downpayment+(loanEstablishedFees+propertyValuation+lenderMortgageInsurance+otherLoanCosts)

        $('#fund-borrowed-amount').text('$' + Math.round(totalFundBorrowed).toLocaleString());


        // Monthly Repayments
        var principal = totalFundBorrowed; // Replace this with your actual principal amount
        var annualRate = parseFloat($('#interest_rate').val().replace(/[^0-9.-]/g, '')) || 0;
        console.log("annual rate :",annualRate);
        console.log("principal val :",principal);
        var loanTerm = 30; // Replace this with your actual loan term in years

        var monthlyPayment = calculatePMT(annualRate, loanTerm, principal);
        console.log('Monthly Payment:', '$' + monthlyPayment);

        //  update the value in your  element
        $('#monthly-repayment-amount').text('$' + Math.round(monthlyPayment).toLocaleString());

        // Annual Repayments
        var annualPayment = monthlyPayment * 12;
        console.log("annualPayment:",annualPayment);
        $('#annual-repayment-amount').text('$' + Math.round(annualPayment).toLocaleString());
   
        //INTEREST ONLY (I/O)
        // Annual Repayments (INTEREST)
        interestAnnualPayment = totalFundBorrowed * annualRate/100;
        console.log("interestAnnualPayment:",interestAnnualPayment);
        $('#interest_annual_repayment_amount').text('$' + Math.round(interestAnnualPayment).toLocaleString());

        //LVR (Loan-to-Value Ratio)
        var lvr = (totalFundBorrowed / purchasePrice) * 100;
        console.log("lvr :", lvr);
    
        if (isNaN(lvr)) {
            $('#lvr_amount').text('0%');
             $('#widget-lvr').text('0%');
        } else {
            $('#lvr_amount').text(lvr.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })+'%');
            $('#widget-lvr').text(lvr.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%');
        }

        //Total Expenses when Interest on P&I
        console.log('total:', total);
        principleInterest = annualPayment + total
        console.log("principleInterest:", principleInterest);
        if (isNaN(principleInterest)) {
            $('#principle-interest-amount').text('$0');
             
        } else {
            $('#principle-interest-amount').text('$' + Math.round(principleInterest).toLocaleString());
            
        }

       //Total Expenses when Interest on I/O
        interestOnly = interestAnnualPayment + total
       console.log("interestOnly :", interestOnly);
       if (isNaN(interestOnly)) {
           $('#interest-only-amount').text('$0');
           $('#widget-expenses-io').text('$0');
       } else {
           $('#interest-only-amount').text('$' + Math.round(interestOnly).toLocaleString());
            $('#widget-expenses-io').text('$' + Math.round(interestOnly).toLocaleString());
       }
    //    annualRepaymentAmount(interestOnly,principleInterest)
    }


    function annualRepaymentAmount(){
     
        var annualRentText = $('#annual_rent').text();
        var annualRentValue = parseFloat(annualRentText.replace(/[^0-9.-]+/g, ""));
        console.log(annualRentValue);
        console.log("IO"+interestOnly);
        console.log("Po"+principleInterest);

        // var totalExpenses_pi = annualRepaymentAmount + totalAmount;
        var piAmount = annualRentValue - principleInterest;
        
        $('#p-i-amount').text('$' + Math.round(piAmount).toLocaleString());
        console.log("piAmount" + piAmount);
        $('#widget-profit-pi').text('$' + Math.round(piAmount).toLocaleString());
        //-----ioAmount------//
       
        var ioAmount = annualRentValue - interestOnly;
        $('#ioAmount').text('$' + Math.round(ioAmount).toLocaleString());
        console.log("ioAmount" + ioAmount);
        var grossYield = (annualRentValue / totalPurchasePrice) * 100;
        if (isNaN(grossYield)) {
            $('#grossYield').text('0%'); 
          } else {
            $('#grossYield').text(grossYield.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })+'%');
          }

        console.log(grossYield);

        // ------cash on cash yield(p&i)-------//
          var cashYield_pi = (piAmount/totalCash)*100;
         
          if (isNaN(cashYield_pi)) {
            $('#cashYield-pi').text('0%'); 
          } else {
            $('#cashYield-pi').text(cashYield_pi.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })+'%');
          }
          console.log("cashYield_pi:"+cashYield_pi);

        //------- cash on cash yield(i/0)--------//
          var cashYield_io = (ioAmount/totalCash)*100;
          if (isNaN(cashYield_io)) {
            $('#cashYield-io').text('0%');
          } else {
            $('#cashYield-io').text(cashYield_io.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })+'%');
          }
          console.log("cashYield_io:"+cashYield_io);
        //------- Return on equity--------//
         //------- Growth Rate@5%--------//
         var purchasePrice = parseFloat($('#purchase-price').val().replace(/[^0-9.-]/g, '')) || 0;
         console.log("PurcxhasePrice:"+ purchasePrice);
         var growthRate = (ioAmount+0.05*purchasePrice)/totalCash*100;
         console.log("Growth Rate"+growthRate);
         var growthRate = ((ioAmount+(0.05*purchasePrice))/totalCash)*100;
         console.log("Growth Rate2"+growthRate);
         if (isNaN(growthRate)) {
            $('#growth-rate').text('0%');
             $('#widget-return-equity').text('0%');
          } else {
            $('#growth-rate').text(growthRate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })+'%');
             $('#widget-return-equity').text(growthRate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%');
          }
             //------- Growth Rate@7%--------//
        
         var growthRate_7 = (ioAmount+0.07*purchasePrice)/totalCash*100;
        
         if (isNaN(growthRate_7)) {
            $('#growth-rate-7').text('0%');
          } else {
            $('#growth-rate-7').text(growthRate_7.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })+'%');
          }

            //------- Growth Rate@10%--------//
                    
            var growthRate_10 = (ioAmount+0.1*purchasePrice)/totalCash*100;
           
            if (isNaN(growthRate_10)) {
                $('#growth-rate-10').text('0%');
                } else {
                $('#growth-rate-10').text(growthRate_10.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })+'%');
                }
    }

    function updateGraph(percentage) {
        // Get the purchase price from the input field
        var marketValue = parseFloat($('#market-value').val().replace(/[^0-9.-]/g, '')) || 0;

        // Create an array to store the updated data for the current dataset
        var newData = [];
        var newData2 = [];

        // Update the data based on the purchase price and percentage
        for (var n = 0; n <= 10; n++) {
            var updatedValue = marketValue * Math.pow(1 + percentage, n);
            //updatedValue = Math.round(updatedValue);
            var updatedValue2 = updatedValue - totalFundBorrowed ;
            newData.push(updatedValue);
            newData2.push(updatedValue2);

        }

        // var min = Math.min(...newData);
        // console.log("Min:"+min)
        // var max = Math.max(...newData);
        // console.log("Max:"+max)
        // var stepSize = Math.ceil((max - min) / 150); // Adjust as needed
        // console.log("stepSize:"+stepSize)
        // Set the new y-axis ticks configuration
        // myChart.options.scales.y.ticks.min = min;
        // myChart.options.scales.y.ticks.max = max;
        // myChart.options.scales.y.ticks.stepSize = stepSize;
         myChart.options.scales.y.beginAtZero = true; 
        // equityGrowthChart.options.scales.y.ticks.min = min;
        // equityGrowthChart.options.scales.y.ticks.max = max;
        // equityGrowthChart.options.scales.y.ticks.stepSize = stepSize;
        // equityGrowthChart.options.scales.y.beginAtZero = true; 
        
        // Find the index of the dataset based on the percentage
        var datasetIndex;
        if (percentage === 0.1) {
            datasetIndex = 0;
        } else if (percentage === 0.07) {
            datasetIndex = 1;
        } else if (percentage === 0.05) {
            datasetIndex = 2;
        }

        myChart.data.datasets[datasetIndex].data = newData.slice();
        equityGrowthChart.data.datasets[datasetIndex].data = newData2.slice();
        var tooltipLabels = ['10%', '7%', '5%'];
        
        // Set custom labels for each dataset
        myChart.data.datasets.forEach((dataset, index) => {
            dataset.label = tooltipLabels[index];
        });
    
        // Set custom tooltip content
        myChart.options.plugins.tooltip.callbacks.label = function(context) {
            var datasetLabel = myChart.data.datasets[context.datasetIndex].label || '';
          
            var value = context.parsed.y || 0;
            // Format the value with comma separator and "$" sign
            var formattedValue = '$' + value.toLocaleString();
            return datasetLabel + ': ' + formattedValue;
        };
        
        equityGrowthChart.data.datasets.forEach((dataset, index) => {
            dataset.label = tooltipLabels[index];
        });
    
        // Set custom tooltip content
        equityGrowthChart.options.plugins.tooltip.callbacks.label = function(context) {
            var datasetLabel = equityGrowthChart.data.datasets[context.datasetIndex].label || '';
          
            var value = context.parsed.y || 0;
            // Format the value with comma separator and "$" sign
            var formattedValue = '$' + value.toLocaleString();
            return datasetLabel + ': ' + formattedValue;
        };



        // Log the data for the current percentage
        console.log(`Data for ${percentage * 100}%:`, newData);
         // Set custom tooltip title dynamically
         myChart.options.plugins.tooltip.callbacks.title = function (tooltipItems) {
            const tooltipItem = tooltipItems[0]; // Assuming you have only one dataset in the chart

            if (tooltipItem) {
                const label = tooltipItem.label;
                const year = ' Year ' ; // Adjust for singular or plural
                return  year + label;
            }

            return ''; // Default title if tooltipItem is not available
        };
        equityGrowthChart.options.plugins.tooltip.callbacks.title = function (tooltipItems) {
            const tooltipItem = tooltipItems[0]; // Assuming you have only one dataset in the chart

            if (tooltipItem) {
                const label = tooltipItem.label;
                const year = ' Year ' ; // Adjust for singular or plural
                return  year + label;
            }

            return ''; // Default title if tooltipItem is not available
        };
        // Center the tooltip title
        myChart.options.plugins.tooltip.titleAlign = 'center';
        equityGrowthChart.options.plugins.tooltip.titleAlign = 'center';

        // Update the chart
        myChart.update();
        equityGrowthChart.update();

    }
    
    





    // Event handler for changes in 'Purchase Price'
    $('#purchase-price').on('input', function () {
        // Perform your calculation here (if needed)
        // handleNumericInput('#purchase-price');
        updateDiscount();
        propertyManagementFees();
        annualRepaymentAmount();
        loanExpenses(); 
        updateGraph(0.05);
        updateGraph(0.07);
        updateGraph(0.1);
    });

    // Event handler for changes in 'Market Value'
    $('#market-value').on('input', function () {
        // Perform your calculation here (if needed)
        // handleNumericInput('#market-value')
        updateDiscount();
        propertyManagementFees();
        annualRepaymentAmount();
        loanExpenses();
        updateGraph(0.05);
        updateGraph(0.07);
        updateGraph(0.1);
       

    });

    $('#rate_amount').on('input', function () {
        // Perform your calculation here (if needed)
        annualRepaymentAmount();
        loanExpenses();
    });
    $('#building_insurance_amount').on('input', function () {
        // Perform your calculation here (if needed)
        annualRepaymentAmount();
        loanExpenses();
    });
    $('#landlord_insurance_amount').on('input', function () {
        // Perform your calculation here (if needed)
        annualRepaymentAmount();
        loanExpenses();
    });
    $('#strata_fees_amount').on('input', function () {
        // Perform your calculation here (if needed)
        annualRepaymentAmount();
        loanExpenses();
    });
    $('#land_tax_amount').on('input', function () {
        // Perform your calculation here (if needed)
        annualRepaymentAmount();
        loanExpenses();
    });
    $('#maintenance_amount').on('input', function () {
        // Perform your calculation here (if needed)
        annualRepaymentAmount();
        loanExpenses();
    });
    // Event handler for changes in 'Down PAyment Value'
    $('#down-payment').on('input', function () {
        // Perform your calculation here (if needed)
        totalCashRequired();
    });

    // Event handler for changes in 'Property Improvements Value'
    $('#property-improvements').on('input', function () {
        // Perform your calculation here (if needed)
        totalCashRequired();
    });

    // Event handler for changes in 'legals Value'
    $('#legals').on('input', function () {
        // Perform your calculation here (if needed)
        totalCashRequired();
    });

    // Event handler for changes in 'stamp-duty-calculator Value'
    $('#stamp-duty-calculator').on('input', function () {
        // Perform your calculation here (if needed)
        totalCashRequired();
    });

    // Event handler for changes in ' other-costs Value'
    $('#other-costs').on('input', function () {
        // Perform your calculation here (if needed)
        totalCashRequired();
    });

    // Event handler for changes in 'buyer-agent-fees Value'
    $('#buyer-agent-fees').on('input', function () {
        // Perform your calculation here (if needed)
        totalCashRequired();
    });

    // Event handler for changes in 'loan-establishment-fee Value'
    $('#loan-establishment-fee').on('input', function () {
        // Perform your calculation here (if needed)
        loanEstablishedExpense();
    });

    // Event handler for changes in 'property-valuation Value'
    $('#property-valuation').on('input', function () {
        // Perform your calculation here (if needed)
        loanEstablishedExpense();
    });

    // Event handler for changes in 'lender-mortgage-insurance Value'
    $('#lender-mortgage-insurance').on('input', function () {
        // Perform your calculation here (if needed)
        loanEstablishedExpense();
    });

    // Event handler for changes in 'other-loan-costs Value'
    $('#other-loan-costs').on('input', function () {
        // Perform your calculation here (if needed)
        loanEstablishedExpense();
    });

    // Event handler for changes in 'management_fees_amount Value'
    $('#management_fees_amount').on('input', function () {
        // Perform your calculation here (if needed)
        propertyManagementFees();
        loanExpenses();
        annualRepaymentAmount();
    });

    // Event handler for changes in 'weekly_rent Value'
    $('#weekly_rent').on('input', function () {
        // Perform your calculation here (if needed)
        propertyManagementFees();
        annualRepaymentAmount();
        loanExpenses();

      // Update for 5%
        updateGraph(0.05);

        // Update for 7%
        updateGraph(0.07);

        // Update for 10%
        updateGraph(0.1);

    });

    // Event handler for changes in 'weekly_rent Value'
    $('#interest_rate').on('input', function () {
        // Perform your calculation here (if needed)
        loanExpenses();
        annualRepaymentAmount()
    });
    
    $('.amountInput, #management_fees_amount').on('input', function() {
            propertyManagementFees();
        });


    // Initial calculation when the page loads
    updateDiscount();
    totalCashRequired();
    loanEstablishedExpense();
    propertyManagementFees();
    loanExpenses();
     updateGraph(0.05);
    updateGraph(0.07);
    updateGraph(0.1);

});

$('#nav_Bars').click(function () {
    $('body').css('overflow', 'hidden');
    $('#sidebar-container').addClass('give_Full_Width');
    $('#layoutSidenav_nav').addClass('give_Width_350');
})
$('#close_Nav_Button').click(function () {
    $('body').css('overflow', 'auto');
    $('#sidebar-container').removeClass('give_Full_Width');
    $('#layoutSidenav_nav').removeClass('give_Width_350');
})
var currentUrl = window.location.href;

// Iterate through each link and compare its href with the current URL
$('#layoutSidenav_nav a').each(function () {
    var linkUrl = $(this).attr('href');

    // Check if the link's href matches the current URL
    if (currentUrl.indexOf(linkUrl) !== -1) {
        // Add the "activeLink" class to the matching link
        $(this).addClass('activeLink');
    }
});