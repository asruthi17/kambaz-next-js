"use client";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Button } from "react-bootstrap";
import GreenCheckmark from "./GreenCheckmark";
import ModuleEditor from "./ModuleEditor";

export default function ModulesControls({
  moduleName,
  setModuleName,
  addModule,
  isFaculty = true,
}: {
  moduleName: string;
  setModuleName: (title: string) => void;
  addModule: () => void;
  isFaculty?: boolean;
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (!isFaculty) return; // Don't open dialog for students
    setShow(true);
  };

  return (
    <div id="wd-modules-controls" className="text-nowrap">
      {/* Add Module Button - Disabled for students */}
      <Button
        variant="danger"
        size="lg"
        className="me-1 float-end"
        onClick={handleShow}
        id="wd-add-module-btn"
        disabled={!isFaculty}
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Module
      </Button>

      <div className="dropdown d-inline me-1 float-end">
        <button
          id="wd-publish-all-btn"
          className="btn btn-lg btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          disabled={!isFaculty}
        >
          <GreenCheckmark />
          Publish All
        </button>
        <ul className="dropdown-menu">
          <li>
            <a id="wd-publish-all-modules-and-items-btn" className="dropdown-item" href="#">
              <GreenCheckmark />
              Publish all modules and items
            </a>
          </li>
          <li>
            <a id="wd-publish-modules-only-button" className="dropdown-item" href="#">
              <GreenCheckmark />
              Publish modules only
            </a>
          </li>
          <li>
            <a id="wd-unpublish-all-modules-and-items" className="dropdown-item" href="#">
              Unpublish all modules and items
            </a>
          </li>
          <li>
            <a id="wd-unpublish-modules-only" className="dropdown-item" href="#">
              Unpublish modules only
            </a>
          </li>
        </ul>
      </div>

      <button 
        id="wd-view-progress" 
        className="btn btn-lg btn-secondary me-1 float-end"
        disabled={!isFaculty}
      >
        View Progress
      </button>

      <button 
        id="wd-collapse-all" 
        className="btn btn-lg btn-secondary me-1 float-end"
        disabled={!isFaculty}
      >
        Collapse All
      </button>

      <ModuleEditor
        show={show}
        handleClose={handleClose}
        dialogTitle="Add Module"
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={addModule}
      />
    </div>
  );
}