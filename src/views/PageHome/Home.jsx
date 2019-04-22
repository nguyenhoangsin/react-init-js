import React, { PureComponent } from 'react';
import styles from './Home.module.scss';

class Home extends PureComponent {
  render() {
    return (
      <h1 className={styles.testModuleCss}>Home</h1>
    );
  }
}

export default Home;
