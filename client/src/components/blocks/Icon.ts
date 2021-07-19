import { IBlock } from '../../consts/interface';

export default function Icon({
  target,
  children = '',
  tagName = 'div',
  type = '',
  options = '',
  classList,
}: IBlock) {
  this.render = function () {
    target.append(`
      <${tagName} class='icon icon-${type} ${classList.join(' ')}' ${options} >
        ${children}
      </${tagName}>
    `);
  };
}
