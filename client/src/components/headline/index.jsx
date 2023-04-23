import { styles } from "../../styles/styles";

export const HeadlineComponent = ({ headText }) => {
	return <h2 className={styles.headText}>{headText}</h2>;
};
