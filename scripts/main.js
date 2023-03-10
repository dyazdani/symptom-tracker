// const data = await fetch('./data/sample-data.json').then((response) => response.json());

// Exceptions for Code Spell Checker extension in VS Code
// cspell: ignore ment radiogroup radiogroups btn btns labelledby

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
        'physical-symptoms': [],
        'mental-symptoms': [],
      },
    ],
  },
};

// destructuring to get physical and mental symptom entries for later use
const { 'physical-symptoms': physSymptoms, 'mental-symptoms': mentSymptoms } = record.user.entries[0];

// Selecting initial <button> and <p> nodes in <main>
const createRecordBtn = document.querySelector('#create-record');
const noRecordP = document.querySelector('#no-record');

// -------------------------------------------------------------------------------

// *------ Establishing state after 'Create a New Record' button is clicked ------*

// Creating <form> node
const form = document.createElement('form');
form.classList.add('empty'); // will be used to disable submit button when no symptoms in record
form.id = 'symptom-list';

// -----

// Creating 'Physical' <div> node
const physical = document.createElement('div');
physical.id = 'physical';

// -----

// Creating 'Mental' <div> node
const mental = document.createElement('div');
mental.id = 'mental';

// -----

// Creating <h3> for title of Physical <div> and appending it
const physicalTitle = document.createElement('h3');
physicalTitle.innerText = 'Physical';
physical.appendChild(physicalTitle);

// -----

// Creating <h3> for title of Mental <div> and appending it
const mentalTitle = document.createElement('h3');
mentalTitle.innerText = 'Mental';
mental.appendChild(mentalTitle);

// -----

// Creating and appending <label> elements for text <input> elements
const newPhysLabel = document.createElement('label');
newPhysLabel.setAttribute('for', 'new-phys-symptom');
newPhysLabel.innerText = 'New Symptom';
physical.appendChild(newPhysLabel);

const newMentLabel = document.createElement('label');
newMentLabel.setAttribute('for', 'new-ment-symptom');
newMentLabel.innerText = 'New Symptom';
mental.appendChild(newMentLabel);

// -----

// Creating and appending text <input> for adding a new physical symptom to record
const newPhysInput = document.createElement('input');
newPhysInput.setAttribute('type', 'text');
newPhysInput.setAttribute('name', 'new-phys-input-name');
newPhysInput.id = 'new-phys-input';
newPhysInput.setAttribute('minlength', 1);
newPhysInput.placeholder = 'Type here to add symptom';
physical.appendChild(newPhysInput);

// -----

// Creating and appending text <input> for adding a new mental symptom to record
const newMentInput = document.createElement('input');
newMentInput.setAttribute('type', 'text');
newMentInput.setAttribute('name', 'new-ment-input-name');
newMentInput.setAttribute('minlength', 1);
newMentInput.placeholder = 'Type here to add symptom';
newMentInput.id = 'new-ment-input';
mental.appendChild(newMentInput);

// -----

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

// -----

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

// -----

// Appending Physical and Mental <div>s to <form>
form.appendChild(physical);
form.appendChild(mental);

// -----

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

// -----------------------------------------------------------------------------

// *------ Creating functions to render record after symptom is added ------*

const severities = ['none', 'mild', 'moderate', 'severe'];

// *-------- Rendering Physical Symptom --------*

function renderPhysSymptom() {
  const lastPhysSymptom = physSymptoms[physSymptoms.length - 1].name;

  // Creating radiogroup <div>
  const physicalRadiogroup = document.createElement('div');
  physicalRadiogroup.classList.add('physical-radiogroup');
  physicalRadiogroup.setAttribute('role', 'radiogroup');
  physicalRadiogroup.setAttribute('aria-labelledby', `legend-${lastPhysSymptom}`);
  physicalRadiogroup.id = lastPhysSymptom;

  // Creating and adding <p> for legend
  const physLegend = document.createElement('p');
  physLegend.id = `legend-${lastPhysSymptom}`;
  physLegend.innerText = lastPhysSymptom;
  physicalRadiogroup.appendChild(physLegend);

  // Creating and adding severity buttons
  for (let i = 0; i < severities.length; i += 1) {
    const buttonSpan = document.createElement('span');

    const button = document.createElement('button');
    button.className = `severity ${severities[i]}`;
    button.setAttribute('type', 'button');
    button.setAttribute('role', 'radio');
    button.setAttribute('aria-checked', 'false');
    button.setAttribute('tabindex', '0');
    button.setAttribute('aria-labelledby', `${severities[i]}Label`);
    button.setAttribute('data-value', 'False');

    const buttonLabel = document.createElement('label');
    buttonLabel.innerText = severities[i];
    buttonLabel.id = `${severities[i]}Label`;

    button.appendChild(buttonLabel);
    buttonSpan.appendChild(button);
    physicalRadiogroup.appendChild(buttonSpan);
  }

  // Appending radiogroup to physical <div>
  physical.insertBefore(physicalRadiogroup, newPhysLabel);
}

// *-------- Rendering Mental Symptom --------*

function renderMentSymptom() {
  // *-------- Rendering Mental Symptom --------*
  const lastMentSymptom = mentSymptoms[mentSymptoms.length - 1].name;

  // Creating radiogroup <div>
  const mentalRadiogroup = document.createElement('div');
  mentalRadiogroup.classList.add('mental-radiogroup');
  mentalRadiogroup.setAttribute('role', 'radiogroup');
  mentalRadiogroup.setAttribute('aria-labelledby', `legend-${lastMentSymptom}`);
  mentalRadiogroup.id = lastMentSymptom;

  // Creating and adding <p> for legend
  const mentLegend = document.createElement('p');
  mentLegend.id = `legend-${lastMentSymptom}`;
  mentLegend.innerText = lastMentSymptom;
  mentalRadiogroup.appendChild(mentLegend);

  // Creating and adding severity buttons
  for (let i = 0; i < severities.length; i += 1) {
    const buttonSpan = document.createElement('span');

    const button = document.createElement('button');
    button.className = `severity ${severities[i]}`;
    button.setAttribute('type', 'button');
    button.setAttribute('role', 'radio');
    button.setAttribute('aria-checked', 'false');
    button.setAttribute('tabindex', '0');
    button.setAttribute('aria-labelledby', `${severities[i]}Label`);
    button.setAttribute('data-value', 'False');

    const buttonLabel = document.createElement('label');
    buttonLabel.innerText = severities[i];
    buttonLabel.id = `${severities[i]}Label`;

    button.appendChild(buttonLabel);
    buttonSpan.appendChild(button);
    mentalRadiogroup.appendChild(buttonSpan);
  }

  // Appending radiogroup to mental <div>
  mental.insertBefore(mentalRadiogroup, newMentLabel);
}

// -----------------------------------------------------------------------------

// *------ Creating function to render record after severity is selected ------*

// *-------- Rendering Physical Symptom Severity Ratings --------*
function renderPhysSeverity() {
  const [...checkedPhysicalSeverities] = document.querySelectorAll('#physical[checked]');
  const [...physicalRadiogroups] = document.querySelectorAll('.physical-radiogroup');

  // Iterate through each physical symptom in record
  for (let i = 0; i < physSymptoms.length; i += 1) {
    // Uncheck checked button element in radiogroups if it doesn't match record anymore
    if (!checkedPhysicalSeverities[i].classList.contains(physSymptoms[i].severity)) {
      checkedPhysicalSeverities[i].checked = false;
      checkedPhysicalSeverities[i].setAttribute('aria-checked', 'false');
      checkedPhysicalSeverities[i].setAttribute('data-value', 'False');
    }

    // Find button element corresponding with new severity selection
    const [...allRadiogroupBtns] = physicalRadiogroups[i].children;
    const selectedSeverity = allRadiogroupBtns.filter((element) => {
      element.classList.contains(physSymptoms[i].severity);
    });

    // Check new severity selection
    selectedSeverity.checked = true;
    selectedSeverity.setAttribute('aria-checked', 'true');
    selectedSeverity.setAttribute('data-value', 'True');
  }
}

// *-------- Rendering Mental Symptom Severity Ratings --------*
function renderMentSeverity() {
  const [...checkedMentalSeverities] = document.querySelectorAll('#mental[checked]');
  const [...mentalRadiogroups] = document.querySelectorAll('.mental-radiogroup');

  // Iterate through each mental symptom in record
  for (let i = 0; i < mentSymptoms.length; i += 1) {
    // Uncheck checked button element in radiogroups if it doesn't match record anymore
    if (!checkedMentalSeverities[i].classList.contains(mentSymptoms[i].severity)) {
      checkedMentalSeverities[i].checked = false;
      checkedMentalSeverities[i].setAttribute('aria-checked', 'false');
      checkedMentalSeverities[i].setAttribute('data-value', 'False');
    }

    // Find button element corresponding with new severity selection
    const [...allRadiogroupBtns] = mentalRadiogroups[i].children;
    const selectedSeverity = allRadiogroupBtns.filter((element) => {
      element.classList.contains(mentSymptoms[i].severity);
    });

    // Check new severity selection
    selectedSeverity.checked = true;
    selectedSeverity.setAttribute('aria-checked', 'true');
    selectedSeverity.setAttribute('data-value', 'True');
  }
}

// ------------------------------------------------------------------------------------------

// *---- Creating event listeners to enable '+ Add' buttons when content is in <input> -----*

// Enable new physical symptom button
newPhysInput.addEventListener('input', (event) => {
  if (event.target.value === '') {
    addPhysBtn.disabled = true;
  } else {
    addPhysBtn.disabled = false;
  }
});

// -----

// Enable new mental symptom button
newMentInput.addEventListener('input', (event) => {
  if (event.target.value === '') {
    addMentBtn.disabled = true;
  } else {
    addMentBtn.disabled = false;
  }
});

// --------------------------------------------------------------------------------------------

// *--- Creating event listeners to enable submit button when symptoms are added to record ----*

// Event listener on new physical symptom <button>
addPhysBtn.addEventListener('click', () => {
  // Enable submit button
  submitBtn.disabled = false;

  // Create and add new physical symptom
  const newSymptom = {
    name: newPhysInput.value,
    severity: undefined,
    type: 'physical',
  };

  newPhysInput.value = '';
  addPhysBtn.disabled = true;

  physSymptoms.push(newSymptom);

  renderPhysSymptom();
});

// -----

// Event listener on new mental symptom <button>
addMentBtn.addEventListener('click', () => {
  // Enable submit button
  submitBtn.disabled = false;

  // Create and add blank mental symptom
  const newSymptom = {
    name: newMentInput.value,
    severity: undefined,
    type: 'mental',
  };

  newMentInput.value = '';
  addMentBtn.disabled = true;

  mentSymptoms.push(newSymptom);

  renderMentSymptom();
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
