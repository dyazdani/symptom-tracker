const data = await fetch('./data/sample-data.json').then((response) => response.json());

// Creating <form> node
const form = document.createElement('form');
form.id = 'symptom-list';

// Creating <div> elements for physical and mental symptom types
const { symptoms } = data.user.entries[0];

// For symptom type <div>s
let physical;
let mental;

let physicalDivCreated = false;
let mentalDivCreated = false;

const severityScale = {
  0: 'none',
  1: 'mild',
  2: 'moderate',
  3: 'severe',
};

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
    // const legendText = document.createElement('span');
    // legendText.innerText = element.name;
    // legend.appendChild(legendText);
    legend.innerText = element.name;
    fieldset.appendChild(legend);

    // Creating and adding <div> for severity buttons
    const buttonsDiv = document.createElement('div');
    fieldset.appendChild(buttonsDiv);

    // Creating severity scale buttons
    for (const property in severityScale) {
      const severityRating = document.createElement('button');
      severityRating.setAttribute('form', 'symptom-list');
      severityRating.setAttribute('type', 'button');
      severityRating.setAttribute('name', severityScale[property]);
      severityRating.setAttribute('value', property);
      severityRating.id = 'none';

      severityRating.innerText = severityScale[property];
      buttonsDiv.appendChild(severityRating);

      // Setting the severity rating for symptom based on data.json
      if (property == element.severity) {
        severityRating.setAttribute('checked', '');
      }
    }

    // Adding fieldset to <div> with corresponding symptom type
    if (element.type === 'physical') {
      physical.appendChild(fieldset);
    }

    if (element.type === 'mental') {
      mental.appendChild(fieldset);
    }
  }
});

// Creating and adding "Add new symptom" buttons
const formArray = [...form.children];
formArray.forEach((element) => {
  if (element.id === 'physical' || element.id === 'mental') {
    const newSymptomButton = document.createElement('button');
    newSymptomButton.setAttribute('type', 'button');

    const plusSymbol = document.createElement('span');
    plusSymbol.innerText = '+';
    newSymptomButton.appendChild(plusSymbol);

    const buttonText = document.createElement('span');
    buttonText.innerText = 'Add new symptom';
    newSymptomButton.appendChild(buttonText);

    element.appendChild(newSymptomButton);
  }
});

// Creating submit button for bottom of the form
const submitBtn = document.createElement('input');
submitBtn.setAttribute('type', 'submit');
form.appendChild(submitBtn);

// Add <form> to <section>
const section = document.querySelector('section');
section.appendChild(form);

// Creating and adding date from data.json
const { timestamp } = data.user.entries[0];

const date = new Date(timestamp);
const dateString = date.toDateString();

const timeElement = document.getElementById('date');
timeElement.innerText = dateString;
