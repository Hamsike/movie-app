import React, { useEffect } from 'react';
import styles from './ConfirmModal.module.css';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    titleMovie: string;
    typeModal: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    titleMovie,
    typeModal
}) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleConfirm = () => {
        onConfirm();
        onClose()
    };

    if (!isOpen) return null;
    const isRemove = typeModal;
    const title = isRemove ? 'Удаление из избранного' : 'Добавление в избранное';
    const message = isRemove 
        ? `Вы действительно хотите удалить фильм: ${titleMovie}?` 
        : `Вы действительно хотите добавить фильм: ${titleMovie}?`;
    const buttonText = isRemove ? 'Удалить' : 'Добавить';

    return (
        <div className={styles.overlay} onClick={handleBackdropClick}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h3>{title}</h3>
                    <button className={styles.closeButton} onClick={onClose}>
                        ✕
                    </button>
                </div>

                <div className={styles.content}>
                    <p>{message}</p>
                </div>

                <div className={styles.footer}>
                    <button className={styles.cancelButton} onClick={onClose}>
                        Отмена
                    </button>
                    <button className={styles.confirmButton} onClick={handleConfirm}>
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
};