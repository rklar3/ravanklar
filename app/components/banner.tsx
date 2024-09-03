import { X } from "lucide-react";

export default function Banner({
  setShowBanner,
}: {
  setShowBanner: (show: boolean) => void;
}) {
  return (
    <div className="bg-gray-900 p-4 text-gray-300 w-5/6">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-1"></div>
        <p className="text-sm font-medium flex-1 text-center">
          🎉 New website launch
        </p>
        <div className="flex-1 flex justify-end">
          <button
            onClick={() => setShowBanner(false)}
            className="text-gray-600 hover:text-gray-800"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
