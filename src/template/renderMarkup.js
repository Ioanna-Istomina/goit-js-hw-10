function countryList({ name, flags }) {
  return `<li>
        <img src="${flags.svg}" width = "52" alt="${name.official}" class="img">
        <p class ="title">${name.official}</p>
      </li>`;
}

function countryInformation({ name, capital, population, flags, languages }) {
  return `<img src="${flags.svg}" width = "200" alt="${name.official}">
      <h2>${name.official}</h2>
      <li><span class="list_span">Capital: </span>${capital}</li>
      <li><span class="list_span">Population: </span>${population}</li>
      <li><span class="list_span">Languages: </span>${Object.values(
        languages
      )}</li>`;
}

export { countryList, countryInformation };
