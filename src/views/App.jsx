import React, { PureComponent, Fragment, Suspense } from 'react';
import { object } from 'prop-types';
import { renderRoutes } from 'react-router-config';
import Header from './components/Header';
import Footer from './components/Footer';
import DemoLanguage from './components/DemoLanguage';

class App extends PureComponent {
  static propTypes = {
    route: object,
  };

  render() {
    const { route } = this.props;

    return (
      <Fragment>
        <Header />
        <DemoLanguage />
        <Suspense fallback={<div>Loading...</div>}>
          {renderRoutes(route.routes)}
        </Suspense>
        <Footer />
      </Fragment>
    );
  }
}

export default App;
