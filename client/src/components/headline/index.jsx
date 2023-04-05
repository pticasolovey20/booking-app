import { styles } from "../../styles/styles";

export const HeadlineComponent = ({ headText, subText }) => {
	return (
		<div>
			<h2 className={styles.headText}>{headText}</h2>
			<p className={styles.subText}>{subText}</p>
		</div>
	);
};
