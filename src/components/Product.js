import React, { Component } from 'react';

class Product extends Component {
  constructor(props) {
    super(props);
    this.onAddToCart = this.onAddToCart.bind(this);
  }

  onAddToCart() {
    alert(this.props.children);
  }

  // onAddToCart = () => {
  //   alert(this.props.children);
  // }
  render() {
    return (
      <div>
        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
          <div className="thumbnail">
            <img alt={this.props.name} src={this.props.image} />
            <div className="caption">
              <h3>Tên sản phẩm: {this.props.name}</h3>
              <p>{this.props.price}</p>
              <p>
                <a
                  href="/"
                  className="btn btn-primary"
                  onClick={this.onAddToCart}
                >
                  Mua
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
