import React, {Component} from 'react';
import uuid from 'uuid';

class QaForm extends Component {
  submitForm = ( e ) => {
    e.preventDefault();

    if ( this.refs.title.value === '' || this.refs.description.value === '' ) {
      alert( '你还没有输入标题和或内容！' );
      return;
    }

    let qst = {
      key: 'qst' + uuid(),
      title: this.refs.title.value,
      description: this.refs.description.value,
      voteCount: 0
    };

    this.props.handleData( qst, -1 );

    this.refs.addQuestionForm.reset();
  };

  render() {
    return (
      <form ref="addQuestionForm" name="addQuestion" className="clearfix" onSubmit={ this.submitForm }>
        <div className="form-group">
          <label htmlFor="qtitle">问题</label>
          <input ref="title" type="text" id="qtitle" className="form-control" placeholder="您的问题的标题" />
        </div>
        <textarea ref="description" className="form-control" rows="3" placeholder="问题的描述"></textarea>
        <button className="btn btn-success pull-right">确认</button>
        <a className="btn btn-default pull-right" onClick={ this.props.onToggleForm }>取消</a>
      </form>
    );
  }
}

export default QaForm;