const Customer = require("./Customer");

const customerA = new Customer();
const customerB = new Customer();

arrOfCustomer = [customerA, customerB];
arrOfRandomPeopleData = [];
arrOfRandomPeopleData.length = 2;

setImageOfCustomers = response => {
  arrOfRandomPeopleData.splice(
    0,
    arrOfRandomPeopleData.length,
    ...response.data.results
  );
  for (let i = 0; i < arrOfCustomer.length; i++) {
    arrOfCustomer[i].imageSrc = arrOfRandomPeopleData[i].picture.medium;
  }
};

axios("https://randomuser.me/api/?results=2").then(setImageOfCustomers);
