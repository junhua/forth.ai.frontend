import React from 'react';
import styles from './SideBar.scss';

function Category({ text }) {
  return (
    <div className={styles.category}><a>{text} <i className="fa fa-minus-circle" aria-hidden="true" /></a></div>
  );
}

Category.propTypes = {
  text: React.PropTypes.string.isRequired,
};

function SideBar() {
  return (
    <div className={styles.wrapper}>
      <div className={`container-fuild ${styles.content}`}>

        <form className="form-inline theme-form mb-20">
          <div className={styles.theme}>
            <h4>Theme</h4>
            <div className="category-group mb-10">
              <Category text="xhtml" />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-8 col-sm-8 col-md-8">
              <input type="text" className="form-control" id="theme" placeholder="Enter theme here" />
            </div>
            <div className="col-xs-4 col-sm-4 col-md-4 text-center">
              <i className="fa fa-check-circle-o fa-2x mt-2 pristine" aria-hidden="true" />
            </div>
          </div>
        </form>


        <form className="form-inline keywords-form mb-20">
          <div className={styles.keywords}>
            <h4>keywords</h4>
            <div className="category-group mb-10">
              <Category text="mozilla" />
              <Category text="css3" />
              <Category text="xhtml" />
            </div>
            <div className="row">
              <div className="col-xs-8 col-sm-8 col-md-8">
                <input type="text" className="form-control" id="theme" placeholder="Enter keywords here" />
              </div>
              <div className="col-xs-4 col-sm-4 col-md-4 text-center">
                <i className="fa fa-check-circle-o fa-2x mt-2 pristine" aria-hidden="true" />
              </div>
            </div>
          </div>
        </form>

        <form className="form-inline frequency-form mb-20">
          <div className={styles.frequency}>
            <h4>Frequency/Week</h4>
            <div className="row">
              <div className="col-xs-8 col-sm-8 col-md-8">
                <input type="number" className="form-control" id="theme" placeholder="1" min="1" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SideBar;
