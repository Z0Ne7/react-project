import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
  }

  onHandleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
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
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Mật khẩu</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      onChange={this.onHandleChange}
                    />
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
