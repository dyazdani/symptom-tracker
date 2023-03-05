const data = await fetch('./data/sample-data.json').then((response) => response.json());

// Creating <form> node
const form = document.createElement('form');

// Creating <div> elements for physical and mental symptom types
const { symptoms } = data.user.entries[0];

// For symptom type <div>s
let physical;
let mental;

let physicalDivCreated = false;
let mentalDivCreated = false;

symptoms.forEach((element) => {
  if (element.type === 'physical' && !physicalDivCreated) {
    // Creating <div>
    physical = document.createElement('div');
    physical.id = 'physical';
    physicalDivCreated = true;

    // Creating <h3> (aka title of <div>)
    const physicalTitle = document.createElement('h3');
    physicalTitle.innerText = 'Physical';
    physical.appendChild(physicalTitle);

    // Adding <div> to <form>
    form.appendChild(physical);
  }

  if (element.type === 'mental' && !mentalDivCreated) {
    // Creating <div>
    mental = document.createElement('div');
    mental.id = 'mental';
    mentalDivCreated = true;

    // Creating <h3> (aka title of <div>)
    const mentalTitle = document.createElement('h3');
    mentalTitle.innerText = 'Mental';
    mental.appendChild(mentalTitle);

    // Adding <div> to <form>
    form.appendChild(mental);
  }

  // Creating symptom name and severity entry to place in <div>
  if (element.name) {
    // Creating <fieldset>
    const fieldset = document.createElement('fieldset');
    fieldset.id = element.name;

    // Creating and adding <legend>
    const legend = document.createElement('legend');
    legend.innerText = element.name;
    fieldset.appendChild(legend);

    // Creating and adding <div> for radio buttons
    const radioDiv = document.createElement('div');
    fieldset.appendChild(radioDiv);

    // Creating radio buttons
    // The 'None' button
    // Creating and adding 'None' <label> to radioDiv
    const noneLabel = document.createElement('label');
    noneLabel.setAttribute('for', 'none');
    noneLabel.innerText = 'none';
    radioDiv.appendChild(noneLabel);

    // Creating and adding 'None' <input> to radioDiv
    const noneInput = document.createElement('input');
    noneInput.setAttribute('type', 'radio');
    noneInput.setAttribute('name', 'severity');
    noneInput.setAttribute('value', 0);
    noneInput.id = 'none';
    radioDiv.appendChild(noneInput);

    // The 'Mild' button
    // Creating and adding 'Mild' <label> to radioDiv
    const mildLabel = document.createElement('label');
    mildLabel.setAttribute('for', 'mild');
    mildLabel.innerText = 'mild';
    radioDiv.appendChild(mildLabel);

    // Creating and adding 'Mild' <input> to radioDiv
    const mildInput = document.createElement('input');
    mildInput.setAttribute('type', 'radio');
    mildInput.setAttribute('name', 'severity');
    mildInput.setAttribute('value', 1);
    mildInput.id = 'mild';
    radioDiv.appendChild(mildInput);

    // The 'Moderate' button
    // Creating and adding 'Moderate' <label> to radioDiv
    const moderateLabel = document.createElement('label');
    moderateLabel.setAttribute('for', 'moderate');
    moderateLabel.innerText = 'moderate';
    radioDiv.appendChild(moderateLabel);

    // Creating and adding 'Moderate' <input> to radioDiv
    const moderateInput = document.createElement('input');
    moderateInput.setAttribute('type', 'radio');
    moderateInput.setAttribute('name', 'severity');
    moderateInput.setAttribute('value', 2);
    moderateInput.id = 'moderate';
    radioDiv.appendChild(moderateInput);

    // The 'Severe' button
    // Creating and adding 'Severe' <label> to radioDiv
    const severeLabel = document.createElement('label');
    severeLabel.setAttribute('for', 'severe');
    severeLabel.innerText = 'severe';
    radioDiv.appendChild(severeLabel);

    // Creating and adding 'Severe' <input> to radioDiv
    const severeInput = document.createElement('input');
    severeInput.setAttribute('type', 'radio');
    severeInput.setAttribute('name', 'severity');
    severeInput.setAttribute('value', 3);
    severeInput.id = 'severe';
    radioDiv.appendChild(severeInput);

    // Adding fieldset to <div> with corresponding symptom type
    if (element.type === 'physical') {
      physical.appendChild(fieldset);
    }

    if (element.type === 'mental') {
      mental.appendChild(fieldset);
    }

    // Selecting severity of entry
    const severityScale = {
      0: 'none',
      1: 'mild',
      2: 'moderate',
      3: 'severe',
    };

    const ChildrenOfRadioDiv = [...radioDiv.children];

    ChildrenOfRadioDiv.forEach((child) => {
      if (child.id === severityScale[element.severity]) {
        child.setAttribute('checked', '');
      }
    });
  }
});

// Creating and adding "Add new symptom" buttons
// For 'Physical' <div>
const newPhysicalSymptomButton = document.createElement('button');
newPhysicalSymptomButton.setAttribute('type', 'button');

const plusSymbolPhysical = document.createElement('p');
plusSymbolPhysical.innerText = '+';
newPhysicalSymptomButton.appendChild(plusSymbolPhysical);

const buttonTextPhysical = document.createElement('p');
buttonTextPhysical.innerText = 'Add new symptom';
newPhysicalSymptomButton.appendChild(buttonTextPhysical);

physical.appendChild(newPhysicalSymptomButton);

// For 'Mental' <div>
const newMentalSymptomButton = document.createElement('button');
newMentalSymptomButton.setAttribute('type', 'button');

const plusSymbolMental = document.createElement('p');
plusSymbolMental.innerText = '+';
newMentalSymptomButton.appendChild(plusSymbolMental);

const buttonTextMental = document.createElement('p');
buttonTextMental.innerText = 'Add new symptom';
newMentalSymptomButton.appendChild(buttonTextMental);

mental.appendChild(newPhysicalSymptomButton);

// Creating submit button for bottom of the form
const submitBtn = document.createElement('input');
submitBtn.setAttribute('type', 'submit');
form.appendChild(submitBtn);
