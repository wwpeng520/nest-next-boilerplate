import Loading from '../Loading';
import styles from './index.less';

const PageLoading: React.FC = () => {
  return (
    <div className={styles.container}>
      <Loading />
    </div>
  );
};

export default PageLoading;
