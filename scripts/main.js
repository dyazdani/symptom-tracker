// const data = await fetch('./data/sample-data.json').then((response) => response.json());

// TEMPORARILY PLACING sample-data.json HERE UNTIL FIX ERROR LOADING main.js INTO index.html
const data = {
  user: {
    name: 'Jane Doe',
    entries: [
      {
        timestamp: 0,
        symptoms: [
          {
            name: 'Fatigue',
            severity: 2,
            type: 'physical',
          },
          {
            name: 'Anxiety',
            severity: 0,
            type: 'mental',
          },
          {
            name: 'Stress',
            severity: 3,
            type: 'mental',
          },
          {
            name: 'Headache',
            severity: 1,
            type: 'physical',
          },
        ],
      },
    ],
  },
};

// Start with looking at "type" key and creating <div> to put in <form>
// if <div> not already created.
const { symptoms } = data.user.entries[0];

let physicalDivCreated = false;
let mentalDivCreated = false;

symptoms.forEach((element) => {
  if (element.type === 'physical' && !physicalDivCreated) {
    const physical = document.createElement('div');
    physical.id = 'physical';
    const physicalTitle = document.createElement('h3');
    physicalTitle.innerText = 'Physical';
    physicalDivCreated = true;
  }

  if (element.type === 'mental' && !mentalDivCreated) {
    const mental = document.createElement('div');
    mental.id = 'mental';
    const mentalTitle = document.createElement('h3');
    mentalTitle.innerText = 'Mental';
    mentalDivCreated = true;
  }
});

// ----- Making <fieldset> for <form> -----

// The "None" button
const noneLabel = document.createElement('label');
noneLabel.setAttribute('for', 'none');
const noneInput = document.createElement('input');
noneInput.setAttribute('type', 'radio');
noneInput.setAttribute('name', 'severity');
noneInput.setAttribute('value', 0);
noneInput.id = 'none';

// The "Mild" button
const mildLabel = document.createElement('label');
mildLabel.setAttribute('for', 'mild');
const mildInput = document.createElement('input');
mildInput.setAttribute('type', 'radio');
mildInput.setAttribute('name', 'severity');
mildInput.setAttribute('value', 1);
mildInput.id = 'mild';

// The "Moderate" button
const moderateLabel = document.createElement('label');
moderateLabel.setAttribute('for', 'moderate');
const moderateInput = document.createElement('input');
moderateInput.setAttribute('type', 'radio');
moderateInput.setAttribute('name', 'severity');
moderateInput.setAttribute('value', 2);
moderateInput.id = 'moderate';

// The "Severe" button
const severeLabel = document.createElement('label');
severeLabel.setAttribute('for', 'severe');
const severeInput = document.createElement('input');
severeInput.setAttribute('type', 'radio');
severeInput.setAttribute('name', 'severity');
severeInput.setAttribute('value', 3);
severeInput.id = 'severe';
