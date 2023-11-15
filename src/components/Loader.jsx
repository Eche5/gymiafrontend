import styles from "./Loader.module.css";
function Loader() {
  return (
    <div className=" flex justify-center items-center min-h-screen">
      <div className={styles.spinner}></div>
    </div>
  );
}

export default Loader;
