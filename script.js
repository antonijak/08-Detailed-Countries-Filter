const url = 'https://restcountries.eu/rest/v2/all';

fetch(url)
  .then(response => response.json())
  .then(countriz => {

    let main = document.querySelector('main');
    let total = document.querySelector('#total');
    let number = document.querySelector('#number');
    let expression = document.querySelector('#expression');
    let countrie_s = document.querySelector('#countrie-s');
    let verb = document.querySelector('#verb');
    let startContain = document.querySelector('#start-contain');
    const searchField = document.querySelector('#search');
    searchField.addEventListener('input', searchByAny)
    let lengthx;

    function makeNotEmpty(element) {
      if (element.innerHTML === '') {
        element.innerHTML = '-';
      }
    }

    function clearEmptyValues(array) {
      for (let i = 0; i < array.length; i++) {
        if (array[i] === '' || array[i] === null || array[i] === '(none)') {
          array.splice(i, 1)
        }
      }
    }

    function letterSize(p) {
      if (p.textContent.length > 70) {
        p.style.fontSize = '.6rem';
      } else if (p.textContent.length > 50) {
        p.style.fontSize = '.7rem';
      } else if (p.textContent.length > 40) {
        p.style.fontSize = '.8rem';
      } else if (p.textContent.length > 30) {
        p.style.fontSize = '.9rem';
      }
    }

    function createChild(parent, child) {
      parent.appendChild(child);
      child.style.width = '15%';
      child.className = 'child';
    }

    function createWantedCountriesArray(array) {
      let newCountriesArray = [];
      for (let i = 0; i < array.length; i++) {
        //country
        let obj = {};
        //country name
        obj.name = array[i].name;
        //country capital
        obj.capital = array[i].capital;
        //country region
        obj.region = array[i].region;
        //country languages
        const languages = array[i].languages
          .map(lang => lang.name);
        obj.language = languages.join(', ');
        //country currencie
        const currencie = array[i].currencies
          .map(currencie => currencie.code);
        clearEmptyValues(currencie);
        obj.currencie = currencie.join(', ');
        //country population
        obj.population = array[i].population;
        obj.population = obj.population.toString();
        //country area
        obj.area = obj.population.toString();
        obj.area = array[i].area;
        if (obj.area !== null) {
          obj.area = obj.area.toString();
        } else {
          obj.area = '-';
        }
        //country flag
        obj.flag = array[i].flag;

        //put country in the new array
        newCountriesArray[i] = obj;
      }
      return newCountriesArray
    }

    function createCountryDiv(country) {
      //create country div
      let countryDiv = document.createElement('div');
      main.appendChild(countryDiv);
      countryDiv.className = 'country';
      //create country children
      const flag = document.createElement('span');
      createChild(countryDiv, flag);
      const name = document.createElement('span');
      createChild(countryDiv, name);
      const capital = document.createElement('span');
      createChild(countryDiv, capital);
      const region = document.createElement('span');
      createChild(countryDiv, region);
      const population = document.createElement('span');
      createChild(countryDiv, population);
      const area = document.createElement('span');
      createChild(countryDiv, area);
      const currencies = document.createElement('span');
      createChild(countryDiv, currencies);
      const language = document.createElement('span');
      createChild(countryDiv, language);
      ////set attributes for children--
      //flag
      const image = new Image()
      image.className = 'child';
      flag.appendChild(image);
      image.src = country.flag;
      flag.style.width = '15%';
      flag.style.height = '100%';
      flag.className = 'flag';
      // country name
      name.textContent = country.name;
      name.style.fontWeight = 'bold';
      name.style.textAlign = 'left';
      letterSize(name)
      //capital
      capital.textContent = country.capital;
      makeNotEmpty(capital)
      //area
      area.textContent = country.area;
      makeNotEmpty(area)
      //region
      region.textContent = country.region;
      makeNotEmpty(region)
      //language
      language.textContent = country.language;
      letterSize(language)
      //currencies
      currencies.textContent = country.currencie;
      letterSize(currencies)
      makeNotEmpty(currencies)
      //population
      population.textContent = country.population;
      if (country.population > 100000000) {
        population.style.color = 'red';
      }
    }

    function grammar(wantedVerb) {
      number.textContent = lengthx;
      startContain.textContent = wantedVerb;
      if (lengthx > 1 || lengthx === 0) {
        verb.textContent = 'are';
        countrie_s.textContent = 'countries';
      } else {
        verb.textContent = 'is';
        countrie_s.textContent = 'country';
      }
    }

    

    function searchByAny() {
      main.innerHTML = '';
      total.textContent = '';
      let userInputUpper = searchField.value.toUpperCase();
      //get an array of coutries we want
      let result = createWantedCountriesArray(countriz)
        .filter((country) => {
          for (let key in country) {
            if (country[key].toUpperCase().includes(userInputUpper)) {
              return country
            }
          }
        })
        
      //display it in the DOM
      result.forEach(country => createCountryDiv(country));


      lengthx = result.length;
      expression.textContent = userInputUpper.toLowerCase();
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



      //if user deletes search word 'containing' dissapears
      if (userInputUpper === '') {
        startContain.textContent = '';
      }
    }



    searchByAny()
    startContain.textContent = '';
  })