import { SecureForm, SecureInput, SecureSpan } from '@lunasec/secure-frame-react-sdk';
import React, { CSSProperties } from 'react';
// import logo from './logo.svg';
import './App.css';

interface IAppState {
  foo?: string;
  bar?: string;
}

class App extends React.Component<Record<string, never>, IAppState> {
  // Retrieves tokens from sessionStorage and sets them to component's state
  constructor(props: Record<string, never>) {
    super(props);

    this.state = this.retrieveTokens();
  }

  handleFooChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log('setting foo', event.target.value);
    this.setState({ foo: event.target.value });
  }

  handleBarChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log('setting bar', event.target.value);
    this.setState({ bar: event.target.value });
  }

  persistTokens(formEvent: React.FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    window.sessionStorage.setItem(
      'savedFields',
      JSON.stringify({
        foo: this.state.foo,
        bar: this.state.bar,
      })
    );
  }

  retrieveTokens() {
    const dataString = window.sessionStorage.getItem('savedFields');

    // fail through to empty object if nothing set
    const savedData = JSON.parse(dataString || '{}') as IAppState;

    console.log('retrieved Saved Data of ', savedData);

    return {
      foo: savedData.foo,
      bar: savedData.bar,
    };
  }

  render() {
    const spanStyle: CSSProperties = {
      color: 'red',
    };
    return (
      <div className="App">
        <div className="app-form">
          <SecureForm onSubmit={(e) => this.persistTokens(e)}>
            <SecureInput
              name="foo"
              value={this.state.foo}
              onChange={(e) => this.handleFooChange(e)}
              onBlur={(e) => console.log('blur1', e)}
            />
            <SecureInput
              name="bar"
              type="password"
              value={this.state.bar}
              onChange={(e) => this.handleBarChange(e)}
              onBlur={(e) => console.log('blur2', e)}
            />
            <input type="submit" />
          </SecureForm>
          <p>
            The word of the day is
            <SecureSpan name="aSpan" token={this.state.foo} className="test-secure-span" style={spanStyle}>
              {'something'}
              {/*it wont render with no innerhtml , das bad*/}
            </SecureSpan>
          </p>
        </div>
      </div>
    );
  }
}

export default App;
