import { useEffect } from 'react';

type UseOverlayEscapeCloseForm = {
	isOpen: boolean;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLDivElement>;
};

export const useOverlayEscapeCloseForm = ({
	isOpen,
	rootRef,
	onClose,
}: UseOverlayEscapeCloseForm) => {
	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			const { target } = event;
			if (
				isOpen &&
				target instanceof Node &&
				!rootRef.current?.contains(target)
			) {
				onClose?.();
			}
		};

		const handleEscapeKey = (event: KeyboardEvent) => {
			if (isOpen && event.key === 'Escape') {
				onClose?.();
			}
		};

		window.addEventListener('mousedown', handleOutsideClick);
		window.addEventListener('keydown', handleEscapeKey);

		return () => {
			window.removeEventListener('mousedown', handleOutsideClick);
			window.removeEventListener('keydown', handleEscapeKey);
		};
	}, [onClose, isOpen, rootRef]);
};
