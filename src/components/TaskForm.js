import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      status: false,
    };
  }

  componentDidMount() {
    if (this.props.itemEditing && this.props.itemEditing.id) {
      this.setState({
        id: this.props.itemEditing.id,
        name: this.props.itemEditing.name,
        status: this.props.itemEditing.status,
      });
    } else {
      this.onClear();
    }
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    if (nextProps && nextProps.itemEditing) {
      this.setState({
        id: nextProps.itemEditing.id,
        name: nextProps.itemEditing.name,
        status: nextProps.itemEditing.status,
      });
    } else {
      this.onClear();
    }
  }

  onCloseForm = () => {
    this.props.onCloseForm();
    this.props.onClearTask();
  };

  onChange = event => {
    const { target } = event;
    const { name } = target;
    let { value } = target;
    if (name === 'status') {
      value = target.value === 'true';
    }
    this.setState({
      [name]: value,
    });
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.onSaveTask(this.state);
    this.onClear();
    // this.onCloseForm();
  };

  onClear = () => {
    this.setState({
      name: '',
      status: false,
    });
    // this.props.onClearTask();
  };

  render() {
    if (!this.props.isDisplayForm) return null;
    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">
            <i className="fa fa-plus" />
            {this.state.id ? 'Cập nhật công việc' : 'Thêm công việc'}
            <i
              className="fa fa-times-circle text-right"
              onClick={this.onCloseForm}
            />
          </h3>
        </div>
        <div className="panel-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Tên :</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
              />
            </div>
            <label>Trạng Thái :</label>
            <select
              className="form-control"
              name="status"
              value={this.state.status}
              onChange={this.onChange}
            >
              <option value={false}>Ẩn</option>
              <option value={true}>Kích Hoạt</option>
            </select>
            <br />
            <div className="text-center">
              <button type="submit" className="btn btn-warning">
                Lưu lại
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-danger"
                onClick={this.onClear}
              >
                Hủy Bỏ
              </button>
            </div>
          </form>
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
    onSaveTask: task => {
      dispatch(actions.saveTask(task));
    },
    onCloseForm: () => {
      dispatch(actions.closeForm());
    },
    onClearTask: () => {
      dispatch(actions.clearTask());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
