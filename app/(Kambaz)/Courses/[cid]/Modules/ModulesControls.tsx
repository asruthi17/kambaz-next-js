// app/(Kambaz)/Courses/[cid]/Modules/ModulesControls.tsx
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { BsSlashCircle } from "react-icons/bs";
import GreenCheckmark from "./GreenCheckmark";

export default function ModulesControls() {
  return (
    <div id="wd-modules-controls" className="text-nowrap">
      <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-module-btn">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Module
      </Button>
      
      <Dropdown className="float-end me-2">
        <DropdownToggle variant="secondary" size="lg" id="wd-publish-all-btn" className="text-dark">
          <GreenCheckmark /> Publish All
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem id="wd-publish-all">
            <GreenCheckmark /> Publish All
          </DropdownItem>
          <DropdownItem id="wd-publish-all-modules-and-items">
            <GreenCheckmark /> Publish all modules and items
          </DropdownItem>
          <DropdownItem id="wd-publish-modules-only">
            <GreenCheckmark /> Publish modules only
          </DropdownItem>
          <DropdownItem id="wd-unpublish-all-modules-and-items">
            <BsSlashCircle className="me-1 text-muted" /> Unpublish all modules and items
          </DropdownItem>
          <DropdownItem id="wd-unpublish-modules-only">
            <BsSlashCircle className="me-1 text-muted" /> Unpublish modules only
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Button variant="secondary" size="lg" className="me-1 float-end text-dark" id="wd-view-progress">
        View Progress
      </Button>

      <Button variant="secondary" size="lg" className="me-1 float-end text-dark" id="wd-collapse-all">
        Collapse All
      </Button>
    </div>
  );
}