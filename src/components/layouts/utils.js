import axios from 'axios';

/**
 * @function handleLike
 * @description Likes/dislikes an artwork.
 * @param {object} cardInfo - Information about every liked artwork.
 */
export const handleLike = async (cardInfo) => {
  await axios
    .get(`http://localhost:8000/likes`)
    .then((res) => {
      return res.data;
    })
    .then((oldData) => {
      if (!cardInfo.isLiked) {
        axios.post(`http://localhost:8000/likes`, cardInfo);
        oldData.forEach((item) => {
          if (item.artwork_id === cardInfo.artwork_id) {
            axios.delete(`http://localhost:8000/likes/${item.id}`);
          }
        });
      } else {
        oldData.forEach((item) => {
          if (item.artwork_id === cardInfo.artwork_id) {
            axios.delete(`http://localhost:8000/likes/${item.id}`);
          }
        });
      }
    });
};

/**
 * @function handleDisplayOptions
 * @description Switches between the 3 display options available.
 * @param {object} e - The display option event handler.
 * @param {number} windowWidth - The window resize width.
 */
export const handleDisplayOptions = (e, windowWidth) => {
  // STYLE THE ICONS
  e.target.style.color = 'white';
  const icons = document.querySelectorAll('div span');
  icons.forEach((icon) => {
    if (icon !== e.target) {
      icon.style.color = '';
    }
  });
  // SWITCH BETWEEN THE 3 MAIN VIEWS
  const cardsContainer = document.querySelector('.cards-container');
  // 1- LIST VIEW
  if (e.target.textContent === 'view_list') {
    /* listen to click */
    if (window.innerWidth >= 0 || windowWidth >= 0) {
      cardsContainer.style.cssText = `
        width: 100%;
        columns: 1;
        margin: 0 auto;
        display: block;
        column-gap: 1rem;
        animation: none;
      `;
    }
    if ((windowWidth >= 576 || window.innerWidth >= 576) && (windowWidth < 992 || window.innerWidth < 992)) {
      cardsContainer.style.cssText += `width: 75%;`;
    }
    if (windowWidth >= 992 || window.innerWidth >= 992) {
      cardsContainer.style.cssText += `width: 50%;`;
    }
    /* apply the same styles on resize */
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 0 || windowWidth >= 0) {
        cardsContainer.style.cssText = `
          width: 100%;
          columns: 1;
          margin: 0 auto;
          display: block;
          column-gap: 1rem;
          animation: none;
        `;
      }
      if ((windowWidth >= 576 || window.innerWidth >= 576) && (windowWidth < 992 || window.innerWidth < 992)) {
        cardsContainer.style.cssText += `width: 75%;`;
      }
      if (windowWidth >= 992 || window.innerWidth >= 992) {
        cardsContainer.style.cssText += `width: 50%;`;
      }
    });
  }
  // 2- GRID VIEW
  if (e.target.textContent === 'view_module') {
    /* listen to click */
    if (window.innerWidth >= 0 || windowWidth >= 0) {
      cardsContainer.style.cssText = `
        columns: 2;
        width: 100%;
        display: block;
        column-gap: 1rem;
        animation: none;
      `;
    }
    if ((windowWidth >= 992 || window.innerWidth >= 992) && (windowWidth < 1200 || window.innerWidth < 1200)) {
      cardsContainer.style.cssText += `columns: 3;`;
    }
    if (windowWidth >= 1200 || window.innerWidth >= 1200) {
      cardsContainer.style.cssText += `columns: 4;`;
    }
    /* apply the same styles on resize */
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 0 || windowWidth >= 0) {
        cardsContainer.style.cssText = `
          columns: 2;
          width: 100%;
          display: block;
          column-gap: 1rem;
          animation: none;
        `;
      }
      if ((windowWidth >= 992 || window.innerWidth >= 992) && (windowWidth < 1200 || window.innerWidth < 1200)) {
        cardsContainer.style.cssText += `columns: 3;`;
      }
      if (windowWidth >= 1200 || window.innerWidth >= 1200) {
        cardsContainer.style.cssText += `columns: 4;`;
      }
    });
  }
  // 3- SLIDE VIEW
  if (e.target.textContent === 'play_arrow') {
    const cards = document.querySelectorAll('.cards-container > div');
    document.documentElement.style.setProperty('--num', `${cards.length}`);
    /* listen to click */
    if (windowWidth >= 0 || window.innerWidth >= 0) {
      cardsContainer.style.cssText = `
        display: flex;
        justify-content: center;
        align-items: center;
        width: calc(243px * ${1.5 * cards.length});
        column-gap: 2rem;
        animation: scroll ${cards.length * 5}s linear infinite;
      `;
      for (let card of cards) {
        card.addEventListener('mouseenter', () => {
          cardsContainer.style.animationPlayState = 'paused';
        });
        card.addEventListener('mouseleave', () => {
          cardsContainer.style.animationPlayState = 'running';
        });
      }
    }
    /* apply the same styles on resize */
    window.addEventListener('resize', () => {
      if (windowWidth >= 0 || window.innerWidth >= 0) {
        cardsContainer.style.cssText = `
          display: flex;
          justify-content: center;
          align-items: center;
          width: calc(243px * ${1.5 * cards.length});
          column-gap: 2rem;
          animation: scroll ${cards.length * 3}s linear infinite;
        `;
        for (let card of cards) {
          card.addEventListener('mouseenter', () => {
            cardsContainer.style.animationPlayState = 'paused';
          });
          card.addEventListener('mouseleave', () => {
            cardsContainer.style.animationPlayState = 'running';
          });
        }
      }
    });
  }
};
