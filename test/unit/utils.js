class Console {
  set level(val) {
    return this._level = val;
  }

  get level() {
    return this._level;
  }

  set message(val) {
    return this._message = val;
  }

  get message() {
    return this._message;
  }

  constructor() {
    this._level = 1;
    this._message = [];
  }

  log(message, show = false) {
    this.message = [];
    this.switch(message);

    const msg = this.message.filter(Boolean).join("\n");
    if(show) {
      console.log(msg);
    }
    return msg;
  }

  display(message) {
      this.message = [...this.message,message];
  }

  switch(message, level = 0, clear = false) {
    if(typeof message === "number" || typeof message === "string") {

      const prefix = Array(level).join(' ');
      this.display(prefix + message);

    } else if(Array.isArray(message)) {

      if(!clear) this.switch("[", level);
      message.forEach(item => this.switch(item, level + 2));
      if(!clear) this.switch("]", level);

    } else if(typeof message === "object" && message !== null) {
      const keys = Object.keys(message);

      if(!clear) this.switch("{", level);
      keys.forEach(key => {
        const value = message[key];
        const type = typeof value;
        const oneLine = type === "number" || type === "string" || value === null;

        if (oneLine) {
          this.switch(`${key}: ${value}`, level + 2);
        } else {
          let prefix = '{';
          let suffix = '}';
          if (Array.isArray(value)) {
            prefix = '[';
            suffix = ']';
          }

          this.switch(`${key}: ${prefix}`, level + 2);
          this.switch(value, level + 2, true);
          this.switch(suffix, level + 2);
        }
      });
      if(!clear) this.switch("}", level);
    }
  }
}

const TestConsole = new Console();

module.exports = TestConsole;
