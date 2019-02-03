const color1 = '#ED7924'
const color2 = '#3B3A38'
const color3 = '#E3E2E5'

export const productSales = {
  datasets: [{
    data: [30, 10, 11, 7, 5, 3],
    backgroundColor: [
      color1,
      color2,
      color3,
      color1,
      color2,
      color3,
    ],
  }],
  labels: [
  'Oil',
  'Gears',
  'Motors',
  'Chains',
  'Tools',
  'Fittings',
  ]
}

export const slowSellingProducts = {
  datasets: [{
    data: [3, 1.4, 1.3],
    backgroundColor: [
      color1,
      color2,
      color3,
    ],
  }],
  labels: [
    'D Vac Chute Cover',
    'JD 7200 Meter Drive',
    'ProSeries Rear Mount Bracket',
  ]
}

export const customerBrandPreferences = {
  datasets: [{ 
    data: [44, 28, 21, 7],
    backgroundColor: [
      color1,
      color2,
      color3,
      color1,
    ],
  }],
  labels: [
  'Challenger',
  'Massey Ferguson',
  'Fendt',
  'Valtra',
  ]
};

export const customerStatePreferences = {
  datasets: [{ 
    data: [63, 37],
    backgroundColor: [
      color1,
      color2,
    ],
  }],
  labels: [
    'Used',
    'New',
  ]
};
