import { LoginForm } from "@/components/LoginForm";
import styles from "@/styles/Login.module.css";

function Login() {
  return (
    <div className={styles.centered}>
      <LoginForm />
    </div>
  );
}

export default Login;
