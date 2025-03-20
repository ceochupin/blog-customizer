import styles from './ArticleParamsForm.module.scss';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

import { useOverlayEscapeCloseForm } from './hooks/useOverlayEscapeCloseForm';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

type ArticleParamFormProps = {
	articleState: ArticleStateType;
	onChangeArticleState: (state: ArticleStateType) => void;
	onResetArticleState: () => void;
};

export const ArticleParamsForm = ({
	articleState,
	onChangeArticleState,
	onResetArticleState,
}: ArticleParamFormProps) => {
	const [isMenuOpened, setToggleStateMenu] = useState<boolean>(false);
	const [localFormState, setLocalFormState] =
		useState<ArticleStateType>(articleState);
	const asideRef = useRef<HTMLDivElement | null>(null);

	useOverlayEscapeCloseForm({
		isOpen: isMenuOpened,
		rootRef: asideRef,
		onClose: () => setToggleStateMenu(false),
	});

	const handleResetForm = () => {
		onResetArticleState();
		setLocalFormState(articleState);
	};

	const handleChangedForm = (
		type: keyof ArticleStateType,
		value: OptionType
	) => {
		setLocalFormState({
			...localFormState,
			[type]: value,
		});
	};

	const handleSubmitChange = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onChangeArticleState(localFormState);
	};

	useEffect(() => {
		setLocalFormState(articleState);
	}, [articleState]);

	return (
		<div ref={asideRef}>
			<ArrowButton
				isOpen={isMenuOpened}
				onClick={() => setToggleStateMenu((currentState) => !currentState)}
			/>

			<aside
				className={clsx({
					[styles.container]: true,
					[styles.container_open]: isMenuOpened,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmitChange}
					onReset={handleResetForm}>
					<Text as='h2' size={31} weight={800} uppercase align='left'>
						Задайте параметры
					</Text>

					<Select
						selected={localFormState.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={(value) => handleChangedForm('fontFamilyOption', value)}
					/>

					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={localFormState.fontSizeOption}
						title='Размер шрифта'
						onChange={(value) => handleChangedForm('fontSizeOption', value)}
					/>

					<Select
						selected={localFormState.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={(value) => handleChangedForm('fontColor', value)}
					/>

					<Separator />

					<Select
						selected={localFormState.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={(value) => handleChangedForm('backgroundColor', value)}
					/>

					<Select
						selected={localFormState.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={(value) => handleChangedForm('contentWidth', value)}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
