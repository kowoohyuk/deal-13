import { IBlock } from '../../consts/interface';

export default function ImageBox({
  target,
  children = '',
  tagName = 'div',
  size = 'medium',
  options = '',
  classList,
}: IBlock) {
  this.render = function () {
    target.append(`
      <${tagName} class='${classList.join(' ')}' img-box-${size} ${options} >
        ${children}
      </${tagName}>
    `);
  };
  this.template = () => `
  <${tagName} class='img-box-${size} ${classList.join(' ')}' ${options} >
    ${children}
  </${tagName}>
`;
}

// const target = document.querySelector('#app');

// const imgBox = new ImageBox({
//   target,
//   children,
//   tagName: 'input',
//   classList: ['js-btn'],
//   options: `data-idx=${idx} disabled=true`
// });

// imgBox.render();

// target.innerHTML += template + template + template + template
