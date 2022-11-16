import { IS_DEBUG } from 'constants/setting'

class Log {
  static d(msg) {
    if (IS_DEBUG) {
      if (msg instanceof Object) {
        console.log(JSON.stringify(msg))
      } else {
        console.log(msg)
      }
    }
  }

  static e(msg) {
    if (IS_DEBUG) {
      if (msg instanceof Object) {
        console.error(JSON.stringify(msg))
      } else {
        console.error(msg)
      }
    }
  }

  static w(msg) {
    if (IS_DEBUG) {
      if (msg instanceof Object) {
        console.warn(JSON.stringify(msg))
      } else {
        console.warn(msg)
      }
    }
  }

  static i(msg) {
    if (IS_DEBUG) {
      if (msg instanceof Object) {
        console.info(JSON.stringify(msg))
      } else {
        console.info(msg)
      }
    }
  }
}

export default Log
