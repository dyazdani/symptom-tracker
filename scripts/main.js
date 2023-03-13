// const data = await fetch('./data/sample-data.json').then((response) => response.json());

// Exceptions for Code Spell Checker extension in VS Code
// cspell: ignore ment radiogroup radiogroups btn btns labelledby

// -------------------------------------------------------------------------------

// *--------------- Establishing initial state of the app -----------------------*

// select <section> node
const section = document.querySelector('section');

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
const state = {
  record: {
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
  },
  isSubmitted: false,
  isInProgress: false,
  isModalShowing: false,
  symptomAdded: false,
  allSelectedSeveritiesShowing: false,
};

// destructuring to get physical and mental symptom entries for later use
const { 'physical-symptoms': physSymptoms, 'mental-symptoms': mentSymptoms } = state.record.user.entries[0];

// Creating and appending initial <p> and <button> elements
const noRecordP = document.createElement('p');
noRecordP.id = 'no-record';
noRecordP.innerText = "You don't have a symptom record yet for today.";

const createRecordBtn = document.createElement('button');
createRecordBtn.id = 'create-record';
createRecordBtn.setAttribute('type', 'button');
createRecordBtn.innerText = 'Create a New Record';

section.appendChild(noRecordP);
section.appendChild(createRecordBtn);

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
submitBtn.setAttribute('type', 'button');
submitBtn.id = 'submit-button';
submitBtn.innerText = 'Submit';

form.appendChild(submitBtn);

// --------------------------------------------------------------------------------

// *--------- Creating event listener to 'Create a New Record' on click -----------*

createRecordBtn.addEventListener('click', () => {
  // Update state object
  state.isInProgress = true;

  // Disappear <p> and createRecordBtn <button>
  createRecordBtn.remove();
  noRecordP.remove();

  // Append <form> to <section> in order to populate the HTML
  section.appendChild(form);
});

// -----------------------------------------------------------------------------

// *------ Creating functions to render record after severity is selected ------*

// *-------- Rendering Physical Symptom Severity Ratings --------*
function renderPhysSeverity() {
  // Get array of all physical radiogroup <div>s
  const [...physRadioDivs] = document.querySelectorAll('.physical-radiogroup');
  const [...mentRadioDivs] = document.querySelectorAll('.mental-radiogroup');

  // Iterate through each physical symptom in record
  for (let i = 0; i < physSymptoms.length; i += 1) {
    // Selected  severity in record object
    const severityFromRecord = physSymptoms[i].severity;
    const physRadioChildren = [...physRadioDivs[i].children];
    const checkedSeverityBtnIndex = physRadioChildren.findIndex((element) => element.hasAttribute('checked'));

    // if there is a checked button in current div
    if (checkedSeverityBtnIndex > -1) {
      const checkedBtn = physRadioChildren[checkedSeverityBtnIndex];

      // if checked button does not matches record
      if (!checkedBtn.classList.contains(severityFromRecord)) {
        // Uncheck checked button element if it doesn't match record anymore
        checkedBtn.removeAttribute('checked');
        checkedBtn.setAttribute('aria-checked', 'false');
        checkedBtn.setAttribute('data-value', 'False');
      } else {
        continue;
      }
    }

    if (severityFromRecord !== undefined) {
      // Find button element matching severity selection in record object
      const matchingSeverityBtnIndex = physRadioChildren.findIndex((element) => element.classList.contains(severityFromRecord));

      // Check button whose classList had a match to record object severity property
      physRadioChildren[matchingSeverityBtnIndex].setAttribute('checked', '');
      physRadioChildren[matchingSeverityBtnIndex].setAttribute('aria-checked', 'true');
      physRadioChildren[matchingSeverityBtnIndex].setAttribute('data-value', 'True');
    }
  }

  // Update state object if every symptom has severity selected and rendered
  const isChecked = (element) => element.hasAttribute('checked');

  let physSymptomSeverityBtnsRendered = true;
  let mentSymptomSeverityBtnsRendered = true;
  let allSymptomSeverityBtnsRendered;

  for (let i = 0; i < physRadioDivs.length; i += 1) {
    const [...radioDivElements] = physRadioDivs[i].children;
    if (radioDivElements.some(isChecked)) {
      physSymptomSeverityBtnsRendered = true;
    } else {
      physSymptomSeverityBtnsRendered = false;
    }
  }

  for (let i = 0; i < mentRadioDivs.length; i += 1) {
    const [...radioDivElements] = mentRadioDivs[i].children;
    if (radioDivElements.some(isChecked)) {
      mentSymptomSeverityBtnsRendered = true;
    } else {
      mentSymptomSeverityBtnsRendered = false;
    }
  }

  if (physSymptomSeverityBtnsRendered && mentSymptomSeverityBtnsRendered) {
    state.allSelectedSeveritiesShowing = true;
  }
}

// *-------- Rendering Mental Symptom Severity Ratings --------*
function renderMentSeverity() {
  // Get array of all mental radiogroup <div>s
  const [...physRadioDivs] = document.querySelectorAll('.physical-radiogroup');
  const [...mentRadioDivs] = document.querySelectorAll('.mental-radiogroup');

  // Iterate through each mental symptom in record
  for (let i = 0; i < mentSymptoms.length; i += 1) {
    // Selected severity in record object
    const severityFromRecord = mentSymptoms[i].severity;

    const mentRadioChildren = [...mentRadioDivs[i].children];
    const checkedSeverityBtnIndex = mentRadioChildren.findIndex((element) => element.hasAttribute('checked'));

    // if there is a checked button in current div
    if (checkedSeverityBtnIndex > -1) {
      const checkedBtn = mentRadioChildren[checkedSeverityBtnIndex];

      // if checked button does not matches record
      if (!checkedBtn.classList.contains(severityFromRecord)) {
        // Uncheck checked button element if it doesn't match record anymore
        checkedBtn.removeAttribute('checked');
        checkedBtn.setAttribute('aria-checked', 'false');
        checkedBtn.setAttribute('data-value', 'False');
      } else {
        continue;
      }
    }

    if (severityFromRecord !== undefined) {
      // Find button element matching severity selection in record object
      const matchingSeverityBtnIndex = mentRadioChildren.findIndex((element) => element.classList.contains(severityFromRecord));

      // Check button whose classList had a match to record object severity property
      mentRadioChildren[matchingSeverityBtnIndex].setAttribute('checked', '');
      mentRadioChildren[matchingSeverityBtnIndex].setAttribute('aria-checked', 'true');
      mentRadioChildren[matchingSeverityBtnIndex].setAttribute('data-value', 'True');
    }
  }
  // Update state object if every symptom has severity selected and rendered
  const isChecked = (element) => element.hasAttribute('checked');

  let physSymptomSeverityBtnsRendered = true;
  let mentSymptomSeverityBtnsRendered = true;
  let allSymptomSeverityBtnsRendered;

  for (let i = 0; i < physRadioDivs.length; i += 1) {
    const [...radioDivElements] = physRadioDivs[i].children;
    if (radioDivElements.some(isChecked)) {
      physSymptomSeverityBtnsRendered = true;
    } else {
      physSymptomSeverityBtnsRendered = false;
    }
  }

  for (let i = 0; i < mentRadioDivs.length; i += 1) {
    const [...radioDivElements] = mentRadioDivs[i].children;
    if (radioDivElements.some(isChecked)) {
      mentSymptomSeverityBtnsRendered = true;
    } else {
      mentSymptomSeverityBtnsRendered = false;
    }
  }

  if (physSymptomSeverityBtnsRendered && mentSymptomSeverityBtnsRendered) {
    state.allSelectedSeveritiesShowing = true;
  }
}

// ------------------------------------------------------------------------------------------

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
    physicalRadiogroup.appendChild(button);
  }

  // Appending radiogroup to physical <div>
  physical.insertBefore(physicalRadiogroup, newPhysLabel);

  // Update state object
  if (state.symptomAdded === false) {
    state.symptomAdded = true;
  }

  state.allSelectedSeveritiesShowing = false;

  //-----

  // Event listener on radiogroup <div> for changing severity rating
  physicalRadiogroup.addEventListener('click', (event) => {
    if (event.target.parentNode.classList.contains('severity')) {
      physSymptoms.forEach((entry) => {
        if (entry.name === event.currentTarget.id) {
          entry.severity = event.target.innerHTML;
        }
      });
    }

    renderPhysSeverity();
  });
}

// *-------- Rendering Mental Symptom --------*

function renderMentSymptom() {
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
    // const buttonSpan = document.createElement('span');

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
    // buttonSpan.appendChild(button);
    mentalRadiogroup.appendChild(button);
  }

  // Appending radiogroup to mental <div>
  mental.insertBefore(mentalRadiogroup, newMentLabel);

  // Update state object
  if (state.symptomAdded === false) {
    state.symptomAdded = true;
  }

  state.allSelectedSeveritiesShowing = false;

  //-----

  // Event listener on radiogroup <div> for changing severity rating
  mentalRadiogroup.addEventListener('click', (event) => {
    if (event.target.parentNode.classList.contains('severity')) {
      mentSymptoms.forEach((entry) => {
        if (entry.name === event.currentTarget.id) {
          entry.severity = event.target.innerHTML;
        }
      });
    }
    renderMentSeverity();
  });
}

// -----------------------------------------------------------------------------

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

// *------ Event listener on new physical symptom <button> ------*
addPhysBtn.addEventListener('click', () => {
  // Enable submit button
  submitBtn.disabled = false;

  // Create and add new physical symptom
  // Only create new symptom if the name is not already in record
  // TO DO: Throw error if input is repeat of symptom already in record
  if (!physSymptoms.some((element) => element.name === newPhysInput.value)) {
    const newSymptom = {
      name: newPhysInput.value,
      severity: undefined,
      type: 'physical',
    };

    // reset text input element and disable '+ Add' button
    newPhysInput.value = '';
    addPhysBtn.disabled = true;

    physSymptoms.push(newSymptom);

    renderPhysSymptom();
  }
});

// -----

// *------ Event listener on new mental symptom <button> ------*
addMentBtn.addEventListener('click', () => {
  // Enable submit button
  submitBtn.disabled = false;

  // Create and add blank mental symptom
  // Only create new symptom if the name is not already in record
  // TO DO: Throw error if input is repeat of symptom already in record
  if (!mentSymptoms.some((element) => element.name === newMentInput.value)) {
    const newSymptom = {
      name: newMentInput.value,
      severity: undefined,
      type: 'mental',
    };

    // reset text input element and disable '+ Add' button
    newMentInput.value = '';
    addMentBtn.disabled = true;

    mentSymptoms.push(newSymptom);

    renderMentSymptom();
  }
});

// -----

// *----------------- Creating success screen -----------------------*
const successScreen = document.createElement('div');
successScreen.classList.add('hidden');
successScreen.id = 'success-screen';

const btn = document.createElement('button');
btn.setAttribute('type', 'button');
btn.id = 'close-button';
const closeImage = document.createElement('img');
closeImage.setAttribute('src', './images/cancel.png');
closeImage.setAttribute('alt', 'close button');
btn.appendChild(closeImage);

successScreen.appendChild(btn);
successScreen.innerHTML += '<br> You submitted your daily report!<br> &#127881;';
document.body.appendChild(successScreen);

// -----

// *---------- Creating element for graying out the screen -------------*

const grayOut = document.createElement('div');
grayOut.id = 'gray-out';
grayOut.setAttribute('class', 'hidden');
document.documentElement.appendChild(grayOut);

// -----

// *---------- Event listener for revealing success screen when submit is clicked -------------*
const closeBtn = document.getElementById('close-button');

submitBtn.addEventListener('click', (event) => {
  // Update state object
  state.isSubmitted = true;
  state.isInProgress = false;

  // Gray out background elements behind success screen
  grayOut.removeAttribute('class', 'hidden');

  // disable buttons behind grayOut
  const [...allBtns] = document.querySelectorAll('button');
  allBtns.forEach((button) => {
    button.disabled = true;
  });

  // hiding physical <div> elements
  newPhysInput.classList.add('hidden');
  addPhysBtn.setAttribute('class', 'hidden');
  newPhysLabel.setAttribute('class', 'hidden');

  // Hiding mental <div> elements
  newMentInput.setAttribute('class', 'hidden');
  addMentBtn.setAttribute('class', 'hidden');
  newMentLabel.setAttribute('class', 'hidden');

  // Hiding submit button
  event.currentTarget.setAttribute('class', 'hidden');

  // Reveal success screen
  successScreen.removeAttribute('class', 'hidden');

  // Enabling close button for success screen
  closeBtn.disabled = false;

  // Update state object
  state.isModalShowing = true;
});

// -----

// *---------- Event listener for close button on success screen -------------*
closeBtn.addEventListener('click', () => {
  successScreen.setAttribute('class', 'hidden');
  grayOut.setAttribute('class', 'hidden');

  // Update state object
  state.isModalShowing = false;
});
