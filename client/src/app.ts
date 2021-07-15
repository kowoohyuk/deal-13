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
  user: string;
  category: string;
  region: string;
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
  user: 'user',
  category: 'category',
  region: 'region',
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
  const historyPush = (): void => {
    // const nextUrl = this.state.depth.join('/') || '/';
    // history.pushState('', '', nextUrl);
  };
  const authProcess = (user) => {
    this.setState(actionObj.user, { ...this.state, user });
  };

  this.state = {
    user: undefined,
    category: undefined,
    depth: [],
  };

  const main = new Main({ app, go });
  const login = new Login({
    app,
    user: this.state.user,
    go,
    back,
    authProcess,
  });
  const signup = new Signup({ app, user: this.state.user, back, goMain });
  const account = new Account({ app, user: this.state.user, back, goMain });
  const category = new Category({ app, user: this.state.user, back });
  const menu = new Menu({ app, user: this.state.user, back });
  const write = new Write({ app, user: this.state.user, back, goMain });
  const post = new Post({ app, user: this.state.user, go, back });
  const chatting = new Chatting({ app, user: this.state.user, go, back });
  const chattingDetail = new ChattingDetail({
    app,
    user: this.state.user,
    back,
  });
  const region = new Region({ app, user: this.state.user, back });

  this.setState = (action: string, nextState: any): any => {
    console.log('app setstate');
    this.state = nextState;
    switch (action) {
      case actionObj.go:
      case actionObj.back:
      case actionObj.goMain:
        historyPush();
        return this.render(action);
      case actionObj.user:
      case actionObj.category:
        return this.render(action);
      default:
        console.log('action name is not found');
    }
  };
  this.render = (action: string): any => {
    console.log('app render', 'action: ', action, 'state: ', this.state);
    switch (action) {
      case actionObj.go:
        const name = this.state.depth[this.state.depth.length - 1];
        switch (name) {
          case renderObj.category:
            return category.render();
          case renderObj.login:
            return login.render();
          case renderObj.signup:
            return signup.render();
          case renderObj.account:
            return account.render();
          case renderObj.menu:
            return menu.render();
          case renderObj.write:
            return write.render();
          case renderObj.post.slice(0, 4):
            return post.render();
          case renderObj.chatting:
            return chatting.render();
          case renderObj.chattingDetail:
            return chattingDetail.render();
          case renderObj.region:
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
      case actionObj.user:
        main.setState(actionObj.user, this.state.user);
        // 여기다가 user 필요한 컴포넌트 전부 같은방식
        return;
      case actionObj.category:
        main.setState(actionObj.category, this.state.category);
        // 여기다가 category 필요한 컴포넌트 전부 같은방식
        return;
    }
  };

  const autoLogin = (): void => {
    fetch('/api/auth', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const { user, text } = data;
        authProcess(user);
        if (text) console.log(data.text);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const setCategory = (category: string = 'all'): string => {
    localStorage.setItem('category', category);
    return category;
    // return localStorage.getItem('category');
  };

  const getCategory = (): void => {
    const category = localStorage.getItem('category') || setCategory();
    this.setState(actionObj.category, { ...this.state, category });
  };

  const init = (): void => {
    autoLogin();
    // fake
    // this.setState(actionObj.user, {
    //   ...this.state,
    //   user: { uuid: 'uu', id: 'minsang', region: ['방배동', '관악동'] },
    // });
    getCategory();
  };
  init();
}

new App();
