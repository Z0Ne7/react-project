/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import './App.css';
import Control from './components/TaskControl';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

class App extends Component {
  onToggleForm = () => {
    const { itemEditing } = this.props;
    if (itemEditing && itemEditing.id === '') {
      this.props.onToggleForm();
    } else {
      this.props.onClearTask();
    }
  };

  render() {
    const { isDisplayForm } = this.props;
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div
            className={
              isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''
            }
          >
            <TaskForm />
          </div>
          <div
            className={
              isDisplayForm
                ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8'
                : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'
            }
          >
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onToggleForm}
            >
              Thêm công việc
            </button>
            <Control />

            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isDisplayForm: state.isDisplayForm,
    itemEditing: state.itemEditing,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onToggleForm: () => {
      dispatch(actions.toggleForm());
    },
    onClearTask: () => {
      dispatch(actions.clearTask());
    },
    onOpenForm: () => {
      dispatch(actions.openForm());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
