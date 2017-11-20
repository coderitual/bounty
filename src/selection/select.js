export default selection =>
  selection === String(selection) ? document.querySelector(selection) : selection;
