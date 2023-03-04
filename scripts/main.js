const data = await fetch('./data/sample-data.json').then((response) => response.json());

// Creating <form> node
const form = document.createElement('form');

// Creating <div> elements for physical and mental symptom types
const { symptoms } = data.user.entries[0];

let physicalDivCreated = false;
let mentalDivCreated = false;

symptoms.forEach((element) => {
  if (element.type === 'physical' && !physicalDivCreated) {
    // Creating <div>
    const physical = document.createElement('div');
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
    const mental = document.createElement('div');
    mental.id = 'mental';
    mentalDivCreated = true;

    // Creating <h3> (aka title of <div>)
    const mentalTitle = document.createElement('h3');
    mentalTitle.innerText = 'Mental';
    mental.appendChild(mentalTitle);

    // Adding <div> to <form>
    form.appendChild(mental);
  }
});

// Creating symptom name and severity entry to place in <div>
symptoms.forEach((element) => {
  if (element.name) {
    // Creating <fieldset>
    const fieldset = document.createElement('fieldset');
    fieldset.id = element.name;

    // Creating and adding <legend>
    const legend = document.createElement('legend');
    legend.innerText = symptoms.name;
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
    const mildLabel = document.createElement('label');
    mildLabel.setAttribute('for', 'mild');
    const mildInput = document.createElement('input');
    mildInput.setAttribute('type', 'radio');
    mildInput.setAttribute('name', 'severity');
    mildInput.setAttribute('value', 1);
    mildInput.id = 'mild';

    // The 'Moderate' button
    const moderateLabel = document.createElement('label');
    moderateLabel.setAttribute('for', 'moderate');
    const moderateInput = document.createElement('input');
    moderateInput.setAttribute('type', 'radio');
    moderateInput.setAttribute('name', 'severity');
    moderateInput.setAttribute('value', 2);
    moderateInput.id = 'moderate';

    // The 'Severe' button
    const severeLabel = document.createElement('label');
    severeLabel.setAttribute('for', 'severe');
    const severeInput = document.createElement('input');
    severeInput.setAttribute('type', 'radio');
    severeInput.setAttribute('name', 'severity');
    severeInput.setAttribute('value', 3);
    severeInput.id = 'severe';
  }
});

// Creating submit button for bottom of the form
const submitBtn = document.createElement('input');
submitBtn.setAttribute('type', 'submit');
form.appendChild(submitBtn);
