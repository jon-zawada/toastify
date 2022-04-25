const DEFAULT_OPTIONS = {
  autoClose: 5000,
  position: "top-center",
  onClose: () => {},
  canClose: true,
  showProgress: true
}

class Toast {
  #toastElem
  #autoCloseTimeout
  #removeBinded
  #autoClose
  #visibleSince
  #progressInterval
  constructor(options){
    this.#toastElem = document.createElement("div");
    this.#toastElem.classList.add("toast");
    requestAnimationFrame(() => {
      this.#toastElem.classList.add("show");
    });
    this.#visibleSince = new Date();
    this.#removeBinded = this.remove.bind(this);
    this.update({...DEFAULT_OPTIONS, ...options});
  }

set autoClose(value) {
  this.#autoClose = value;
  this.#visibleSince = new Date();
  if(value === false) {
    return;
  }
  if(this.#autoCloseTimeout != null) clearTimeout(this.#autoCloseTimeout);
  this.#autoCloseTimeout = setTimeout(() => { this.remove() }, value);
}

set position(value) {
  const currentContainer = this.#toastElem.parentElement;
  const selector = `.toast-container[data-position=${value}]`;
  const container = document.querySelector(selector) || createContainer(value);
  container.append(this.#toastElem);
  if(currentContainer == null || currentContainer.hasChildNodes()) {
    return;
  } else {
    currentContainer.remove();
  }
}

  set text (text) {
    this.#toastElem.textContent = text;
  }

  set canClose(value) {
    this.#toastElem.classList.toggle("can-close", value);
    if(value) {
      this.#toastElem.addEventListener("click", this.#removeBinded);
    } else {
      this.#toastElem.removeEventListener("click", this.#removeBinded);
    }
  }

  set showProgress(value) {
    this.#toastElem.classList.toggle("progress", value);
    this.#toastElem.style.setProperty("--progress", 1);
    if(value) {
      this.#progressInterval = setInterval(() => {
        const timeVisible = new Date() - this.#visibleSince;
        this.#toastElem.style.setProperty(
          '--progress', 
          1 - timeVisible / this.#autoClose
        )
      }, 10)
    }
  }

  update (options) {
    Object.entries(options).forEach(([key, value]) => {
      this[key] = value;
    });
  }

  remove () {
    clearTimeout(this.#autoCloseTimeout);
    clearInterval(this.#progressInterval);
    const container = this.#toastElem.parentElement;
    this.#toastElem.classList.remove("show");
    this.#toastElem.addEventListener("transitionend", () => {
      this.#toastElem.remove();
      if(container == null || container.hasChildNodes()) {
        return;
      } else {
        container.remove();
      }
    });
    this.onClose();
  }
}

function createContainer(position) {
  const container = document.createElement("div");
  container.classList.add("toast-container");
  container.dataset.position = position;
  document.body.append(container);
  return container;
}

export default Toast;