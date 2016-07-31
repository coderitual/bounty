export default (selection) => {
  return selection === String(selection) ? ::document.querySelector(selection) : selection;
};
