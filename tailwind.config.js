// 24 格栅格布局
function gridLayout(colNum = 24) {
  return Array.from({ length: colNum }, (_, i) => i).reduce((pre, cur) => {
    return {
      ...pre,
      [`${cur}/${colNum}`]: `${(cur / colNum) * 100}%`,
    };
  }, {});
}

module.exports = {
  purge: {
    content: ["./src/**/*.tsx", "./src/**/*.scss", "./public/index.html"],
    defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        ...gridLayout(),
      },
    },
  },
  variants: {
    extend: {},
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
