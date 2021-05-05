const anchor = document.querySelector('.intersecting-anchor');

const options = {};

const observeEntries = entries =>
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log(entry);
    }
  });

const observer = new IntersectionObserver(observeEntries, options);

observer.observe(anchor);
