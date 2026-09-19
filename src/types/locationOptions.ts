export interface Province {
  name: string;
  cities: string[];
}

export interface CountryLocation {
  name: string;
  provinces: Province[];
}

export const LOCATION_DATA: CountryLocation[] = [
  {
    name: "Sri Lanka",
    provinces: [
      {
        name: "Western Province",
        cities: [
          "Colombo",
          "Gampaha",
          "Kalutara",
          "Dehiwala-Mount Lavinia",
          "Sri Jayawardenepura Kotte",
          "Moratuwa",
          "Negombo",
          "Panadura",
          "Wattala",
          "Homagama",
          "Kaduwela",
          "Avissawella",
        ],
      },
      {
        name: "Central Province",
        cities: [
          "Kandy",
          "Matale",
          "Nuwara Eliya",
          "Dambulla",
          "Hatton",
          "Gampola",
          "Nawalapitiya",
          "Peradeniya",
        ],
      },
      {
        name: "Southern Province",
        cities: [
          "Galle",
          "Matara",
          "Hambantota",
          "Weligama",
          "Ambalangoda",
          "Hikkaduwa",
          "Tangalle",
          "Akuressa",
          "Dikwella",
        ],
      },
      {
        name: "Northern Province",
        cities: [
          "Jaffna",
          "Kilinochchi",
          "Mannar",
          "Mullaitivu",
          "Vavuniya",
          "Chavakachcheri",
          "Point Pedro",
        ],
      },
      {
        name: "Eastern Province",
        cities: [
          "Trincomalee",
          "Batticaloa",
          "Ampara",
          "Kalmunai",
          "Kattankudy",
          "Akkaraipattu",
          "Eravur",
        ],
      },
      {
        name: "North Western Province",
        cities: [
          "Kurunegala",
          "Puttalam",
          "Chilaw",
          "Kuliyapitiya",
          "Nikaweratiya",
          "Narammala",
          "Wennappuwa",
        ],
      },
      {
        name: "North Central Province",
        cities: [
          "Anuradhapura",
          "Polonnaruwa",
          "Kekirawa",
          "Medirigiriya",
          "Hingurakgoda",
        ],
      },
      {
        name: "Uva Province",
        cities: [
          "Badulla",
          "Monaragala",
          "Bandarawela",
          "Haputale",
          "Welimada",
          "Mahiyanganaya",
          "Wellawaya",
        ],
      },
      {
        name: "Sabaragamuwa Province",
        cities: [
          "Ratnapura",
          "Kegalle",
          "Balangoda",
          "Embilipitiya",
          "Mawanella",
          "Warakapola",
          "Rakwana",
        ],
      },
    ],
  },
];
