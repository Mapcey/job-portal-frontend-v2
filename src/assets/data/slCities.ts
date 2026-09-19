export interface LocationState {
  name: string;
  cities: string[];
}

export interface CountryLocation {
  name: string;
  states: LocationState[];
}

export const COUNTRIES: CountryLocation[] = [
  {
    name: "Sri Lanka",
    states: [
      {
        name: "Western Province",
        cities: [
          "Colombo",
          "Dehiwala-Mount Lavinia",
          "Moratuwa",
          "Sri Jayawardenepura Kotte",
          "Negombo",
          "Kalutara",
          "Panadura",
          "Wattala",
        ],
      },
      {
        name: "Central Province",
        cities: ["Kandy", "Matale", "Nuwara Eliya", "Dambulla"],
      },
      {
        name: "Southern Province",
        cities: ["Galle", "Matara", "Hambantota", "Weligama"],
      },
      {
        name: "Northern Province",
        cities: ["Jaffna", "Kilinochchi", "Mannar", "Mullaitivu", "Vavuniya"],
      },
      {
        name: "Eastern Province",
        cities: ["Trincomalee", "Batticaloa", "Ampara"],
      },
      {
        name: "North Western Province",
        cities: ["Kurunegala", "Puttalam", "Chilaw"],
      },
      {
        name: "North Central Province",
        cities: ["Anuradhapura", "Polonnaruwa"],
      },
      {
        name: "Uva Province",
        cities: ["Badulla", "Monaragala", "Bandarawela", "Haputale"],
      },
      {
        name: "Sabaragamuwa Province",
        cities: ["Ratnapura", "Kegalle", "Balangoda"],
      },
    ],
  },
];
