import { FormEvent, useEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';

import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	articleSettings: ArticleStateType;
	settingsApplier: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleSettings,
	settingsApplier,
}: ArticleParamsFormProps) => {
	const [sidebarOpenState, setSidebarOpenState] = useState(false);
	const [temporarySettingsData, setTemporarySettingsData] =
		useState<ArticleStateType>(articleSettings);
	const sidebarElementRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: sidebarOpenState,
		rootRef: sidebarElementRef,
		onClose: () => setSidebarOpenState(false),
		onChange: setSidebarOpenState,
	});

	useEffect(() => {
		if (sidebarOpenState) {
			setTemporarySettingsData(articleSettings);
		}
	}, [sidebarOpenState, articleSettings]);

	const changeFieldValue = <K extends keyof ArticleStateType>(
		fieldName: K,
		newValue: ArticleStateType[K]
	) => {
		setTemporarySettingsData((previousSettings) => ({
			...previousSettings,
			[fieldName]: newValue,
		}));
	};

	const submitFormHandler = (event: FormEvent) => {
		event.preventDefault();
		settingsApplier(temporarySettingsData);
		setSidebarOpenState(false);
	};

	const resetFormHandler = (event: FormEvent) => {
		event.preventDefault();
		setTemporarySettingsData(defaultArticleState);
		settingsApplier(defaultArticleState);
		setSidebarOpenState(false);
	};

	const toggleSidebarHandler = () => {
		setSidebarOpenState((previousState) => !previousState);
	};

	return (
		<>
			<ArrowButton isOpen={sidebarOpenState} onClick={toggleSidebarHandler} />
			<aside
				ref={sidebarElementRef}
				className={clsx(styles.container, {
					[styles.container_open]: sidebarOpenState,
				})}>
				<form
					className={styles.form}
					onReset={resetFormHandler}
					onSubmit={submitFormHandler}>
					<Text as='h2' weight={800} size={31} uppercase>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={temporarySettingsData.fontFamilyOption}
						onChange={(value: OptionType) =>
							changeFieldValue('fontFamilyOption', value)
						}
					/>

					<RadioGroup
						title='Размер шрифта'
						name='font-size'
						options={fontSizeOptions}
						selected={temporarySettingsData.fontSizeOption}
						onChange={(value: OptionType) =>
							changeFieldValue('fontSizeOption', value)
						}
					/>

					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={temporarySettingsData.fontColor}
						onChange={(value: OptionType) =>
							changeFieldValue('fontColor', value)
						}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={temporarySettingsData.backgroundColor}
						onChange={(value: OptionType) =>
							changeFieldValue('backgroundColor', value)
						}
					/>

					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={temporarySettingsData.contentWidth}
						onChange={(value: OptionType) =>
							changeFieldValue('contentWidth', value)
						}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
