import { IBlock } from '../../consts/interface';

export default function ChatBadge({
  target,
  children = '',
  tagName = 'button',
  options = '',
  classList,
}: IBlock) {
  this.render = function () {
    target.append(`
      <${tagName} class='${classList.join(' ')}' ${options} >
        ${children}
      </${tagName}>
    `);
  };
}
