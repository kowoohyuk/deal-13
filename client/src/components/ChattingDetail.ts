function ChattingDetail({ app, back }) {
  interface StateObj {
    user: string;
    modal: string;
  }
  const stateObj: StateObj = {
    user: 'user',
    modal: 'modal',
  };

  const $target = document.createElement('div');
  $target.className = 'chattingDetail slidein';
  $target.innerHTML = `
  <div class="top-bar off-white">
    <div>
      <div class="js-back icon icon-left"></div>
    </div>
    <div>
      <div class="id top-bar__text">####유저 아이디</div>
    </div>
    <div>
      <div class="js-modal icon icon-logout"></div>
    </div>
  </div>
  <div class="chat-header">
    <div class="js-img img-box-small"></div>
    <div class="chat-header-text">
      <p class="title chat-list-item__name">###제목</p>
      <p class="price chat-list-item__message">###가격</p>
    </div>
    <div class="chat-list-item__content-right">
      <button class="btn-status">
        <span>판매중</span>
      </button>
    </div>
  </div>
  <div class="chat-inner">
    <div class="chat-itme you">안녕하세ㅛㅇ 궁금한게</div>
    <div class="chat-itme you">안녕하세ㅛㅇ 궁금한게</div>
    <div class="chat-itme me">응 안뇽</div>
  </div>
  <form>
    <div class="chat-bar">
      <input
        type="text"
        class="content input-medium"
        placeholder="메세지를 입력하세요."
      />
      <button type="submit" class="btn-chat-send empty">
        <div class=" icon icon-send"></div>
      </button>
    </div>
  </form>
  <div class="js-dropdown blind">
    <div class="popup popup-alert">
      <p class="popup--title">정말로 이 채팅방을 나가시겠습니까?</p>
      <div class="popup--btns">
        <button class="js-cancel popup--btn">취소</button>
        <button class="js-out popup--btn error">나가기</button>
      </div>
    </div>
  </div>
  `;
  // 엠티를 없애고 만들고 위에 send버튼

  const status = {
    0: '판매중',
    1: '예약중',
    2: '판매완료',
  };

  const $img = $target.querySelector('.js-img');
  const $title = $target.querySelector('.title');
  const $price = $target.querySelector('.price');
  const $btnStatus = $target.querySelector('.btnStatus');
  const $content: HTMLInputElement = $target.querySelector('.content');
  const $dropDown = $target.querySelector('.js-dropdown');

  $target.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const classList = target.classList;
    if (classList.contains('js-cancel')) {
      this.setState(stateObj.modal, false);
    } else if (classList.contains('js-out')) {
      // 나가기 fetch
      this.setState(stateObj.modal, false);
      back();
    } else if (classList.contains('js-modal')) {
      this.setState(stateObj.modal, true);
    }
  });

  $target.addEventListener('submit', () => {
    const content = $content.value;
  });

  const getApi = (dbId, fn) => {
    console.log('chatting detail', 'getapi');
    fn();
  };

  this.state = {
    modal: false,
  };

  this.setState = (nextStateName, nextState) => {
    console.log('chatting detail setstate', nextStateName, nextState);
    console.log('state', this.state);
    this.state = { ...this.state, [nextStateName]: nextState };
    console.log('state', this.state);
    this.rerender(nextStateName);
  };

  this.render = (dbId) => {
    app.appendChild($target);
    getApi(dbId, () => setTimeout(() => $target.classList.add('slidein'), 0));
  };

  this.rerender = (changeStateName) => {
    switch (changeStateName) {
      case stateObj.modal:
        if (this.state.modal) $dropDown.classList.remove('blind');
        else $dropDown.classList.add('blind');
        return;
      default:
        console.log('state name is not found');
    }
  };
}
export default ChattingDetail;
