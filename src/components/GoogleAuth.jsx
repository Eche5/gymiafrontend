import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

function GoogleAuth() {
  const cliendId =
    "221101201489-9u39f32384pn1688dlq3fd0vsdrt2s3d.apps.googleusercontent.com";
  const onSuccess = (res) => {
    console.log("Success", res.profileObj);
  };
  const onFailure = (res) => {
    console.log("success", res);
  };
  return (
    <div id="auth">
      <div id="signInButton">
        <GoogleOAuthProvider>
          <GoogleLogin
            cliendId={cliendId}
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={"single_host_origin"}
            isSignedIn={true}
            buttonText="Login"
          />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
}

export default GoogleAuth;
