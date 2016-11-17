import React, { Component } from 'react';
import './SideBar.scss';

function getCategoryItem(text, index, removeTheme) {
  return (
    <a href={`#${text}`} className="category" key={index} onClick={removeTheme}>{text} <i className="fa fa-minus-circle" aria-hidden="true" /></a>
  );
}

class SideBar extends Component {

  constructor(props) {
    super(props);
    this.addTheme = this.addTheme.bind(this);
    this.addKeyword = this.addKeyword.bind(this);
    this.removeTheme = this.removeTheme.bind(this);
    this.removeKeyword = this.removeKeyword.bind(this);
  }

  state = {
    themes: ['xhtml', 'html5', 'css5'],
    keywords: ['mozilla', 'css3'],
    frequency: null,
  }


  add(el, stateName) {
    const value = el.value;
    const list = this.state[stateName];

    if (value.length && list.indexOf(value) < 0) {
      this.setState({
        [stateName]: list.concat([value]),
      });
    }

    el.value = '';
    el.focus();
  }

  addTheme(e) {
    e.preventDefault();

    this.add(this.themeInput, 'themes');
  }

  addKeyword(e) {
    e.preventDefault();

    this.add(this.keywordInput, 'keywords');
  }

  remove(stateName) {
    const list = this.state[stateName];

    return (text) => {
      this.setState({
        [stateName]: list.filter(value => value !== text),
      });
    };
  }

  removeTheme(text) {
    return () => this.remove('themes')(text);
  }

  removeKeyword(text) {
    return () => this.remove('keywords')(text);
  }

  render() {
    const { themes, keywords } = this.state;
    const themeList = themes.map(
      (theme, index) => getCategoryItem(theme, index, this.removeTheme(theme)));
    const keywordList = keywords.map(
      (keyword, index) => getCategoryItem(keyword, index, this.removeKeyword(keyword)));
    return (
      <div className="container-fuild container-sidebar">

        <form className="theme-form mb-20" onSubmit={this.addTheme}>
          <div className="theme">
            <h4>Theme</h4>
            <div className="category-group mb-10">
              {themeList}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="theme"
                ref={node => (this.themeInput = node)}
                placeholder="Enter theme here"
                autoComplete="off"
              />
            </div>
            <div className="col-sm-2 col-sm-pull-1">
              <i className="fa fa-check-circle-o fa-2x mt-2 pristine" aria-hidden="true" />
            </div>
          </div>
        </form>


        <form className="keywords-form mb-20" onSubmit={this.addKeyword}>
          <div className="keywords">
            <h4>keywords</h4>
            <div className="category-group mb-10">
              {keywordList}
            </div>
            <div className="row">
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="theme"
                  ref={node => (this.keywordInput = node)}
                  placeholder="Enter keywords here"
                  autoComplete="off"
                />
              </div>
              <div className="col-sm-2 col-sm-pull-1">
                <i className="fa fa-check-circle-o fa-2x mt-2 pristine" aria-hidden="true" />
              </div>
            </div>
          </div>
        </form>

        <form className="form-inline frequency-form mb-20">
          <div className="frequency">
            <h4>Frequency/Week</h4>
            <div className="row">
              <div className="col-xs-8 col-sm-8 col-md-8">
                <input type="number" className="form-control" id="theme" placeholder="1" min="1" />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SideBar;
