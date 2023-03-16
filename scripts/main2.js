/* eslint-disable no-param-reassign */
const SEVERITY_RATING = ['none', 'mild', 'moderate', 'severe'];

/* Example of symptom entry
    {
      name: 'Headache',
      severity: 'mild',
      type: 'physical',
    };
*/

// *--------------- Establishing initial state of the app -----------------------*

// Current date
const date = new Date().toLocaleDateString('en-us', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

// Creating object for storing the current state of the app
const state = {
  record: {
    user: {
      name: 'Guest',
      entries: [
        {
          timestamp: date,
          symptoms: {
            physical: [],
            mental: [],
          },
        },
      ],
    },
  },
  //   isSubmitted: false,
  //   isInProgress: false,
  //   isModalShowing: false,
  //   symptomAdded: false,
};

const { symptoms: symptomsByType } = state.record.user.entries[0];

// *---------- Storing section node that is parent to the app --------------*
const section = document.querySelector('section');

// *----------- Callback functions for event listeners ------------------*
function onCreateRecordClicked(event, noRecordMessage) {
  event.target.classList.add('hidden');
  noRecordMessage.classList.add('hidden');
}

function onAddSymptomClicked(event, submitButton, symptomType) {
  submitButton.disabled = false;
  // TO DO: Throw error if input is repeat of symptom already in record

  const input = document.querySelector(`#${symptomType}-input`);
  // Update state object
  if (symptomsByType[symptomType].every((symptomEntry) => symptomEntry.name !== input.value)) {
    const newSymptomEntry = {
      name: input.value,
      severity: undefined,
      type: symptomType,
    };
    symptomsByType[symptomType].push(newSymptomEntry);
  }

  // reset text input element and disable '+ Add' button
  input.value = '';
  event.currentTarget.disabled = true;
}

// ---------------------
function toggleDisabled(event, symptomType) {
  const addSymptomButton = document.querySelector(`#add-${symptomType}-symptom`);
  if (event.target.value === '') {
    addSymptomButton.disabled = true;
  } else {
    addSymptomButton.disabled = false;
  }
}

// -----------------------
function onSeveritySelectionClicked(event, symptomType) {
  if (event.target.parentNode.classList.contains('severity')) {
    symptomsByType[symptomType].forEach((symptomEntry) => {
      if (symptomEntry.name === event.currentTarget.id) {
        symptomEntry.severity = event.target.innerHTML;
      }
    });
  }
}

// -----------------------
function onSubmitButtonClicked(allButtons, allInputLabels, allInputFields, allSymptomLists) {
  allButtons.forEach((button) => {
    if (button.classList.contains('severity')) {
      button.disabled = true;
    } else {
      console.log(button);
      button.classList.add('hidden');
    }
  });

    allSymptomLists.forEach(symptomList => {
      const [...symptomListChildren] = symptomList.children;
      const arrayMethodResultForIfStatement = symptomListChildren.some((element) => {
        return element.classList.contains('radiogroup');
      })
      if (!arrayMethodResultForIfStatement) {
        symptomList.classList.add('hidden');
      }
    })

    allInputLabels.forEach((label) => {
      label.classList.add('hidden');
    });

    allInputFields.forEach((field) => {
      field.classList.add('hidden');
    });
    
  renderGrayOut();
  renderSuccessModal();
}
// TO DO: Remove modal and grayed out layer to reveal copy of record form.

// *----------------------- Element helpers -----------------*
function getSymptomListTitle(symptomType) {
  const title = document.createElement('h3');
  title.innerText = symptomType;
  return title;
}

// -------------------
function getInputLabel(symptomType) {
  const label = document.createElement('label');
  label.classList.add('input-label');
  label.setAttribute('for', `${symptomType}-input`);
  label.innerText = 'New Symptom';
  return label;
}

// -----------------
function getInputField(symptomType) {
  const input = document.createElement('input');
  input.setAttribute('type', 'symptomType');
  input.setAttribute('name', 'symptom');
  input.id = `${symptomType}-input`;
  input.placeholder = 'Type here to add symptom';

  input.addEventListener('input', (event) => {
    toggleDisabled(event, symptomType);
  });

  return input;
}

// ----------------------
function getAddSymptomButton(symptomType) {
  const button = document.createElement('button');
  button.setAttribute('type', 'button');
  button.classList.add('add-symptom');
  button.disabled = true;
  button.id = `add-${symptomType}-symptom`;

  const plusSymbol = document.createElement('span');
  plusSymbol.innerText = '+';
  button.appendChild(plusSymbol);

  const buttonText = document.createElement('span');
  buttonText.innerText = 'Add';
  button.appendChild(buttonText);

  button.addEventListener('click', (event) => {
    const submitButton = document.querySelector('#submit-button');
    onAddSymptomClicked(event, submitButton, symptomType);
    const symptomTypeArray = symptomsByType[symptomType];
    const symptomName = symptomTypeArray[symptomTypeArray.length - 1].name;
    const symptomList = document.querySelector(`#${symptomType}`);
    const inputDiv = document.querySelector(`#${symptomType}-input-with-add-symptom-button`);
    const inputLabel = inputDiv.previousSibling;
    renderSymptom(symptomName, symptomList, inputLabel, symptomType);
  });

  return button;
}

// -------------------------
function getInputWithAddSymptomButton(symptomType) {
  const div = document.createElement('div');
  div.id = `${symptomType}-input-with-add-symptom-button`;
  div.appendChild(getInputField(symptomType));
  div.appendChild(getAddSymptomButton(symptomType));
  return div;
}

// ----------------------
function getSymptomList(symptomType) {
  const div = document.createElement('div');
  div.id = symptomType;
  div.classList.add('symptom-list');

  div.appendChild(getSymptomListTitle(symptomType));
  div.appendChild(getInputLabel(symptomType));
  div.appendChild(getInputWithAddSymptomButton(symptomType));

  return div;
}

// ------------------------
function getSubmitButton() {
  const button = document.createElement('button');
  button.disabled = true;
  button.setAttribute('type', 'button');
  button.id = 'submit-button';
  button.innerText = 'Submit';

  button.addEventListener('click', () => {
    const [...allButtons] = document.querySelectorAll('button');
    console.log(allButtons);
    const [...allInputLabels] = document.querySelectorAll('.input-label');
    const [...allInputFields] = document.querySelectorAll('input');
    const [...allSymptomLists] = document.querySelectorAll('.symptom-list');

    onSubmitButtonClicked(allButtons, allInputLabels, allInputFields, allSymptomLists);
  });

  return button;
}

// *----------------------- Rendering functions -----------------*
function renderDate() {
  const timeElement = document.getElementById('date');
  timeElement.innerText = date;
}

// ------------------
function renderRecordForm() {
  const form = document.createElement('form');
  form.id = 'record-form';

  form.appendChild(getSymptomList('physical'));
  form.appendChild(getSymptomList('mental'));
  form.appendChild(getSubmitButton());

  section.appendChild(form);
}

// -------------------
function renderEmptyState() {
  const noRecordMessage = document.createElement('p');
  noRecordMessage.id = 'no-record';
  noRecordMessage.innerText = "You don't have a symptom record yet for today.";

  const createRecordBtn = document.createElement('button');
  createRecordBtn.id = 'create-record';
  createRecordBtn.setAttribute('type', 'button');
  createRecordBtn.innerText = 'Create a New Record';
  createRecordBtn.addEventListener('click', (event) => {
    onCreateRecordClicked(event, noRecordMessage);
    renderRecordForm();
  });

  section.appendChild(noRecordMessage);
  section.appendChild(createRecordBtn);
}

// -------------------
function renderSeveritySelection(radiogroup, symptomType, symptomName) {
  // Selected severity
  const symptomsForType = symptomsByType[symptomType];
  const symptom = symptomsForType.find((element) => element.name === symptomName);
  const severitySelection = symptom.severity;

  const childrenOfCurrentRadiogroup = [...radiogroup.children];
  const checkedSeverityBtnIndex = childrenOfCurrentRadiogroup.findIndex((element) => element.hasAttribute('checked'));

  // if there is a checked button in current div
  if (checkedSeverityBtnIndex > -1) {
    const checkedBtn = childrenOfCurrentRadiogroup[checkedSeverityBtnIndex];

    // if checked button does not matches record
    if (!checkedBtn.classList.contains(severitySelection)) {
      // Uncheck checked button element if it doesn't match record anymore
      checkedBtn.removeAttribute('checked');
      checkedBtn.setAttribute('aria-checked', 'false');
      checkedBtn.setAttribute('data-value', 'False');
    }
  }

  if (severitySelection !== undefined) {
    // Find button element matching severity selection in state object
    const matchingSeverityBtnIndex = childrenOfCurrentRadiogroup.findIndex((element) => element.classList.contains(severitySelection));

    // Give 'checked' attribute to button whose classList had
    // a match to state object severity property
    childrenOfCurrentRadiogroup[matchingSeverityBtnIndex].setAttribute('checked', '');
    childrenOfCurrentRadiogroup[matchingSeverityBtnIndex].setAttribute('aria-checked', 'true');
    childrenOfCurrentRadiogroup[matchingSeverityBtnIndex].setAttribute('data-value', 'True');
  }
}

// ------------------
function renderSymptom(symptomName, symptomList, inputLabel, symptomType) {
  // Creating radiogroup <div>
  const radiogroup = document.createElement('div');
  radiogroup.classList.add(symptomType, 'radiogroup');
  radiogroup.setAttribute('role', 'radiogroup');
  radiogroup.setAttribute('aria-labelledby', `legend-${symptomName}`);
  radiogroup.id = symptomName;

  // Event listener
  radiogroup.addEventListener('click', (event) => {
    onSeveritySelectionClicked(event, symptomType);
    renderSeveritySelection(radiogroup, symptomType, symptomName);
  });

  // Creating and adding <p> for legend
  const legend = document.createElement('p');
  legend.id = `legend-${symptomName}`;
  legend.innerText = symptomName;
  radiogroup.appendChild(legend);

  // Creating and adding severity buttons
  for (let i = 0; i < SEVERITY_RATING.length; i += 1) {
    const button = document.createElement('button');
    button.className = `severity ${SEVERITY_RATING[i]}`;
    button.setAttribute('type', 'button');
    button.setAttribute('role', 'radio');
    button.setAttribute('aria-checked', 'false');
    button.setAttribute('tabindex', '0');
    button.setAttribute('aria-labelledby', `${SEVERITY_RATING[i]}Label`);
    button.setAttribute('data-value', 'False');

    const buttonLabel = document.createElement('label');
    buttonLabel.innerText = SEVERITY_RATING[i];
    buttonLabel.id = `${SEVERITY_RATING[i]}Label`;

    button.appendChild(buttonLabel);
    radiogroup.appendChild(button);
  }
  symptomList.insertBefore(radiogroup, inputLabel);
}

// -----------------------

function renderSuccessModal() {
  const successModal = document.createElement('div');
  successModal.id = 'success-modal';

  const closeBtn = document.createElement('button');
  closeBtn.setAttribute('type', 'button');
  closeBtn.id = 'close-button';
  const closeImage = document.createElement('img');
  closeImage.setAttribute('src', './images/cancel.png');
  closeImage.setAttribute('alt', 'close button');
  closeBtn.appendChild(closeImage);

  const message = document.createElement('p');
  message.innerText = 'You submitted your daily report!';

  const emojiHorn = document.createElement('p');
  emojiHorn.innerText = '🎉';

  successModal.appendChild(closeBtn);
  successModal.appendChild(message);
  successModal.appendChild(emojiHorn);
  document.body.appendChild(successModal);
}

// -----------------------

function renderGrayOut() {
  const grayOut = document.createElement('div');
  grayOut.id = 'gray-out';
  document.documentElement.appendChild(grayOut);
}

// *----------------------- Initialize app -----------------*
renderDate();
renderEmptyState();
