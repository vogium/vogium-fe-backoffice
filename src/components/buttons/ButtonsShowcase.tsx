//Todo renk kodları vs için,, sonra düzenlenecek..
export default function ButtonsShowcase() {
  return (
    <div className="font-[sans-serif] space-x-4 space-y-4 text-center">
      <button
        type="button"
        className="px-5 py-2.5 rounded-lg text-sm tracking-wider font-medium border border-blue-700 outline-none bg-transparent hover:bg-blue-700 text-blue-700 hover:text-white transition-all duration-300"
      >
        Blue
      </button>

      <button
        type="button"
        className="px-5 py-2.5 rounded-lg text-sm tracking-wider font-medium border border-purple-700 outline-none bg-transparent hover:bg-purple-700 text-purple-700 hover:text-white transition-all duration-300"
      >
        Purple
      </button>

      <button
        type="button"
        className="px-5 py-2.5 rounded-lg text-sm tracking-wider font-medium border border-red-700 outline-none bg-transparent hover:bg-red-700 text-red-700 hover:text-white transition-all duration-300"
      >
        Red
      </button>

      <button
        type="button"
        className="px-5 py-2.5 rounded-lg text-sm tracking-wider font-medium border border-orange-700 outline-none bg-transparent hover:bg-orange-700 text-orange-700 hover:text-white transition-all duration-300"
      >
        Orange
      </button>

      <button
        type="button"
        className="px-5 py-2.5 rounded-lg text-sm tracking-wider font-medium border border-green-700 outline-none bg-transparent hover:bg-green-700 text-green-700 hover:text-white transition-all duration-300"
      >
        Green
      </button>

      <button
        type="button"
        className="px-5 py-2.5 rounded-lg text-sm tracking-wider font-medium border border-black outline-none bg-transparent hover:bg-black text-black hover:text-white transition-all duration-300"
      >
        Dark
      </button>
    </div>
  );
}
