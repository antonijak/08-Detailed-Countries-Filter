const url = 'https://restcountries.eu/rest/v2/all';
let countries = [];
let main = document.querySelector('main');

fetch(url)
  .then(response => response.json())
  .then(countriz => {
    let div;
    for (let i = 0; i < countriz.length; i++) {
      countries[i] = countriz[i]
    }
    createCountryDiv()
  })




function createCountryDiv() {
  let colorDiv;

  function createInnerDiv(inner) {
    colorDiv.appendChild(inner);
    inner.style.width = '15%';
    inner.className = 'child';
  }
  countries.forEach(country => {
    console.log(Object.keys(country));
    console.log(country.languages);
    colorDiv = document.createElement('div');
    const countryName = document.createElement('div');
    const name = document.createElement('span');
    createInnerDiv(name);
    const capital = document.createElement('span');
    createInnerDiv(capital);
    const area = document.createElement('span');
    createInnerDiv(area);
    const region = document.createElement('span');
    createInnerDiv(region);
    const language = document.createElement('span');
    createInnerDiv(language);
    const flag = new Image(150, 110);
    createInnerDiv(flag);
    main.appendChild(colorDiv);
    colorDiv.className = 'country';
    countryName.className = 'country-name';
    name.textContent = country.name;
    capital.textContent = country.capital;
    area.textContent = country.area;
    region.textContent = country.region;
    const languages = country.languages.map(lang => lang.name);
    language.textContent = languages.join(',\n');
    
     

    flag.src = country.flag;
    flag.className = 'flag'

    // flag.style.backgroundImage = src

  })
}








// let total = document.querySelector('#total');
// //total.textContent = ` ${countries.length} `;
// let number = document.querySelector('#number');
// let expression = document.querySelector('#expression');
// let startContain = document.querySelector('#start-contain');
// let verb = document.querySelector('#verb');
// let countrie_s = document.querySelector('#countrie-s');
// let lengthx;


// function createCountryDiv (country){
//   let colorDiv = document.createElement('div');
//   let countryName = document.createElement('div');
//   main.appendChild(colorDiv);
//   colorDiv.appendChild(countryName);
//   colorDiv.className = 'country';
//   countryName.textContent = country.name.toUpperCase();
//   countryName.className = 'country-name';
// }

// // function grammar (wantedVerb){
// //   number.textContent = lengthx;
// //   startContain.textContent = wantedVerb;
// //   if (lengthx > 1 || lengthx === 0){
// //     verb.textContent = 'are'
// //     countrie_s.textContent = 'countries'
// //   } else {
// //     verb.textContent = 'is'
// //     countrie_s.textContent = 'country'
// //   }
// // }


// function searchByFirst (){
//   main.innerHTML = '';
//   total.textContent = '';
//   searchFirstBtn.className = 'isClicked';
//   searchAnyBtn.className = 'buttons';
//   let userInputUpper = document.querySelector('#search').value.toUpperCase();
//   //returns an array of all countries that match and generates country div for each of them
//   const resultCountries = countries.filter((val) => {
//     let upperCaseVal = val.toUpperCase();
//     let match = upperCaseVal.startsWith(userInputUpper);
//     if (match){ 
//       createCountryDiv(upperCaseVal)
//       return upperCaseVal }
//   }); 
//   //shows number of matching countries
//   lengthx = resultCountries.length;
//   expression.textContent = userInputUpper;
//   grammar ('starting with')
//   searchField.removeEventListener('input', searchByAny)
//   searchField.addEventListener('input', searchByFirst)
// }


// function searchByAny (){
//   main.innerHTML = '';
//   searchAnyBtn.className = 'isClicked';
//   searchFirstBtn.className = 'buttons';
//   let userInputUpper = document.querySelector('#search').value.toUpperCase();
//   //returns an array of all countries that match and generates country div for each of them
//   const resultCountries = countries.filter((val) => {
//     let upperCaseVal = val.toUpperCase();
//     let match = upperCaseVal.includes(userInputUpper);
//     if (match){ 
//       createCountryDiv(upperCaseVal)
//       return upperCaseVal }
//   }); 
//   //shows number of matching countries
//   lengthx = resultCountries.length;
//   expression.textContent = userInputUpper;
//   grammar ('containing')
//   searchField.removeEventListener('input', searchByFirst)
//   searchField.addEventListener('input', searchByAny)
// }


// //when user types, matching coutries are generated
// const searchField = document.querySelector('#search');
// searchField.addEventListener('input', searchByFirst)
// //when user clicks search by first word, matching coutries are generated
// const searchFirstBtn = document.querySelector('#starting-word');
// searchFirstBtn.addEventListener('click', searchByFirst);
// //when user clicks search by any word, matching coutries are generated
// const searchAnyBtn = document.querySelector('#any-word');
// searchAnyBtn.addEventListener('click', searchByAny);