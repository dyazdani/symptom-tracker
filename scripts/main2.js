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
          'physical-symptoms': [],
          'mental-symptoms': [],
        },
      ],
    },
  },
  //   isSubmitted: false,
  //   isInProgress: false,
  //   isModalShowing: false,
  //   symptomAdded: false,
  //   allSelectedSeveritiesShowing: false,
};

// *---------- Storing section node that is parent to the app --------------*
const section = document.querySelector('section');

// *----------------------- Rendering functions -----------------*
function renderDate() {
  const timeElement = document.getElementById('date');
  timeElement.innerText = date;
}

function renderEmptyState() {
  const noRecordP = document.createElement('p');
  noRecordP.id = 'no-record';
  noRecordP.innerText = "You don't have a symptom record yet for today.";

  const createRecordBtn = document.createElement('button');
  createRecordBtn.id = 'create-record';
  createRecordBtn.setAttribute('type', 'button');
  createRecordBtn.innerText = 'Create a New Record';

  section.appendChild(noRecordP);
  section.appendChild(createRecordBtn);
}

// *----------------------- Initialize app -----------------*
renderDate();
renderEmptyState();
