https://zh-hans.react.dev/learn

React 应用程序是由 **组件** 组成的。一个组件是 UI（用户界面）的一部分，它拥有自己的逻辑和外观。组件可以小到一个按钮，也可以大到整个页面

React组件是返回标签的Javascript函数：
```js
function MyButton{
  return {
    <button>I'm a button</button>
  };
}
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// 使用组件时，传入不同的 props
<Greeting name="Alice" /> // 输出: Hello, Alice!
<Greeting name="Bob" />   // 输出: Hello, Bob!
```

React组件必须以大写字母开头，而html标签则必须是小写字母

上面使用的标签语法被称为JSX。

在 React 中，你可以使用 `className` 来指定一个 CSS 的 class。它与 HTML 的 [`class`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/class) 属性的工作方式相同
```css
.container {
  padding: 20px;
  background-color: lightblue;
}

.header {
  font-size: 24px;
  color: darkblue;
}

.description {
  font-size: 16px;
  color: darkgray;
} //App.css
```

```javascript
import React from 'react';
import './App.css'; // 假设你有一个 CSS 文件

function App() {
  return (
    <div className="container">
      <h1 className="header">Hello, World!</h1>
      <p className="description">This is a simple React component.</p>
    </div>
  );
}

export default App;
```

JSX 允许你将 HTML 标签放入 JavaScript 代码中，使得构建 UI 变得更加直观和方便。在 JSX 中，你可以使用大括号 {} 来插入 JavaScript 表达式，包括变量、函数调用等。这使得你可以轻松地将动态数据展示在 UI 上。
```react
import React from 'react';

function UserGreeting({ user }) {
  return (
    <div>
      <h1>欢迎, {user.name}!</h1>
      <p>你今天的任务是: {user.task}</p>
    </div>
  );
}

// 使用组件
const user = {
  name: '小明',
  task: '完成 React 学习'
};

function App() {
  return (
    <div>
      <UserGreeting user={user} />
    </div>
  );
}

export default App;

---------------------------

  const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90,
};

export default function Profile() {
  return (
    <>
      <h1>{user.name}</h1>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={'Photo of ' + user.name} //这里，字符串拼接
        style={{
          width: user.imageSize,
          height: user.imageSize
        }}
      />
    </>
  );
}
```

条件渲染（if.else)
```react
let content;
if (isLoggedIn) {
  content = <AdminPanel />;
} else {
  content = <LoginForm />;
}
return (
  <div>
    {content}
  </div> 
  //或者 
  
  <div> {isLoggedIn ? (
    <AdminPanel />
  ) : (
    <LoginForm />
  )}
</div>
);


```

渲染列表
```react
const products = [
  { title: 'Cabbage', isFruit: false, id: 1 },
  { title: 'Garlic', isFruit: false, id: 2 },
  { title: 'Apple', isFruit: true, id: 3 },
];

export default function ShoppingList() {
  const listItems = products.map(product =>
    <li
      key={product.id}
      style={{
        color: product.isFruit ? 'magenta' : 'darkgreen'
      }}
    >
      {product.title}
    </li>
  );

  return (
    <ul>{listItems}</ul> //ul是容器，li是具体的每一项
  );
}

```

响应事件
在组建中声明事件处理函数来响应事件

```react
function MyButton() {
  function handleClick() {
    alert('You clicked me!');
  }

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}
```

==自己的感悟==：MyButton 函数组件和类的概念确实有一些相似之处，尤其是在组件内部定义的 handleClick 函数和类中的成员函数非常类似

更新界面
通常你会希望你的组件 “记住” 一些信息并展示出来，比如一个按钮被点击的次数。要做到这一点，你需要在你的组件中添加 **state**。

```react
import { useState } from 'react'; //从 React 引入 useState\


export default function MyApp() {
  return (
    <div>
      <h1>Counters that update separately</h1>
      <MyButton />
      <MyButton />  
    </div>
  );
}

function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}  // React 将再次调用你的组件函数。第一次 count 变成 1。接着点击会变成 2。继续点击会逐步递增。如果你多次渲染同一个组件，每个组件都会拥有自己的 state
```

使用Hook
以use开头的函数被称为Hook，`useState` 是 React 提供的一个内置 Hook。

Hooks只能在组件的顶层调用，不能在条件语句、循环语句中和嵌套的函数内部调用Hook
如果你在条件或循环中调用 Hooks，调用顺序可能会在不同的渲染过程中发生变化，导致 React 无法正确匹配状态或副作用

==反例==

```js
function MyComponent() {
  if (someCondition) {
    const [count, setCount] = useState(0); // 这里违反了规则
  }

  return <div>MyComponent</div>;
}
```

useState 只会在 someCondition 为 true 时调用。下一次渲染如果 someCondition 变成了 false，React 将无法找到之前的状态，因为调用顺序已经被打乱。

```js
function MyComponent() {
  for (let i = 0; i < 3; i++) {
    const [count, setCount] = useState(0); // 这里也违反了规则
  }

  return <div>MyComponent</div>;
}
```

每次渲染时，React 期望 useState 在特定的位置调用一次，而不是在循环中反复调用。即使循环次数不变，React 仍然会困惑，因为它无法正确映射哪个 useState 对应哪个状态。

组件间的共享数据
![image-20241011194007055](/Users/ianzhao/Library/Application%20Support/typora-user-images/image-20241011194007055.png)

```react
import { useState } from 'react';

export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Counters that update together</h1>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  );
}

function MyButton({ count, onClick }) {
  return (
    <button onClick={onClick}>
      Clicked {count} times
    </button>
  );
}

```

在 React 中，prop（全称是 “property”）指的是组件的**属性**，它们是父组件传递给子组件的数据。props 是 React 组件的一个核心概念，允许组件之间进行数据传递，使得组件变得更加灵活和可重用。
比如：Myapp的state和事件处理函数一同向下传递到每个button，然后MyButton以读取从父组件传递来的prop