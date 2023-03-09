// const data = await fetch('./data/sample-data.json').then((response) => response.json());

// Exceptions for Code Spell Checker extension in VS Code
// cspell: ignore ment

// -------------------------------------------------------------------------------

// *--------------- Establishing initial state of the app -----------------------*

// Creating current date and putting it in an element to append to <h2> in <main>
const date = new Date().toLocaleDateString('en-us', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

const timeElement = document.getElementById('date');
timeElement.innerText = date;

// Creating object for storing the current state of the app
const record = {
  user: {
    name: 'Guest',
    entries: [
      {
        timestamp: date,
        symptoms: [],
      },
    ],
  },
};

const { symptoms } = record.user.entries[0]; // destructuring to get entries for later use

// Selecting initial <button> and <p> nodes in <main>
const createRecordBtn = document.querySelector('#create-record');
const noRecordP = document.querySelector('#no-record');

// -------------------------------------------------------------------------------

// *------ Establishing state after 'Create a New Record' button is clicked ------*

// Creating <form> node
const form = document.createElement('form');
form.classList.add('empty'); // will be used to disable submit button when no symptoms in record
form.id = 'symptom-list';

// Creating 'Physical' <div> node
const physical = document.createElement('div');
physical.id = 'physical';

// Creating 'Mental' <div> node
const mental = document.createElement('div');
mental.id = 'mental';

// Creating <h3> for title of Physical <div> and appending it
const physicalTitle = document.createElement('h3');
physicalTitle.innerText = 'Physical';
physical.appendChild(physicalTitle);

// Creating <h3> for title of Mental <div> and appending it
const mentalTitle = document.createElement('h3');
mentalTitle.innerText = 'Mental';
mental.appendChild(mentalTitle);

// Creating and appending <label> elements for text <input> elements
const newPhysLabel = document.createElement('label');
newPhysLabel.setAttribute('for', 'new-phys-symptom');
newPhysLabel.innerText = 'New Symptom';
physical.appendChild(newPhysLabel);

const newMentLabel = document.createElement('label');
newMentLabel.setAttribute('for', 'new-ment-symptom');
newMentLabel.innerText = 'New Symptom';
mental.appendChild(newMentLabel);

// Creating and appending <input> for adding a new physical symptom to record
const newPhysSymptom = document.createElement('input');
newPhysSymptom.setAttribute('type', 'text');
newPhysSymptom.setAttribute('name', 'new-phys-symptom-name');
newPhysSymptom.id = 'new-phys-symptom';
newPhysSymptom.setAttribute('minlength', 1);
newPhysSymptom.placeholder = 'Type here to add symptom';
physical.appendChild(newPhysSymptom);

// Creating and appending <input> for adding a new mental symptom to record
const newMentSymptom = document.createElement('input');
newMentSymptom.setAttribute('type', 'text');
newMentSymptom.setAttribute('name', 'new-ment-symptom-name');
newMentSymptom.setAttribute('minlength', 1);
newMentSymptom.placeholder = 'Type here to add symptom';
newMentSymptom.id = 'new-ment-symptom';
mental.appendChild(newMentSymptom);

// Creating and appending a '+ Add' <button> to Physical <div>
const addPhysBtn = document.createElement('button');
addPhysBtn.setAttribute('type', 'button');
addPhysBtn.classList.add = 'add-symptom';
addPhysBtn.disabled = true;
addPhysBtn.id = 'add-phys-symptom';

const plusSymbolPhys = document.createElement('span');
plusSymbolPhys.innerText = '+';
addPhysBtn.appendChild(plusSymbolPhys);

const physBtnText = document.createElement('span');
physBtnText.innerText = 'Add';
addPhysBtn.appendChild(physBtnText);

physical.appendChild(addPhysBtn);

// Creating and appending a '+ Add' <button> to Mental <div>
const addMentBtn = document.createElement('button');
addMentBtn.setAttribute('type', 'button');
addMentBtn.disabled = true;
addMentBtn.classList.add = 'add-symptom';
addMentBtn.id = 'add-ment-symptom';

const plusSymbolMent = document.createElement('span');
plusSymbolMent.innerText = '+';
addMentBtn.appendChild(plusSymbolMent);

const mentBtnText = document.createElement('span');
mentBtnText.innerText = 'Add';
addMentBtn.appendChild(mentBtnText);

mental.appendChild(addMentBtn);

// Appending Physical and Mental <div>s to <form>
form.appendChild(physical);
form.appendChild(mental);

// Creating and appending submit <button> to <form>
const submitBtn = document.createElement('button');
submitBtn.setAttribute('disabled', '');
submitBtn.innerText = 'Submit';

form.appendChild(submitBtn);

// --------------------------------------------------------------------------------

// *--------- Creating event listener to 'Create a New Record' on click -----------*

createRecordBtn.addEventListener('click', () => {
  // Disappear <p> and createRecordBtn <button>
  createRecordBtn.remove();
  noRecordP.remove();

  // Append <form> to <section> in order to populate the HTML
  const section = document.querySelector('section');
  section.appendChild(form);
});

// ------------------------------------------------------------------------------------------

// *---- Creating event listeners to enable '+ Add' buttons when content is in <input> -----*

// Enable new physical symptom button
newPhysSymptom.addEventListener('input', (event) => {
  if (event.target.value) {
    addPhysBtn.disabled = false;
  } else {
    addPhysBtn.disabled = true;
  }
});

// Enable new mental symptom button
newMentSymptom.addEventListener('input', (event) => {
  if (event.target.value) {
    addMentBtn.disabled = false;
  } else {
    addMentBtn.disabled = true;
  }
});

// --------------------------------------------------------------------------------------------

// *--- Creating event listeners to enable submit button when symptoms are added to record ----*

// Event listener on new physical symptom <button>
addPhysBtn.addEventListener('click', () => {
  submitBtn.disabled = false;

  const newSymptom = {
    name: '',
    severity: undefined,
    type: 'physical',
  };

  entries.push(newSymptom);
  console.log(entries);
});

// Event listener on new mental symptom <button>
addMentBtn.addEventListener('click', () => {
  submitBtn.disabled = false;
});

// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------

// *----- BELOW IS CODE TO DRAW FROM FOR FUNCTIONALITY AFTER NEW RECORD IS CREATED -----*

// // Creating <div> elements for physical and mental symptom types
// const { symptoms } = data.user.entries[0];

// // For symptom type <div>s
// let physical;
// let mental;

// let physicalDivCreated = false;
// let mentalDivCreated = false;

// const severityScale = {
//   0: 'none',
//   1: 'mild',
//   2: 'moderate',
//   3: 'severe',
// };

// symptoms.forEach((element) => {
//   if (element.type === 'physical' && !physicalDivCreated) {
//     // Creating <div>
//     physical = document.createElement('div');
//     physical.id = 'physical';
//     physicalDivCreated = true;

//   if (element.type === 'mental' && !mentalDivCreated) {
//     // Creating <div>
//     mental = document.createElement('div');
//     mental.id = 'mental';
//     mentalDivCreated = true;

//     // Adding <div> to <form>
//     form.appendChild(mental);
//   }

//   // Creating symptom name and severity entry to place in <div>
//   if (element.name) {
//     // Creating <fieldset>
//     const fieldset = document.createElement('fieldset');
//     fieldset.id = element.name;

//     // Creating and adding <legend>
//     const legend = document.createElement('legend');
//     // const legendText = document.createElement('span');
//     // legendText.innerText = element.name;
//     // legend.appendChild(legendText);
//     legend.innerText = element.name;
//     fieldset.appendChild(legend);

//     // Creating and adding <div> for severity buttons
//     const buttonsDiv = document.createElement('div');
//     fieldset.appendChild(buttonsDiv);

//     // Creating severity scale buttons
//     for (const property in severityScale) {
//       const severityRating = document.createElement('button');
//       severityRating.setAttribute('form', 'symptom-list');
//       severityRating.setAttribute('type', 'button');
//       severityRating.setAttribute('name', severityScale[property]);
//       severityRating.setAttribute('value', property);
//       severityRating.id = 'none';

//       severityRating.innerText = severityScale[property];
//       buttonsDiv.appendChild(severityRating);

//       // Setting the severity rating for symptom based on data.json
//       if (property == element.severity) {
//         severityRating.setAttribute('checked', '');
//       }
//     }

//     // Adding fieldset to <div> with corresponding symptom type
//     if (element.type === 'physical') {
//       physical.appendChild(fieldset);
//     }

//     if (element.type === 'mental') {
//       mental.appendChild(fieldset);
//     }
//   }
// });

// // Creating and adding "Add new symptom" buttons
// const formArray = [...form.children];
// formArray.forEach((element) => {
//   if (element.id === 'physical' || element.id === 'mental') {
//     const newSymptomButton = document.createElement('button');
//     newSymptomButton.setAttribute('type', 'button');
//     newSymptomButton.id = element.id;

//     const plusSymbol = document.createElement('span');
//     plusSymbol.innerText = '+';
//     newSymptomButton.appendChild(plusSymbol);

//     const buttonText = document.createElement('span');
//     buttonText.innerText = 'Add new symptom';
//     newSymptomButton.appendChild(buttonText);

//     element.appendChild(newSymptomButton);
//   }
// });

// // Add <form> to <section>
// const section = document.querySelector('section');
// section.appendChild(form);
