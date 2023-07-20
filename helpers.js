import { format } from "date-fns";

export const getDatesForWeeksBefore = (milliseconds, numOfWeeks) => {
  const datesArray = [];

  // Create a new Date object using the provided milliseconds
  const currentDate = new Date(milliseconds);

  for (let i = 0; i < numOfWeeks; i++) {
    // Calculate the number of milliseconds in i weeks
    const numOfWeeksInMillis = i * 7 * 24 * 60 * 60 * 1000;

    // Subtract i weeks from the current date
    const numOfWeeksBeforeInMillis = currentDate.getTime() - numOfWeeksInMillis;

    // Create a new Date object for the calculated date
    const numOfWeeksBeforeDate = format(
      new Date(numOfWeeksBeforeInMillis),
      "yyyy-MM-dd"
    );

    // Add the result to the array
    datesArray.push(numOfWeeksBeforeDate);
  }

  // Return the array with dates as normal JavaScript Date objects for each week on the same day
  return datesArray;
};

const calculateCoefficient = (product) => {
  if (!product.pallets || !product.cases) return 0;
  return product.cases / product.pallets;
};

// Function to calculate median of an array of numbers
const calculateMedian = (numbers) => {
  const sortedNumbers = numbers.sort((a, b) => a - b);
  const mid = Math.floor(sortedNumbers.length / 2);
  if (sortedNumbers.length % 2 === 0) {
    return (sortedNumbers[mid - 1] + sortedNumbers[mid]) / 2;
  } else {
    return sortedNumbers[mid];
  }
};

// Function to calculate median coefficients for each product
export const calculateMedianCoefficients = (documents) => {
  const productsCoefficients = {};
  const productsCases = {};

  // Iterate through all documents except the last one (most recent day)
  for (let i = 0; i < documents.length - 1; i++) {
    const day = documents[i];
    // Iterate through all products in the current day
    day.products.forEach((product) => {
      const { name, cases } = product;
      const coefficient = calculateCoefficient(product);

      // Store the coefficient for each product in an object
      if (!productsCoefficients[name]) {
        productsCoefficients[name] = [coefficient];
        productsCases[name] = [+cases] || [0];
      } else {
        productsCoefficients[name].push(coefficient);
        productsCases[name].push(+cases || 0);
      }
    });
  }

  // Calculate median coefficient for each product
  const medianCoefficientsAndCases = {};
  for (const name in productsCoefficients) {
    medianCoefficientsAndCases[name] = {
      coefficient: calculateMedian(productsCoefficients[name]),
      cases: calculateMedian(productsCases[name]),
    };
  }

  // Add the final median coefficient and cases to each product of the most recent day
  const isRequestedDateProductsExists =
    !!documents[documents.length - 1].products.length;

  // If requested date products array empty use other day as a template
  const mostRecentDay = isRequestedDateProductsExists
    ? documents[documents.length - 1]
    : documents[0];

  const productsWithCoefficients = mostRecentDay.products.map((product) => {
    const { name } = product;

    if (isRequestedDateProductsExists) {
      return {
        ...product._doc,
        coefficient: medianCoefficientsAndCases[name]?.coefficient,
        expectedCases: Math.round(medianCoefficientsAndCases[name]?.cases),
      };
    } else {
      return {
        name,
        coefficient: medianCoefficientsAndCases[name]?.coefficient,
        expectedCases: Math.round(medianCoefficientsAndCases[name]?.cases),
      };
    }
  });

  return {
    ...productsWithCoefficients._doc,
    products: [...productsWithCoefficients],
  }; // Return the updated day with counted coefficients
};
