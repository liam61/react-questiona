import React, { Component } from 'react';
import QaForm from './js/components/QaForm';
import QaList from './js/components/QaList';
import $ from 'jquery';
import { CSSTransition } from 'react-transition-group';
// import Test from './js/components/Test';

import './css/App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      questions: null,
      showForm: false
    };

    const source = './data.json'; // 浏览器默认打开的是 public文件夹下的 index.html
    $.get(source, res => {
      if (res) { this.setState({ questions: res }); }
    });
  }

  onToggleForm = () => this.setState({ showForm: !this.state.showForm });

  handleData = (qst, index) => {
    let questions = this.state.questions;

    if (index !== -1) questions[index].voteCount = qst.voteCount; // 投票
    else questions.push(qst); // 添加

    this.setState({ questions: questions });
  };

  render() {
    const { showForm, questions } = this.state;
    return (
      <div className="box">
        <div className="jumbotron text-center rtitle">
          <div className="container">
            <h1>React 问答</h1>
            <button
              id="add-question-btn"
              onClick={this.onToggleForm}
              className="btn btn-success"
            >
              添加问题
            </button>
          </div>
        </div>
        {
          questions ? (
            <div className="main container rmain">
              <CSSTransition in={showForm} timeout={600} classNames="qfrom" unmountOnExit>
                <QaForm onToggleForm={this.onToggleForm} handleData={this.handleData} />
              </CSSTransition>
              <QaList handleData={this.handleData} questions={questions} />
            </div>
          ) : (<h1 style={{ textAlign: 'center' }}>Loading...</h1>)
        }
      </div>
    );
  }
}

export default App;
