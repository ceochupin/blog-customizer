import styles from './styles/index.module.scss';

import { CSSProperties, useState } from 'react';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';
import { ArticleParamsForm } from './components/article-params-form';
import { Article } from './components/article';

export const App = () => {
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleResetArticleState = () => {
		setArticleState(defaultArticleState);
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				articleState={articleState}
				onChangeArticleState={setArticleState}
				onResetArticleState={handleResetArticleState}
			/>

			<Article />
		</main>
	);
};
