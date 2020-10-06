import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Control from './components/Control';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayed: false,
      taskEditing: null,
      filter: {
        name: '',
        status: -1,
      },
      keyword: '',
    };
  }

  componentDidMount() {
    if (localStorage && localStorage.getItem('tasks')) {
      const tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks,
      });
    }
  }

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  generateID() {
    return (
      this.s4() +
      this.s4() +
      '-' +
      this.s4() +
      this.s4() +
      '-' +
      this.s4() +
      this.s4() +
      '-' +
      this.s4() +
      this.s4()
    );
  }

  onAddingItem = () => {
    if (this.state.isDisplayed && this.state.taskEditing !== null) {
      this.setState({
        isDisplayed: true,
        taskEditing: null,
      });
    } else {
      this.setState({
        isDisplayed: !this.state.isDisplayed,
        taskEditing: null,
      });
    }
  };

  onCloseForm = () => {
    this.setState({
      isDisplayed: false,
    });
  };

  onShowingForm = () => {
    this.setState({
      isDisplayed: true,
    });
  };

  onSubmit = data => {
    const { tasks } = this.state;
    if (data.id === '') {
      data.id = this.generateID();
      tasks.push(data);
    } else {
      const index = this.findIndex(data.id);
      tasks[index] = data;
    }

    this.setState({
      tasks,
      taskEditing: null,
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  findIndex = id => {
    const { tasks } = this.state;
    let result = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index;
      }
    });
    return result;
  };

  onUpdateStatus = id => {
    const { tasks } = this.state;
    const index = this.findIndex(id);
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks,
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  };

  onDelete = id => {
    const { tasks } = this.state;
    const index = this.findIndex(id);
    if (index !== -1) {
      tasks.splice(index, 1);
      this.setState({
        tasks,
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    this.onCloseForm();
  };

  onUpdate = id => {
    const { tasks } = this.state;
    const index = this.findIndex(id);
    const taskEditing = tasks[index];
    this.setState({
      taskEditing,
    });
    this.onShowingForm();
  };

  onFilter = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus, 10);
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus,
      },
    });
  };

  onSearch = keyword => {
    this.setState({
      keyword,
    });
  };

  render() {
    const { isDisplayed, taskEditing, filter, keyword } = this.state; // const tasks = this.state.tasks
    let { tasks } = this.state;
    if (filter) {
      if (filter.name) {
        tasks = tasks.filter(task => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        });
      }
      tasks = tasks.filter(task => {
        if (filter.status === -1) {
          return task;
        } else {
          return task.status === (filter.status === 1 ? true : false);
        }
      });
    }
    if (keyword) {
      tasks = tasks.filter(task => {
        return task.name.toLowerCase().indexOf(keyword) !== -1;
      });
    }
    const elementTaskForm = isDisplayed ? (
      <TaskForm
        onSubmit={this.onSubmit}
        onCloseForm={this.onCloseForm}
        task={taskEditing}
      />
    ) : (
      ''
    );
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div
            className={isDisplayed ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}
          >
            {elementTaskForm}
          </div>
          <div
            className={
              isDisplayed
                ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8'
                : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'
            }
          >
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onAddingItem}
            >
              Thêm công việc
            </button>
            <Control onSearch={this.onSearch} />

            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList
                  tasks={tasks}
                  onUpdateStatus={this.onUpdateStatus}
                  onDelete={this.onDelete}
                  onUpdate={this.onUpdate}
                  onFilter={this.onFilter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
