// *--------------- Establishing initial state of the app -----------------------*

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
  isSubmitted: false,
  isInProgress: false,
  isModalShowing: false,
  symptomAdded: false,
  allSelectedSeveritiesShowing: false,
};
