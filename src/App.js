import React, { Component } from 'react';
import Header from './components/Header';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
        {
          id: 1,
          name: 'Iphone 11',
          price: '200000000',
          image:
            'https://cdn.tgdd.vn/Products/Images/42/153856/iphone-11-xanh-la-1-org.jpg',
          status: true,
        },
        {
          id: 2,
          name: 'Galaxy S20',
          price: '180000000',
          image:
            'https://cdn.tgdd.vn/Products/Images/42/153856/iphone-11-xanh-la-1-org.jpg',
          status: true,
        },
        {
          id: 3,
          name: 'Note 20',
          price: '240000000',
          image:
            'https://cdn.tgdd.vn/Products/Images/42/153856/iphone-11-xanh-la-1-org.jpg',
          status: true,
        },
      ],
      isActive: true,
    };
    this.onSetState = this.onSetState.bind(this);
  }

  onSetState() {
    // if (this.state.isActive) {
    //   this.setState({
    //     isActive: false
    //   });
    // }else{
    //   this.setState({
    //     isActive: true
    //   });
    // }
    this.setState({
      isActive: !this.state.isActive,
    });
  }

  render() {
    const elements = this.state.products.map((product, index) => {
      let result = '';
      if (product.status)
        result = (
          <tr key={product.id}>
            <td>{index + 1}</td>
            <td>{product.name}</td>
            <td>
              <span className="label label-success">{product.price}</span>
            </td>
          </tr>
        );
      return result;
    });
    return (
      <div>
        <Header />
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div className="panel panel-info">
              <div className="panel-heading">
                <h3 className="panel-title">Panel title</h3>
              </div>
              <div className="panel-body">
                <div className="form-group">
                  <label>Nhập sản phẩm</label>
                  <input type="text" className="form-control" />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={this.onAddProduct}
                >
                  Đồng ý
                </button>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên SP</th>
                  <th>Giá SP</th>
                </tr>
              </thead>
              <tbody>{elements}</tbody>
            </table>
            <button
              type="button"
              className="btn btn-danger"
              onClick={this.onSetState}
            >
              Active: {this.state.isActive ? 'true' : 'false'}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
