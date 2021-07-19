import { IBlock } from '../../consts/interface';

export default function Button({
  target,
  children = '',
  tagName = 'button',
  type = 'medium',
  options = '',
  classList,
}: IBlock) {
  this.render = function () {
    target.append(`
      <${tagName} class='btn-${type} ${classList.join(' ')}' ${options} >
        ${children}
      </${tagName}>
    `);
  };
}
