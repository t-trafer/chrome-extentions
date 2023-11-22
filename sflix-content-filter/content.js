const DEFAULT_FORMATS = ['HD', 'HDRip'];
const DEFAULT_YEAR_RANGE = [2000, 2023];
const DEBUG_MODE = false;

const movieListWrap = document.querySelector('.film_list-wrap');
const getFilteredMovies = (formats, yearRange) => {
    const movies = Array.from(movieListWrap.children);
    return movies.filter(movie => {
        const detailsNode = movie.children[1]?.children[0];
        const movieFormat = detailsNode?.children[1]?.children[0]?.childNodes[0]?.textContent;
        const movieYear = detailsNode?.children[2]?.childNodes[0]?.textContent;
        const isValidFormat = !formats || formats.includes(movieFormat);
        const isValidYear = !yearRange || (movieYear >= yearRange[0] && movieYear <= yearRange[1]);
        return isValidFormat && isValidYear;
    });
};
const filterPageResults = () => {
  debug.textContent = 'initialised...';
  try {
    movieListWrap.replaceChildren(...getFilteredMovies(DEFAULT_FORMATS, DEFAULT_YEAR_RANGE));
    debug.textContet = 'finished';
  } catch (err) {
    debug.textContent = `failed ${err}`
  }
};

// INJECTION
const headerContainer = document.querySelector('.container');
const filterEl = document.createElement("button");
const debug = document.createElement("div");

const initFilter = () => {
  filterEl.onclick = filterPageResults;
  filterEl.textContent = '▼';
  filterEl.style = `
    position: absolute;
    height: 30px;
    right: 105px;
    top: calc(50% - 15px);
  `;
  headerContainer?.append(filterEl);
}
const initDebug = () => {
  debug.textContent = 'waiting...';
  headerContainer?.append(debug);
};

(() => {
  if (DEBUG_MODE) initDebug();
  initFilter();
})();