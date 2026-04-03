export const AUTH_TEXTS = {
  signUp: {
    title: 'Join the Team!',
    subTitle: 'Organize your work and life, finally. One task at a time.',
    formTitle: 'Create Account',
    submitBtn: 'Sign Up',
    switchBtn: 'Sign Up',
  },
  signIn: {
    title: 'Welcome Back!',
    subTitle: 'To stay on top of your tasks and goals, please login with your personal info.',
    formTitle: 'Sign In',
    submitBtn: 'Sign In',
    switchBtn: 'Sign In',
  },
  forgotPassword: 'Forgot your password?',
} as const;

export const ERRORS = {
  email: 'Invalid email address',
  password: 'Password must be at least 6 characters',
  username: 'Username must be at least 3 characters',
} as const;
