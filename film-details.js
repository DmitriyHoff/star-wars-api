export async function render(data) {
  /* динамический импорт функции для загрузки доп. данных
  *  о планетах, расах и кораблях
  */
  const { default: load } = await import('./load-res.js');

  const page = document.createElement('div');
  page.className = 'page';

  const backLink = document.createElement('a');
  backLink.className = 'page__link';
  backLink.innerText = '❰ Back to episodes';
  backLink.href = './';

  const header = document.createElement('h1');
  header.className = 'page__header';

  const episode = document.createElement('span');
  episode.className = 'page__episode';
  episode.innerText = `Episode ${data.episode_id}: `;

  const title = document.createElement('span');
  title.className = 'page__title';
  title.innerText = data.title;

  header.append(episode, title);

  const stage = document.createElement('div');
  stage.className = 'page__stage';
  const openingCrawl = document.createElement('p');
  openingCrawl.id = 'crawl';
  openingCrawl.className ='page__opening-crawl';
  openingCrawl.innerText = data.opening_crawl;
  stage.append(openingCrawl);

  const info = document.createElement('div');
  info.className = 'page__info';

  const planetsWrap = document.createElement('div');
  const planetsCaption = document.createElement('h2');
  planetsCaption.className = 'page__caption';
  planetsCaption.innerText = 'Planets';

  const planetsList = document.createElement('ul');
  planetsList.className = 'page__list';
  for (let planet of data.planets) {
    const listItem = document.createElement('li');
    listItem.className = 'page__list-item';
    listItem.innerText = (await load(planet)).name;
    planetsList.append(listItem);
  }
  planetsWrap.append(planetsCaption, planetsList);

  const speciesWrap = document.createElement('div');
  const speciesCaption = document.createElement('h2');
  speciesCaption.className = 'page__caption';
  speciesCaption.innerText = 'Species';

  const speciesList = document.createElement('ul');
  speciesList.className = 'page__list';
  for (let speciesItem of data.species) {
    const listItem = document.createElement('li');
    listItem.className = 'page__list-item';
    listItem.innerText = (await load(speciesItem)).name;
    speciesList.append(listItem);
  }
  speciesWrap.append(speciesCaption, speciesList);

  const shipsWrap = document.createElement('div');
  const starshipsCaption = document.createElement('h2');
  starshipsCaption.className = 'page__caption';
  starshipsCaption.innerText = 'Starships';

  const starshipsList = document.createElement('ul');
  starshipsList.className = 'page__list';
  for (let ship of data.starships) {
    const listItem = document.createElement('li');
    listItem.className = 'page__list-item';
    listItem.innerText = (await load(ship)).name;
    starshipsList.append(listItem);
  }
  shipsWrap.append(starshipsCaption, starshipsList);

  info.append(planetsWrap, speciesWrap, shipsWrap);

  page.append(backLink, header, stage, info);

  return page;
}
