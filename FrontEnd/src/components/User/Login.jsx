// Hooks
import { useContext, useReducer } from "react";

//  Context
import { UserContext } from "../../context/userContext";

// Boostrap
import { Form, Button, Container, Card } from "react-bootstrap";

// Css
import styles from "./Login.module.css"

const Login = () => {
  // UseContext
  const {
    login,
    emailRef,
    passwordRef,
    // userLogged,
    reducer,
    errorsState,
    ACTIONS,
    validationLogin
    // msgErrorLogin
  } = useContext(UserContext);

  // Reducer States
  const [state, dispatch] = useReducer(reducer, errorsState);

  // Validation reducer
  const onChangeHandler = (e) => {
    dispatch({
      type: e.target.dataset.type,
      payload: {
        value: e.target.value,
        msg: e.target.dataset.msg,
      },
    });
  };

  const onBlurHandler = (e) => {
    if (e.target.value.trim() === "") {
      dispatch({
        type: e.target.dataset.type,
        payload: { value: e.target.value, msg: "Field cannot be empty" },
      });
    }
  };

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    login();
    // setTimeout(()=>{console.log("USER LOGGED IN LOGIN", userLogged)}, 2000)
  };
  return (
    <Container className="border p-3 opacity-3 bc">
      <Card></Card>
      <Form className={`text-white ${styles.formStyle} p-3`} onSubmit={loginSubmitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            data-type={ACTIONS.EMAIL_FORMAT}
            data-msg="Please enter a valid email"
            ref={emailRef}
            type="email"
            placeholder="Escribí tu email"
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
          />
          {state.emailFormat.isValid === false && (
            <span className="text-danger">{state.emailFormat.msg}</span>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            data-type={ACTIONS.PASSWORD_FORMAT}
            // data-msg="Please enter your password"
            ref={passwordRef}
            type="password"
            placeholder="Password"
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
          />
          {state.passwordFormat.isValid === false && (
            <span className="text-danger">{state.passwordFormat.msg}</span>
          )}
        </Form.Group>

        {validationLogin && (
          <div className="text-danger">{validationLogin}</div>
        )}
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
