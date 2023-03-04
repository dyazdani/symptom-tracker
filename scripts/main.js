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
    // Creating and adding 'Mild' <label> to radioDiv
    const mildLabel = document.createElement('label');
    mildLabel.setAttribute('for', 'mild');
    noneLabel.innerText = 'mild';
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
    noneLabel.innerText = 'moderate';
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
    noneLabel.innerText = 'severe';
    radioDiv.appendChild(severeLabel);

    // Creating and adding 'Severe' <input> to radioDiv
    const severeInput = document.createElement('input');
    severeInput.setAttribute('type', 'radio');
    severeInput.setAttribute('name', 'severity');
    severeInput.setAttribute('value', 3);
    severeInput.id = 'severe';
    radioDiv.appendChild(severeInput);
  }
});

// Creating submit button for bottom of the form
const submitBtn = document.createElement('input');
submitBtn.setAttribute('type', 'submit');
form.appendChild(submitBtn);
