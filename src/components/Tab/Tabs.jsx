import React, { Component, PropTypes } from 'react';

class Tabs extends Component {
  state = { selected: this.props.selected };

  setSelected(selected) {
    if (selected !== this.state.selected) {
      this.setState({ selected });
    }
  }

  handleClick(tab) {
    return () => this.setSelected(tab);
  }

  renderTabList(child) {
    let tab = 0;

    return React.cloneElement(child, {
      children: React.Children.map(child.props.children, (childTab) => {
        if (childTab.type.name === 'Tab') {
          const isActive = (tab === this.state.selected);
          const onClick = this.handleClick(tab);

          tab += 1;

          return React.cloneElement(childTab, { isActive, onClick });
        }

        return childTab;
      }),
    });
  }

  renderChildren(children) {
    let panel = 0;

    return React.Children.map(children, (child) => {
      if (child.type.name === 'TabList') {
        return this.renderTabList(child);
      }

      if (child.type.name === 'TabPanel') {
        const isActive = (panel === this.state.selected);

        panel += 1;

        return React.cloneElement(child, { isActive });
      }

      return child;
    });
  }

  render() {
    return (
      <div className="Tabs">
        { this.renderChildren(this.props.children) }
      </div>
    );
  }
}

Tabs.propTypes = {
  children: PropTypes.node.isRequired,
  selected: PropTypes.number.isRequired,
};

export default Tabs;
