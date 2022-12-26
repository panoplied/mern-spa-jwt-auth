import styles from "./PasswordHint.module.css";

const CHECKMARK_SYMBOL = <span className={styles.checkmark}></span>;

const LOWERCASE_REGEX = /[a-z]/g;
const UPPERCASE_REGEX = /[A-Z]/g;
const NUMBER_REGEX = /[0-9]/g;

const PasswordHint = ({ pwd, pwdReqs }) => {
  const { minLength, minLowercase, minUppercase, minNumbers } = pwdReqs;
  const rules = [
    {
      requirement: "at least 1 lowercase",
      satisfied: (pwd.match(LOWERCASE_REGEX) || []).length >= minLowercase,
    },
    {
      requirement: "at least 1 uppercase",
      satisfied: (pwd.match(UPPERCASE_REGEX) || []).length >= minUppercase,
    },
    {
      requirement: "at least 1 digit",
      satisfied: (pwd.match(NUMBER_REGEX) || []).length >= minNumbers,
    },
    {
      requirement: "min 6 characters total",
      satisfied: minLength >= password.length,
    },
  ];

  return (
    <>
      <p>Only English. Password must contain:</p>
      <ul>
        {rules.map((rule) => (
          <PassCheck
            key={rule.requirement}
            requirement={rule.requirement}
            satisfied={rule.satisfied}
          />
        ))}
      </ul>
    </>
  );
};

const PassCheck = ({ requirement, satisfied }) => {
  return (
    <li className={satisfied ? styles.satisfied : styles.unsatisfied}>
      [{satisfied ? CHECKMARK_SYMBOL : " "}] {requirement}
    </li>
  );
};

export default PasswordHint;
