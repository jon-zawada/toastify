# Foobar

Joastify is a toast message library displaying toast messages on your javascript applications.

## Installation

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install foobar.

```bash
npm i joastify
```

## Usage

```javascript
import Toast from 'joastify';

// initialize toast message 
new Toast({test: 'Hello world'})

// common use case is to attach to a dom event
document.querySelector("button").addEventListener("click", () => {
  new Toast({ text: "I am a toast message"});
});

```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
