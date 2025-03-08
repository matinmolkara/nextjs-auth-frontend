import React from "react";
import styles from "../../styles/components/Login.module.css";
const LoginFrame = ({children}) => {
  return (
    <div className="main">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className={styles.login}>
              <div className={styles.login0}>
                    {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginFrame;
