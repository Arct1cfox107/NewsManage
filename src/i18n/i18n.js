import I18n from "i18n-js";
import zhCN from "./zh-cn";
import en from "./en";

I18n.missingTranslation = (scope) => {
  return scope;
}
I18n.translations = {
  "zh-cn": zhCN,
  en,
}

export default I18n;
