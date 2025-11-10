/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { addModule, editModule, updateModule, deleteModule } from "./reducer";

export default function Modules() {
  const params = useParams();
  const cid = params.cid as string;
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();

  // Get current user from Redux state
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  // Check if user is faculty/instructor
  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "INSTRUCTOR";

  return (
    <div className="wd-modules">
      {/* Show ModulesControls for everyone, but disable functionality for students */}
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={() => {
          if (!isFaculty) {
            return; // Do nothing for students
          }
          dispatch(addModule({ name: moduleName, course: cid }));
          setModuleName("");
        }}
        isFaculty={isFaculty}
      />
      <br /><br /><br /><br />

      <ListGroup className="rounded-0" id="wd-modules">
        {modules
          .filter((module: any) => module.course === cid)
          .map((module: any) => (
            <ListGroupItem key={module._id} className="wd-module p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />

                {/* Always show module name (never show input for students) */}
                {(!module.editing || !isFaculty) && module.name}

                {/* Show input field only if editing AND user is faculty */}
                {module.editing && isFaculty && (
                  <FormControl
                    className="w-50 d-inline-block"
                    onChange={(e) =>
                      dispatch(
                        updateModule({ ...module, name: e.target.value })
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        dispatch(updateModule({ ...module, editing: false }));
                      }
                    }}
                    defaultValue={module.name}
                  />
                )}

                {/* Show module control buttons for everyone, but disable for students */}
                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={(moduleId) => {
                    if (!isFaculty) return; // Do nothing for students
                    dispatch(deleteModule(moduleId));
                  }}
                  editModule={(moduleId) => {
                    if (!isFaculty) return; // Do nothing for students
                    dispatch(editModule(moduleId));
                  }}
                  isFaculty={isFaculty}
                />
              </div>

              {module.lessons && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson: any) => (
                    <ListGroupItem key={lesson._id} className="wd-lesson p-3 ps-1">
                      <BsGripVertical className="me-2 fs-3" />
                      {lesson.name}
                      {/* Show lesson control buttons for everyone */}
                      <LessonControlButtons />
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}