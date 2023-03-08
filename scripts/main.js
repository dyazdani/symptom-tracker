const data = await fetch('./data/sample-data.json').then((response) => response.json());

// Creating and adding date
const date = new Date().toLocaleDateString('en-us', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

const timeElement = document.getElementById('date');
timeElement.innerText = date;

// Select <button> and <p> nodes for intial page
const createRecordBtn = document.querySelector('#create-record');
const noRecordP = document.querySelector('#no-record');

// Create 'Create a New Record' button event listener
createRecordBtn.addEventListener('click', (event) => {
  // Disappear <p> and createRecordBtn
  createRecordBtn.style.display = 'none';
  noRecordP.style.display = 'none';

  // Creating <form> node
  const form = document.createElement('form');
  form.id = 'symptom-list';

  // Create 'Phsyical' <div>
  const physical = document.createElement('div');
  physical.id = 'physical';

  // Create 'Mental' <div>
  const mental = document.createElement('div');
  mental.id = 'mental';

  // Create <label>s
  const newPhysLabel = document.createElement('label');
  newPhysLabel.setAttribute('for', 'new-phys-symptom');
  newPhysLabel.innerText = 'New Symptom';
  physical.appendChild(newPhysLabel);

  const newMentLabel = document.createElement('label');
  newMentLabel.setAttribute('for', 'new-ment-symptom');
  newMentLabel.innerText = 'New Symptom';
  mental.appendChild(newMentLabel);

  // Create 'New Physical Symptom' <input>
  const newPhysSymptom = document.createElement('input');
  newPhysSymptom.setAttribute('type', 'text');
  newPhysSymptom.setAttribute('name', 'new-phys-symptom-name');
  newPhysSymptom.id = 'new-phys-symptom';
  physical.appendChild(newPhysSymptom);

  // Create 'New Mental Symptom' <input>
  const newMentSymptom = document.createElement('input');
  newMentSymptom.setAttribute('type', 'text');
  newMentSymptom.setAttribute('name', 'new-ment-symptom-name');
  newMentSymptom.id = 'new-ment-symptom';
  mental.appendChild(newMentSymptom);

  // Create Physical '+ Add' <button>
  const addPhysBtn = document.createElement('button');
  addPhysBtn.setAttribute('type', 'button');
  addPhysBtn.classList.add = 'add-symptom';
  addPhysBtn.id = 'add-phys-symptom';

  const plusSymbolPhys = document.createElement('span');
  plusSymbolPhys.innerText = '+';
  addPhysBtn.appendChild(plusSymbolPhys);

  const physBtnText = document.createElement('span');
  physBtnText.innerText = 'Add';
  addPhysBtn.appendChild(physBtnText);

  physical.appendChild(addPhysBtn);

  // Create Mental '+ Add' <button>
  const addMentBtn = document.createElement('button');
  addMentBtn.setAttribute('type', 'button');
  addMentBtn.classList.add = 'add-symptom';
  addMentBtn.id = 'add-ment-symptom';

  const plusSymbolMent = document.createElement('span');
  plusSymbolMent.innerText = '+';
  addMentBtn.appendChild(plusSymbolMent);

  const mentBtnText = document.createElement('span');
  mentBtnText.innerText = 'Add';
  addMentBtn.appendChild(mentBtnText);

  mental.appendChild(addMentBtn);

  // Add phys and ment <div>s to <form>
  form.appendChild(physical);
  form.appendChild(mental);

  // Create and add submit <button>
  const submitBtn = document.createElement('button');
  submitBtn.innerText = 'Submit';

  form.appendChild(submitBtn);

  // Add <form> to <section>
  const section = document.querySelector('section');
  section.appendChild(form);
});

// ** ----- BELOW IS CODE TO DRAW FROM FOR FUNCTIONALITY AFTER NEW RECORD IS CREATED ------ **

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

//     // Creating <h3> (aka title of <div>)
//     const physicalTitle = document.createElement('h3');
//     physicalTitle.innerText = 'Physical';
//     physical.appendChild(physicalTitle);

//     // Adding <div> to <form>
//     form.appendChild(physical);
//   }

//   if (element.type === 'mental' && !mentalDivCreated) {
//     // Creating <div>
//     mental = document.createElement('div');
//     mental.id = 'mental';
//     mentalDivCreated = true;

//     // Creating <h3> (aka title of <div>)
//     const mentalTitle = document.createElement('h3');
//     mentalTitle.innerText = 'Mental';
//     mental.appendChild(mentalTitle);

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
