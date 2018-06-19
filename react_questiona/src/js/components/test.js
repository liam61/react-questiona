import React, {Component} from 'react';
import { CSSTransition } from 'react-transition-group';

import '../../css/App.css';

export default class Test extends Component {
  constructor( props ) {
    super( props );
    this.state = { liMove: [
        { move: false, method: 'item-up'},
        { move: false, method: 'item-up'},
        { move: false, method: 'item-up'}
      ],
    datas: [{ d: 'a', num: 0 },{ d: 'b', num: 1 },{ d: 'c', num: 1 }]};
  }

  onClick = () => {
    let temp = this.state.liMove;
    temp[0] = { move: true, method: 'item-down'};
    temp[1] = { move: true, method: 'item-up'};
    this.setState({ liMove: temp });

  };

  onClick2 = () => {
    let temp = this.state.liMove;
    temp[1] = { move: true, method: 'item-down'};
    temp[2] = { move: true, method: 'item-up'};
    this.setState({ liMove: temp });
  };

  enen = () => {
    console.log(this.state.liMove);

    let t = this.state.liMove;
    t[0].move = false;
    t[1].move = false;
    t[2].move = false;

    this.setState({ liMove: t });
  };

  render() {
    return(
      <div>
        <ul ref="oUl" className="testul">
          { this.state.datas.map( ( data, index ) => (
            <CSSTransition key={ 'li' + index } in={ this.state.liMove[index].move }
              timeout={ 600 } classNames={ this.state.liMove[index].method } onEntered={ this.state.liMove[index].method === 'item-up' ? this.enen : null }>
              <li className={ 'li'+ index }>{ index } { data.d }</li>
            </CSSTransition>
          ) ) }
        </ul>
        <button onClick={ this.onClick }>交换1 2</button>
        <button onClick={ this.onClick2 }>交换2 3</button>
      </div>
    );
  }
}