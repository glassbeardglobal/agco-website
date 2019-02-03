const color1 = '#ED7924'
const color2 = '#3B3A38'
const color3 = '#E3E2E5'

export const productSales = {
  datasets: [{
    data: [30, 20, 10],
    backgroundColor: [
      color1,
      color2,
      color3,
    ],
  }],
  labels: [
    'Tires',
    'Gears',
    'Sensors',
  ]
}

export const slowSellingProducts = {
  datasets: [{
    data: [2.5, 2, 1.3],
    backgroundColor: [
      color1,
      color2,
      color3,
    ],
  }],
  labels: [
    'Product 1',
    'Product 2',
    'Product 3',
  ]
}

export const customerBrandPreferences = {
  datasets: [{ 
    data: [35, 50],
    backgroundColor: [
      color2,
      color1,
    ],
  }],
  labels: [
    'John Deere',
    'CAT',
  ]
};

export const customerStatePreferences = {
  datasets: [{ 
    data: [80, 20],
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
