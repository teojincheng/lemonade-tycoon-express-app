const Customer = require("./Customer");

const customerA = new Customer();
const customerB = new Customer();

arrOfCustomer = [customerA, customerB];
arrOfRandomPeopleData = [];
arrOfRandomPeopleData.length = 2;

axios("https://randomuser.me/api/?results=2").then(response => {
  arrOfRandomPeopleData.splice(0, Array1.length, ...response.data.result);
  //response.data.results;
});

for (let i = 0; i < arrOfCustomer.length; i++) {
  arrOfCustomer[i].imageSrc = arrOfRandomPeopleData[i].picture.medium;
}
