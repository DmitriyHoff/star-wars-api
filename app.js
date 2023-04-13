import loadResource from './load-res.js';

async function loadPage(module, apiUrl, css) {
  const [pageModule, data] = await Promise.all([module, apiUrl, css].map((src) => loadResource(src)));

  const page = await pageModule.render(data);
  disableLinks(page);

  appContainer.replaceChildren();
  appContainer.append(page);
}

/** Определяет поведение ссылок на странице */
function disableLinks(page) {
  const links = page.querySelectorAll('a');

  for(let link of links) {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      history.pushState(null, '', e.currentTarget.href);
      goToPage();
    });
  }
}

function goToPage() {

  const searchParams = new URLSearchParams(location.search);
  const filmId = searchParams.get('film');
  if(filmId)
    loadPage('./film-details.js',`https://swapi.py4e.com/api/films/${filmId}/`,'./styles.css');

  else
    loadPage('./film-list.js','https://swapi.py4e.com/api/films/','./styles.css');
}



window.addEventListener('popstate', (e) => {
  // загружаем текущую страницу
  goToPage();
});


// контейнер приложения
const appContainer = document.getElementById('app');
goToPage();

