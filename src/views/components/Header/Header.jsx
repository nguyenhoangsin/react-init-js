import React, { PureComponent } from 'react';
import { string } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ChangeLanguage from '../ChangeLanguage';

class Header extends PureComponent {
  static propTypes = {
    lang: string,
  };

  render() {
    const { lang } = this.props;

    return (
      <div>
        <Link className="mr-2" to={`/${lang}/home`}>Home</Link>
        <Link className="mr-2" to={`/${lang}/about`}>About</Link>
        <Link className="mr-2" to={`/${lang}/login`}>Login</Link>
        <ChangeLanguage />
      </div>
    );
  }
}

const mapState = state => ({ lang: state.language.lang });

export default connect(mapState)(Header);
