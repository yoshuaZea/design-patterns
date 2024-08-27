class EncoderTextAbstraction {
  constructor(encoder) {
    this.encoder = encoder; // * Implementor
  }

  encode(string) {
    return this.encoder.encode(string);
  }

  decode(string) {
    return this.encoder.decode(string);
  }
}

class Base64EncoderImplementor {
  encode(string) {
    return window.btoa(unescape(encodeURIComponent(string)));
  }

  decode(string) {
    return decodeURIComponent(escape(window.atob(string)));
  }
}

class HTMLEncoderImplementor {
  encode(string) {
    return string.split('.').reduce((acc, e) => acc + `<p>${e.trim()}</p>`, '');
  }

  decode(string) {
    return string.split('</p>').reduce((acc, e) => acc + e.replace('<p>', '') + '. ', '');
  }
}

// * Execution
const encoder1 = new EncoderTextAbstraction(new Base64EncoderImplementor());
const text1 = encoder1.encode('hello world!');
console.log(text1);
console.log(encoder1.decode(text1));

const encoder2 = new EncoderTextAbstraction(new HTMLEncoderImplementor());
const text2 = encoder2.encode('Lorem ipsum dolor. Dolor ragmir. Coart.');
console.log(text2);
console.log(encoder2.decode(text2));