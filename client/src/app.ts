import './styles/App.scss';
import './styles/index.scss';
import Main from './components/Main';
import Category from './components/Category';
import Login from './components/Login';
import Account from './components/Account';
import Chatting from './components/Chatting';
import ChattingDetail from './components/ChattingDetail';
import Menu from './components/Menu';
import Post from './components/Post';
import Region from './components/Region';
import Write from './components/Write';
import Signup from './components/Signup';

interface ActionObj {
  go: string;
  back: string;
  goMain: string;
  goLogin: string;
  user: string;
  category: string;
  primaryRegion: string;
}
interface RenderObj {
  login: string;
  account: string;
  signup: string;
  category: string;
  menu: string;
  write: string;
  post: string;
  chatting: string;
  chattingDetail: string;
  region: string;
}

const actionObj: ActionObj = {
  go: 'go',
  back: 'back',
  goMain: 'goMain',
  goLogin: 'goLogin',
  user: 'user',
  category: 'category',
  primaryRegion: 'primaryRegion',
};
const renderObj: RenderObj = {
  login: 'login',
  account: 'account',
  signup: 'signup',
  category: 'category',
  menu: 'menu',
  write: 'write',
  post: 'post',
  chatting: 'chatting',
  chattingDetail: 'chattingDetail',
  region: 'region',
};

function App() {
  const app = document.querySelector('#app');

  const go = (next: string): void => {
    const nextDepth = [...this.state.depth, next];
    this.setState(actionObj.go, { ...this.state, depth: nextDepth });
  };

  const back = (): void => {
    const nextDepth = this.state.depth.slice(0, this.state.depth.length - 1);
    this.setState(actionObj.back, { ...this.state, depth: nextDepth });
  };

  const goMain = (): void => {
    const nextDepth = [];
    this.setState(actionObj.goMain, { ...this.state, depth: nextDepth });
  };

  const goLogin = (): void => {
    alert('로그인해주세요');
    const nextDepth = [renderObj.login];
    this.setState(actionObj.goLogin, { ...this.state, depth: nextDepth });
  };

  const historyPush = (): void => {
    // const nextUrl = this.state.depth.join('/') || '/';
    // history.pushState('', '', nextUrl);
  };

  const setCategory = (
    category: string = 'all',
    auto: string = null,
  ): string | void => {
    localStorage.setItem(actionObj.category, category);
    if (auto) return category;
    this.setState(actionObj.category, {
      ...this.state,
      category,
    });
    // return localStorage.getItem(actionObj.category);
  };

  const autoGetCategory = (): void => {
    const category =
      localStorage.getItem(actionObj.category) || setCategory('all', 'auto');
    this.setState(actionObj.category, { ...this.state, category });
  };

  const setPrimaryRegion = (
    primaryRegion: string = '0',
    auto: string = null,
  ): string | void => {
    localStorage.setItem(actionObj.primaryRegion, primaryRegion);
    if (auto) return primaryRegion;
    this.setState(actionObj.primaryRegion, { ...this.state, primaryRegion });
    // return localStorage.getItem(actionObj.primaryRegion);
  };

  const autoGetPrimaryRegion = (): void => {
    const primaryRegion =
      localStorage.getItem(actionObj.primaryRegion) ||
      setPrimaryRegion('0', 'auto');
    this.setState(actionObj.primaryRegion, { ...this.state, primaryRegion });
  };
  // 지역 삭제할땐 무조건 setPrimaryRegion('0'),

  const authProcess = (user: string) => {
    this.setState(actionObj.user, { ...this.state, user });
    if (user) {
      autoGetCategory();
      autoGetPrimaryRegion();
    }
  };

  const autoLogin = (): void => {
    if (localStorage.getItem('user'))
      fetch('/api/auth', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          if (res.ok || res.status === 401) return res.json();
        })
        .then(({ user, error }) => {
          if (user) authProcess(user);
          if (error) console.log(error);
        })
        .catch((e) => {
          console.error(e);
        });
    else {
      authProcess(null);
    }
  };

  const main = new Main({ app, go, setPrimaryRegion });
  const login = new Login({
    app,
    go,
    back,
    authProcess,
  });
  const signup = new Signup({
    app,
    back,
    goMain,
  });
  const account = new Account({ app, back, authProcess });
  const category = new Category({
    app,
    setCategory,
    back,
  });
  const menu = new Menu({ app, back });
  const write = new Write({ app, back, goMain });
  const post = new Post({ app, go, back });
  const chatting = new Chatting({ app, go, back });
  const chattingDetail = new ChattingDetail({
    app,
    back,
  });
  const region = new Region({ app, back, setPrimaryRegion });

  this.state = {
    user: undefined,
    category: undefined,
    primaryRegion: undefined,
    depth: [],
  };

  this.setState = (action: string, nextState: any): any => {
    console.log('app setstate');
    this.state = nextState;
    switch (action) {
      case actionObj.go:
      case actionObj.back:
      case actionObj.goMain:
      case actionObj.goLogin:
        historyPush();
      case actionObj.user:
      case actionObj.category:
      case actionObj.primaryRegion:
        return this.render(action);
      default:
        console.log('action name is not found');
    }
  };

  this.render = (action: string): any => {
    console.log('app render', 'action: ', action, 'state: ', this.state);
    switch (action) {
      case actionObj.go:
        const lastDepth = this.state.depth[this.state.depth.length - 1];
        const name =
          lastDepth.search(/\#/g) === -1 ? lastDepth : renderObj.post;
        // case문을 if문으로 바꿀까 고민중
        switch (name) {
          case renderObj.category:
            if (!this.state.user) return goLogin();
            return category.render(this.state.category);
          case renderObj.login:
            if (this.state.user) return goMain();
            return login.render();
          case renderObj.signup:
            if (this.state.user) return goMain();
            return signup.render();
          case renderObj.account:
            if (!this.state.user) return goLogin();
            return account.render();
          case renderObj.menu:
            if (!this.state.user) return goLogin();
            return menu.render();
          case renderObj.write:
            if (!this.state.user) return goLogin();
            return write.render();
          case renderObj.post:
            if (!this.state.user) return goLogin();
            return post.render();
          case renderObj.chatting:
            if (!this.state.user) return goLogin();
            return chatting.render();
          case renderObj.chattingDetail:
            if (!this.state.user) return goLogin();
            return chattingDetail.render();
          case renderObj.region:
            if (!this.state.user) return goLogin();
            return region.render();
          default:
            console.log('render name is not found');
            return;
        }
      case actionObj.back:
        const lastChild = app.lastElementChild;
        lastChild.classList.replace('slidein', 'slideout');
        setTimeout(() => {
          // app.removeChild(lastChild);
          lastChild.remove();
        }, 500);
        return;
      case actionObj.goMain:
        while (app.children.length !== 1) {
          // app.removeChild(app.children[1]);
          app.children[1].remove();
        }
        return;
      case actionObj.goLogin:
        while (app.children.length !== 1) {
          // app.removeChild(app.children[1]);
          app.children[1].remove();
        }
        login.render();
        return;

      case actionObj.user:
        main.setState(actionObj.user, this.state.user);
        account.setState(actionObj.user, this.state.user);
        region.setState(actionObj.user, this.state.user);
        // 여기다가 user 필요한 컴포넌트 전부 같은방식
        return;
      case actionObj.category:
        main.setState(actionObj.category, this.state.category);
        // category.setState(actionObj.category, this.state.category);
        return;
      case actionObj.primaryRegion:
        main.setState(actionObj.primaryRegion, this.state.primaryRegion);
        region.setState(actionObj.primaryRegion, this.state.primaryRegion);
        return;
    }
  };

  const init = (): void => {
    autoLogin();
  };
  init();
  // 새로고침이나 url 직접 이동시 유효성 검사
  // 그냥 직접 순서를 배열로 주는방법(효율적x 다른방법 안보임)
  // 거기서 user로 검사를 하고 틀리다면 goHome 또는 goLogin 함수 호출
  // 그다음에 for문에서 break
  // 슬라이드되는 거는 action을 하나줘서 바로 나오게 해야될듯?
  // 또 생각할게 /login/signup 에서 나타나는 순서.
}

new App();
