import { useState, CSSProperties } from 'react';
import clsx from 'clsx';

import { Article } from 'src/components/article/Article';
import { ArticleParamsForm } from 'src/components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

import styles from 'src/styles/index.module.scss';

export const App = () => {
	const [currentArticleSettingsData, setCurrentArticleSettingsData] =
		useState<ArticleStateType>(defaultArticleState);

	const applySettingsHandler = (newSettings: ArticleStateType) => {
		setCurrentArticleSettingsData(newSettings);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': currentArticleSettingsData.fontFamilyOption.value,
					'--font-size': currentArticleSettingsData.fontSizeOption.value,
					'--font-color': currentArticleSettingsData.fontColor.value,
					'--container-width': currentArticleSettingsData.contentWidth.value,
					'--bg-color': currentArticleSettingsData.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				articleSettings={currentArticleSettingsData}
				settingsApplier={applySettingsHandler}
			/>
			<Article />
		</main>
	);
};
