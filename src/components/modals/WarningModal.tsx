import DangerButton from "../buttons/DangerButton";
import NeutralButton from "../buttons/NeutralButton";
import ModalSkeleton from "./ModalSkeleton";

export default function WarningModal({
  isOpen,
  onClose,
  title,
  message,
  onConfirm,
  confirmText,
  cancelText,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  onConfirm: () => void;
  confirmText: string;
  cancelText: string;
}) {
  if (!isOpen) return null;

  return (
    <ModalSkeleton
      title={title}
      onCloseAction={onClose}
      footerChildren={
        <>
          <NeutralButton onClickAction={onClose} title={cancelText} />
          <DangerButton onClickAction={onConfirm} title={confirmText} />
        </>
      }
      className="max-w-lg"
    >
      <div className="text-center">{message}</div>
    </ModalSkeleton>
  );
}
