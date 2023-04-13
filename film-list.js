export function render(data) {

  const films = data.results;

  const wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');

  let id = 1;
  films.forEach((film) => {

    const card = document.createElement('div');
    card.classList.add('card');

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('card__image-container', `bg-${id}`);

    const content = document.createElement('div');
    content.classList.add('card__content');

    const link = document.createElement('a');
    link.href = `?film=${id}`;
    link.classList.add('card__link');

    const header = document.createElement('h2');
    header.classList.add('card__header');

    const title = document.createElement('p');
    title.innerText = 'Star Wars';
    title.classList.add('card__title');

    const subtitle = document.createElement('p');
    subtitle.innerText = film.title;
    subtitle.classList.add('card__subtitle');

    const year = document.createElement('p');
    year.classList.add('card__year');
    year.innerText = new Date(film.release_date).getFullYear();

    header.append(title, subtitle, year);
    link.append(header);
    content.append(link);
    card.append(imageContainer, content);
    wrapper.append(card);

    id += 1;
  });

  return wrapper;
}

