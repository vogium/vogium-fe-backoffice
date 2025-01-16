import DangerButton from "../buttons/DangerButton";
import NeutralButton from "../buttons/NeutralButton";
import SuccessButton from "../buttons/SuccessButton";
import ModalSkeleton from "./ModalSkeleton";

export default function SuccessModal({
  isOpen,
  onClose,
  title,

  onConfirm,
  confirmText,
  cancelText,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onConfirm: () => void;
  confirmText: string;
  cancelText: string;
  children?: React.ReactNode;
}) {
  if (!isOpen) return null;

  return (
    <ModalSkeleton
      title={title}
      onCloseAction={onClose}
      footerChildren={
        <>
          <NeutralButton onClickAction={onClose} title={cancelText} />
          <SuccessButton onClickAction={onConfirm} title={confirmText} />
        </>
      }
      className="max-w-lg"
    >
      {children}
    </ModalSkeleton>
  );
}
