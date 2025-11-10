import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

export default function ModuleControlButtons({
  moduleId,
  deleteModule,
  editModule,
  isFaculty = true,
}: {
  moduleId: string;
  deleteModule: (moduleId: string) => void;
  editModule: (moduleId: string) => void;
  isFaculty?: boolean;
}) {
  return (
    <div className="float-end">
      {/* Edit button - only show for faculty */}
      {isFaculty && (
        <FaPencil 
          className="text-primary me-3" 
          onClick={() => editModule(moduleId)}
          style={{ cursor: 'pointer' }}
        />
      )}
      
      {/* Delete button - only show for faculty */}
      {isFaculty && (
        <FaTrash 
          className="text-danger me-2 mb-1" 
          onClick={() => deleteModule(moduleId)}
          style={{ cursor: 'pointer' }}
        />
      )}
      
      {/* Checkmark */}
      <GreenCheckmark />
      
      {/* Plus button */}
      <button 
        className="btn btn-sm"
        disabled={!isFaculty}
        style={{ opacity: isFaculty ? 1 : 0.5 }}
      >
        +
      </button>
      
      {/* Ellipsis menu */}
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}