import { IBlock } from '../../consts/interface';

export default function Input({
  target,
  children = '',
  tagName = 'button',
  type = 'text',
  size = 'medium',
  options = '',
  classList,
}: IBlock) {
  this.render = function () {
    target.append(`
      <${tagName} class='input-${size} ${classList.join(
      ' ',
    )}' type="${type}" ${options} >
        ${children}
      </${tagName}>
    `);
  };
}
