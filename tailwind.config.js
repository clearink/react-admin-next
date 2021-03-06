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
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
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
  plugins: [],
};
