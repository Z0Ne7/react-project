import React, { Component } from 'react';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
    };
  }

  onChange = event => {
    const { target } = event;
    const { name } = target;
    const { value } = target;
    this.setState({
      [name]: value,
    });
  };

  onSearch = () => {
    this.props.onSearch(this.state.keyword);
  };

  render() {
    const { keyword } = this.state;
    return (
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Nhập từ khóa..."
          name="keyword"
          value={keyword}
          onChange={this.onChange}
        />
        <span className="input-group-btn">
          <button
            className="btn btn-primary"
            type="button"
            onClick={this.onSearch}
          >
            <span className="fa fa-search mr-5" />
            Tìm
          </button>
        </span>
      </div>
    );
  }
}

export default Search;
