import "./PageSpinner.css";

export default function PageSpinner({ isLoading }: { isLoading: boolean }) {
  if (!isLoading) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center bg-gray-300 bg-opacity-50">
      <div className="lds-dual-ring"></div>
    </div>
  );
}
