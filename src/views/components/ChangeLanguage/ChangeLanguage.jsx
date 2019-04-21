import React, { PureComponent, Fragment } from 'react';
import { Button } from 'reactstrap';
import { LANGS } from '../../../core/config';
import { mountLang, updateLang } from '../../../i18n/i18n';

class ChangeLanguage extends PureComponent {
  static propTypes = {
  };

  componentDidMount() {
    mountLang();
  }

  handleLanguage = (e) => {
    updateLang(e.target.value);
  }

  render() {
    return (
      <Fragment>
        <Button
          className="mr-2 px-4"
          color="primary"
          value={LANGS[0]}
          onClick={this.handleLanguage}
        >
          en
        </Button>
        <Button
          className="px-4"
          color="success"
          value={LANGS[1]}
          onClick={this.handleLanguage}
        >
          vi
        </Button>
      </Fragment>
    );
  }
}

export default ChangeLanguage;
