import { AngularEditorConfig } from "@kolkov/angular-editor";

// Constant values to be shared accross all modules of application should reside here
export const DATE_FORMAT = "dd-MMM-yyyy";
export const LS_CONSTANTS = {
  SELECTED_PROJECT: "selectedProject",
};

export const YES = "yes";
export const NO = "no";

export const ALL_PROJECTS = "All Projects";

export const KNOWLEDGE_BASE_CATEGORY = [
  {
    id: 1,
    title: "Knowledge Base",
  },
  {
    id: 2,
    title: "Learning",
  },
];

export const DeviceType = {
  Mobile: "mobile",
  Tablet: "tablet",
  Desktop: "desktop",
  LargeDesktop: "large-desktop",
};

export const WYSIWYG_CONFIG: AngularEditorConfig = {
  editable: true,
  spellcheck: true,
  height: "15rem",
  minHeight: "5rem",
  placeholder: "Enter text here...",
  translate: "no",
  uploadUrl: "v1/images", // if needed
  customClasses: [
    // optional
    {
      name: "quote",
      class: "quote",
    },
    {
      name: "redText",
      class: "redText",
    },
    {
      name: "titleText",
      class: "titleText",
      tag: "h1",
    },
  ],
};
