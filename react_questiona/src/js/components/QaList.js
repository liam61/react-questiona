import React, { Component } from 'react';
import QaItem from './QaItem';
import { CSSTransition } from 'react-transition-group';

import '../../css/App.css';

class QaList extends Component {
  constructor(props) {
    super(props);

    const { questions } = props;
    if (!Array.isArray(questions)) throw new Error('this.props.questions必须是数组');

    let arr = [],
      i, len = questions.length;

    for (i = 0; i < len; i++) {
      arr[i] = { move: false, action: '' };
    }

    this.state = { itemMove: arr, method: '' };
  }

  static getDerivedStateFromProps(props, state) {
    // 此函数在本例中会在三种情况下调用 3次
    // 最初是父组件（App.js）初始化时会传 questions进来（会先经过 constructor初始化 itemMove后再传进来）
    // 第二种是就是在子组件（QaItem.js）调用 onVote()函数时，会回传 questions进来
    // 第三种是 QaFrom添加数据，到时父组件（App.js）的 questions更新，附带其子组件（包括此组件）更新
    // 传进来的 questions统一由此函数做排序处理

    const { questions } = props;
    const { itemMove } = state;

    let result = {};

    let compareByProp = prop => (a, b) => b[prop] - a[prop];
    result.questions = questions.sort(compareByProp('voteCount'));

    if (itemMove.length !== questions.length) { // 如果问题增加了
      result.itemMove = itemMove.concat({ move: false, action: '' });
    }

    return result;
  }

  onVote = (key, newCount, method) => {
    const { questions, handleData } = this.props;
    const { itemMove } = this.state;

    let index = questions.findIndex(qst => qst.key === key); // 通过 question的唯一 key找到当前点击的 item

    if (method === 'up' && questions[index - 1] && questions[index - 1].voteCount < newCount) { // 向上交换，questions的更新放在动画完成后来执行
      itemMove[index] = { move: true, action: 'item-up' };
      itemMove[index - 1] = { move: true, action: 'item-down' };

      this.setState({ itemMove: itemMove, method: method });
    } else if (method === 'down' && questions[index + 1] && questions[index + 1].voteCount > newCount) {
      itemMove[index] = { move: true, action: 'item-down' };
      itemMove[index + 1] = { move: true, action: 'item-up' };

      this.setState({ itemMove: itemMove, method: method });
    } else {
      questions[index].voteCount = newCount; // 直接对局部变量 questions赋值也会调用 getDerivedStateFromProps()方法？？？？？
      handleData(questions[index], index); // 传入更新完的 questions，来触发父组件的更改 props的函数
    }
  };

  moveDone = index => { // 向下的 item执行完动画后触发
    const { method, itemMove } = this.state;
    const { questions, handleData } = this.props;

    let offset = method === 'up' ? 1 : 0;
    let qst = questions[index + offset];
    qst.voteCount += method === 'up' ? 1 : -1;
    handleData(qst, index + offset);

    itemMove[index].move = false;
    itemMove[index + 1].move = false;

    this.setState({ itemMove: itemMove });
  };

  render() {
    const { questions } = this.props;
    const { itemMove } = this.state;

    let questionComps = questions.map((qst, index) => (
      <CSSTransition
        key={'trans' + index}
        in={itemMove[index].move}
        timeout={500}
        classNames={itemMove[index].action}
        onEntered={itemMove[index].action === 'item-down' ? () => this.moveDone(index) : null}
      >
        <div>
          <QaItem
            key={'item' + index}
            questionKey={qst.key}
            title={qst.title}
            description={qst.description}
            voteCount={qst.voteCount}
            onVote={this.onVote}
          />
        </div>
      </CSSTransition>
    ));

    return (
      <div id="questions" className="">
        {questionComps}
      </div>
    );
  }
}

export default QaList;
