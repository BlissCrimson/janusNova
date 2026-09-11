import "./styles/main.scss";
import { createHeaderTemplate } from "./components/header.template";
import { createFooterTemplate } from "./components/footer.template";

function init() {
  createHeaderTemplate();
  createFooterTemplate();
}


init();