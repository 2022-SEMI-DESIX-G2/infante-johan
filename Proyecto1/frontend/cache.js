(() => {
  const App = {
    config: {
      apiBaseUrl: "http://localhost:3000/pokemon/cache",
    },
    htmlElements: {
      form: document.querySelector(".pokemon-form"),
      input: document.querySelector("#pokemon-input"),
    },
    init: () => {
      App.htmlElements.form.addEventListener(
          "submit",
          App.handlers.handleFormSubmit
      );
    },
    handlers: {
      handleFormSubmit: async (e) => {
        e.preventDefault();
        const pokemon = App.htmlElements.input.value;
        const url = App.utils.getUrl({ pokemon });
        const { data } = await axios.post(url);
        console.log({ data });
      },
    },
    utils: {
      getUrl: ({ pokemon }) => {
        return `${App.config.apiBaseUrl}/${pokemon}`;
      },
    },
  };
  App.init();
})();
