import React from "react";
import axios from 'axios';


function tieAuthorization(Component) {
  return class withAuthorization extends React.Component {
    refreshTokens = async()=>{
      let refreshResult = await axios({
          method: 'post',
          url: '/api/userAuthService/accessTokenByRefershToken',
          data: { refreshToken: localStorage.getItem("refreshToken") }
        });
        if (refreshResult.status === 200) {
          localStorage.setItem("accessToken", refreshResult.data.accessToken);
          localStorage.setItem("refreshToken",refreshResult.data.refreshToken)
      }
      return refreshResult;
    }
    makeAuthenticatedAPICall = async (method, url, data) => {
        try {
          let result = await axios({
            method: method,
            url: url,
            headers: { 'Authorization': localStorage.getItem("accessToken") },
            data: data
          });
          if (result.status === 200) {
            return result;
          }
        }
        catch (error) {
          if (error.response.status = 401) {
            await this.refreshTokens();
            let result = await axios({
              method: method,
              url: url,
              headers: { 'Authorization': localStorage.getItem("accessToken") },
              data: data
            });
            if (result.status === 200) {
              return result
            }
          }
          throw error
        }
    }
    render() {
      return (
       <Component authenticatedApiCall={this.makeAuthenticatedAPICall} {...this.props} />
      )
    }
  }
}

const AuthenticatedPage = Component => {

  return tieAuthorization(Component);

}

export default AuthenticatedPage;

