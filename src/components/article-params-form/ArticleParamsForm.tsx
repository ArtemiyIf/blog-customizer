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
	settings: ArticleStateType;
	onApply: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	settings,
	onApply,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [tempSettings, setTempSettings] = useState<ArticleStateType>(settings);
	const asideRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen,
		rootRef: asideRef,
		onClose: () => setIsOpen(false),
		onChange: setIsOpen,
	});

	useEffect(() => {
		if (isOpen) {
			setTempSettings(settings);
		}
	}, [isOpen, settings]);

	const handleChange = <K extends keyof ArticleStateType>(
		field: K,
		value: ArticleStateType[K]
	) => {
		setTempSettings((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleSubmit = (evt: FormEvent) => {
		evt.preventDefault();
		onApply(tempSettings);
		setIsOpen(false);
	};

	const handleReset = (evt: FormEvent) => {
		evt.preventDefault();
		setTempSettings(defaultArticleState);
		onApply(defaultArticleState);
		setIsOpen(false);
	};

	const handleToggle = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleToggle} />
			<aside
				ref={asideRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onReset={handleReset}
					onSubmit={handleSubmit}>
					<Text as='h2' weight={800} size={31} uppercase>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={tempSettings.fontFamilyOption}
						onChange={(value: OptionType) =>
							handleChange('fontFamilyOption', value)
						}
					/>

					<RadioGroup
						title='Размер шрифта'
						name='font-size'
						options={fontSizeOptions}
						selected={tempSettings.fontSizeOption}
						onChange={(value: OptionType) =>
							handleChange('fontSizeOption', value)
						}
					/>

					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={tempSettings.fontColor}
						onChange={(value: OptionType) => handleChange('fontColor', value)}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={tempSettings.backgroundColor}
						onChange={(value: OptionType) =>
							handleChange('backgroundColor', value)
						}
					/>

					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={tempSettings.contentWidth}
						onChange={(value: OptionType) =>
							handleChange('contentWidth', value)
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
