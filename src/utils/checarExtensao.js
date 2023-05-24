export function detectBrowser() {
    if (isChrome()) {
      return "chrome";
    } else if (isFirefox()) {
      return "firefox";
    } else if (isEdge()) {
      return "edge";
    } else if (isOpera()) {
      return "opera";
    } else if (isSafari()) {
      return "safari";
    } else if (isIE()) {
      return "iE";
    } else {
      return "unknown";
    }
  }
  
  /**
   * Funções simplificadas para detecção do browser, modifique se achar necessário
   */
  function isOpera() {
    return !!window.opera || navigator.userAgent.indexOf(" OPR/") >= 0;
  }
  
  function isFirefox() {
    return typeof InstallTrigger !== "undefined";
  }
  
  function isSafari() {
    return navigator.userAgent.indexOf("Safari") > -1;
  }
  
  function isIE() {
    return /*@cc_on!@*/ false || !!document.documentMode;
  }
  
  function isEdge() {
    if (document.documentMode || /Edge/.test(navigator.userAgent)) {
      return true;
    } else {
      return false;
    }
  }
  
  function isChrome() {
    return /Google Inc/.test(navigator.vendor);
  }
  
  export function isExtensionInstalled() {
    if (
      typeof window.BryExtension !== "undefined" &&
      typeof window.BryExtension.listCertificates === "function"
    )
      return true;
    else return false;
  }
  
