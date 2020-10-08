import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import TaskItem from './TaskItem';

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterName: '',
      filterStatus: -1,
    };
  }

  onChange = event => {
    const { target } = event;
    const { name } = target;
    const { value } = target;
    const filter = {
      name: name === 'filterName' ? value : this.state.filterName,
      status: name === 'filterStatus' ? value : this.state.filterStatus,
    };
    this.props.onFilterTable(filter);
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { filterTable, keyword, sort } = this.props;
    let { tasks } = this.props;
    if (filterTable.name) {
      tasks = tasks.filter(task => {
        return (
          task.name.toLowerCase().indexOf(filterTable.name.toLowerCase()) !== -1
        );
      });
    }
    tasks = tasks.filter(task => {
      if (filterTable.status === -1) {
        return task;
      }
      return task.status === (filterTable.status === 1 ? true : false);
    });

    if (keyword) {
      tasks = tasks.filter(task => {
        return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
      });
    }
    if (sort.by === 'name') {
      tasks.sort((a, b) => {
        if (a.name > b.name) return sort.value;
        if (a.name < b.name) return -sort.value;
        return 0;
      });
    } else {
      tasks.sort((a, b) => {
        if (a.status > b.status) return -sort.value;
        if (a.status < b.status) return sort.value;
        return 0;
      });
    }
    const { filterName, filterStatus } = this.state;
    const elementTask = tasks.map((task, index) => {
      return <TaskItem key={task.id} index={index} task={task} />;
    });
    return (
      <table className="table table-bordered table-hover mt-15">
        <thead>
          <tr>
            <th className="text-center">STT</th>
            <th className="text-center">Tên</th>
            <th className="text-center">Trạng Thái</th>
            <th className="text-center">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>
              <input
                type="text"
                className="form-control"
                name="filterName"
                value={filterName}
                onChange={this.onChange}
              />
            </td>
            <td>
              <select
                className="form-control"
                name="filterStatus"
                value={filterStatus}
                onChange={this.onChange}
              >
                <option value={-1}>Tất Cả</option>
                <option value={0}>Ẩn</option>
                <option value={1}>Kích Hoạt</option>
              </select>
            </td>
            <td></td>
          </tr>
          {elementTask}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks,
    filterTable: state.filterTable,
    keyword: state.search,
    sort: state.sort,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onFilterTable: filter => {
      dispatch(actions.filterTask(filter));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
