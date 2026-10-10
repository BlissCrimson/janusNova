import "./styles/main.scss";
import { createHeaderTemplate } from "./components/header.template";
import { createFooterTemplate } from "./components/footer.template";
import { generateAllInklBanner } from "./components/banner.template";

function init() {
  createHeaderTemplate();
  createFooterTemplate();
  generateAllInklBanner();
}

init();
