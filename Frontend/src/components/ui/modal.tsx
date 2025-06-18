import { useState, type Dispatch, type SetStateAction } from "react";
import Loader from "./Loader";

export default function DeleteModalExample({
  isOpen,
  setIsOpen,
  destroyAssignment,
  assignmentId,
  isDestroyPending,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  destroyAssignment: (assignmentId: number) => void;
  assignmentId: number;
  isDestroyPending: boolean;
}) {
  //   const [isOpen, setIsOpen] = useState(false);

  //   const destroyAssignment = () => {
  //     console.log("Item eliminato!");
  //     setIsOpen(false);
  //   };

  return (
    <div className="p-6">
      {/* Trigger button */}
      {/* <button
        onClick={() => setIsOpen(true)}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Elimina elemento
      </button> */}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center ">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Sei sicuro?</h2>
            <p className="mb-6 text-sm text-gray-600">
              Questa azione non può essere annullata. Vuoi eliminare davvero
              l’elemento?
            </p>
            {isDestroyPending ? (
              <Loader isContained={true} />
            ) : (
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                  Annulla
                </button>
                <button
                  onClick={() => destroyAssignment(assignmentId)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Elimina
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
