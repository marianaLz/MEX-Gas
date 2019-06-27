import React, { Component } from "react";
import "../stylesheets/Rate.css";

class Rate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: null,
      hoverStar: 0,
      selectedStar: 0
    };
  }

  renderStar(item, index) {
    let hoverClass = index <= this.state.hoverStar ? "hover" : "";
    let selectedClass = index <= this.state.selectedStar ? "selected" : "";
    const { handleRate } = this.props;
    return (
      <div
        className="star-wrapper"
        onClick={() => {
          handleRate(index);
          this.setState({ selectedStar: index });
        }}
      >
        <svg
          onMouseEnter={() => this.setState({ hoverStar: index, label: item })}
          className={`rating-star ${hoverClass} ${selectedClass}`}
          onMouseLeave={() => this.setState({ hoverStar: null, label: null })}
          viewBox="0 0 24 24"
        >
          <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
        </svg>
      </div>
    );
  }

  renderStars() {
    return [1, 2, 3, 4, 5].map((item, index) => {
      return this.renderStar(item, index + 1);
    });
  }

  render() {
    return <div>{this.renderStars()}</div>;
  }
}

//Render App
export default Rate;
