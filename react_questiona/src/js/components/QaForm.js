import React, { Component } from 'react';
import uuid from 'uuid';

class QaForm extends Component {
  submitForm = e => {
    e.preventDefault();

    const { onToggleForm } = this.props;
    const { title, description, addQuestionForm } = this.refs;

    if (!title.value || !description.value) {
      alert('你还没有输入标题和或内容！');
      return;
    }

    let qst = {
      key: 'qst' + uuid(),
      title: title.value,
      description: description.value,
      voteCount: 0,
    };

    this.props.handleData(qst, -1);

    addQuestionForm.reset();
    onToggleForm();
  };

  render() {
    const { onToggleForm } = this.props;
    return (
      <form ref="addQuestionForm" name="addQuestion" className="clearfix" onSubmit={this.submitForm}>
        <div className="form-group">
          <label htmlFor="qtitle">问题</label>
          <input
            ref="title"
            type="text"
            id="qtitle"
            className="form-control"
            placeholder="您的问题的标题"
          />
        </div>
        <textarea ref="description" className="form-control" rows="3" placeholder="问题的描述" />
        <button className="btn btn-success pull-right">确认</button>
        <a className="btn btn-default pull-right" onClick={onToggleForm}>取消</a>
      </form>
    );
  }
}

export default QaForm;
