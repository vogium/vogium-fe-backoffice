interface ModalSkeletonProps {
  title: string;
  onCloseAction: () => void;
  //   leftButtonTitle: string;
  //   rightButtonTitle: string;
  //   leftButtonAction: () => void;
  //   rightButtonAction: () => void;
  children: React.ReactNode;
  //   rightButtonStatus: "warning" | "success" | "info";
  className?: string;
  footerChildren: React.ReactNode;
}

export default function ModalSkeleton({
  title,
  onCloseAction,
  //   leftButtonTitle,
  //   rightButtonTitle,
  //   leftButtonAction,
  //   rightButtonAction,
  children,
  footerChildren,
  //   rightButtonStatus,
  className = "max-w-3xl",
}: ModalSkeletonProps) {
  //   const rightButtonClassName =
  //     rightButtonStatus === "warning"
  //       ? "bg-red-400 text-white hover:bg-red-600"
  //       : rightButtonStatus === "success"
  //       ? "bg-green-500"
  //       : "bg-blue-500";
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
      <div className={"bg-white rounded-lg shadow-lg w-full  " + className}>
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">{title}</h2>
          <button
            onClick={onCloseAction}
            className="text-gray-500 hover:text-gray-700"
          >
            x
          </button>
        </div>

        {/* Content */}
        <div className="px-4 py-10">{children}</div>

        {/* Footer */}
        <div className="flex justify-end items-center gap-5 p-4 border-t">
          {footerChildren}
          {/* <button
            onClick={leftButtonAction}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 animation-smooth-fast"
          >
            {leftButtonTitle}
          </button>
          <button
            onClick={rightButtonAction}
            className={
              "px-4 py-2 rounded animation-smooth-fast " + rightButtonClassName
            }
          >
            {rightButtonTitle}
          </button> */}
        </div>
      </div>
    </div>
  );
}
