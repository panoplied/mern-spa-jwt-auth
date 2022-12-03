import styles from './Panel.module.css';

const Panel = ({ children, className }) => {
  const classes = `${styles.panel} ${className}`;

  return (
    <div className={classes}>
      {children}
    </div>
  );
}

export default Panel;