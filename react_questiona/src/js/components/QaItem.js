import React, { Component } from 'react';

class QaItem extends Component {
  onVote = method => {
    // console.log( method );
    let oldCount = Number.parseInt( this.props.voteCount, 10 ),
      offset = false;

    if ( oldCount > 0 && oldCount < 20 ) {
      offset = method === 'up' ? 1 : -1;
    } else if ( oldCount === 0 ) {
      method === 'up' ? offset = 1 : alert( '票数不能再下降啦！' );
    } else if ( oldCount === 20 ) {
      method === 'down' ? offset = -1 : alert( '最多投20票啊！' );
    }
    if ( !offset ) return;

    this.props.onVote( this.props.questionKey, oldCount + offset, method );
  };

  render() {
    return(
      <div className="media">
        <div className="media-left">
          <button id="btnUp" className="btn btn-default" onClick={ this.onVote.bind( this,  'up' ) }>
            <span className="glyphicon glyphicon-chevron-up"></span>
            <span className="vote-count">{ this.props.voteCount }</span>
          </button>
          <button className="btn btn-default" onClick={ this.onVote.bind( this,  'down' ) }>
            <span className="glyphicon glyphicon-chevron-down"></span>
          </button>
        </div>
        <div className="media-body">
          <h4 className="media-heading">{ this.props.title }</h4>
          <p>{ this.props.description }</p>
        </div>
      </div>
    );
  }
}

export default QaItem;
