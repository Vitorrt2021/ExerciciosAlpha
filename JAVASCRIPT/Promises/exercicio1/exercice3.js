const isPrime = (num) => {
  for (let i = 2; i < num; i++)
    if (num % i === 0) {
      return false;
    }
  return num > 1;
};

const isPair = (number) =>
  new Promise((resolve, reject) => {
    if (number % 2 === 0 || isPrime(number)) {
      resolve("É par ou primo");
    } else {
      reject("É impar");
    }
  });

isPair(21)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
