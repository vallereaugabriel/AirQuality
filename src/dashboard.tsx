import * as React from "react"

import { getJson } from "./utils"

interface OpenaqResponse {
  meta: any;
  results: any;
}

interface OpenaqError {
 statusCode: number;
 error: string;
 message: string;
}

interface Parameter {
  name: string;
  value: number;
  unit: string;
}

interface State {
  value: string;
  result: Array<Parameter>;
  error: string;
  fetchError: OpenaqError;
}

interface Props {
  searches: Array<string>;
  saveSearch: (text: string) => void;
}

class Dashboard extends React.Component<Props, State> {
  props: Props

  state: State = {
    value: '',
    result: null,
    error: '',
    fetchError: null,
  };

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  fetchParameters = (value: string): Promise<OpenaqResponse> => {
    const url = "https://api.openaq.org/v1/latest";
    return getJson(`${url}?city=${value}&limit=1`)
  }

  fetchAndDisplay = async() => {
    const { saveSearch } = this.props;
    const { value } = this.state;
    let result = null;
    let error = null;
    let fetchError = null;
    try {
      const response = await this.fetchParameters(value);
      if (response.results.length == 0) {
        error = value ? `No results for the city ${value} or invalid city` : "You must enter a valid city to get results";
      } else {
        result = response.results[0].measurements.map(
          function(param): Parameter {
            return {
              name: param.parameter,
              value: param.value,
              unit: param.unit,
            };
          }
        )
        // Save valid search in redux store
        saveSearch(value);
      }
    } catch (e) {
      error = e;
    }
    this.setState({result, error, fetchError});
  }

  render() {
    const { searches } = this.props;
    const { value, result, error, fetchError } = this.state;
    return (
      <div>
        <h1>Air quality</h1>
        <p>Choose city: <input type="text" value={value} onChange={this.handleChange} /></p>
        <p><button onClick={this.fetchAndDisplay}>Submit</button></p>
        {!error && !fetchError && result &&
          <p>
            <p>Results:</p>
            <p>{result.map(
              function(parameter: Parameter) {
                return (<p>{parameter.name}: {parameter.value} {parameter.unit}</p>);
              }
            )}</p>
          </p>
        }
        {error && <p>{error}</p>}
        {fetchError &&
          <p>A {fetchError.error} error occured with message {fetchError.message} (statusCode: {fetchError.statusCode})</p>}
        {searches && searches.length > 0 &&
          <p>
            <p>History:</p>
            {searches.map(search => <p>{search}</p>)}
          </p>
          }
      </div>
    );
  }
}

export default Dashboard
