import { useDispatch } from 'react-redux';
import { logIn } from 'Redux/auth/authOperations';
import * as SC from './LoginForm.styled';
// import { useAuth } from 'components/hooks/useAuth';

// import { toast } from 'react-toastify';

export const LoginForm = () => {
  const dispatch = useDispatch();
  // const { error } = useAuth;

  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
    dispatch(
      logIn({
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    );
    form.reset();
    // console.log(error);
    // if (error) {
    //   toast.error(error);
    // }
  };
  return (
    <SC.LoginForm onSubmit={handleSubmit} autoComplete="off">
      <SC.Wrapper>
        <SC.InnerWrapper>
          <SC.LabelArea htmlFor="email">Email </SC.LabelArea>
          <SC.LabelArea htmlFor="password">Password </SC.LabelArea>
        </SC.InnerWrapper>
        <SC.InnerWrapper>
          <SC.InputArea
            id="email"
            type="email"
            name="email"
            placeholder="LucasMoura@mail.com"
            required
          />
          <SC.InputArea
            id="password"
            type="password"
            name="password"
            placeholder="**********"
            required
          />
        </SC.InnerWrapper>
      </SC.Wrapper>

      <SC.LoginButton variant="contained" type="submit">
        Log In
      </SC.LoginButton>
    </SC.LoginForm>
  );
};
