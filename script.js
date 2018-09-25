const url = 'https://restcountries.eu/rest/v2/all';

fetch(url)
  .then(response => response.json())
  .then(countriz => {
    let countries = [];
    let main = document.querySelector('main');
    let total = document.querySelector('#total');
    let number = document.querySelector('#number');
    let expression = document.querySelector('#expression');

    //when user types, matching coutries are generated
    const searchField = document.querySelector('#search');
    searchField.addEventListener('input', searchByAny)
    //when user clicks search by any word, matching coutries are generated
    const searchAnyBtn = document.querySelector('#any-word');
    searchAnyBtn.addEventListener('click', searchByAny);

    // makes an array with objects containing data that we want
    for (let i = 0; i < countriz.length; i++) {
      let obj = {};
      obj.name = countriz[i].name;
      obj.capital = countriz[i].capital;
      obj.region = countriz[i].region;
      const languages = countriz[i].languages.map(lang => lang.name);
      obj.language = languages.join(', ');
      countriz[i].languages.map(lang => lang.name);
      const currencie = countriz[i].currencies.map(currencie => currencie.code);
      obj.currencie = currencie.join(', ');
      obj.population = countriz[i].population;
      obj.population = obj.population.toString();
      obj.area = countriz[i].area;
      if (obj.area !== null) {
        obj.area = obj.area.toString();
      } else {
        obj.area = 'none'
      }
      obj.flag = countriz[i].flag;
      countries[i] = obj;
    }
    //sets total number of countries on the page
    total.textContent = ` ${countries.length} `;

    function createCountryDiv(country) {
      let colorDiv;

      function createInnerDiv(inner) {
        colorDiv.appendChild(inner);
        inner.style.width = '15%';
        inner.className = 'child';
      }
      colorDiv = document.createElement('div');
      const countryName = document.createElement('div');
      const name = document.createElement('span');
      createInnerDiv(name);
      const capital = document.createElement('span');
      createInnerDiv(capital);
      const region = document.createElement('span');
      createInnerDiv(region);
      const language = document.createElement('span');
      createInnerDiv(language);
      const currencies = document.createElement('span');
      createInnerDiv(currencies);
      const population = document.createElement('span');
      createInnerDiv(population);
      const area = document.createElement('span');
      createInnerDiv(area);
      const flag = new Image();
      createInnerDiv(flag);
      main.appendChild(colorDiv);
      colorDiv.className = 'country';
      countryName.className = 'country-name';
      name.textContent = country.name;
      name.style.fontWeight = 'bold';
      name.style.width = '20%';
      capital.textContent = country.capital;
      area.textContent = country.area;
      region.textContent = country.region;
      language.textContent = country.language;
      if (language.textContent.length > 50) {
        language.style.fontSize = '.7rem';
      } else if (language.textContent.length > 40) {
        language.style.fontSize = '.8rem';
      } else if (language.textContent.length > 30) {
        language.style.fontSize = '.9rem';
      }
      currencies.textContent = country.currencie;
      if (currencies.textContent.length > 50) {
        currencies.style.fontSize = '.7rem';
      } else if (language.textContent.length > 40) {
        currencies.style.fontSize = '.8rem';
      } else if (language.textContent.length > 30) {
        currencies.style.fontSize = '.9rem';
      }
      population.textContent = country.population;
      population.style.textAlign = 'right';
      if (country.population > 100000000) {
        population.style.color = 'red';
      }
      population.style.fontWeight = 'bold';
      flag.src = country.flag;
      flag.className = 'flag';
      flag.style.width = '17%'
    }

    function searchByAny() {
      main.innerHTML = '';
      total.textContent = '';
      searchAnyBtn.className = 'isClicked';
      searchAnyBtn.className = 'buttons';
      let userInputUpper = document.querySelector('#search').value.toUpperCase();
      let result = countries.filter((countryObj) => {
        for (let key in countryObj) {
          if (countryObj[key].toUpperCase().includes(userInputUpper)) {
            return countryObj
          }
        }
      })

      function sortByName(){ result.sort( (a, b) => a.name.localeCompare(b.name) )}
      function sortByCapital(){ result.sort( (a, b) => a.capital.localeCompare(b.capital) )}
      function sortByRegion(){ result.sort( (a, b) => a.region.localeCompare(b.region) )}
      function sortByPopulation(){ result.sort( (a, b) => a.population - b.population )}
      function sortByArea(){ result.sort( (a, b) => a.area - b.area )}
      sortByArea()
      result.forEach(country => createCountryDiv(country))
      number.textContent = result.length
      expression.textContent = userInputUpper;
    }
  })