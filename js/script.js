'use strict';

// target elements from the DOM
let billDiv = document.querySelector('.bill'),
billInput = document.querySelector('#bill-input'),
peopleDiv = document.querySelector('.people'),
peopleInput = document.querySelector('#people-input'),
customButton = document.querySelector('.custom'),
buttonsDiv = document.querySelector('.buttons-div'),
reset = document.querySelector('#reset'),
loading = document.querySelector('#loading'),
personTipDiv = document.querySelector('#person-tip'),
totalTipDiv = document.querySelector('#total-tip'),
billDisplayDiv = document.querySelector('#billDisplayDiv');

let tipPerPerson = document.querySelector('#tip-per-person')
let totalPerPerson = document.querySelector('#total-per-person')
let totalBill = document.querySelector('#total-bill')

// hide loader
loading.style.display = 'none';

// create custom % input for tips
let customDiv = document.createElement('div');
customDiv.setAttribute('id', 'customDiv')
customDiv.style.display = 'none'

let customInput = document.createElement('input');
customInput.setAttribute('type', 'number')
customInput.setAttribute('id', 'customInput')
customInput.style.display = 'none'

let customSpan = document.createElement('span');
customSpan.innerHTML = '%'

customDiv.appendChild(customInput)
customDiv.appendChild(customSpan)

buttonsDiv.appendChild(customDiv)

// create error message
let error1 = document.createElement('span')
error1.className = 'display-error'
error1.textContent = `INVALID VALUE`

let error2 = document.createElement('span')
error2.className = 'display-error'
error2.textContent = `INVALID VALUE`

// focus on the bill input
billInput.addEventListener('click', () => {
   billInput.focus();
   billInput.style.border = '2px solid hsl(172, 67%, 45%)'
   peopleInput.style.border = ''
   customInput.style.border = ''

   customInput.style.display = 'none';
   customDiv.style.display = 'none';
   customButton.style.display = '';
})
// focus on the number of people input
peopleInput.addEventListener('click', () => {
   peopleInput.focus();
   peopleInput.style.border = '2px solid hsl(172, 67%, 45%)'
   billInput.style.border = ''
   customInput.style.border = ''
   
   customInput.style.display = 'none';
   customDiv.style.display = 'none';
   customButton.style.display = '';
})

// hide the custom button and display the custom input
customButton.addEventListener('click', () => {
   customButton.style.transition = '.2s ease-in-out';
   customDiv.style.display = '';
   customInput.style.display = '';
   customButton.style.display = 'none';
   customInput.focus();
   customInput.style.border = '2px solid hsl(172, 67%, 45%)'
   billInput.style.border = ''
   peopleInput.style.border = ''
})

// listen for clicks on tip % buttons
document.addEventListener('click', (e) => {
   if (e.target.classList.contains('percent')){
      
      // calculate tip, bill and amounts per person
      function calculateTip () {
         
         let bill = billInput.value;
         let tip = e.target.children[0].textContent;
         let people = peopleInput.value;

         let totalTip = bill * (tip / 100);
         let personTip = Math.floor((bill * (tip / 100)) / people);
         let personBill = Math.floor(personTip + (bill / people));
         let billAmount = Math.floor((bill - totalTip) + (totalTip * 2));


         // display calculated value on the calculator screen
         if (bill.length >= 1
             && people.length >= 1 
             && bill != 0 
             && people != 0
            ) {

            // display loader and hide other elements
            loading.style.display = '';
            personTipDiv.style.display = 'none';
            totalTipDiv.style.display = 'none';
            billDisplayDiv.style.display = 'none';
            reset.style.display = 'none';
   
            setTimeout(removeLoader, (Math.random() * 2000));
            
            // hide loader and display other elements
            function removeLoader (){
               loading.style.display = 'none';
               personTipDiv.style.display = '';
               totalTipDiv.style.display = '';
               billDisplayDiv.style.display = '';
               reset.style.display = '';
            }

            tipPerPerson.children[0].textContent = personTip
            totalPerPerson.children[0].textContent = personBill
            totalBill.children[0].textContent = billAmount
         }
         else if (bill.length < 1 && people.length < 1) {
            billInput.style.border = '2px solid red'
            peopleInput.style.border = '2px solid red'
         }
         else if (bill.length < 1) {
            billInput.style.border = '2px solid red'
         }
         else if (people.length < 1) {
            peopleInput.style.border = '2px solid red'
         }
   
         // display error if inputs empty
         if (bill == 0) {
            billDiv.children[0].appendChild(error1)
         }
         if (people == 0) {
            peopleDiv.children[0].appendChild(error2)
         }

         // timer to hide error after 5secs
         setTimeout(hideError, 3000)

         function hideError() {
            error1.remove()
            error2.remove()
            billInput.style.border = ''
            peopleInput.style.border = ''
         }
      }

      calculateTip();
   }
});

// custom % tipping
document.body.addEventListener('keyup', (e) => {

   // if enter key is clicked, the conditional would run
   if (e.key == 'Enter') {

      if (e.target.id == 'customInput') {
         function calculateTip () {
            
            let bill = billInput.value;
            let tip = e.target.value;
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
    
               // display loader and hide other elements
               loading.style.display = '';
               personTipDiv.style.display = 'none';
               totalTipDiv.style.display = 'none';
               billDisplayDiv.style.display = 'none';
               reset.style.display = 'none';
      
               setTimeout(removeLoader, (Math.random() * 2000));
               
               // hide loader and display other elements
               function removeLoader (){
                  loading.style.display = 'none';
                  personTipDiv.style.display = '';
                  totalTipDiv.style.display = '';
                  billDisplayDiv.style.display = '';
                  reset.style.display = '';
               }
   
   
               tipPerPerson.children[0].textContent = personTip
               totalPerPerson.children[0].textContent = personBill
               totalBill.children[0].textContent = billAmount
            } 
            else if (bill.length < 1 && people.length < 1) {
               billInput.style.border = '2px solid red'
               peopleInput.style.border = '2px solid red'
            }
            else if (bill.length < 1) {
               billInput.style.border = '2px solid red'
            }
            else if (people.length < 1) {
               peopleInput.style.border = '2px solid red'
            }
   
            
            if (bill == 0) {
               billDiv.children[0].appendChild(error1)
            }
            if (people == 0) {
               peopleDiv.children[0].appendChild(error2)
            }
   
            setTimeout(hideError, 3000)
   
            function hideError() {
               error1.remove()
               error2.remove()
               billInput.style.border = ''
               peopleInput.style.border = ''
            }
         }
   
         calculateTip();
      } 
   }
   
})


// reset calculator 
reset.addEventListener('click', () => {
   billInput.value = '';
   customInput.value = '';
   peopleInput.value = '';
   customInput.style.display = 'none';
   customDiv.style.display = 'none';
   customButton.style.display = '';
   billInput.style.border = ''
   peopleInput.style.border = ''

   // set calculator display back to default
   tipPerPerson.children[0].innerHTML = '0.00';
   totalPerPerson.children[0].innerHTML = '0.00';
   totalBill.children[0].innerHTML = '0.00';

   // remove error
   error1.remove()
   error2.remove()

})
