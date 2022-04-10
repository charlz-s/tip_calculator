'use strict';

let billDiv = document.querySelector('.bill'),
billInput = document.querySelector('#bill-input'),
peopleDiv = document.querySelector('.people'),
peopleInput = document.querySelector('#people-input'),
customButton = document.querySelector('.custom'),
buttonsDiv = document.querySelector('.buttons-div'),
reset = document.querySelector('#reset');

let tipPerPerson = document.querySelector('#tip-per-person')
let totalPerPerson = document.querySelector('#total-per-person')
let totalBill = document.querySelector('#total-bill')

// create custom % input for tips
let customInput = document.createElement('input');
customInput.setAttribute('type', 'number')
customInput.setAttribute('id', 'customInput')
customInput.style.display = 'none'
buttonsDiv.appendChild(customInput)

// create error message
let error = document.createElement('span')

// focus on the bill input
billInput.addEventListener('mouseover', () => {
   billInput.focus();
   billInput.style.border = '2px solid hsl(172, 67%, 45%)'
   peopleInput.style.border = ''
   customInput.style.border = ''

   customInput.style.display = 'none';
   customButton.style.display = '';
})
// focus on the number of people input
peopleInput.addEventListener('mouseover', () => {
   peopleInput.focus();
   peopleInput.style.border = '2px solid hsl(172, 67%, 45%)'
   billInput.style.border = ''
   customInput.style.border = ''
   
   customInput.style.display = 'none';
   customButton.style.display = '';
})

// hide the custom button and display the custom input
customButton.addEventListener('click', () => {
   customButton.style.transition = '.2s ease-in-out';
   customInput.style.display = '';
   customButton.style.display = 'none';
   customInput.focus();
   customInput.style.border = '2px solid hsl(172, 67%, 45%)'
   billInput.style.border = ''
   peopleInput.style.border = ''
})


document.addEventListener('click', (e) => {
   if (e.target.classList.contains('percent')){
      console.log(e.target.children[0].textContent)
      
      function calculateTip () {
         
         let bill = billInput.value;
         let tip = e.target.children[0].textContent;
         let people = peopleInput.value;

         let totalTip = bill * (tip / 100);
         let personTip = Math.floor((bill * (tip / 100)) / people);
         let personBill = Math.floor(personTip + (bill / people));
         let billAmount = Math.floor((bill - totalTip) + (totalTip * 2));

         if (bill.length >= 1
             && people.length >= 1 
             && bill != 0 
             && people != 0
            ) {
            tipPerPerson.children[0].textContent = personTip
            totalPerPerson.children[0].textContent = personBill
            totalBill.children[0].textContent = billAmount
         } 
         else if (bill.length < 1) {
            billInput.style.border = '2px solid red'
         }
         else if (people.length < 1) {
            peopleInput.style.border = '2px solid red'
         }
         
         // if (bill == 0) {
         //    error.textContent = `value cannot be x`
         //    billDiv.children[0].appendChild(error)
         // }

      }

      calculateTip();
   }
   
   

});


// reset calculator 
reset.addEventListener('click', () => {
   billInput.value = '';
   customInput.value = '';
   peopleInput.value = '';
   customInput.style.display = 'none';
   customButton.style.display = '';

   tipPerPerson.children[0].innerHTML = '0.00';
   totalPerPerson.children[0].innerHTML = '0.00';
   totalBill.children[0].innerHTML = '0.00';
})
