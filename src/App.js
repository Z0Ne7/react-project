import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'Nhập tên đăng nhập',
      password: '',
      description: 'Nhập mô tả',
      gender: 2,
      language: 'vi',
      status: true,
    };
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
  }

  onHandleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.name;
    this.setState({
      [name]: value,
    });
  }

  onHandleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h3 className="panel-title">Tiêu đề</h3>
              </div>
              <div className="panel-body">
                <form onSubmit={this.onHandleSubmit}>
                  <div className="form-group">
                    <label htmlFor="">Tên đăng nhập</label>
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      onChange={this.onHandleChange}
                      value={this.state.username}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Mật khẩu</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      onChange={this.onHandleChange}
                      value={this.state.password}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Mô tả</label>
                    <textarea
                      name="description"
                      className="form-control"
                      rows="3"
                      onChange={this.onHandleChange}
                      value={this.state.description}
                    />
                  </div>
                  <select
                    name="gender"
                    className="form-control"
                    value={this.state.gender}
                    onChange={this.onHandleChange}
                  >
                    <option value={0}>Nữ</option>
                    <option value={1}>Nam</option>
                    <option value={2}>Khác</option>
                  </select>
                  <div className="form-group">
                    <label htmlFor="">Ngôn ngữ</label>
                    <div className="radio">
                      <label>
                        <input
                          type="radio"
                          name="language"
                          value="vi"
                          onChange={this.onHandleChange}
                        />
                        Tiếng Việt
                      </label>
                      <br />
                      <label>
                        <input
                          type="radio"
                          name="language"
                          value="en"
                          onChange={this.onHandleChange}
                        />
                        English
                      </label>
                    </div>
                  </div>
                  <div className="checkbox">
                    <label>
                      <input
                        type="checkbox"
                        value={true}
                        name="status"
                        onChange={this.onHandleChange}
                        checked={this.state.status === true}
                      />
                      Trạng thái
                    </label>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    OK
                  </button>
                  <button type="reset" className="btn btn-danger">
                    Xóa
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
