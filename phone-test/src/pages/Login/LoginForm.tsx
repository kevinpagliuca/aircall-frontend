import {
  Button,
  Form,
  FormItem,
  Grid,
  Icon,
  Spacer,
  SpinnerOutlined,
  TextFieldInput,
  Typography,
  useToast
} from '@aircall/tractor';

import { LoginFormResolver, LoginFormValues } from './Login.schema';
import { Controller, useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/auth';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../../routes';

export const LoginForm = () => {
  const form = useForm<LoginFormValues>({ resolver: LoginFormResolver });

  const { login } = useAuth();
  const { showToast, removeToast } = useToast();
  const navigate = useNavigate();

  const onSubmit = form.handleSubmit(async data => {
    const LOGIN_REJECTED = 'LOGIN_REJECTED';
    try {
      await login(data);
      removeToast(LOGIN_REJECTED);
      navigate(APP_ROUTES.CALLS_LIST, { replace: true });
    } catch (error) {
      console.log(error);
      showToast({
        id: LOGIN_REJECTED,
        message: 'Invalid email or password',
        variant: 'error'
      });
    }
  });

  return (
    <Form onSubmit={onSubmit} width="100%">
      <Grid columnGap={4} rowGap={5} gridTemplateColumns="1fr">
        <Controller
          control={form.control}
          name="username"
          defaultValue="123123"
          render={({ field, fieldState }) => (
            <FormItem label="Username" name="username">
              <Spacer spaceY={0.5} direction="vertical">
                <TextFieldInput
                  placeholder="Enter your username"
                  validationStatus={!!fieldState.error?.message ? `error` : undefined}
                  {...field}
                />
                {fieldState.error?.message && (
                  <Typography variant="caption" color="red-800">
                    {fieldState.error?.message}
                  </Typography>
                )}
              </Spacer>
            </FormItem>
          )}
        />
        <Controller
          control={form.control}
          name="password"
          defaultValue="123123"
          render={({ field, fieldState }) => (
            <FormItem label="Password" name="password">
              <Spacer spaceY={0.5} direction="vertical">
                <TextFieldInput
                  placeholder="Enter your password"
                  type="password"
                  validationStatus={!!fieldState.error?.message ? `error` : undefined}
                  {...field}
                />
                {fieldState.error?.message && (
                  <Typography variant="caption" color="red-800">
                    {fieldState.error?.message}
                  </Typography>
                )}
              </Spacer>
            </FormItem>
          )}
        />
        <FormItem>
          <Button block type="submit" disabled={Object.keys(form.formState.errors).length > 0}>
            {form.formState.isSubmitting ? <Icon component={SpinnerOutlined} spin /> : 'Submit'}
          </Button>
        </FormItem>
      </Grid>
    </Form>
  );
};
