import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  // Methods to be shared accross all modules should reside here
  constructor() { }

  localStorageManager = {
    save: (key, value) => {
      const content = {
        timeStamp: new Date(),
        data: value
      };
      window.localStorage.setItem(key, JSON.stringify(content));
    },
    load: (key, defaultValue) => {
      let value = window.localStorage.getItem(key);
      if (value) {
        return JSON.parse(value);
      }
      return defaultValue || null;
    },
    remove: (key) => {
      window.localStorage.removeItem(key);
    },
    clear: () => {
      window.localStorage.clear();
    }
  }


  decodeHtml = (html) => {
    let htmlElement = document.createElement('div');
    htmlElement.innerHTML = html;
    return htmlElement.innerText;
  }


  copyToClipBoard = (str) => {
    function listener(e) {
      e.clipboardData.setData("text/html", str);
      e.clipboardData.setData("text/plain", str);
      e.preventDefault();
    }
    document.addEventListener("copy", listener);
    document.execCommand("copy");
    document.removeEventListener("copy", listener);
  };


  copyToClipBoard1 = (val) => {
    var temp = document.createElement('textarea');
    temp.style.position = 'fixed';
    temp.style.left = '0';
    temp.style.top = '0';
    temp.style.opacity = '0';

    var brRegex = /<br\s*[\/]?>/gi;
    document.body.append(temp);
    temp.value = val.replace(brRegex, "\r\n");
    temp.value = this.decodeHtml(temp.value);
    temp.select();
    document.execCommand("copy");
    temp.remove();
  }
}
