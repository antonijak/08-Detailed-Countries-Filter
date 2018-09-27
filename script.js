const url = 'https://restcountries.eu/rest/v2/all';

fetch(url)
  .then(response => response.json())
  .then(countriz => {
    let countries = [];
    let main = document.querySelector('main');
    let total = document.querySelector('#total');
    let number = document.querySelector('#number');
    let expression = document.querySelector('#expression');
    let countrie_s = document.querySelector('#countrie-s');
    let verb = document.querySelector('#verb');
    let startContain = document.querySelector('#start-contain');
    let lengthx;
    const searchField = document.querySelector('#search');
    searchField.addEventListener('input', searchByAny)

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

      for (let i = 0; i < currencie.length; i++) {
        if (currencie[i] === '' || currencie[i] === null || currencie[i] === '(none)') {
          currencie.splice(i, 1)
        }
      }
      obj.currencie = currencie.join(', ');
      obj.population = countriz[i].population;
      obj.population = obj.population.toString();
      obj.area = countriz[i].area;
      if (obj.area !== null) {
        obj.area = obj.area.toString();
      } else {
        obj.area = '-'
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
      const flag = document.createElement('span'); 
      createInnerDiv(flag);
      const image = new Image()
      image.className = 'child';
      flag.appendChild(image);
      const name = document.createElement('span');
      createInnerDiv(name);
      const capital = document.createElement('span');
      createInnerDiv(capital);
      const region = document.createElement('span');
      createInnerDiv(region);
      const population = document.createElement('span');
      createInnerDiv(population);
      const area = document.createElement('span');
      createInnerDiv(area);
      const currencies = document.createElement('span');
      createInnerDiv(currencies);
      const language = document.createElement('span');
      createInnerDiv(language);
      main.appendChild(colorDiv);
      colorDiv.className = 'country';
      name.textContent = country.name;
      name.style.fontWeight = 'bold';
      name.style.textAlign = 'left';
      capital.textContent = country.capital;
      area.textContent = country.area;
      region.textContent = country.region;
      language.textContent = country.language;
      if (language.textContent.length > 70) {
        language.style.fontSize = '.6rem';
      } else if (language.textContent.length > 50) {
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
      if (country.population > 100000000) {
        population.style.color = 'red';
      }
      image.src = country.flag;
      flag.style.width = '15%';
      flag.style.height = '100%';
      flag.className = 'flag';
    }

    function searchByAny() {
      main.innerHTML = '';
      total.textContent = '';
      let userInputUpper = searchField.value.toUpperCase();
      let result = countries.filter((countryObj) => {
        for (let key in countryObj) {
          if (countryObj[key].toUpperCase().includes(userInputUpper)) {
            return countryObj
          }
        }
      })

      result.forEach(country => createCountryDiv(country));
      lengthx = result.length;
      expression.textContent = userInputUpper.toLowerCase();
      

      function grammar(wantedVerb) {
        number.textContent = lengthx;
        
        if (lengthx > 1 || lengthx === 0) {
          startContain.textContent = wantedVerb;
          verb.textContent = 'are';
          countrie_s.textContent = 'countries';
          console.log('bla');
          
        } else {
          verb.textContent = 'is';
          countrie_s.textContent = 'country';
          startContain.textContent = wantedVerb;
        }
      }

      grammar('containing')

      const byName = document.querySelector("#legend_country");
      byName.addEventListener('click', sortByNameDesc);
      const byCapital = document.querySelector("#legend_capital");
      byCapital.addEventListener('click', sortByCapitalAsc);
      const byRegion = document.querySelector("#legend_region");
      byRegion.addEventListener('click', sortByRegionAsc);
      const byPopulation = document.querySelector("#legend_population");
      byPopulation.addEventListener('click', sortByPopulationAsc);
      const byArea = document.querySelector("#legend_area");
      byArea.addEventListener('click', sortByAreaAsc);


 
      function sortByNameAsc() {
        const icon = document.querySelector('#countryI');
        icon.name = 'arrow-round-up';
        main.innerHTML = '';
        result.sort((a, b) => a.name.localeCompare(b.name));
        result.forEach(country => createCountryDiv(country));
        byName.removeEventListener('click', sortByNameAsc);
        byName.addEventListener('click', sortByNameDesc);
      }

      function sortByCapitalAsc() {
        const icon = document.querySelector('#capitalI');
        icon.name = 'arrow-round-up';
        main.innerHTML = '';
        result.sort((a, b) => a.capital.localeCompare(b.capital));
        result.forEach(country => createCountryDiv(country));
        byCapital.removeEventListener('click', sortByCapitalAsc);
        byCapital.addEventListener('click', sortByCapitalDesc);

      }

      function sortByRegionAsc() {
        const icon = document.querySelector('#regionI');
        icon.name = 'arrow-round-up';
        main.innerHTML = '';
        result.sort((a, b) => a.region.localeCompare(b.region));
        result.forEach(country => createCountryDiv(country));
        byRegion.removeEventListener('click', sortByRegionAsc);
        byRegion.addEventListener('click', sortByRegionDesc);
      }

      function sortByPopulationAsc() {
        const icon = document.querySelector('#populationI');
        icon.name = 'arrow-round-up';
        main.innerHTML = '';
        result.sort((a, b) => a.population - b.population);
        result.forEach(country => createCountryDiv(country));
        byPopulation.removeEventListener('click', sortByPopulationAsc);
        byPopulation.addEventListener('click', sortByPopulationDesc);
      }

      function sortByAreaAsc() {
        const icon = document.querySelector('#areaI');
        icon.name = 'arrow-round-up';
        main.innerHTML = '';
        result.sort((a, b) => a.area - b.area);
        result.forEach(country => createCountryDiv(country));
        byArea.removeEventListener('click', sortByAreaAsc);
        byArea.addEventListener('click', sortByAreaDesc);
      }

      //sorting in descending order

      function sortByNameDesc() {
        const icon = document.querySelector('#countryI');
        icon.name = 'arrow-round-down';
        main.innerHTML = '';
        result.sort((a, b) => b.name.localeCompare(a.name));
        result.forEach(country => createCountryDiv(country));
        byName.removeEventListener('click', sortByNameDesc);
        byName.addEventListener('click', sortByNameAsc);
      }

      function sortByCapitalDesc() {
        const icon = document.querySelector('#capitalI');
        icon.name = 'arrow-round-down';
        main.innerHTML = '';
        result.sort((a, b) => b.capital.localeCompare(a.capital));
        result.forEach(country => createCountryDiv(country));
        byCapital.removeEventListener('click', sortByCapitalDesc);
        byCapital.addEventListener('click', sortByCapitalAsc);
      }

      function sortByRegionDesc() {
        const icon = document.querySelector('#regionI');
        icon.name = 'arrow-round-down';
        main.innerHTML = '';
        result.sort((a, b) => b.region.localeCompare(a.region));
        result.forEach(country => createCountryDiv(country));
        byRegion.removeEventListener('click', sortByRegionDesc);
        byRegion.addEventListener('click', sortByRegionAsc);
      }

      function sortByPopulationDesc() {
        const icon = document.querySelector('#populationI');
        icon.name = 'arrow-round-down';
        main.innerHTML = '';
        result.sort((a, b) => b.population - a.population);
        result.forEach(country => createCountryDiv(country));
        byPopulation.removeEventListener('click', sortByPopulationDesc);
        byPopulation.addEventListener('click', sortByPopulationAsc);
      }

      function sortByAreaDesc() {
        const icon = document.querySelector('#areaI');
        icon.name = 'arrow-round-down';
        main.innerHTML = '';
        result.sort((a, b) => b.area - a.area);
        result.forEach(country => createCountryDiv(country));
        byArea.removeEventListener('click', sortByAreaDesc);
        byArea.addEventListener('click', sortByAreaAsc);
      }

  }

  searchByAny()
  startContain.textContent = '';

  })