(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('constants'), require('stream'), require('os'), require('assert'), require('path'), require('util'), require('fs')) :
    typeof define === 'function' && define.amd ? define(['exports', 'constants', 'stream', 'os', 'assert', 'path', 'util', 'fs'], factory) :
    (factory((global.mardoc = {}),global.constants,global.stream,global.os,global.assert,global.path,global.util,global.fs));
}(this, (function (exports,constants,stream,os,assert,path,util,fs) { 'use strict';

    constants = constants && constants.hasOwnProperty('default') ? constants['default'] : constants;
    stream = stream && stream.hasOwnProperty('default') ? stream['default'] : stream;
    os = os && os.hasOwnProperty('default') ? os['default'] : os;
    assert = assert && assert.hasOwnProperty('default') ? assert['default'] : assert;
    path = path && path.hasOwnProperty('default') ? path['default'] : path;
    util = util && util.hasOwnProperty('default') ? util['default'] : util;
    fs = fs && fs.hasOwnProperty('default') ? fs['default'] : fs;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function commonjsRequire () {
    	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
    }

    function unwrapExports (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var fromCallback = function (fn) {
      return Object.defineProperty(function () {
        if (typeof arguments[arguments.length - 1] === 'function') fn.apply(this, arguments);
        else {
          return new Promise((resolve, reject) => {
            arguments[arguments.length] = (err, res) => {
              if (err) return reject(err)
              resolve(res);
            };
            arguments.length++;
            fn.apply(this, arguments);
          })
        }
      }, 'name', { value: fn.name })
    };

    var fromPromise = function (fn) {
      return Object.defineProperty(function () {
        const cb = arguments[arguments.length - 1];
        if (typeof cb !== 'function') return fn.apply(this, arguments)
        else fn.apply(this, arguments).then(r => cb(null, r), cb);
      }, 'name', { value: fn.name })
    };

    var universalify = {
    	fromCallback: fromCallback,
    	fromPromise: fromPromise
    };

    var origCwd = process.cwd;
    var cwd = null;

    var platform = process.env.GRACEFUL_FS_PLATFORM || process.platform;

    process.cwd = function() {
      if (!cwd)
        cwd = origCwd.call(process);
      return cwd
    };
    try {
      process.cwd();
    } catch (er) {}

    var chdir = process.chdir;
    process.chdir = function(d) {
      cwd = null;
      chdir.call(process, d);
    };

    var polyfills = patch;

    function patch (fs$$1) {
      // (re-)implement some things that are known busted or missing.

      // lchmod, broken prior to 0.6.2
      // back-port the fix here.
      if (constants.hasOwnProperty('O_SYMLINK') &&
          process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
        patchLchmod(fs$$1);
      }

      // lutimes implementation, or no-op
      if (!fs$$1.lutimes) {
        patchLutimes(fs$$1);
      }

      // https://github.com/isaacs/node-graceful-fs/issues/4
      // Chown should not fail on einval or eperm if non-root.
      // It should not fail on enosys ever, as this just indicates
      // that a fs doesn't support the intended operation.

      fs$$1.chown = chownFix(fs$$1.chown);
      fs$$1.fchown = chownFix(fs$$1.fchown);
      fs$$1.lchown = chownFix(fs$$1.lchown);

      fs$$1.chmod = chmodFix(fs$$1.chmod);
      fs$$1.fchmod = chmodFix(fs$$1.fchmod);
      fs$$1.lchmod = chmodFix(fs$$1.lchmod);

      fs$$1.chownSync = chownFixSync(fs$$1.chownSync);
      fs$$1.fchownSync = chownFixSync(fs$$1.fchownSync);
      fs$$1.lchownSync = chownFixSync(fs$$1.lchownSync);

      fs$$1.chmodSync = chmodFixSync(fs$$1.chmodSync);
      fs$$1.fchmodSync = chmodFixSync(fs$$1.fchmodSync);
      fs$$1.lchmodSync = chmodFixSync(fs$$1.lchmodSync);

      fs$$1.stat = statFix(fs$$1.stat);
      fs$$1.fstat = statFix(fs$$1.fstat);
      fs$$1.lstat = statFix(fs$$1.lstat);

      fs$$1.statSync = statFixSync(fs$$1.statSync);
      fs$$1.fstatSync = statFixSync(fs$$1.fstatSync);
      fs$$1.lstatSync = statFixSync(fs$$1.lstatSync);

      // if lchmod/lchown do not exist, then make them no-ops
      if (!fs$$1.lchmod) {
        fs$$1.lchmod = function (path$$1, mode, cb) {
          if (cb) process.nextTick(cb);
        };
        fs$$1.lchmodSync = function () {};
      }
      if (!fs$$1.lchown) {
        fs$$1.lchown = function (path$$1, uid, gid, cb) {
          if (cb) process.nextTick(cb);
        };
        fs$$1.lchownSync = function () {};
      }

      // on Windows, A/V software can lock the directory, causing this
      // to fail with an EACCES or EPERM if the directory contains newly
      // created files.  Try again on failure, for up to 60 seconds.

      // Set the timeout this long because some Windows Anti-Virus, such as Parity
      // bit9, may lock files for up to a minute, causing npm package install
      // failures. Also, take care to yield the scheduler. Windows scheduling gives
      // CPU to a busy looping process, which can cause the program causing the lock
      // contention to be starved of CPU by node, so the contention doesn't resolve.
      if (platform === "win32") {
        fs$$1.rename = (function (fs$rename) { return function (from, to, cb) {
          var start = Date.now();
          var backoff = 0;
          fs$rename(from, to, function CB (er) {
            if (er
                && (er.code === "EACCES" || er.code === "EPERM")
                && Date.now() - start < 60000) {
              setTimeout(function() {
                fs$$1.stat(to, function (stater, st) {
                  if (stater && stater.code === "ENOENT")
                    fs$rename(from, to, CB);
                  else
                    cb(er);
                });
              }, backoff);
              if (backoff < 100)
                backoff += 10;
              return;
            }
            if (cb) cb(er);
          });
        }})(fs$$1.rename);
      }

      // if read() returns EAGAIN, then just try it again.
      fs$$1.read = (function (fs$read) {
        function read (fd, buffer, offset, length, position, callback_) {
          var callback;
          if (callback_ && typeof callback_ === 'function') {
            var eagCounter = 0;
            callback = function (er, _, __) {
              if (er && er.code === 'EAGAIN' && eagCounter < 10) {
                eagCounter ++;
                return fs$read.call(fs$$1, fd, buffer, offset, length, position, callback)
              }
              callback_.apply(this, arguments);
            };
          }
          return fs$read.call(fs$$1, fd, buffer, offset, length, position, callback)
        }

        // This ensures `util.promisify` works as it does for native `fs.read`.
        read.__proto__ = fs$read;
        return read
      })(fs$$1.read);

      fs$$1.readSync = (function (fs$readSync) { return function (fd, buffer, offset, length, position) {
        var eagCounter = 0;
        while (true) {
          try {
            return fs$readSync.call(fs$$1, fd, buffer, offset, length, position)
          } catch (er) {
            if (er.code === 'EAGAIN' && eagCounter < 10) {
              eagCounter ++;
              continue
            }
            throw er
          }
        }
      }})(fs$$1.readSync);

      function patchLchmod (fs$$1) {
        fs$$1.lchmod = function (path$$1, mode, callback) {
          fs$$1.open( path$$1
                 , constants.O_WRONLY | constants.O_SYMLINK
                 , mode
                 , function (err, fd) {
            if (err) {
              if (callback) callback(err);
              return
            }
            // prefer to return the chmod error, if one occurs,
            // but still try to close, and report closing errors if they occur.
            fs$$1.fchmod(fd, mode, function (err) {
              fs$$1.close(fd, function(err2) {
                if (callback) callback(err || err2);
              });
            });
          });
        };

        fs$$1.lchmodSync = function (path$$1, mode) {
          var fd = fs$$1.openSync(path$$1, constants.O_WRONLY | constants.O_SYMLINK, mode);

          // prefer to return the chmod error, if one occurs,
          // but still try to close, and report closing errors if they occur.
          var threw = true;
          var ret;
          try {
            ret = fs$$1.fchmodSync(fd, mode);
            threw = false;
          } finally {
            if (threw) {
              try {
                fs$$1.closeSync(fd);
              } catch (er) {}
            } else {
              fs$$1.closeSync(fd);
            }
          }
          return ret
        };
      }

      function patchLutimes (fs$$1) {
        if (constants.hasOwnProperty("O_SYMLINK")) {
          fs$$1.lutimes = function (path$$1, at, mt, cb) {
            fs$$1.open(path$$1, constants.O_SYMLINK, function (er, fd) {
              if (er) {
                if (cb) cb(er);
                return
              }
              fs$$1.futimes(fd, at, mt, function (er) {
                fs$$1.close(fd, function (er2) {
                  if (cb) cb(er || er2);
                });
              });
            });
          };

          fs$$1.lutimesSync = function (path$$1, at, mt) {
            var fd = fs$$1.openSync(path$$1, constants.O_SYMLINK);
            var ret;
            var threw = true;
            try {
              ret = fs$$1.futimesSync(fd, at, mt);
              threw = false;
            } finally {
              if (threw) {
                try {
                  fs$$1.closeSync(fd);
                } catch (er) {}
              } else {
                fs$$1.closeSync(fd);
              }
            }
            return ret
          };

        } else {
          fs$$1.lutimes = function (_a, _b, _c, cb) { if (cb) process.nextTick(cb); };
          fs$$1.lutimesSync = function () {};
        }
      }

      function chmodFix (orig) {
        if (!orig) return orig
        return function (target, mode, cb) {
          return orig.call(fs$$1, target, mode, function (er) {
            if (chownErOk(er)) er = null;
            if (cb) cb.apply(this, arguments);
          })
        }
      }

      function chmodFixSync (orig) {
        if (!orig) return orig
        return function (target, mode) {
          try {
            return orig.call(fs$$1, target, mode)
          } catch (er) {
            if (!chownErOk(er)) throw er
          }
        }
      }


      function chownFix (orig) {
        if (!orig) return orig
        return function (target, uid, gid, cb) {
          return orig.call(fs$$1, target, uid, gid, function (er) {
            if (chownErOk(er)) er = null;
            if (cb) cb.apply(this, arguments);
          })
        }
      }

      function chownFixSync (orig) {
        if (!orig) return orig
        return function (target, uid, gid) {
          try {
            return orig.call(fs$$1, target, uid, gid)
          } catch (er) {
            if (!chownErOk(er)) throw er
          }
        }
      }

      function statFix (orig) {
        if (!orig) return orig
        // Older versions of Node erroneously returned signed integers for
        // uid + gid.
        return function (target, options, cb) {
          if (typeof options === 'function') {
            cb = options;
            options = null;
          }
          function callback (er, stats) {
            if (stats) {
              if (stats.uid < 0) stats.uid += 0x100000000;
              if (stats.gid < 0) stats.gid += 0x100000000;
            }
            if (cb) cb.apply(this, arguments);
          }
          return options ? orig.call(fs$$1, target, options, callback)
            : orig.call(fs$$1, target, callback)
        }
      }

      function statFixSync (orig) {
        if (!orig) return orig
        // Older versions of Node erroneously returned signed integers for
        // uid + gid.
        return function (target, options) {
          var stats = options ? orig.call(fs$$1, target, options)
            : orig.call(fs$$1, target);
          if (stats.uid < 0) stats.uid += 0x100000000;
          if (stats.gid < 0) stats.gid += 0x100000000;
          return stats;
        }
      }

      // ENOSYS means that the fs doesn't support the op. Just ignore
      // that, because it doesn't matter.
      //
      // if there's no getuid, or if getuid() is something other
      // than 0, and the error is EINVAL or EPERM, then just ignore
      // it.
      //
      // This specific case is a silent failure in cp, install, tar,
      // and most other unix tools that manage permissions.
      //
      // When running as root, or if other types of errors are
      // encountered, then it's strict.
      function chownErOk (er) {
        if (!er)
          return true

        if (er.code === "ENOSYS")
          return true

        var nonroot = !process.getuid || process.getuid() !== 0;
        if (nonroot) {
          if (er.code === "EINVAL" || er.code === "EPERM")
            return true
        }

        return false
      }
    }

    var Stream = stream.Stream;

    var legacyStreams = legacy;

    function legacy (fs$$1) {
      return {
        ReadStream: ReadStream,
        WriteStream: WriteStream
      }

      function ReadStream (path$$1, options) {
        if (!(this instanceof ReadStream)) return new ReadStream(path$$1, options);

        Stream.call(this);

        var self = this;

        this.path = path$$1;
        this.fd = null;
        this.readable = true;
        this.paused = false;

        this.flags = 'r';
        this.mode = 438; /*=0666*/
        this.bufferSize = 64 * 1024;

        options = options || {};

        // Mixin options into this
        var keys = Object.keys(options);
        for (var index = 0, length = keys.length; index < length; index++) {
          var key = keys[index];
          this[key] = options[key];
        }

        if (this.encoding) this.setEncoding(this.encoding);

        if (this.start !== undefined) {
          if ('number' !== typeof this.start) {
            throw TypeError('start must be a Number');
          }
          if (this.end === undefined) {
            this.end = Infinity;
          } else if ('number' !== typeof this.end) {
            throw TypeError('end must be a Number');
          }

          if (this.start > this.end) {
            throw new Error('start must be <= end');
          }

          this.pos = this.start;
        }

        if (this.fd !== null) {
          process.nextTick(function() {
            self._read();
          });
          return;
        }

        fs$$1.open(this.path, this.flags, this.mode, function (err, fd) {
          if (err) {
            self.emit('error', err);
            self.readable = false;
            return;
          }

          self.fd = fd;
          self.emit('open', fd);
          self._read();
        });
      }

      function WriteStream (path$$1, options) {
        if (!(this instanceof WriteStream)) return new WriteStream(path$$1, options);

        Stream.call(this);

        this.path = path$$1;
        this.fd = null;
        this.writable = true;

        this.flags = 'w';
        this.encoding = 'binary';
        this.mode = 438; /*=0666*/
        this.bytesWritten = 0;

        options = options || {};

        // Mixin options into this
        var keys = Object.keys(options);
        for (var index = 0, length = keys.length; index < length; index++) {
          var key = keys[index];
          this[key] = options[key];
        }

        if (this.start !== undefined) {
          if ('number' !== typeof this.start) {
            throw TypeError('start must be a Number');
          }
          if (this.start < 0) {
            throw new Error('start must be >= zero');
          }

          this.pos = this.start;
        }

        this.busy = false;
        this._queue = [];

        if (this.fd === null) {
          this._open = fs$$1.open;
          this._queue.push([this._open, this.path, this.flags, this.mode, undefined]);
          this.flush();
        }
      }
    }

    var clone_1 = clone;

    function clone (obj) {
      if (obj === null || typeof obj !== 'object')
        return obj

      if (obj instanceof Object)
        var copy = { __proto__: obj.__proto__ };
      else
        var copy = Object.create(null);

      Object.getOwnPropertyNames(obj).forEach(function (key) {
        Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key));
      });

      return copy
    }

    var gracefulFs = createCommonjsModule(function (module) {
    /* istanbul ignore next - node 0.x polyfill */
    var gracefulQueue;
    var previousSymbol;

    /* istanbul ignore else - node 0.x polyfill */
    if (typeof Symbol === 'function' && typeof Symbol.for === 'function') {
      gracefulQueue = Symbol.for('graceful-fs.queue');
      // This is used in testing by future versions
      previousSymbol = Symbol.for('graceful-fs.previous');
    } else {
      gracefulQueue = '___graceful-fs.queue';
      previousSymbol = '___graceful-fs.previous';
    }

    function noop () {}

    var debug = noop;
    if (util.debuglog)
      debug = util.debuglog('gfs4');
    else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ''))
      debug = function() {
        var m = util.format.apply(util, arguments);
        m = 'GFS4: ' + m.split(/\n/).join('\nGFS4: ');
        console.error(m);
      };

    // Once time initialization
    if (!commonjsGlobal[gracefulQueue]) {
      // This queue can be shared by multiple loaded instances
      var queue = [];
      Object.defineProperty(commonjsGlobal, gracefulQueue, {
        get: function() {
          return queue
        }
      });

      // Patch fs.close/closeSync to shared queue version, because we need
      // to retry() whenever a close happens *anywhere* in the program.
      // This is essential when multiple graceful-fs instances are
      // in play at the same time.
      fs.close = (function (fs$close) {
        function close (fd, cb) {
          return fs$close.call(fs, fd, function (err) {
            // This function uses the graceful-fs shared queue
            if (!err) {
              retry();
            }

            if (typeof cb === 'function')
              cb.apply(this, arguments);
          })
        }

        Object.defineProperty(close, previousSymbol, {
          value: fs$close
        });
        return close
      })(fs.close);

      fs.closeSync = (function (fs$closeSync) {
        function closeSync (fd) {
          // This function uses the graceful-fs shared queue
          fs$closeSync.apply(fs, arguments);
          retry();
        }

        Object.defineProperty(closeSync, previousSymbol, {
          value: fs$closeSync
        });
        return closeSync
      })(fs.closeSync);

      if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || '')) {
        process.on('exit', function() {
          debug(commonjsGlobal[gracefulQueue]);
          assert.equal(commonjsGlobal[gracefulQueue].length, 0);
        });
      }
    }

    module.exports = patch(clone_1(fs));
    if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs.__patched) {
        module.exports = patch(fs);
        fs.__patched = true;
    }

    function patch (fs$$1) {
      // Everything that references the open() function needs to be in here
      polyfills(fs$$1);
      fs$$1.gracefulify = patch;

      fs$$1.createReadStream = createReadStream;
      fs$$1.createWriteStream = createWriteStream;
      var fs$readFile = fs$$1.readFile;
      fs$$1.readFile = readFile;
      function readFile (path$$1, options, cb) {
        if (typeof options === 'function')
          cb = options, options = null;

        return go$readFile(path$$1, options, cb)

        function go$readFile (path$$1, options, cb) {
          return fs$readFile(path$$1, options, function (err) {
            if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
              enqueue([go$readFile, [path$$1, options, cb]]);
            else {
              if (typeof cb === 'function')
                cb.apply(this, arguments);
              retry();
            }
          })
        }
      }

      var fs$writeFile = fs$$1.writeFile;
      fs$$1.writeFile = writeFile;
      function writeFile (path$$1, data, options, cb) {
        if (typeof options === 'function')
          cb = options, options = null;

        return go$writeFile(path$$1, data, options, cb)

        function go$writeFile (path$$1, data, options, cb) {
          return fs$writeFile(path$$1, data, options, function (err) {
            if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
              enqueue([go$writeFile, [path$$1, data, options, cb]]);
            else {
              if (typeof cb === 'function')
                cb.apply(this, arguments);
              retry();
            }
          })
        }
      }

      var fs$appendFile = fs$$1.appendFile;
      if (fs$appendFile)
        fs$$1.appendFile = appendFile;
      function appendFile (path$$1, data, options, cb) {
        if (typeof options === 'function')
          cb = options, options = null;

        return go$appendFile(path$$1, data, options, cb)

        function go$appendFile (path$$1, data, options, cb) {
          return fs$appendFile(path$$1, data, options, function (err) {
            if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
              enqueue([go$appendFile, [path$$1, data, options, cb]]);
            else {
              if (typeof cb === 'function')
                cb.apply(this, arguments);
              retry();
            }
          })
        }
      }

      var fs$readdir = fs$$1.readdir;
      fs$$1.readdir = readdir;
      function readdir (path$$1, options, cb) {
        var args = [path$$1];
        if (typeof options !== 'function') {
          args.push(options);
        } else {
          cb = options;
        }
        args.push(go$readdir$cb);

        return go$readdir(args)

        function go$readdir$cb (err, files) {
          if (files && files.sort)
            files.sort();

          if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
            enqueue([go$readdir, [args]]);

          else {
            if (typeof cb === 'function')
              cb.apply(this, arguments);
            retry();
          }
        }
      }

      function go$readdir (args) {
        return fs$readdir.apply(fs$$1, args)
      }

      if (process.version.substr(0, 4) === 'v0.8') {
        var legStreams = legacyStreams(fs$$1);
        ReadStream = legStreams.ReadStream;
        WriteStream = legStreams.WriteStream;
      }

      var fs$ReadStream = fs$$1.ReadStream;
      if (fs$ReadStream) {
        ReadStream.prototype = Object.create(fs$ReadStream.prototype);
        ReadStream.prototype.open = ReadStream$open;
      }

      var fs$WriteStream = fs$$1.WriteStream;
      if (fs$WriteStream) {
        WriteStream.prototype = Object.create(fs$WriteStream.prototype);
        WriteStream.prototype.open = WriteStream$open;
      }

      Object.defineProperty(fs$$1, 'ReadStream', {
        get: function () {
          return ReadStream
        },
        set: function (val) {
          ReadStream = val;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(fs$$1, 'WriteStream', {
        get: function () {
          return WriteStream
        },
        set: function (val) {
          WriteStream = val;
        },
        enumerable: true,
        configurable: true
      });

      // legacy names
      var FileReadStream = ReadStream;
      Object.defineProperty(fs$$1, 'FileReadStream', {
        get: function () {
          return FileReadStream
        },
        set: function (val) {
          FileReadStream = val;
        },
        enumerable: true,
        configurable: true
      });
      var FileWriteStream = WriteStream;
      Object.defineProperty(fs$$1, 'FileWriteStream', {
        get: function () {
          return FileWriteStream
        },
        set: function (val) {
          FileWriteStream = val;
        },
        enumerable: true,
        configurable: true
      });

      function ReadStream (path$$1, options) {
        if (this instanceof ReadStream)
          return fs$ReadStream.apply(this, arguments), this
        else
          return ReadStream.apply(Object.create(ReadStream.prototype), arguments)
      }

      function ReadStream$open () {
        var that = this;
        open(that.path, that.flags, that.mode, function (err, fd) {
          if (err) {
            if (that.autoClose)
              that.destroy();

            that.emit('error', err);
          } else {
            that.fd = fd;
            that.emit('open', fd);
            that.read();
          }
        });
      }

      function WriteStream (path$$1, options) {
        if (this instanceof WriteStream)
          return fs$WriteStream.apply(this, arguments), this
        else
          return WriteStream.apply(Object.create(WriteStream.prototype), arguments)
      }

      function WriteStream$open () {
        var that = this;
        open(that.path, that.flags, that.mode, function (err, fd) {
          if (err) {
            that.destroy();
            that.emit('error', err);
          } else {
            that.fd = fd;
            that.emit('open', fd);
          }
        });
      }

      function createReadStream (path$$1, options) {
        return new fs$$1.ReadStream(path$$1, options)
      }

      function createWriteStream (path$$1, options) {
        return new fs$$1.WriteStream(path$$1, options)
      }

      var fs$open = fs$$1.open;
      fs$$1.open = open;
      function open (path$$1, flags, mode, cb) {
        if (typeof mode === 'function')
          cb = mode, mode = null;

        return go$open(path$$1, flags, mode, cb)

        function go$open (path$$1, flags, mode, cb) {
          return fs$open(path$$1, flags, mode, function (err, fd) {
            if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
              enqueue([go$open, [path$$1, flags, mode, cb]]);
            else {
              if (typeof cb === 'function')
                cb.apply(this, arguments);
              retry();
            }
          })
        }
      }

      return fs$$1
    }

    function enqueue (elem) {
      debug('ENQUEUE', elem[0].name, elem[1]);
      commonjsGlobal[gracefulQueue].push(elem);
    }

    function retry () {
      var elem = commonjsGlobal[gracefulQueue].shift();
      if (elem) {
        debug('RETRY', elem[0].name, elem[1]);
        elem[0].apply(null, elem[1]);
      }
    }
    });

    var fs_1 = createCommonjsModule(function (module, exports) {
    // This is adapted from https://github.com/normalize/mz
    // Copyright (c) 2014-2016 Jonathan Ong me@jongleberry.com and Contributors
    const u = universalify.fromCallback;


    const api = [
      'access',
      'appendFile',
      'chmod',
      'chown',
      'close',
      'copyFile',
      'fchmod',
      'fchown',
      'fdatasync',
      'fstat',
      'fsync',
      'ftruncate',
      'futimes',
      'lchown',
      'lchmod',
      'link',
      'lstat',
      'mkdir',
      'mkdtemp',
      'open',
      'readFile',
      'readdir',
      'readlink',
      'realpath',
      'rename',
      'rmdir',
      'stat',
      'symlink',
      'truncate',
      'unlink',
      'utimes',
      'writeFile'
    ].filter(key => {
      // Some commands are not available on some systems. Ex:
      // fs.copyFile was added in Node.js v8.5.0
      // fs.mkdtemp was added in Node.js v5.10.0
      // fs.lchown is not available on at least some Linux
      return typeof gracefulFs[key] === 'function'
    });

    // Export all keys:
    Object.keys(gracefulFs).forEach(key => {
      if (key === 'promises') {
        // fs.promises is a getter property that triggers ExperimentalWarning
        // Don't re-export it here, the getter is defined in "lib/index.js"
        return
      }
      exports[key] = gracefulFs[key];
    });

    // Universalify async methods:
    api.forEach(method => {
      exports[method] = u(gracefulFs[method]);
    });

    // We differ from mz/fs in that we still ship the old, broken, fs.exists()
    // since we are a drop-in replacement for the native module
    exports.exists = function (filename, callback) {
      if (typeof callback === 'function') {
        return gracefulFs.exists(filename, callback)
      }
      return new Promise(resolve => {
        return gracefulFs.exists(filename, resolve)
      })
    };

    // fs.read() & fs.write need special treatment due to multiple callback args

    exports.read = function (fd, buffer, offset, length, position, callback) {
      if (typeof callback === 'function') {
        return gracefulFs.read(fd, buffer, offset, length, position, callback)
      }
      return new Promise((resolve, reject) => {
        gracefulFs.read(fd, buffer, offset, length, position, (err, bytesRead, buffer) => {
          if (err) return reject(err)
          resolve({ bytesRead, buffer });
        });
      })
    };

    // Function signature can be
    // fs.write(fd, buffer[, offset[, length[, position]]], callback)
    // OR
    // fs.write(fd, string[, position[, encoding]], callback)
    // We need to handle both cases, so we use ...args
    exports.write = function (fd, buffer, ...args) {
      if (typeof args[args.length - 1] === 'function') {
        return gracefulFs.write(fd, buffer, ...args)
      }

      return new Promise((resolve, reject) => {
        gracefulFs.write(fd, buffer, ...args, (err, bytesWritten, buffer) => {
          if (err) return reject(err)
          resolve({ bytesWritten, buffer });
        });
      })
    };

    // fs.realpath.native only available in Node v9.2+
    if (typeof gracefulFs.realpath.native === 'function') {
      exports.realpath.native = u(gracefulFs.realpath.native);
    }
    });
    var fs_2 = fs_1.exists;
    var fs_3 = fs_1.read;
    var fs_4 = fs_1.write;

    // get drive on windows
    function getRootPath (p) {
      p = path.normalize(path.resolve(p)).split(path.sep);
      if (p.length > 0) return p[0]
      return null
    }

    // http://stackoverflow.com/a/62888/10333 contains more accurate
    // TODO: expand to include the rest
    const INVALID_PATH_CHARS = /[<>:"|?*]/;

    function invalidWin32Path (p) {
      const rp = getRootPath(p);
      p = p.replace(rp, '');
      return INVALID_PATH_CHARS.test(p)
    }

    var win32 = {
      getRootPath,
      invalidWin32Path
    };

    const invalidWin32Path$1 = win32.invalidWin32Path;

    const o777 = parseInt('0777', 8);

    function mkdirs (p, opts, callback, made) {
      if (typeof opts === 'function') {
        callback = opts;
        opts = {};
      } else if (!opts || typeof opts !== 'object') {
        opts = { mode: opts };
      }

      if (process.platform === 'win32' && invalidWin32Path$1(p)) {
        const errInval = new Error(p + ' contains invalid WIN32 path characters.');
        errInval.code = 'EINVAL';
        return callback(errInval)
      }

      let mode = opts.mode;
      const xfs = opts.fs || gracefulFs;

      if (mode === undefined) {
        mode = o777 & (~process.umask());
      }
      if (!made) made = null;

      callback = callback || function () {};
      p = path.resolve(p);

      xfs.mkdir(p, mode, er => {
        if (!er) {
          made = made || p;
          return callback(null, made)
        }
        switch (er.code) {
          case 'ENOENT':
            if (path.dirname(p) === p) return callback(er)
            mkdirs(path.dirname(p), opts, (er, made) => {
              if (er) callback(er, made);
              else mkdirs(p, opts, callback, made);
            });
            break

          // In the case of any other error, just see if there's a dir
          // there already.  If so, then hooray!  If not, then something
          // is borked.
          default:
            xfs.stat(p, (er2, stat) => {
              // if the stat fails, then that's super weird.
              // let the original error be the failure reason.
              if (er2 || !stat.isDirectory()) callback(er, made);
              else callback(null, made);
            });
            break
        }
      });
    }

    var mkdirs_1 = mkdirs;

    const invalidWin32Path$2 = win32.invalidWin32Path;

    const o777$1 = parseInt('0777', 8);

    function mkdirsSync (p, opts, made) {
      if (!opts || typeof opts !== 'object') {
        opts = { mode: opts };
      }

      let mode = opts.mode;
      const xfs = opts.fs || gracefulFs;

      if (process.platform === 'win32' && invalidWin32Path$2(p)) {
        const errInval = new Error(p + ' contains invalid WIN32 path characters.');
        errInval.code = 'EINVAL';
        throw errInval
      }

      if (mode === undefined) {
        mode = o777$1 & (~process.umask());
      }
      if (!made) made = null;

      p = path.resolve(p);

      try {
        xfs.mkdirSync(p, mode);
        made = made || p;
      } catch (err0) {
        if (err0.code === 'ENOENT') {
          if (path.dirname(p) === p) throw err0
          made = mkdirsSync(path.dirname(p), opts, made);
          mkdirsSync(p, opts, made);
        } else {
          // In the case of any other error, just see if there's a dir there
          // already. If so, then hooray!  If not, then something is borked.
          let stat;
          try {
            stat = xfs.statSync(p);
          } catch (err1) {
            throw err0
          }
          if (!stat.isDirectory()) throw err0
        }
      }

      return made
    }

    var mkdirsSync_1 = mkdirsSync;

    const u = universalify.fromCallback;
    const mkdirs$1 = u(mkdirs_1);


    var mkdirs_1$1 = {
      mkdirs: mkdirs$1,
      mkdirsSync: mkdirsSync_1,
      // alias
      mkdirp: mkdirs$1,
      mkdirpSync: mkdirsSync_1,
      ensureDir: mkdirs$1,
      ensureDirSync: mkdirsSync_1
    };

    // HFS, ext{2,3}, FAT do not, Node.js v0.10 does not
    function hasMillisResSync () {
      let tmpfile = path.join('millis-test-sync' + Date.now().toString() + Math.random().toString().slice(2));
      tmpfile = path.join(os.tmpdir(), tmpfile);

      // 550 millis past UNIX epoch
      const d = new Date(1435410243862);
      gracefulFs.writeFileSync(tmpfile, 'https://github.com/jprichardson/node-fs-extra/pull/141');
      const fd = gracefulFs.openSync(tmpfile, 'r+');
      gracefulFs.futimesSync(fd, d, d);
      gracefulFs.closeSync(fd);
      return gracefulFs.statSync(tmpfile).mtime > 1435410243000
    }

    function hasMillisRes (callback) {
      let tmpfile = path.join('millis-test' + Date.now().toString() + Math.random().toString().slice(2));
      tmpfile = path.join(os.tmpdir(), tmpfile);

      // 550 millis past UNIX epoch
      const d = new Date(1435410243862);
      gracefulFs.writeFile(tmpfile, 'https://github.com/jprichardson/node-fs-extra/pull/141', err => {
        if (err) return callback(err)
        gracefulFs.open(tmpfile, 'r+', (err, fd) => {
          if (err) return callback(err)
          gracefulFs.futimes(fd, d, d, err => {
            if (err) return callback(err)
            gracefulFs.close(fd, err => {
              if (err) return callback(err)
              gracefulFs.stat(tmpfile, (err, stats) => {
                if (err) return callback(err)
                callback(null, stats.mtime > 1435410243000);
              });
            });
          });
        });
      });
    }

    function timeRemoveMillis (timestamp) {
      if (typeof timestamp === 'number') {
        return Math.floor(timestamp / 1000) * 1000
      } else if (timestamp instanceof Date) {
        return new Date(Math.floor(timestamp.getTime() / 1000) * 1000)
      } else {
        throw new Error('fs-extra: timeRemoveMillis() unknown parameter type')
      }
    }

    function utimesMillis (path$$1, atime, mtime, callback) {
      // if (!HAS_MILLIS_RES) return fs.utimes(path, atime, mtime, callback)
      gracefulFs.open(path$$1, 'r+', (err, fd) => {
        if (err) return callback(err)
        gracefulFs.futimes(fd, atime, mtime, futimesErr => {
          gracefulFs.close(fd, closeErr => {
            if (callback) callback(futimesErr || closeErr);
          });
        });
      });
    }

    function utimesMillisSync (path$$1, atime, mtime) {
      const fd = gracefulFs.openSync(path$$1, 'r+');
      gracefulFs.futimesSync(fd, atime, mtime);
      return gracefulFs.closeSync(fd)
    }

    var utimes = {
      hasMillisRes,
      hasMillisResSync,
      timeRemoveMillis,
      utimesMillis,
      utimesMillisSync
    };

    const NODE_VERSION_MAJOR_WITH_BIGINT = 10;
    const NODE_VERSION_MINOR_WITH_BIGINT = 5;
    const NODE_VERSION_PATCH_WITH_BIGINT = 0;
    const nodeVersion = process.versions.node.split('.');
    const nodeVersionMajor = Number.parseInt(nodeVersion[0], 10);
    const nodeVersionMinor = Number.parseInt(nodeVersion[1], 10);
    const nodeVersionPatch = Number.parseInt(nodeVersion[2], 10);

    function nodeSupportsBigInt () {
      if (nodeVersionMajor > NODE_VERSION_MAJOR_WITH_BIGINT) {
        return true
      } else if (nodeVersionMajor === NODE_VERSION_MAJOR_WITH_BIGINT) {
        if (nodeVersionMinor > NODE_VERSION_MINOR_WITH_BIGINT) {
          return true
        } else if (nodeVersionMinor === NODE_VERSION_MINOR_WITH_BIGINT) {
          if (nodeVersionPatch >= NODE_VERSION_PATCH_WITH_BIGINT) {
            return true
          }
        }
      }
      return false
    }

    function getStats (src, dest, cb) {
      if (nodeSupportsBigInt()) {
        gracefulFs.stat(src, { bigint: true }, (err, srcStat) => {
          if (err) return cb(err)
          gracefulFs.stat(dest, { bigint: true }, (err, destStat) => {
            if (err) {
              if (err.code === 'ENOENT') return cb(null, { srcStat, destStat: null })
              return cb(err)
            }
            return cb(null, { srcStat, destStat })
          });
        });
      } else {
        gracefulFs.stat(src, (err, srcStat) => {
          if (err) return cb(err)
          gracefulFs.stat(dest, (err, destStat) => {
            if (err) {
              if (err.code === 'ENOENT') return cb(null, { srcStat, destStat: null })
              return cb(err)
            }
            return cb(null, { srcStat, destStat })
          });
        });
      }
    }

    function getStatsSync (src, dest) {
      let srcStat, destStat;
      if (nodeSupportsBigInt()) {
        srcStat = gracefulFs.statSync(src, { bigint: true });
      } else {
        srcStat = gracefulFs.statSync(src);
      }
      try {
        if (nodeSupportsBigInt()) {
          destStat = gracefulFs.statSync(dest, { bigint: true });
        } else {
          destStat = gracefulFs.statSync(dest);
        }
      } catch (err) {
        if (err.code === 'ENOENT') return { srcStat, destStat: null }
        throw err
      }
      return { srcStat, destStat }
    }

    function checkPaths (src, dest, funcName, cb) {
      getStats(src, dest, (err, stats) => {
        if (err) return cb(err)
        const { srcStat, destStat } = stats;
        if (destStat && destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {
          return cb(new Error('Source and destination must not be the same.'))
        }
        if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
          return cb(new Error(errMsg(src, dest, funcName)))
        }
        return cb(null, { srcStat, destStat })
      });
    }

    function checkPathsSync (src, dest, funcName) {
      const { srcStat, destStat } = getStatsSync(src, dest);
      if (destStat && destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {
        throw new Error('Source and destination must not be the same.')
      }
      if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
        throw new Error(errMsg(src, dest, funcName))
      }
      return { srcStat, destStat }
    }

    // recursively check if dest parent is a subdirectory of src.
    // It works for all file types including symlinks since it
    // checks the src and dest inodes. It starts from the deepest
    // parent and stops once it reaches the src parent or the root path.
    function checkParentPaths (src, srcStat, dest, funcName, cb) {
      const srcParent = path.resolve(path.dirname(src));
      const destParent = path.resolve(path.dirname(dest));
      if (destParent === srcParent || destParent === path.parse(destParent).root) return cb()
      if (nodeSupportsBigInt()) {
        gracefulFs.stat(destParent, { bigint: true }, (err, destStat) => {
          if (err) {
            if (err.code === 'ENOENT') return cb()
            return cb(err)
          }
          if (destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {
            return cb(new Error(errMsg(src, dest, funcName)))
          }
          return checkParentPaths(src, srcStat, destParent, funcName, cb)
        });
      } else {
        gracefulFs.stat(destParent, (err, destStat) => {
          if (err) {
            if (err.code === 'ENOENT') return cb()
            return cb(err)
          }
          if (destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {
            return cb(new Error(errMsg(src, dest, funcName)))
          }
          return checkParentPaths(src, srcStat, destParent, funcName, cb)
        });
      }
    }

    function checkParentPathsSync (src, srcStat, dest, funcName) {
      const srcParent = path.resolve(path.dirname(src));
      const destParent = path.resolve(path.dirname(dest));
      if (destParent === srcParent || destParent === path.parse(destParent).root) return
      let destStat;
      try {
        if (nodeSupportsBigInt()) {
          destStat = gracefulFs.statSync(destParent, { bigint: true });
        } else {
          destStat = gracefulFs.statSync(destParent);
        }
      } catch (err) {
        if (err.code === 'ENOENT') return
        throw err
      }
      if (destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev) {
        throw new Error(errMsg(src, dest, funcName))
      }
      return checkParentPathsSync(src, srcStat, destParent, funcName)
    }

    // return true if dest is a subdir of src, otherwise false.
    // It only checks the path strings.
    function isSrcSubdir (src, dest) {
      const srcArr = path.resolve(src).split(path.sep).filter(i => i);
      const destArr = path.resolve(dest).split(path.sep).filter(i => i);
      return srcArr.reduce((acc, cur, i) => acc && destArr[i] === cur, true)
    }

    function errMsg (src, dest, funcName) {
      return `Cannot ${funcName} '${src}' to a subdirectory of itself, '${dest}'.`
    }

    var stat = {
      checkPaths,
      checkPathsSync,
      checkParentPaths,
      checkParentPathsSync,
      isSrcSubdir
    };

    /* eslint-disable node/no-deprecated-api */
    var buffer = function (size) {
      if (typeof Buffer.allocUnsafe === 'function') {
        try {
          return Buffer.allocUnsafe(size)
        } catch (e) {
          return new Buffer(size)
        }
      }
      return new Buffer(size)
    };

    const mkdirpSync = mkdirs_1$1.mkdirsSync;
    const utimesSync = utimes.utimesMillisSync;


    function copySync (src, dest, opts) {
      if (typeof opts === 'function') {
        opts = { filter: opts };
      }

      opts = opts || {};
      opts.clobber = 'clobber' in opts ? !!opts.clobber : true; // default to true for now
      opts.overwrite = 'overwrite' in opts ? !!opts.overwrite : opts.clobber; // overwrite falls back to clobber

      // Warn about using preserveTimestamps on 32-bit node
      if (opts.preserveTimestamps && process.arch === 'ia32') {
        console.warn(`fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;\n
    see https://github.com/jprichardson/node-fs-extra/issues/269`);
      }

      const { srcStat, destStat } = stat.checkPathsSync(src, dest, 'copy');
      stat.checkParentPathsSync(src, srcStat, dest, 'copy');
      return handleFilterAndCopy(destStat, src, dest, opts)
    }

    function handleFilterAndCopy (destStat, src, dest, opts) {
      if (opts.filter && !opts.filter(src, dest)) return
      const destParent = path.dirname(dest);
      if (!gracefulFs.existsSync(destParent)) mkdirpSync(destParent);
      return startCopy(destStat, src, dest, opts)
    }

    function startCopy (destStat, src, dest, opts) {
      if (opts.filter && !opts.filter(src, dest)) return
      return getStats$1(destStat, src, dest, opts)
    }

    function getStats$1 (destStat, src, dest, opts) {
      const statSync = opts.dereference ? gracefulFs.statSync : gracefulFs.lstatSync;
      const srcStat = statSync(src);

      if (srcStat.isDirectory()) return onDir(srcStat, destStat, src, dest, opts)
      else if (srcStat.isFile() ||
               srcStat.isCharacterDevice() ||
               srcStat.isBlockDevice()) return onFile(srcStat, destStat, src, dest, opts)
      else if (srcStat.isSymbolicLink()) return onLink(destStat, src, dest, opts)
    }

    function onFile (srcStat, destStat, src, dest, opts) {
      if (!destStat) return copyFile(srcStat, src, dest, opts)
      return mayCopyFile(srcStat, src, dest, opts)
    }

    function mayCopyFile (srcStat, src, dest, opts) {
      if (opts.overwrite) {
        gracefulFs.unlinkSync(dest);
        return copyFile(srcStat, src, dest, opts)
      } else if (opts.errorOnExist) {
        throw new Error(`'${dest}' already exists`)
      }
    }

    function copyFile (srcStat, src, dest, opts) {
      if (typeof gracefulFs.copyFileSync === 'function') {
        gracefulFs.copyFileSync(src, dest);
        gracefulFs.chmodSync(dest, srcStat.mode);
        if (opts.preserveTimestamps) {
          return utimesSync(dest, srcStat.atime, srcStat.mtime)
        }
        return
      }
      return copyFileFallback(srcStat, src, dest, opts)
    }

    function copyFileFallback (srcStat, src, dest, opts) {
      const BUF_LENGTH = 64 * 1024;
      const _buff = buffer(BUF_LENGTH);

      const fdr = gracefulFs.openSync(src, 'r');
      const fdw = gracefulFs.openSync(dest, 'w', srcStat.mode);
      let pos = 0;

      while (pos < srcStat.size) {
        const bytesRead = gracefulFs.readSync(fdr, _buff, 0, BUF_LENGTH, pos);
        gracefulFs.writeSync(fdw, _buff, 0, bytesRead);
        pos += bytesRead;
      }

      if (opts.preserveTimestamps) gracefulFs.futimesSync(fdw, srcStat.atime, srcStat.mtime);

      gracefulFs.closeSync(fdr);
      gracefulFs.closeSync(fdw);
    }

    function onDir (srcStat, destStat, src, dest, opts) {
      if (!destStat) return mkDirAndCopy(srcStat, src, dest, opts)
      if (destStat && !destStat.isDirectory()) {
        throw new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`)
      }
      return copyDir(src, dest, opts)
    }

    function mkDirAndCopy (srcStat, src, dest, opts) {
      gracefulFs.mkdirSync(dest);
      copyDir(src, dest, opts);
      return gracefulFs.chmodSync(dest, srcStat.mode)
    }

    function copyDir (src, dest, opts) {
      gracefulFs.readdirSync(src).forEach(item => copyDirItem(item, src, dest, opts));
    }

    function copyDirItem (item, src, dest, opts) {
      const srcItem = path.join(src, item);
      const destItem = path.join(dest, item);
      const { destStat } = stat.checkPathsSync(srcItem, destItem, 'copy');
      return startCopy(destStat, srcItem, destItem, opts)
    }

    function onLink (destStat, src, dest, opts) {
      let resolvedSrc = gracefulFs.readlinkSync(src);
      if (opts.dereference) {
        resolvedSrc = path.resolve(process.cwd(), resolvedSrc);
      }

      if (!destStat) {
        return gracefulFs.symlinkSync(resolvedSrc, dest)
      } else {
        let resolvedDest;
        try {
          resolvedDest = gracefulFs.readlinkSync(dest);
        } catch (err) {
          // dest exists and is a regular file or directory,
          // Windows may throw UNKNOWN error. If dest already exists,
          // fs throws error anyway, so no need to guard against it here.
          if (err.code === 'EINVAL' || err.code === 'UNKNOWN') return gracefulFs.symlinkSync(resolvedSrc, dest)
          throw err
        }
        if (opts.dereference) {
          resolvedDest = path.resolve(process.cwd(), resolvedDest);
        }
        if (stat.isSrcSubdir(resolvedSrc, resolvedDest)) {
          throw new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`)
        }

        // prevent copy if src is a subdir of dest since unlinking
        // dest in this case would result in removing src contents
        // and therefore a broken symlink would be created.
        if (gracefulFs.statSync(dest).isDirectory() && stat.isSrcSubdir(resolvedDest, resolvedSrc)) {
          throw new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`)
        }
        return copyLink(resolvedSrc, dest)
      }
    }

    function copyLink (resolvedSrc, dest) {
      gracefulFs.unlinkSync(dest);
      return gracefulFs.symlinkSync(resolvedSrc, dest)
    }

    var copySync_1 = copySync;

    var copySync$1 = {
      copySync: copySync_1
    };

    const u$1 = universalify.fromPromise;


    function pathExists (path$$1) {
      return fs_1.access(path$$1).then(() => true).catch(() => false)
    }

    var pathExists_1 = {
      pathExists: u$1(pathExists),
      pathExistsSync: fs_1.existsSync
    };

    const mkdirp = mkdirs_1$1.mkdirs;
    const pathExists$1 = pathExists_1.pathExists;
    const utimes$1 = utimes.utimesMillis;


    function copy (src, dest, opts, cb) {
      if (typeof opts === 'function' && !cb) {
        cb = opts;
        opts = {};
      } else if (typeof opts === 'function') {
        opts = { filter: opts };
      }

      cb = cb || function () {};
      opts = opts || {};

      opts.clobber = 'clobber' in opts ? !!opts.clobber : true; // default to true for now
      opts.overwrite = 'overwrite' in opts ? !!opts.overwrite : opts.clobber; // overwrite falls back to clobber

      // Warn about using preserveTimestamps on 32-bit node
      if (opts.preserveTimestamps && process.arch === 'ia32') {
        console.warn(`fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;\n
    see https://github.com/jprichardson/node-fs-extra/issues/269`);
      }

      stat.checkPaths(src, dest, 'copy', (err, stats) => {
        if (err) return cb(err)
        const { srcStat, destStat } = stats;
        stat.checkParentPaths(src, srcStat, dest, 'copy', err => {
          if (err) return cb(err)
          if (opts.filter) return handleFilter(checkParentDir, destStat, src, dest, opts, cb)
          return checkParentDir(destStat, src, dest, opts, cb)
        });
      });
    }

    function checkParentDir (destStat, src, dest, opts, cb) {
      const destParent = path.dirname(dest);
      pathExists$1(destParent, (err, dirExists) => {
        if (err) return cb(err)
        if (dirExists) return startCopy$1(destStat, src, dest, opts, cb)
        mkdirp(destParent, err => {
          if (err) return cb(err)
          return startCopy$1(destStat, src, dest, opts, cb)
        });
      });
    }

    function handleFilter (onInclude, destStat, src, dest, opts, cb) {
      Promise.resolve(opts.filter(src, dest)).then(include => {
        if (include) return onInclude(destStat, src, dest, opts, cb)
        return cb()
      }, error => cb(error));
    }

    function startCopy$1 (destStat, src, dest, opts, cb) {
      if (opts.filter) return handleFilter(getStats$2, destStat, src, dest, opts, cb)
      return getStats$2(destStat, src, dest, opts, cb)
    }

    function getStats$2 (destStat, src, dest, opts, cb) {
      const stat$$1 = opts.dereference ? gracefulFs.stat : gracefulFs.lstat;
      stat$$1(src, (err, srcStat) => {
        if (err) return cb(err)

        if (srcStat.isDirectory()) return onDir$1(srcStat, destStat, src, dest, opts, cb)
        else if (srcStat.isFile() ||
                 srcStat.isCharacterDevice() ||
                 srcStat.isBlockDevice()) return onFile$1(srcStat, destStat, src, dest, opts, cb)
        else if (srcStat.isSymbolicLink()) return onLink$1(destStat, src, dest, opts, cb)
      });
    }

    function onFile$1 (srcStat, destStat, src, dest, opts, cb) {
      if (!destStat) return copyFile$1(srcStat, src, dest, opts, cb)
      return mayCopyFile$1(srcStat, src, dest, opts, cb)
    }

    function mayCopyFile$1 (srcStat, src, dest, opts, cb) {
      if (opts.overwrite) {
        gracefulFs.unlink(dest, err => {
          if (err) return cb(err)
          return copyFile$1(srcStat, src, dest, opts, cb)
        });
      } else if (opts.errorOnExist) {
        return cb(new Error(`'${dest}' already exists`))
      } else return cb()
    }

    function copyFile$1 (srcStat, src, dest, opts, cb) {
      if (typeof gracefulFs.copyFile === 'function') {
        return gracefulFs.copyFile(src, dest, err => {
          if (err) return cb(err)
          return setDestModeAndTimestamps(srcStat, dest, opts, cb)
        })
      }
      return copyFileFallback$1(srcStat, src, dest, opts, cb)
    }

    function copyFileFallback$1 (srcStat, src, dest, opts, cb) {
      const rs = gracefulFs.createReadStream(src);
      rs.on('error', err => cb(err)).once('open', () => {
        const ws = gracefulFs.createWriteStream(dest, { mode: srcStat.mode });
        ws.on('error', err => cb(err))
          .on('open', () => rs.pipe(ws))
          .once('close', () => setDestModeAndTimestamps(srcStat, dest, opts, cb));
      });
    }

    function setDestModeAndTimestamps (srcStat, dest, opts, cb) {
      gracefulFs.chmod(dest, srcStat.mode, err => {
        if (err) return cb(err)
        if (opts.preserveTimestamps) {
          return utimes$1(dest, srcStat.atime, srcStat.mtime, cb)
        }
        return cb()
      });
    }

    function onDir$1 (srcStat, destStat, src, dest, opts, cb) {
      if (!destStat) return mkDirAndCopy$1(srcStat, src, dest, opts, cb)
      if (destStat && !destStat.isDirectory()) {
        return cb(new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`))
      }
      return copyDir$1(src, dest, opts, cb)
    }

    function mkDirAndCopy$1 (srcStat, src, dest, opts, cb) {
      gracefulFs.mkdir(dest, err => {
        if (err) return cb(err)
        copyDir$1(src, dest, opts, err => {
          if (err) return cb(err)
          return gracefulFs.chmod(dest, srcStat.mode, cb)
        });
      });
    }

    function copyDir$1 (src, dest, opts, cb) {
      gracefulFs.readdir(src, (err, items) => {
        if (err) return cb(err)
        return copyDirItems(items, src, dest, opts, cb)
      });
    }

    function copyDirItems (items, src, dest, opts, cb) {
      const item = items.pop();
      if (!item) return cb()
      return copyDirItem$1(items, item, src, dest, opts, cb)
    }

    function copyDirItem$1 (items, item, src, dest, opts, cb) {
      const srcItem = path.join(src, item);
      const destItem = path.join(dest, item);
      stat.checkPaths(srcItem, destItem, 'copy', (err, stats) => {
        if (err) return cb(err)
        const { destStat } = stats;
        startCopy$1(destStat, srcItem, destItem, opts, err => {
          if (err) return cb(err)
          return copyDirItems(items, src, dest, opts, cb)
        });
      });
    }

    function onLink$1 (destStat, src, dest, opts, cb) {
      gracefulFs.readlink(src, (err, resolvedSrc) => {
        if (err) return cb(err)
        if (opts.dereference) {
          resolvedSrc = path.resolve(process.cwd(), resolvedSrc);
        }

        if (!destStat) {
          return gracefulFs.symlink(resolvedSrc, dest, cb)
        } else {
          gracefulFs.readlink(dest, (err, resolvedDest) => {
            if (err) {
              // dest exists and is a regular file or directory,
              // Windows may throw UNKNOWN error. If dest already exists,
              // fs throws error anyway, so no need to guard against it here.
              if (err.code === 'EINVAL' || err.code === 'UNKNOWN') return gracefulFs.symlink(resolvedSrc, dest, cb)
              return cb(err)
            }
            if (opts.dereference) {
              resolvedDest = path.resolve(process.cwd(), resolvedDest);
            }
            if (stat.isSrcSubdir(resolvedSrc, resolvedDest)) {
              return cb(new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`))
            }

            // do not copy if src is a subdir of dest since unlinking
            // dest in this case would result in removing src contents
            // and therefore a broken symlink would be created.
            if (destStat.isDirectory() && stat.isSrcSubdir(resolvedDest, resolvedSrc)) {
              return cb(new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`))
            }
            return copyLink$1(resolvedSrc, dest, cb)
          });
        }
      });
    }

    function copyLink$1 (resolvedSrc, dest, cb) {
      gracefulFs.unlink(dest, err => {
        if (err) return cb(err)
        return gracefulFs.symlink(resolvedSrc, dest, cb)
      });
    }

    var copy_1 = copy;

    const u$2 = universalify.fromCallback;
    var copy$1 = {
      copy: u$2(copy_1)
    };

    const isWindows = (process.platform === 'win32');

    function defaults (options) {
      const methods = [
        'unlink',
        'chmod',
        'stat',
        'lstat',
        'rmdir',
        'readdir'
      ];
      methods.forEach(m => {
        options[m] = options[m] || gracefulFs[m];
        m = m + 'Sync';
        options[m] = options[m] || gracefulFs[m];
      });

      options.maxBusyTries = options.maxBusyTries || 3;
    }

    function rimraf (p, options, cb) {
      let busyTries = 0;

      if (typeof options === 'function') {
        cb = options;
        options = {};
      }

      assert(p, 'rimraf: missing path');
      assert.strictEqual(typeof p, 'string', 'rimraf: path should be a string');
      assert.strictEqual(typeof cb, 'function', 'rimraf: callback function required');
      assert(options, 'rimraf: invalid options argument provided');
      assert.strictEqual(typeof options, 'object', 'rimraf: options should be object');

      defaults(options);

      rimraf_(p, options, function CB (er) {
        if (er) {
          if ((er.code === 'EBUSY' || er.code === 'ENOTEMPTY' || er.code === 'EPERM') &&
              busyTries < options.maxBusyTries) {
            busyTries++;
            const time = busyTries * 100;
            // try again, with the same exact callback as this one.
            return setTimeout(() => rimraf_(p, options, CB), time)
          }

          // already gone
          if (er.code === 'ENOENT') er = null;
        }

        cb(er);
      });
    }

    // Two possible strategies.
    // 1. Assume it's a file.  unlink it, then do the dir stuff on EPERM or EISDIR
    // 2. Assume it's a directory.  readdir, then do the file stuff on ENOTDIR
    //
    // Both result in an extra syscall when you guess wrong.  However, there
    // are likely far more normal files in the world than directories.  This
    // is based on the assumption that a the average number of files per
    // directory is >= 1.
    //
    // If anyone ever complains about this, then I guess the strategy could
    // be made configurable somehow.  But until then, YAGNI.
    function rimraf_ (p, options, cb) {
      assert(p);
      assert(options);
      assert(typeof cb === 'function');

      // sunos lets the root user unlink directories, which is... weird.
      // so we have to lstat here and make sure it's not a dir.
      options.lstat(p, (er, st) => {
        if (er && er.code === 'ENOENT') {
          return cb(null)
        }

        // Windows can EPERM on stat.  Life is suffering.
        if (er && er.code === 'EPERM' && isWindows) {
          return fixWinEPERM(p, options, er, cb)
        }

        if (st && st.isDirectory()) {
          return rmdir(p, options, er, cb)
        }

        options.unlink(p, er => {
          if (er) {
            if (er.code === 'ENOENT') {
              return cb(null)
            }
            if (er.code === 'EPERM') {
              return (isWindows)
                ? fixWinEPERM(p, options, er, cb)
                : rmdir(p, options, er, cb)
            }
            if (er.code === 'EISDIR') {
              return rmdir(p, options, er, cb)
            }
          }
          return cb(er)
        });
      });
    }

    function fixWinEPERM (p, options, er, cb) {
      assert(p);
      assert(options);
      assert(typeof cb === 'function');
      if (er) {
        assert(er instanceof Error);
      }

      options.chmod(p, 0o666, er2 => {
        if (er2) {
          cb(er2.code === 'ENOENT' ? null : er);
        } else {
          options.stat(p, (er3, stats) => {
            if (er3) {
              cb(er3.code === 'ENOENT' ? null : er);
            } else if (stats.isDirectory()) {
              rmdir(p, options, er, cb);
            } else {
              options.unlink(p, cb);
            }
          });
        }
      });
    }

    function fixWinEPERMSync (p, options, er) {
      let stats;

      assert(p);
      assert(options);
      if (er) {
        assert(er instanceof Error);
      }

      try {
        options.chmodSync(p, 0o666);
      } catch (er2) {
        if (er2.code === 'ENOENT') {
          return
        } else {
          throw er
        }
      }

      try {
        stats = options.statSync(p);
      } catch (er3) {
        if (er3.code === 'ENOENT') {
          return
        } else {
          throw er
        }
      }

      if (stats.isDirectory()) {
        rmdirSync(p, options, er);
      } else {
        options.unlinkSync(p);
      }
    }

    function rmdir (p, options, originalEr, cb) {
      assert(p);
      assert(options);
      if (originalEr) {
        assert(originalEr instanceof Error);
      }
      assert(typeof cb === 'function');

      // try to rmdir first, and only readdir on ENOTEMPTY or EEXIST (SunOS)
      // if we guessed wrong, and it's not a directory, then
      // raise the original error.
      options.rmdir(p, er => {
        if (er && (er.code === 'ENOTEMPTY' || er.code === 'EEXIST' || er.code === 'EPERM')) {
          rmkids(p, options, cb);
        } else if (er && er.code === 'ENOTDIR') {
          cb(originalEr);
        } else {
          cb(er);
        }
      });
    }

    function rmkids (p, options, cb) {
      assert(p);
      assert(options);
      assert(typeof cb === 'function');

      options.readdir(p, (er, files) => {
        if (er) return cb(er)

        let n = files.length;
        let errState;

        if (n === 0) return options.rmdir(p, cb)

        files.forEach(f => {
          rimraf(path.join(p, f), options, er => {
            if (errState) {
              return
            }
            if (er) return cb(errState = er)
            if (--n === 0) {
              options.rmdir(p, cb);
            }
          });
        });
      });
    }

    // this looks simpler, and is strictly *faster*, but will
    // tie up the JavaScript thread and fail on excessively
    // deep directory trees.
    function rimrafSync (p, options) {
      let st;

      options = options || {};
      defaults(options);

      assert(p, 'rimraf: missing path');
      assert.strictEqual(typeof p, 'string', 'rimraf: path should be a string');
      assert(options, 'rimraf: missing options');
      assert.strictEqual(typeof options, 'object', 'rimraf: options should be object');

      try {
        st = options.lstatSync(p);
      } catch (er) {
        if (er.code === 'ENOENT') {
          return
        }

        // Windows can EPERM on stat.  Life is suffering.
        if (er.code === 'EPERM' && isWindows) {
          fixWinEPERMSync(p, options, er);
        }
      }

      try {
        // sunos lets the root user unlink directories, which is... weird.
        if (st && st.isDirectory()) {
          rmdirSync(p, options, null);
        } else {
          options.unlinkSync(p);
        }
      } catch (er) {
        if (er.code === 'ENOENT') {
          return
        } else if (er.code === 'EPERM') {
          return isWindows ? fixWinEPERMSync(p, options, er) : rmdirSync(p, options, er)
        } else if (er.code !== 'EISDIR') {
          throw er
        }
        rmdirSync(p, options, er);
      }
    }

    function rmdirSync (p, options, originalEr) {
      assert(p);
      assert(options);
      if (originalEr) {
        assert(originalEr instanceof Error);
      }

      try {
        options.rmdirSync(p);
      } catch (er) {
        if (er.code === 'ENOTDIR') {
          throw originalEr
        } else if (er.code === 'ENOTEMPTY' || er.code === 'EEXIST' || er.code === 'EPERM') {
          rmkidsSync(p, options);
        } else if (er.code !== 'ENOENT') {
          throw er
        }
      }
    }

    function rmkidsSync (p, options) {
      assert(p);
      assert(options);
      options.readdirSync(p).forEach(f => rimrafSync(path.join(p, f), options));

      if (isWindows) {
        // We only end up here once we got ENOTEMPTY at least once, and
        // at this point, we are guaranteed to have removed all the kids.
        // So, we know that it won't be ENOENT or ENOTDIR or anything else.
        // try really hard to delete stuff on windows, because it has a
        // PROFOUNDLY annoying habit of not closing handles promptly when
        // files are deleted, resulting in spurious ENOTEMPTY errors.
        const startTime = Date.now();
        do {
          try {
            const ret = options.rmdirSync(p, options);
            return ret
          } catch (er) { }
        } while (Date.now() - startTime < 500) // give up after 500ms
      } else {
        const ret = options.rmdirSync(p, options);
        return ret
      }
    }

    var rimraf_1 = rimraf;
    rimraf.sync = rimrafSync;

    const u$3 = universalify.fromCallback;


    var remove = {
      remove: u$3(rimraf_1),
      removeSync: rimraf_1.sync
    };

    const u$4 = universalify.fromCallback;





    const emptyDir = u$4(function emptyDir (dir, callback) {
      callback = callback || function () {};
      gracefulFs.readdir(dir, (err, items) => {
        if (err) return mkdirs_1$1.mkdirs(dir, callback)

        items = items.map(item => path.join(dir, item));

        deleteItem();

        function deleteItem () {
          const item = items.pop();
          if (!item) return callback()
          remove.remove(item, err => {
            if (err) return callback(err)
            deleteItem();
          });
        }
      });
    });

    function emptyDirSync (dir) {
      let items;
      try {
        items = gracefulFs.readdirSync(dir);
      } catch (err) {
        return mkdirs_1$1.mkdirsSync(dir)
      }

      items.forEach(item => {
        item = path.join(dir, item);
        remove.removeSync(item);
      });
    }

    var empty = {
      emptyDirSync,
      emptydirSync: emptyDirSync,
      emptyDir,
      emptydir: emptyDir
    };

    const u$5 = universalify.fromCallback;



    const pathExists$2 = pathExists_1.pathExists;

    function createFile (file, callback) {
      function makeFile () {
        gracefulFs.writeFile(file, '', err => {
          if (err) return callback(err)
          callback();
        });
      }

      gracefulFs.stat(file, (err, stats) => { // eslint-disable-line handle-callback-err
        if (!err && stats.isFile()) return callback()
        const dir = path.dirname(file);
        pathExists$2(dir, (err, dirExists) => {
          if (err) return callback(err)
          if (dirExists) return makeFile()
          mkdirs_1$1.mkdirs(dir, err => {
            if (err) return callback(err)
            makeFile();
          });
        });
      });
    }

    function createFileSync (file) {
      let stats;
      try {
        stats = gracefulFs.statSync(file);
      } catch (e) {}
      if (stats && stats.isFile()) return

      const dir = path.dirname(file);
      if (!gracefulFs.existsSync(dir)) {
        mkdirs_1$1.mkdirsSync(dir);
      }

      gracefulFs.writeFileSync(file, '');
    }

    var file = {
      createFile: u$5(createFile),
      createFileSync
    };

    const u$6 = universalify.fromCallback;



    const pathExists$3 = pathExists_1.pathExists;

    function createLink (srcpath, dstpath, callback) {
      function makeLink (srcpath, dstpath) {
        gracefulFs.link(srcpath, dstpath, err => {
          if (err) return callback(err)
          callback(null);
        });
      }

      pathExists$3(dstpath, (err, destinationExists) => {
        if (err) return callback(err)
        if (destinationExists) return callback(null)
        gracefulFs.lstat(srcpath, (err) => {
          if (err) {
            err.message = err.message.replace('lstat', 'ensureLink');
            return callback(err)
          }

          const dir = path.dirname(dstpath);
          pathExists$3(dir, (err, dirExists) => {
            if (err) return callback(err)
            if (dirExists) return makeLink(srcpath, dstpath)
            mkdirs_1$1.mkdirs(dir, err => {
              if (err) return callback(err)
              makeLink(srcpath, dstpath);
            });
          });
        });
      });
    }

    function createLinkSync (srcpath, dstpath) {
      const destinationExists = gracefulFs.existsSync(dstpath);
      if (destinationExists) return undefined

      try {
        gracefulFs.lstatSync(srcpath);
      } catch (err) {
        err.message = err.message.replace('lstat', 'ensureLink');
        throw err
      }

      const dir = path.dirname(dstpath);
      const dirExists = gracefulFs.existsSync(dir);
      if (dirExists) return gracefulFs.linkSync(srcpath, dstpath)
      mkdirs_1$1.mkdirsSync(dir);

      return gracefulFs.linkSync(srcpath, dstpath)
    }

    var link = {
      createLink: u$6(createLink),
      createLinkSync
    };

    const pathExists$4 = pathExists_1.pathExists;

    /**
     * Function that returns two types of paths, one relative to symlink, and one
     * relative to the current working directory. Checks if path is absolute or
     * relative. If the path is relative, this function checks if the path is
     * relative to symlink or relative to current working directory. This is an
     * initiative to find a smarter `srcpath` to supply when building symlinks.
     * This allows you to determine which path to use out of one of three possible
     * types of source paths. The first is an absolute path. This is detected by
     * `path.isAbsolute()`. When an absolute path is provided, it is checked to
     * see if it exists. If it does it's used, if not an error is returned
     * (callback)/ thrown (sync). The other two options for `srcpath` are a
     * relative url. By default Node's `fs.symlink` works by creating a symlink
     * using `dstpath` and expects the `srcpath` to be relative to the newly
     * created symlink. If you provide a `srcpath` that does not exist on the file
     * system it results in a broken symlink. To minimize this, the function
     * checks to see if the 'relative to symlink' source file exists, and if it
     * does it will use it. If it does not, it checks if there's a file that
     * exists that is relative to the current working directory, if does its used.
     * This preserves the expectations of the original fs.symlink spec and adds
     * the ability to pass in `relative to current working direcotry` paths.
     */

    function symlinkPaths (srcpath, dstpath, callback) {
      if (path.isAbsolute(srcpath)) {
        return gracefulFs.lstat(srcpath, (err) => {
          if (err) {
            err.message = err.message.replace('lstat', 'ensureSymlink');
            return callback(err)
          }
          return callback(null, {
            'toCwd': srcpath,
            'toDst': srcpath
          })
        })
      } else {
        const dstdir = path.dirname(dstpath);
        const relativeToDst = path.join(dstdir, srcpath);
        return pathExists$4(relativeToDst, (err, exists) => {
          if (err) return callback(err)
          if (exists) {
            return callback(null, {
              'toCwd': relativeToDst,
              'toDst': srcpath
            })
          } else {
            return gracefulFs.lstat(srcpath, (err) => {
              if (err) {
                err.message = err.message.replace('lstat', 'ensureSymlink');
                return callback(err)
              }
              return callback(null, {
                'toCwd': srcpath,
                'toDst': path.relative(dstdir, srcpath)
              })
            })
          }
        })
      }
    }

    function symlinkPathsSync (srcpath, dstpath) {
      let exists;
      if (path.isAbsolute(srcpath)) {
        exists = gracefulFs.existsSync(srcpath);
        if (!exists) throw new Error('absolute srcpath does not exist')
        return {
          'toCwd': srcpath,
          'toDst': srcpath
        }
      } else {
        const dstdir = path.dirname(dstpath);
        const relativeToDst = path.join(dstdir, srcpath);
        exists = gracefulFs.existsSync(relativeToDst);
        if (exists) {
          return {
            'toCwd': relativeToDst,
            'toDst': srcpath
          }
        } else {
          exists = gracefulFs.existsSync(srcpath);
          if (!exists) throw new Error('relative srcpath does not exist')
          return {
            'toCwd': srcpath,
            'toDst': path.relative(dstdir, srcpath)
          }
        }
      }
    }

    var symlinkPaths_1 = {
      symlinkPaths,
      symlinkPathsSync
    };

    function symlinkType (srcpath, type, callback) {
      callback = (typeof type === 'function') ? type : callback;
      type = (typeof type === 'function') ? false : type;
      if (type) return callback(null, type)
      gracefulFs.lstat(srcpath, (err, stats) => {
        if (err) return callback(null, 'file')
        type = (stats && stats.isDirectory()) ? 'dir' : 'file';
        callback(null, type);
      });
    }

    function symlinkTypeSync (srcpath, type) {
      let stats;

      if (type) return type
      try {
        stats = gracefulFs.lstatSync(srcpath);
      } catch (e) {
        return 'file'
      }
      return (stats && stats.isDirectory()) ? 'dir' : 'file'
    }

    var symlinkType_1 = {
      symlinkType,
      symlinkTypeSync
    };

    const u$7 = universalify.fromCallback;



    const mkdirs$2 = mkdirs_1$1.mkdirs;
    const mkdirsSync$1 = mkdirs_1$1.mkdirsSync;


    const symlinkPaths$1 = symlinkPaths_1.symlinkPaths;
    const symlinkPathsSync$1 = symlinkPaths_1.symlinkPathsSync;


    const symlinkType$1 = symlinkType_1.symlinkType;
    const symlinkTypeSync$1 = symlinkType_1.symlinkTypeSync;

    const pathExists$5 = pathExists_1.pathExists;

    function createSymlink (srcpath, dstpath, type, callback) {
      callback = (typeof type === 'function') ? type : callback;
      type = (typeof type === 'function') ? false : type;

      pathExists$5(dstpath, (err, destinationExists) => {
        if (err) return callback(err)
        if (destinationExists) return callback(null)
        symlinkPaths$1(srcpath, dstpath, (err, relative) => {
          if (err) return callback(err)
          srcpath = relative.toDst;
          symlinkType$1(relative.toCwd, type, (err, type) => {
            if (err) return callback(err)
            const dir = path.dirname(dstpath);
            pathExists$5(dir, (err, dirExists) => {
              if (err) return callback(err)
              if (dirExists) return gracefulFs.symlink(srcpath, dstpath, type, callback)
              mkdirs$2(dir, err => {
                if (err) return callback(err)
                gracefulFs.symlink(srcpath, dstpath, type, callback);
              });
            });
          });
        });
      });
    }

    function createSymlinkSync (srcpath, dstpath, type) {
      const destinationExists = gracefulFs.existsSync(dstpath);
      if (destinationExists) return undefined

      const relative = symlinkPathsSync$1(srcpath, dstpath);
      srcpath = relative.toDst;
      type = symlinkTypeSync$1(relative.toCwd, type);
      const dir = path.dirname(dstpath);
      const exists = gracefulFs.existsSync(dir);
      if (exists) return gracefulFs.symlinkSync(srcpath, dstpath, type)
      mkdirsSync$1(dir);
      return gracefulFs.symlinkSync(srcpath, dstpath, type)
    }

    var symlink = {
      createSymlink: u$7(createSymlink),
      createSymlinkSync
    };

    var ensure = {
      // file
      createFile: file.createFile,
      createFileSync: file.createFileSync,
      ensureFile: file.createFile,
      ensureFileSync: file.createFileSync,
      // link
      createLink: link.createLink,
      createLinkSync: link.createLinkSync,
      ensureLink: link.createLink,
      ensureLinkSync: link.createLinkSync,
      // symlink
      createSymlink: symlink.createSymlink,
      createSymlinkSync: symlink.createSymlinkSync,
      ensureSymlink: symlink.createSymlink,
      ensureSymlinkSync: symlink.createSymlinkSync
    };

    var _fs;
    try {
      _fs = gracefulFs;
    } catch (_) {
      _fs = fs;
    }

    function readFile (file, options, callback) {
      if (callback == null) {
        callback = options;
        options = {};
      }

      if (typeof options === 'string') {
        options = {encoding: options};
      }

      options = options || {};
      var fs$$1 = options.fs || _fs;

      var shouldThrow = true;
      if ('throws' in options) {
        shouldThrow = options.throws;
      }

      fs$$1.readFile(file, options, function (err, data) {
        if (err) return callback(err)

        data = stripBom(data);

        var obj;
        try {
          obj = JSON.parse(data, options ? options.reviver : null);
        } catch (err2) {
          if (shouldThrow) {
            err2.message = file + ': ' + err2.message;
            return callback(err2)
          } else {
            return callback(null, null)
          }
        }

        callback(null, obj);
      });
    }

    function readFileSync (file, options) {
      options = options || {};
      if (typeof options === 'string') {
        options = {encoding: options};
      }

      var fs$$1 = options.fs || _fs;

      var shouldThrow = true;
      if ('throws' in options) {
        shouldThrow = options.throws;
      }

      try {
        var content = fs$$1.readFileSync(file, options);
        content = stripBom(content);
        return JSON.parse(content, options.reviver)
      } catch (err) {
        if (shouldThrow) {
          err.message = file + ': ' + err.message;
          throw err
        } else {
          return null
        }
      }
    }

    function stringify (obj, options) {
      var spaces;
      var EOL = '\n';
      if (typeof options === 'object' && options !== null) {
        if (options.spaces) {
          spaces = options.spaces;
        }
        if (options.EOL) {
          EOL = options.EOL;
        }
      }

      var str = JSON.stringify(obj, options ? options.replacer : null, spaces);

      return str.replace(/\n/g, EOL) + EOL
    }

    function writeFile (file, obj, options, callback) {
      if (callback == null) {
        callback = options;
        options = {};
      }
      options = options || {};
      var fs$$1 = options.fs || _fs;

      var str = '';
      try {
        str = stringify(obj, options);
      } catch (err) {
        // Need to return whether a callback was passed or not
        if (callback) callback(err, null);
        return
      }

      fs$$1.writeFile(file, str, options, callback);
    }

    function writeFileSync (file, obj, options) {
      options = options || {};
      var fs$$1 = options.fs || _fs;

      var str = stringify(obj, options);
      // not sure if fs.writeFileSync returns anything, but just in case
      return fs$$1.writeFileSync(file, str, options)
    }

    function stripBom (content) {
      // we do this because JSON.parse would convert it to a utf8 string if encoding wasn't specified
      if (Buffer.isBuffer(content)) content = content.toString('utf8');
      content = content.replace(/^\uFEFF/, '');
      return content
    }

    var jsonfile = {
      readFile: readFile,
      readFileSync: readFileSync,
      writeFile: writeFile,
      writeFileSync: writeFileSync
    };

    var jsonfile_1 = jsonfile;

    const u$8 = universalify.fromCallback;


    var jsonfile$1 = {
      // jsonfile exports
      readJson: u$8(jsonfile_1.readFile),
      readJsonSync: jsonfile_1.readFileSync,
      writeJson: u$8(jsonfile_1.writeFile),
      writeJsonSync: jsonfile_1.writeFileSync
    };

    const pathExists$6 = pathExists_1.pathExists;


    function outputJson (file, data, options, callback) {
      if (typeof options === 'function') {
        callback = options;
        options = {};
      }

      const dir = path.dirname(file);

      pathExists$6(dir, (err, itDoes) => {
        if (err) return callback(err)
        if (itDoes) return jsonfile$1.writeJson(file, data, options, callback)

        mkdirs_1$1.mkdirs(dir, err => {
          if (err) return callback(err)
          jsonfile$1.writeJson(file, data, options, callback);
        });
      });
    }

    var outputJson_1 = outputJson;

    function outputJsonSync (file, data, options) {
      const dir = path.dirname(file);

      if (!gracefulFs.existsSync(dir)) {
        mkdirs_1$1.mkdirsSync(dir);
      }

      jsonfile$1.writeJsonSync(file, data, options);
    }

    var outputJsonSync_1 = outputJsonSync;

    const u$9 = universalify.fromCallback;


    jsonfile$1.outputJson = u$9(outputJson_1);
    jsonfile$1.outputJsonSync = outputJsonSync_1;
    // aliases
    jsonfile$1.outputJSON = jsonfile$1.outputJson;
    jsonfile$1.outputJSONSync = jsonfile$1.outputJsonSync;
    jsonfile$1.writeJSON = jsonfile$1.writeJson;
    jsonfile$1.writeJSONSync = jsonfile$1.writeJsonSync;
    jsonfile$1.readJSON = jsonfile$1.readJson;
    jsonfile$1.readJSONSync = jsonfile$1.readJsonSync;

    var json = jsonfile$1;

    const copySync$2 = copySync$1.copySync;
    const removeSync = remove.removeSync;
    const mkdirpSync$1 = mkdirs_1$1.mkdirpSync;


    function moveSync (src, dest, opts) {
      opts = opts || {};
      const overwrite = opts.overwrite || opts.clobber || false;

      const { srcStat } = stat.checkPathsSync(src, dest, 'move');
      stat.checkParentPathsSync(src, srcStat, dest, 'move');
      mkdirpSync$1(path.dirname(dest));
      return doRename(src, dest, overwrite)
    }

    function doRename (src, dest, overwrite) {
      if (overwrite) {
        removeSync(dest);
        return rename(src, dest, overwrite)
      }
      if (gracefulFs.existsSync(dest)) throw new Error('dest already exists.')
      return rename(src, dest, overwrite)
    }

    function rename (src, dest, overwrite) {
      try {
        gracefulFs.renameSync(src, dest);
      } catch (err) {
        if (err.code !== 'EXDEV') throw err
        return moveAcrossDevice(src, dest, overwrite)
      }
    }

    function moveAcrossDevice (src, dest, overwrite) {
      const opts = {
        overwrite,
        errorOnExist: true
      };
      copySync$2(src, dest, opts);
      return removeSync(src)
    }

    var moveSync_1 = moveSync;

    var moveSync$1 = {
      moveSync: moveSync_1
    };

    const copy$2 = copy$1.copy;
    const remove$1 = remove.remove;
    const mkdirp$1 = mkdirs_1$1.mkdirp;
    const pathExists$7 = pathExists_1.pathExists;


    function move (src, dest, opts, cb) {
      if (typeof opts === 'function') {
        cb = opts;
        opts = {};
      }

      const overwrite = opts.overwrite || opts.clobber || false;

      stat.checkPaths(src, dest, 'move', (err, stats) => {
        if (err) return cb(err)
        const { srcStat } = stats;
        stat.checkParentPaths(src, srcStat, dest, 'move', err => {
          if (err) return cb(err)
          mkdirp$1(path.dirname(dest), err => {
            if (err) return cb(err)
            return doRename$1(src, dest, overwrite, cb)
          });
        });
      });
    }

    function doRename$1 (src, dest, overwrite, cb) {
      if (overwrite) {
        return remove$1(dest, err => {
          if (err) return cb(err)
          return rename$1(src, dest, overwrite, cb)
        })
      }
      pathExists$7(dest, (err, destExists) => {
        if (err) return cb(err)
        if (destExists) return cb(new Error('dest already exists.'))
        return rename$1(src, dest, overwrite, cb)
      });
    }

    function rename$1 (src, dest, overwrite, cb) {
      gracefulFs.rename(src, dest, err => {
        if (!err) return cb()
        if (err.code !== 'EXDEV') return cb(err)
        return moveAcrossDevice$1(src, dest, overwrite, cb)
      });
    }

    function moveAcrossDevice$1 (src, dest, overwrite, cb) {
      const opts = {
        overwrite,
        errorOnExist: true
      };
      copy$2(src, dest, opts, err => {
        if (err) return cb(err)
        return remove$1(src, cb)
      });
    }

    var move_1 = move;

    const u$a = universalify.fromCallback;
    var move$1 = {
      move: u$a(move_1)
    };

    const u$b = universalify.fromCallback;



    const pathExists$8 = pathExists_1.pathExists;

    function outputFile (file, data, encoding, callback) {
      if (typeof encoding === 'function') {
        callback = encoding;
        encoding = 'utf8';
      }

      const dir = path.dirname(file);
      pathExists$8(dir, (err, itDoes) => {
        if (err) return callback(err)
        if (itDoes) return gracefulFs.writeFile(file, data, encoding, callback)

        mkdirs_1$1.mkdirs(dir, err => {
          if (err) return callback(err)

          gracefulFs.writeFile(file, data, encoding, callback);
        });
      });
    }

    function outputFileSync (file, ...args) {
      const dir = path.dirname(file);
      if (gracefulFs.existsSync(dir)) {
        return gracefulFs.writeFileSync(file, ...args)
      }
      mkdirs_1$1.mkdirsSync(dir);
      gracefulFs.writeFileSync(file, ...args);
    }

    var output = {
      outputFile: u$b(outputFile),
      outputFileSync
    };

    var lib = createCommonjsModule(function (module) {

    module.exports = Object.assign(
      {},
      // Export promiseified graceful-fs:
      fs_1,
      // Export extra methods:
      copySync$1,
      copy$1,
      empty,
      ensure,
      json,
      mkdirs_1$1,
      moveSync$1,
      move$1,
      output,
      pathExists_1,
      remove
    );

    // Export fs.promises as a getter property so that we don't trigger
    // ExperimentalWarning before fs.promises is actually accessed.

    if (Object.getOwnPropertyDescriptor(fs, 'promises')) {
      Object.defineProperty(module.exports, 'promises', {
        get () { return fs.promises }
      });
    }
    });

    var defaults$1 = createCommonjsModule(function (module) {
    function getDefaults() {
      return {
        baseUrl: null,
        breaks: false,
        gfm: true,
        headerIds: true,
        headerPrefix: '',
        highlight: null,
        langPrefix: 'language-',
        mangle: true,
        pedantic: false,
        renderer: null,
        sanitize: false,
        sanitizer: null,
        silent: false,
        smartLists: false,
        smartypants: false,
        xhtml: false
      };
    }

    function changeDefaults(newDefaults) {
      module.exports.defaults = newDefaults;
    }

    module.exports = {
      defaults: getDefaults(),
      getDefaults,
      changeDefaults
    };
    });
    var defaults_1 = defaults$1.defaults;
    var defaults_2 = defaults$1.getDefaults;
    var defaults_3 = defaults$1.changeDefaults;

    /**
     * Helpers
     */
    const escapeTest = /[&<>"']/;
    const escapeReplace = /[&<>"']/g;
    const escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
    const escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;
    const escapeReplacements = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    const getEscapeReplacement = (ch) => escapeReplacements[ch];
    function escape(html, encode) {
      if (encode) {
        if (escapeTest.test(html)) {
          return html.replace(escapeReplace, getEscapeReplacement);
        }
      } else {
        if (escapeTestNoEncode.test(html)) {
          return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
        }
      }

      return html;
    }

    const unescapeTest = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;

    function unescape(html) {
      // explicitly match decimal, hex, and named HTML entities
      return html.replace(unescapeTest, (_, n) => {
        n = n.toLowerCase();
        if (n === 'colon') return ':';
        if (n.charAt(0) === '#') {
          return n.charAt(1) === 'x'
            ? String.fromCharCode(parseInt(n.substring(2), 16))
            : String.fromCharCode(+n.substring(1));
        }
        return '';
      });
    }

    const caret = /(^|[^\[])\^/g;
    function edit(regex, opt) {
      regex = regex.source || regex;
      opt = opt || '';
      const obj = {
        replace: (name, val) => {
          val = val.source || val;
          val = val.replace(caret, '$1');
          regex = regex.replace(name, val);
          return obj;
        },
        getRegex: () => {
          return new RegExp(regex, opt);
        }
      };
      return obj;
    }

    const nonWordAndColonTest = /[^\w:]/g;
    const originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
    function cleanUrl(sanitize, base, href) {
      if (sanitize) {
        let prot;
        try {
          prot = decodeURIComponent(unescape(href))
            .replace(nonWordAndColonTest, '')
            .toLowerCase();
        } catch (e) {
          return null;
        }
        if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) {
          return null;
        }
      }
      if (base && !originIndependentUrl.test(href)) {
        href = resolveUrl(base, href);
      }
      try {
        href = encodeURI(href).replace(/%25/g, '%');
      } catch (e) {
        return null;
      }
      return href;
    }

    const baseUrls = {};
    const justDomain = /^[^:]+:\/*[^/]*$/;
    const protocol = /^([^:]+:)[\s\S]*$/;
    const domain = /^([^:]+:\/*[^/]*)[\s\S]*$/;

    function resolveUrl(base, href) {
      if (!baseUrls[' ' + base]) {
        // we can ignore everything in base after the last slash of its path component,
        // but we might need to add _that_
        // https://tools.ietf.org/html/rfc3986#section-3
        if (justDomain.test(base)) {
          baseUrls[' ' + base] = base + '/';
        } else {
          baseUrls[' ' + base] = rtrim(base, '/', true);
        }
      }
      base = baseUrls[' ' + base];
      const relativeBase = base.indexOf(':') === -1;

      if (href.substring(0, 2) === '//') {
        if (relativeBase) {
          return href;
        }
        return base.replace(protocol, '$1') + href;
      } else if (href.charAt(0) === '/') {
        if (relativeBase) {
          return href;
        }
        return base.replace(domain, '$1') + href;
      } else {
        return base + href;
      }
    }

    const noopTest = { exec: function noopTest() {} };

    function merge(obj) {
      let i = 1,
        target,
        key;

      for (; i < arguments.length; i++) {
        target = arguments[i];
        for (key in target) {
          if (Object.prototype.hasOwnProperty.call(target, key)) {
            obj[key] = target[key];
          }
        }
      }

      return obj;
    }

    function splitCells(tableRow, count) {
      // ensure that every cell-delimiting pipe has a space
      // before it to distinguish it from an escaped pipe
      const row = tableRow.replace(/\|/g, (match, offset, str) => {
          let escaped = false,
            curr = offset;
          while (--curr >= 0 && str[curr] === '\\') escaped = !escaped;
          if (escaped) {
            // odd number of slashes means | is escaped
            // so we leave it alone
            return '|';
          } else {
            // add space before unescaped |
            return ' |';
          }
        }),
        cells = row.split(/ \|/);
      let i = 0;

      if (cells.length > count) {
        cells.splice(count);
      } else {
        while (cells.length < count) cells.push('');
      }

      for (; i < cells.length; i++) {
        // leading or trailing whitespace is ignored per the gfm spec
        cells[i] = cells[i].trim().replace(/\\\|/g, '|');
      }
      return cells;
    }

    // Remove trailing 'c's. Equivalent to str.replace(/c*$/, '').
    // /c*$/ is vulnerable to REDOS.
    // invert: Remove suffix of non-c chars instead. Default falsey.
    function rtrim(str, c, invert) {
      const l = str.length;
      if (l === 0) {
        return '';
      }

      // Length of suffix matching the invert condition.
      let suffLen = 0;

      // Step left until we fail to match the invert condition.
      while (suffLen < l) {
        const currChar = str.charAt(l - suffLen - 1);
        if (currChar === c && !invert) {
          suffLen++;
        } else if (currChar !== c && invert) {
          suffLen++;
        } else {
          break;
        }
      }

      return str.substr(0, l - suffLen);
    }

    function findClosingBracket(str, b) {
      if (str.indexOf(b[1]) === -1) {
        return -1;
      }
      const l = str.length;
      let level = 0,
        i = 0;
      for (; i < l; i++) {
        if (str[i] === '\\') {
          i++;
        } else if (str[i] === b[0]) {
          level++;
        } else if (str[i] === b[1]) {
          level--;
          if (level < 0) {
            return i;
          }
        }
      }
      return -1;
    }

    function checkSanitizeDeprecation(opt) {
      if (opt && opt.sanitize && !opt.silent) {
        console.warn('marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options');
      }
    }

    var helpers = {
      escape,
      unescape,
      edit,
      cleanUrl,
      resolveUrl,
      noopTest,
      merge,
      splitCells,
      rtrim,
      findClosingBracket,
      checkSanitizeDeprecation
    };

    const {
      noopTest: noopTest$1,
      edit: edit$1,
      merge: merge$1
    } = helpers;

    /**
     * Block-Level Grammar
     */
    const block = {
      newline: /^\n+/,
      code: /^( {4}[^\n]+\n*)+/,
      fences: /^ {0,3}(`{3,}|~{3,})([^`~\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?:\n+|$)|$)/,
      hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
      heading: /^ {0,3}(#{1,6}) +([^\n]*?)(?: +#+)? *(?:\n+|$)/,
      blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
      list: /^( {0,3})(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
      html: '^ {0,3}(?:' // optional indentation
        + '<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)' // (1)
        + '|comment[^\\n]*(\\n+|$)' // (2)
        + '|<\\?[\\s\\S]*?\\?>\\n*' // (3)
        + '|<![A-Z][\\s\\S]*?>\\n*' // (4)
        + '|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\n*' // (5)
        + '|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)' // (6)
        + '|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)' // (7) open tag
        + '|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)' // (7) closing tag
        + ')',
      def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
      nptable: noopTest$1,
      table: noopTest$1,
      lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,
      // regex template, placeholders will be replaced according to different paragraph
      // interruption rules of commonmark and the original markdown spec:
      _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html)[^\n]+)*)/,
      text: /^[^\n]+/
    };

    block._label = /(?!\s*\])(?:\\[\[\]]|[^\[\]])+/;
    block._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
    block.def = edit$1(block.def)
      .replace('label', block._label)
      .replace('title', block._title)
      .getRegex();

    block.bullet = /(?:[*+-]|\d{1,9}\.)/;
    block.item = /^( *)(bull) ?[^\n]*(?:\n(?!\1bull ?)[^\n]*)*/;
    block.item = edit$1(block.item, 'gm')
      .replace(/bull/g, block.bullet)
      .getRegex();

    block.list = edit$1(block.list)
      .replace(/bull/g, block.bullet)
      .replace('hr', '\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))')
      .replace('def', '\\n+(?=' + block.def.source + ')')
      .getRegex();

    block._tag = 'address|article|aside|base|basefont|blockquote|body|caption'
      + '|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption'
      + '|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe'
      + '|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option'
      + '|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr'
      + '|track|ul';
    block._comment = /<!--(?!-?>)[\s\S]*?-->/;
    block.html = edit$1(block.html, 'i')
      .replace('comment', block._comment)
      .replace('tag', block._tag)
      .replace('attribute', / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/)
      .getRegex();

    block.paragraph = edit$1(block._paragraph)
      .replace('hr', block.hr)
      .replace('heading', ' {0,3}#{1,6} +')
      .replace('|lheading', '') // setex headings don't interrupt commonmark paragraphs
      .replace('blockquote', ' {0,3}>')
      .replace('fences', ' {0,3}(?:`{3,}|~{3,})[^`\\n]*\\n')
      .replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
      .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)')
      .replace('tag', block._tag) // pars can be interrupted by type (6) html blocks
      .getRegex();

    block.blockquote = edit$1(block.blockquote)
      .replace('paragraph', block.paragraph)
      .getRegex();

    /**
     * Normal Block Grammar
     */

    block.normal = merge$1({}, block);

    /**
     * GFM Block Grammar
     */

    block.gfm = merge$1({}, block.normal, {
      nptable: /^ *([^|\n ].*\|.*)\n *([-:]+ *\|[-| :]*)(?:\n((?:.*[^>\n ].*(?:\n|$))*)\n*|$)/,
      table: /^ *\|(.+)\n *\|?( *[-:]+[-| :]*)(?:\n((?: *[^>\n ].*(?:\n|$))*)\n*|$)/
    });

    /**
     * Pedantic grammar (original John Gruber's loose markdown specification)
     */

    block.pedantic = merge$1({}, block.normal, {
      html: edit$1(
        '^ *(?:comment *(?:\\n|\\s*$)'
        + '|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)' // closed tag
        + '|<tag(?:"[^"]*"|\'[^\']*\'|\\s[^\'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))')
        .replace('comment', block._comment)
        .replace(/tag/g, '(?!(?:'
          + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub'
          + '|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)'
          + '\\b)\\w+(?!:|[^\\w\\s@]*@)\\b')
        .getRegex(),
      def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
      heading: /^ *(#{1,6}) *([^\n]+?) *(?:#+ *)?(?:\n+|$)/,
      fences: noopTest$1, // fences not supported
      paragraph: edit$1(block.normal._paragraph)
        .replace('hr', block.hr)
        .replace('heading', ' *#{1,6} *[^\n]')
        .replace('lheading', block.lheading)
        .replace('blockquote', ' {0,3}>')
        .replace('|fences', '')
        .replace('|list', '')
        .replace('|html', '')
        .getRegex()
    });

    /**
     * Inline-Level Grammar
     */
    const inline = {
      escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
      autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
      url: noopTest$1,
      tag: '^comment'
        + '|^</[a-zA-Z][\\w:-]*\\s*>' // self-closing tag
        + '|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>' // open tag
        + '|^<\\?[\\s\\S]*?\\?>' // processing instruction, e.g. <?php ?>
        + '|^<![a-zA-Z]+\\s[\\s\\S]*?>' // declaration, e.g. <!DOCTYPE html>
        + '|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>', // CDATA section
      link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
      reflink: /^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,
      nolink: /^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,
      strong: /^__([^\s_])__(?!_)|^\*\*([^\s*])\*\*(?!\*)|^__([^\s][\s\S]*?[^\s])__(?!_)|^\*\*([^\s][\s\S]*?[^\s])\*\*(?!\*)/,
      em: /^_([^\s_])_(?!_)|^\*([^\s*<\[])\*(?!\*)|^_([^\s<][\s\S]*?[^\s_])_(?!_|[^\spunctuation])|^_([^\s_<][\s\S]*?[^\s])_(?!_|[^\spunctuation])|^\*([^\s<"][\s\S]*?[^\s\*])\*(?!\*|[^\spunctuation])|^\*([^\s*"<\[][\s\S]*?[^\s])\*(?!\*)/,
      code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
      br: /^( {2,}|\\)\n(?!\s*$)/,
      del: noopTest$1,
      text: /^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*]|\b_|$)|[^ ](?= {2,}\n))|(?= {2,}\n))/
    };

    // list of punctuation marks from common mark spec
    // without ` and ] to workaround Rule 17 (inline code blocks/links)
    inline._punctuation = '!"#$%&\'()*+,\\-./:;<=>?@\\[^_{|}~';
    inline.em = edit$1(inline.em).replace(/punctuation/g, inline._punctuation).getRegex();

    inline._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;

    inline._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
    inline._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
    inline.autolink = edit$1(inline.autolink)
      .replace('scheme', inline._scheme)
      .replace('email', inline._email)
      .getRegex();

    inline._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;

    inline.tag = edit$1(inline.tag)
      .replace('comment', block._comment)
      .replace('attribute', inline._attribute)
      .getRegex();

    inline._label = /(?:\[[^\[\]]*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
    inline._href = /<(?:\\[<>]?|[^\s<>\\])*>|[^\s\x00-\x1f]*/;
    inline._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;

    inline.link = edit$1(inline.link)
      .replace('label', inline._label)
      .replace('href', inline._href)
      .replace('title', inline._title)
      .getRegex();

    inline.reflink = edit$1(inline.reflink)
      .replace('label', inline._label)
      .getRegex();

    /**
     * Normal Inline Grammar
     */

    inline.normal = merge$1({}, inline);

    /**
     * Pedantic Inline Grammar
     */

    inline.pedantic = merge$1({}, inline.normal, {
      strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
      em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/,
      link: edit$1(/^!?\[(label)\]\((.*?)\)/)
        .replace('label', inline._label)
        .getRegex(),
      reflink: edit$1(/^!?\[(label)\]\s*\[([^\]]*)\]/)
        .replace('label', inline._label)
        .getRegex()
    });

    /**
     * GFM Inline Grammar
     */

    inline.gfm = merge$1({}, inline.normal, {
      escape: edit$1(inline.escape).replace('])', '~|])').getRegex(),
      _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
      url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
      _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
      del: /^~+(?=\S)([\s\S]*?\S)~+/,
      text: /^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*~]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))|(?= {2,}\n|[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))/
    });

    inline.gfm.url = edit$1(inline.gfm.url, 'i')
      .replace('email', inline.gfm._extended_email)
      .getRegex();
    /**
     * GFM + Line Breaks Inline Grammar
     */

    inline.breaks = merge$1({}, inline.gfm, {
      br: edit$1(inline.br).replace('{2,}', '*').getRegex(),
      text: edit$1(inline.gfm.text)
        .replace('\\b_', '\\b_| {2,}\\n')
        .replace(/\{2,\}/g, '*')
        .getRegex()
    });

    var rules = {
      block,
      inline
    };

    const { defaults: defaults$2 } = defaults$1;
    const { block: block$1 } = rules;
    const {
      rtrim: rtrim$1,
      splitCells: splitCells$1,
      escape: escape$1
    } = helpers;

    /**
     * Block Lexer
     */
    var Lexer_1 = class Lexer {
      constructor(options) {
        this.tokens = [];
        this.tokens.links = Object.create(null);
        this.options = options || defaults$2;
        this.rules = block$1.normal;

        if (this.options.pedantic) {
          this.rules = block$1.pedantic;
        } else if (this.options.gfm) {
          this.rules = block$1.gfm;
        }
      }

      /**
       * Expose Block Rules
       */
      static get rules() {
        return block$1;
      }

      /**
       * Static Lex Method
       */
      static lex(src, options) {
        const lexer = new Lexer(options);
        return lexer.lex(src);
      };

      /**
       * Preprocessing
       */
      lex(src) {
        src = src
          .replace(/\r\n|\r/g, '\n')
          .replace(/\t/g, '    ');

        return this.token(src, true);
      };

      /**
       * Lexing
       */
      token(src, top) {
        src = src.replace(/^ +$/gm, '');
        let next,
          loose,
          cap,
          bull,
          b,
          item,
          listStart,
          listItems,
          t,
          space,
          i,
          tag,
          l,
          isordered,
          istask,
          ischecked;

        while (src) {
          // newline
          if (cap = this.rules.newline.exec(src)) {
            src = src.substring(cap[0].length);
            if (cap[0].length > 1) {
              this.tokens.push({
                type: 'space'
              });
            }
          }

          // code
          if (cap = this.rules.code.exec(src)) {
            const lastToken = this.tokens[this.tokens.length - 1];
            src = src.substring(cap[0].length);
            // An indented code block cannot interrupt a paragraph.
            if (lastToken && lastToken.type === 'paragraph') {
              lastToken.text += '\n' + cap[0].trimRight();
            } else {
              cap = cap[0].replace(/^ {4}/gm, '');
              this.tokens.push({
                type: 'code',
                codeBlockStyle: 'indented',
                text: !this.options.pedantic
                  ? rtrim$1(cap, '\n')
                  : cap
              });
            }
            continue;
          }

          // fences
          if (cap = this.rules.fences.exec(src)) {
            src = src.substring(cap[0].length);
            this.tokens.push({
              type: 'code',
              lang: cap[2] ? cap[2].trim() : cap[2],
              text: cap[3] || ''
            });
            continue;
          }

          // heading
          if (cap = this.rules.heading.exec(src)) {
            src = src.substring(cap[0].length);
            this.tokens.push({
              type: 'heading',
              depth: cap[1].length,
              text: cap[2]
            });
            continue;
          }

          // table no leading pipe (gfm)
          if (cap = this.rules.nptable.exec(src)) {
            item = {
              type: 'table',
              header: splitCells$1(cap[1].replace(/^ *| *\| *$/g, '')),
              align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
              cells: cap[3] ? cap[3].replace(/\n$/, '').split('\n') : []
            };

            if (item.header.length === item.align.length) {
              src = src.substring(cap[0].length);

              for (i = 0; i < item.align.length; i++) {
                if (/^ *-+: *$/.test(item.align[i])) {
                  item.align[i] = 'right';
                } else if (/^ *:-+: *$/.test(item.align[i])) {
                  item.align[i] = 'center';
                } else if (/^ *:-+ *$/.test(item.align[i])) {
                  item.align[i] = 'left';
                } else {
                  item.align[i] = null;
                }
              }

              for (i = 0; i < item.cells.length; i++) {
                item.cells[i] = splitCells$1(item.cells[i], item.header.length);
              }

              this.tokens.push(item);

              continue;
            }
          }

          // hr
          if (cap = this.rules.hr.exec(src)) {
            src = src.substring(cap[0].length);
            this.tokens.push({
              type: 'hr'
            });
            continue;
          }

          // blockquote
          if (cap = this.rules.blockquote.exec(src)) {
            src = src.substring(cap[0].length);

            this.tokens.push({
              type: 'blockquote_start'
            });

            cap = cap[0].replace(/^ *> ?/gm, '');

            // Pass `top` to keep the current
            // "toplevel" state. This is exactly
            // how markdown.pl works.
            this.token(cap, top);

            this.tokens.push({
              type: 'blockquote_end'
            });

            continue;
          }

          // list
          if (cap = this.rules.list.exec(src)) {
            src = src.substring(cap[0].length);
            bull = cap[2];
            isordered = bull.length > 1;

            listStart = {
              type: 'list_start',
              ordered: isordered,
              start: isordered ? +bull : '',
              loose: false
            };

            this.tokens.push(listStart);

            // Get each top-level item.
            cap = cap[0].match(this.rules.item);

            listItems = [];
            next = false;
            l = cap.length;
            i = 0;

            for (; i < l; i++) {
              item = cap[i];

              // Remove the list item's bullet
              // so it is seen as the next token.
              space = item.length;
              item = item.replace(/^ *([*+-]|\d+\.) */, '');

              // Outdent whatever the
              // list item contains. Hacky.
              if (~item.indexOf('\n ')) {
                space -= item.length;
                item = !this.options.pedantic
                  ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
                  : item.replace(/^ {1,4}/gm, '');
              }

              // Determine whether the next list item belongs here.
              // Backpedal if it does not belong in this list.
              if (i !== l - 1) {
                b = block$1.bullet.exec(cap[i + 1])[0];
                if (bull.length > 1 ? b.length === 1
                  : (b.length > 1 || (this.options.smartLists && b !== bull))) {
                  src = cap.slice(i + 1).join('\n') + src;
                  i = l - 1;
                }
              }

              // Determine whether item is loose or not.
              // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
              // for discount behavior.
              loose = next || /\n\n(?!\s*$)/.test(item);
              if (i !== l - 1) {
                next = item.charAt(item.length - 1) === '\n';
                if (!loose) loose = next;
              }

              if (loose) {
                listStart.loose = true;
              }

              // Check for task list items
              istask = /^\[[ xX]\] /.test(item);
              ischecked = undefined;
              if (istask) {
                ischecked = item[1] !== ' ';
                item = item.replace(/^\[[ xX]\] +/, '');
              }

              t = {
                type: 'list_item_start',
                task: istask,
                checked: ischecked,
                loose: loose
              };

              listItems.push(t);
              this.tokens.push(t);

              // Recurse.
              this.token(item, false);

              this.tokens.push({
                type: 'list_item_end'
              });
            }

            if (listStart.loose) {
              l = listItems.length;
              i = 0;
              for (; i < l; i++) {
                listItems[i].loose = true;
              }
            }

            this.tokens.push({
              type: 'list_end'
            });

            continue;
          }

          // html
          if (cap = this.rules.html.exec(src)) {
            src = src.substring(cap[0].length);
            this.tokens.push({
              type: this.options.sanitize
                ? 'paragraph'
                : 'html',
              pre: !this.options.sanitizer
                && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
              text: this.options.sanitize ? (this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape$1(cap[0])) : cap[0]
            });
            continue;
          }

          // def
          if (top && (cap = this.rules.def.exec(src))) {
            src = src.substring(cap[0].length);
            if (cap[3]) cap[3] = cap[3].substring(1, cap[3].length - 1);
            tag = cap[1].toLowerCase().replace(/\s+/g, ' ');
            if (!this.tokens.links[tag]) {
              this.tokens.links[tag] = {
                href: cap[2],
                title: cap[3]
              };
            }
            continue;
          }

          // table (gfm)
          if (cap = this.rules.table.exec(src)) {
            item = {
              type: 'table',
              header: splitCells$1(cap[1].replace(/^ *| *\| *$/g, '')),
              align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
              cells: cap[3] ? cap[3].replace(/\n$/, '').split('\n') : []
            };

            if (item.header.length === item.align.length) {
              src = src.substring(cap[0].length);

              for (i = 0; i < item.align.length; i++) {
                if (/^ *-+: *$/.test(item.align[i])) {
                  item.align[i] = 'right';
                } else if (/^ *:-+: *$/.test(item.align[i])) {
                  item.align[i] = 'center';
                } else if (/^ *:-+ *$/.test(item.align[i])) {
                  item.align[i] = 'left';
                } else {
                  item.align[i] = null;
                }
              }

              for (i = 0; i < item.cells.length; i++) {
                item.cells[i] = splitCells$1(
                  item.cells[i].replace(/^ *\| *| *\| *$/g, ''),
                  item.header.length);
              }

              this.tokens.push(item);

              continue;
            }
          }

          // lheading
          if (cap = this.rules.lheading.exec(src)) {
            src = src.substring(cap[0].length);
            this.tokens.push({
              type: 'heading',
              depth: cap[2].charAt(0) === '=' ? 1 : 2,
              text: cap[1]
            });
            continue;
          }

          // top-level paragraph
          if (top && (cap = this.rules.paragraph.exec(src))) {
            src = src.substring(cap[0].length);
            this.tokens.push({
              type: 'paragraph',
              text: cap[1].charAt(cap[1].length - 1) === '\n'
                ? cap[1].slice(0, -1)
                : cap[1]
            });
            continue;
          }

          // text
          if (cap = this.rules.text.exec(src)) {
            // Top-level should never reach here.
            src = src.substring(cap[0].length);
            this.tokens.push({
              type: 'text',
              text: cap[0]
            });
            continue;
          }

          if (src) {
            throw new Error('Infinite loop on byte: ' + src.charCodeAt(0));
          }
        }

        return this.tokens;
      };
    };

    const { defaults: defaults$3 } = defaults$1;
    const {
      cleanUrl: cleanUrl$1,
      escape: escape$2
    } = helpers;

    /**
     * Renderer
     */
    var Renderer_1 = class Renderer {
      constructor(options) {
        this.options = options || defaults$3;
      }

      code(code, infostring, escaped) {
        const lang = (infostring || '').match(/\S*/)[0];
        if (this.options.highlight) {
          const out = this.options.highlight(code, lang);
          if (out != null && out !== code) {
            escaped = true;
            code = out;
          }
        }

        if (!lang) {
          return '<pre><code>'
            + (escaped ? code : escape$2(code, true))
            + '</code></pre>';
        }

        return '<pre><code class="'
          + this.options.langPrefix
          + escape$2(lang, true)
          + '">'
          + (escaped ? code : escape$2(code, true))
          + '</code></pre>\n';
      };

      blockquote(quote) {
        return '<blockquote>\n' + quote + '</blockquote>\n';
      };

      html(html) {
        return html;
      };

      heading(text, level, raw, slugger) {
        if (this.options.headerIds) {
          return '<h'
            + level
            + ' id="'
            + this.options.headerPrefix
            + slugger.slug(raw)
            + '">'
            + text
            + '</h'
            + level
            + '>\n';
        }
        // ignore IDs
        return '<h' + level + '>' + text + '</h' + level + '>\n';
      };

      hr() {
        return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
      };

      list(body, ordered, start) {
        const type = ordered ? 'ol' : 'ul',
          startatt = (ordered && start !== 1) ? (' start="' + start + '"') : '';
        return '<' + type + startatt + '>\n' + body + '</' + type + '>\n';
      };

      listitem(text) {
        return '<li>' + text + '</li>\n';
      };

      checkbox(checked) {
        return '<input '
          + (checked ? 'checked="" ' : '')
          + 'disabled="" type="checkbox"'
          + (this.options.xhtml ? ' /' : '')
          + '> ';
      };

      paragraph(text) {
        return '<p>' + text + '</p>\n';
      };

      table(header, body) {
        if (body) body = '<tbody>' + body + '</tbody>';

        return '<table>\n'
          + '<thead>\n'
          + header
          + '</thead>\n'
          + body
          + '</table>\n';
      };

      tablerow(content) {
        return '<tr>\n' + content + '</tr>\n';
      };

      tablecell(content, flags) {
        const type = flags.header ? 'th' : 'td';
        const tag = flags.align
          ? '<' + type + ' align="' + flags.align + '">'
          : '<' + type + '>';
        return tag + content + '</' + type + '>\n';
      };

      // span level renderer
      strong(text) {
        return '<strong>' + text + '</strong>';
      };

      em(text) {
        return '<em>' + text + '</em>';
      };

      codespan(text) {
        return '<code>' + text + '</code>';
      };

      br() {
        return this.options.xhtml ? '<br/>' : '<br>';
      };

      del(text) {
        return '<del>' + text + '</del>';
      };

      link(href, title, text) {
        href = cleanUrl$1(this.options.sanitize, this.options.baseUrl, href);
        if (href === null) {
          return text;
        }
        let out = '<a href="' + escape$2(href) + '"';
        if (title) {
          out += ' title="' + title + '"';
        }
        out += '>' + text + '</a>';
        return out;
      };

      image(href, title, text) {
        href = cleanUrl$1(this.options.sanitize, this.options.baseUrl, href);
        if (href === null) {
          return text;
        }

        let out = '<img src="' + href + '" alt="' + text + '"';
        if (title) {
          out += ' title="' + title + '"';
        }
        out += this.options.xhtml ? '/>' : '>';
        return out;
      };

      text(text) {
        return text;
      };
    };

    /**
     * Slugger generates header id
     */
    var Slugger_1 = class Slugger {
      constructor() {
        this.seen = {};
      }

      /**
       * Convert string to unique id
       */
      slug(value) {
        let slug = value
          .toLowerCase()
          .trim()
          .replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, '')
          .replace(/\s/g, '-');

        if (this.seen.hasOwnProperty(slug)) {
          const originalSlug = slug;
          do {
            this.seen[originalSlug]++;
            slug = originalSlug + '-' + this.seen[originalSlug];
          } while (this.seen.hasOwnProperty(slug));
        }
        this.seen[slug] = 0;

        return slug;
      };
    };

    const { defaults: defaults$4 } = defaults$1;
    const { inline: inline$1 } = rules;
    const {
      findClosingBracket: findClosingBracket$1,
      escape: escape$3
    } = helpers;

    /**
     * Inline Lexer & Compiler
     */
    var InlineLexer_1 = class InlineLexer {
      constructor(links, options) {
        this.options = options || defaults$4;
        this.links = links;
        this.rules = inline$1.normal;
        this.options.renderer = this.options.renderer || new Renderer_1();
        this.renderer = this.options.renderer;
        this.renderer.options = this.options;

        if (!this.links) {
          throw new Error('Tokens array requires a `links` property.');
        }

        if (this.options.pedantic) {
          this.rules = inline$1.pedantic;
        } else if (this.options.gfm) {
          if (this.options.breaks) {
            this.rules = inline$1.breaks;
          } else {
            this.rules = inline$1.gfm;
          }
        }
      }

      /**
       * Expose Inline Rules
       */
      static get rules() {
        return inline$1;
      }

      /**
       * Static Lexing/Compiling Method
       */
      static output(src, links, options) {
        const inline = new InlineLexer(links, options);
        return inline.output(src);
      }

      /**
       * Lexing/Compiling
       */
      output(src) {
        let out = '',
          link,
          text,
          href,
          title,
          cap,
          prevCapZero;

        while (src) {
          // escape
          if (cap = this.rules.escape.exec(src)) {
            src = src.substring(cap[0].length);
            out += escape$3(cap[1]);
            continue;
          }

          // tag
          if (cap = this.rules.tag.exec(src)) {
            if (!this.inLink && /^<a /i.test(cap[0])) {
              this.inLink = true;
            } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
              this.inLink = false;
            }
            if (!this.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
              this.inRawBlock = true;
            } else if (this.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
              this.inRawBlock = false;
            }

            src = src.substring(cap[0].length);
            out += this.options.sanitize
              ? this.options.sanitizer
                ? this.options.sanitizer(cap[0])
                : escape$3(cap[0])
              : cap[0];
            continue;
          }

          // link
          if (cap = this.rules.link.exec(src)) {
            const lastParenIndex = findClosingBracket$1(cap[2], '()');
            if (lastParenIndex > -1) {
              const start = cap[0].indexOf('!') === 0 ? 5 : 4;
              const linkLen = start + cap[1].length + lastParenIndex;
              cap[2] = cap[2].substring(0, lastParenIndex);
              cap[0] = cap[0].substring(0, linkLen).trim();
              cap[3] = '';
            }
            src = src.substring(cap[0].length);
            this.inLink = true;
            href = cap[2];
            if (this.options.pedantic) {
              link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);

              if (link) {
                href = link[1];
                title = link[3];
              } else {
                title = '';
              }
            } else {
              title = cap[3] ? cap[3].slice(1, -1) : '';
            }
            href = href.trim().replace(/^<([\s\S]*)>$/, '$1');
            out += this.outputLink(cap, {
              href: InlineLexer.escapes(href),
              title: InlineLexer.escapes(title)
            });
            this.inLink = false;
            continue;
          }

          // reflink, nolink
          if ((cap = this.rules.reflink.exec(src))
              || (cap = this.rules.nolink.exec(src))) {
            src = src.substring(cap[0].length);
            link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
            link = this.links[link.toLowerCase()];
            if (!link || !link.href) {
              out += cap[0].charAt(0);
              src = cap[0].substring(1) + src;
              continue;
            }
            this.inLink = true;
            out += this.outputLink(cap, link);
            this.inLink = false;
            continue;
          }

          // strong
          if (cap = this.rules.strong.exec(src)) {
            src = src.substring(cap[0].length);
            out += this.renderer.strong(this.output(cap[4] || cap[3] || cap[2] || cap[1]));
            continue;
          }

          // em
          if (cap = this.rules.em.exec(src)) {
            src = src.substring(cap[0].length);
            out += this.renderer.em(this.output(cap[6] || cap[5] || cap[4] || cap[3] || cap[2] || cap[1]));
            continue;
          }

          // code
          if (cap = this.rules.code.exec(src)) {
            src = src.substring(cap[0].length);
            out += this.renderer.codespan(escape$3(cap[2].trim(), true));
            continue;
          }

          // br
          if (cap = this.rules.br.exec(src)) {
            src = src.substring(cap[0].length);
            out += this.renderer.br();
            continue;
          }

          // del (gfm)
          if (cap = this.rules.del.exec(src)) {
            src = src.substring(cap[0].length);
            out += this.renderer.del(this.output(cap[1]));
            continue;
          }

          // autolink
          if (cap = this.rules.autolink.exec(src)) {
            src = src.substring(cap[0].length);
            if (cap[2] === '@') {
              text = escape$3(this.mangle(cap[1]));
              href = 'mailto:' + text;
            } else {
              text = escape$3(cap[1]);
              href = text;
            }
            out += this.renderer.link(href, null, text);
            continue;
          }

          // url (gfm)
          if (!this.inLink && (cap = this.rules.url.exec(src))) {
            if (cap[2] === '@') {
              text = escape$3(cap[0]);
              href = 'mailto:' + text;
            } else {
              // do extended autolink path validation
              do {
                prevCapZero = cap[0];
                cap[0] = this.rules._backpedal.exec(cap[0])[0];
              } while (prevCapZero !== cap[0]);
              text = escape$3(cap[0]);
              if (cap[1] === 'www.') {
                href = 'http://' + text;
              } else {
                href = text;
              }
            }
            src = src.substring(cap[0].length);
            out += this.renderer.link(href, null, text);
            continue;
          }

          // text
          if (cap = this.rules.text.exec(src)) {
            src = src.substring(cap[0].length);
            if (this.inRawBlock) {
              out += this.renderer.text(this.options.sanitize ? (this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape$3(cap[0])) : cap[0]);
            } else {
              out += this.renderer.text(escape$3(this.smartypants(cap[0])));
            }
            continue;
          }

          if (src) {
            throw new Error('Infinite loop on byte: ' + src.charCodeAt(0));
          }
        }

        return out;
      }

      static escapes(text) {
        return text ? text.replace(InlineLexer.rules._escapes, '$1') : text;
      }

      /**
       * Compile Link
       */
      outputLink(cap, link) {
        const href = link.href,
          title = link.title ? escape$3(link.title) : null;

        return cap[0].charAt(0) !== '!'
          ? this.renderer.link(href, title, this.output(cap[1]))
          : this.renderer.image(href, title, escape$3(cap[1]));
      }

      /**
       * Smartypants Transformations
       */
      smartypants(text) {
        if (!this.options.smartypants) return text;
        return text
          // em-dashes
          .replace(/---/g, '\u2014')
          // en-dashes
          .replace(/--/g, '\u2013')
          // opening singles
          .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
          // closing singles & apostrophes
          .replace(/'/g, '\u2019')
          // opening doubles
          .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')
          // closing doubles
          .replace(/"/g, '\u201d')
          // ellipses
          .replace(/\.{3}/g, '\u2026');
      }

      /**
       * Mangle Links
       */
      mangle(text) {
        if (!this.options.mangle) return text;
        const l = text.length;
        let out = '',
          i = 0,
          ch;

        for (; i < l; i++) {
          ch = text.charCodeAt(i);
          if (Math.random() > 0.5) {
            ch = 'x' + ch.toString(16);
          }
          out += '&#' + ch + ';';
        }

        return out;
      }
    };

    /**
     * TextRenderer
     * returns only the textual part of the token
     */
    var TextRenderer_1 = class TextRenderer {
      // no need for block level renderers
      strong(text) {
        return text;
      }

      em(text) {
        return text;
      }

      codespan(text) {
        return text;
      }

      del(text) {
        return text;
      }

      text(text) {
        return text;
      }

      link(href, title, text) {
        return '' + text;
      }

      image(href, title, text) {
        return '' + text;
      }

      br() {
        return '';
      }
    };

    const { defaults: defaults$5 } = defaults$1;
    const {
      merge: merge$2,
      unescape: unescape$1
    } = helpers;

    /**
     * Parsing & Compiling
     */
    var Parser_1 = class Parser {
      constructor(options) {
        this.tokens = [];
        this.token = null;
        this.options = options || defaults$5;
        this.options.renderer = this.options.renderer || new Renderer_1();
        this.renderer = this.options.renderer;
        this.renderer.options = this.options;
        this.slugger = new Slugger_1();
      }

      /**
       * Static Parse Method
       */
      static parse(tokens, options) {
        const parser = new Parser(options);
        return parser.parse(tokens);
      };

      /**
       * Parse Loop
       */
      parse(tokens) {
        this.inline = new InlineLexer_1(tokens.links, this.options);
        // use an InlineLexer with a TextRenderer to extract pure text
        this.inlineText = new InlineLexer_1(
          tokens.links,
          merge$2({}, this.options, { renderer: new TextRenderer_1() })
        );
        this.tokens = tokens.reverse();

        let out = '';
        while (this.next()) {
          out += this.tok();
        }

        return out;
      };

      /**
       * Next Token
       */
      next() {
        this.token = this.tokens.pop();
        return this.token;
      };

      /**
       * Preview Next Token
       */
      peek() {
        return this.tokens[this.tokens.length - 1] || 0;
      };

      /**
       * Parse Text Tokens
       */
      parseText() {
        let body = this.token.text;

        while (this.peek().type === 'text') {
          body += '\n' + this.next().text;
        }

        return this.inline.output(body);
      };

      /**
       * Parse Current Token
       */
      tok() {
        let body = '';
        switch (this.token.type) {
          case 'space': {
            return '';
          }
          case 'hr': {
            return this.renderer.hr();
          }
          case 'heading': {
            return this.renderer.heading(
              this.inline.output(this.token.text),
              this.token.depth,
              unescape$1(this.inlineText.output(this.token.text)),
              this.slugger);
          }
          case 'code': {
            return this.renderer.code(this.token.text,
              this.token.lang,
              this.token.escaped);
          }
          case 'table': {
            let header = '',
              i,
              row,
              cell,
              j;

            // header
            cell = '';
            for (i = 0; i < this.token.header.length; i++) {
              cell += this.renderer.tablecell(
                this.inline.output(this.token.header[i]),
                { header: true, align: this.token.align[i] }
              );
            }
            header += this.renderer.tablerow(cell);

            for (i = 0; i < this.token.cells.length; i++) {
              row = this.token.cells[i];

              cell = '';
              for (j = 0; j < row.length; j++) {
                cell += this.renderer.tablecell(
                  this.inline.output(row[j]),
                  { header: false, align: this.token.align[j] }
                );
              }

              body += this.renderer.tablerow(cell);
            }
            return this.renderer.table(header, body);
          }
          case 'blockquote_start': {
            body = '';

            while (this.next().type !== 'blockquote_end') {
              body += this.tok();
            }

            return this.renderer.blockquote(body);
          }
          case 'list_start': {
            body = '';
            const ordered = this.token.ordered,
              start = this.token.start;

            while (this.next().type !== 'list_end') {
              body += this.tok();
            }

            return this.renderer.list(body, ordered, start);
          }
          case 'list_item_start': {
            body = '';
            const loose = this.token.loose;
            const checked = this.token.checked;
            const task = this.token.task;

            if (this.token.task) {
              if (loose) {
                if (this.peek().type === 'text') {
                  const nextToken = this.peek();
                  nextToken.text = this.renderer.checkbox(checked) + ' ' + nextToken.text;
                } else {
                  this.tokens.push({
                    type: 'text',
                    text: this.renderer.checkbox(checked)
                  });
                }
              } else {
                body += this.renderer.checkbox(checked);
              }
            }

            while (this.next().type !== 'list_item_end') {
              body += !loose && this.token.type === 'text'
                ? this.parseText()
                : this.tok();
            }
            return this.renderer.listitem(body, task, checked);
          }
          case 'html': {
            // TODO parse inline content if parameter markdown=1
            return this.renderer.html(this.token.text);
          }
          case 'paragraph': {
            return this.renderer.paragraph(this.inline.output(this.token.text));
          }
          case 'text': {
            return this.renderer.paragraph(this.parseText());
          }
          default: {
            const errMsg = 'Token with "' + this.token.type + '" type was not found.';
            if (this.options.silent) {
              console.log(errMsg);
            } else {
              throw new Error(errMsg);
            }
          }
        }
      };
    };

    const {
      merge: merge$3,
      checkSanitizeDeprecation: checkSanitizeDeprecation$1,
      escape: escape$4
    } = helpers;
    const {
      getDefaults,
      changeDefaults,
      defaults: defaults$6
    } = defaults$1;

    /**
     * Marked
     */
    function marked(src, opt, callback) {
      // throw error in case of non string input
      if (typeof src === 'undefined' || src === null) {
        throw new Error('marked(): input parameter is undefined or null');
      }
      if (typeof src !== 'string') {
        throw new Error('marked(): input parameter is of type '
          + Object.prototype.toString.call(src) + ', string expected');
      }

      if (callback || typeof opt === 'function') {
        if (!callback) {
          callback = opt;
          opt = null;
        }

        opt = merge$3({}, marked.defaults, opt || {});
        checkSanitizeDeprecation$1(opt);
        const highlight = opt.highlight;
        let tokens,
          pending,
          i = 0;

        try {
          tokens = Lexer_1.lex(src, opt);
        } catch (e) {
          return callback(e);
        }

        pending = tokens.length;

        const done = function(err) {
          if (err) {
            opt.highlight = highlight;
            return callback(err);
          }

          let out;

          try {
            out = Parser_1.parse(tokens, opt);
          } catch (e) {
            err = e;
          }

          opt.highlight = highlight;

          return err
            ? callback(err)
            : callback(null, out);
        };

        if (!highlight || highlight.length < 3) {
          return done();
        }

        delete opt.highlight;

        if (!pending) return done();

        for (; i < tokens.length; i++) {
          (function(token) {
            if (token.type !== 'code') {
              return --pending || done();
            }
            return highlight(token.text, token.lang, function(err, code) {
              if (err) return done(err);
              if (code == null || code === token.text) {
                return --pending || done();
              }
              token.text = code;
              token.escaped = true;
              --pending || done();
            });
          })(tokens[i]);
        }

        return;
      }
      try {
        opt = merge$3({}, marked.defaults, opt || {});
        checkSanitizeDeprecation$1(opt);
        return Parser_1.parse(Lexer_1.lex(src, opt), opt);
      } catch (e) {
        e.message += '\nPlease report this to https://github.com/markedjs/marked.';
        if ((opt || marked.defaults).silent) {
          return '<p>An error occurred:</p><pre>'
            + escape$4(e.message + '', true)
            + '</pre>';
        }
        throw e;
      }
    }

    /**
     * Options
     */

    marked.options =
    marked.setOptions = function(opt) {
      merge$3(marked.defaults, opt);
      changeDefaults(marked.defaults);
      return marked;
    };

    marked.getDefaults = getDefaults;

    marked.defaults = defaults$6;

    /**
     * Expose
     */

    marked.Parser = Parser_1;
    marked.parser = Parser_1.parse;

    marked.Renderer = Renderer_1;
    marked.TextRenderer = TextRenderer_1;

    marked.Lexer = Lexer_1;
    marked.lexer = Lexer_1.lex;

    marked.InlineLexer = InlineLexer_1;
    marked.inlineLexer = InlineLexer_1.output;

    marked.Slugger = Slugger_1;

    marked.parse = marked;

    var marked_1 = marked;

    var utils = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    exports.extend = extend;
    exports.indexOf = indexOf;
    exports.escapeExpression = escapeExpression;
    exports.isEmpty = isEmpty;
    exports.createFrame = createFrame;
    exports.blockParams = blockParams;
    exports.appendContextPath = appendContextPath;

    var escape = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '`': '&#x60;',
      '=': '&#x3D;'
    };

    var badChars = /[&<>"'`=]/g,
        possible = /[&<>"'`=]/;

    function escapeChar(chr) {
      return escape[chr];
    }

    function extend(obj /* , ...source */) {
      for (var i = 1; i < arguments.length; i++) {
        for (var key in arguments[i]) {
          if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
            obj[key] = arguments[i][key];
          }
        }
      }

      return obj;
    }

    var toString = Object.prototype.toString;

    exports.toString = toString;
    // Sourced from lodash
    // https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
    /* eslint-disable func-style */
    var isFunction = function isFunction(value) {
      return typeof value === 'function';
    };
    // fallback for older versions of Chrome and Safari
    /* istanbul ignore next */
    if (isFunction(/x/)) {
      exports.isFunction = isFunction = function (value) {
        return typeof value === 'function' && toString.call(value) === '[object Function]';
      };
    }
    exports.isFunction = isFunction;

    /* eslint-enable func-style */

    /* istanbul ignore next */
    var isArray = Array.isArray || function (value) {
      return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
    };

    exports.isArray = isArray;
    // Older IE versions do not directly support indexOf so we must implement our own, sadly.

    function indexOf(array, value) {
      for (var i = 0, len = array.length; i < len; i++) {
        if (array[i] === value) {
          return i;
        }
      }
      return -1;
    }

    function escapeExpression(string) {
      if (typeof string !== 'string') {
        // don't escape SafeStrings, since they're already safe
        if (string && string.toHTML) {
          return string.toHTML();
        } else if (string == null) {
          return '';
        } else if (!string) {
          return string + '';
        }

        // Force a string conversion as this will be done by the append regardless and
        // the regex test will do this transparently behind the scenes, causing issues if
        // an object's to string has escaped characters in it.
        string = '' + string;
      }

      if (!possible.test(string)) {
        return string;
      }
      return string.replace(badChars, escapeChar);
    }

    function isEmpty(value) {
      if (!value && value !== 0) {
        return true;
      } else if (isArray(value) && value.length === 0) {
        return true;
      } else {
        return false;
      }
    }

    function createFrame(object) {
      var frame = extend({}, object);
      frame._parent = object;
      return frame;
    }

    function blockParams(params, ids) {
      params.path = ids;
      return params;
    }

    function appendContextPath(contextPath, id) {
      return (contextPath ? contextPath + '.' : '') + id;
    }

    });

    unwrapExports(utils);
    var utils_1 = utils.extend;
    var utils_2 = utils.indexOf;
    var utils_3 = utils.escapeExpression;
    var utils_4 = utils.isEmpty;
    var utils_5 = utils.createFrame;
    var utils_6 = utils.blockParams;
    var utils_7 = utils.appendContextPath;
    var utils_8 = utils.isFunction;
    var utils_9 = utils.isArray;

    var exception = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;

    var errorProps = ['description', 'fileName', 'lineNumber', 'endLineNumber', 'message', 'name', 'number', 'stack'];

    function Exception(message, node) {
      var loc = node && node.loc,
          line = undefined,
          endLineNumber = undefined,
          column = undefined,
          endColumn = undefined;

      if (loc) {
        line = loc.start.line;
        endLineNumber = loc.end.line;
        column = loc.start.column;
        endColumn = loc.end.column;

        message += ' - ' + line + ':' + column;
      }

      var tmp = Error.prototype.constructor.call(this, message);

      // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
      for (var idx = 0; idx < errorProps.length; idx++) {
        this[errorProps[idx]] = tmp[errorProps[idx]];
      }

      /* istanbul ignore else */
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, Exception);
      }

      try {
        if (loc) {
          this.lineNumber = line;
          this.endLineNumber = endLineNumber;

          // Work around issue under safari where we can't directly set the column value
          /* istanbul ignore next */
          if (Object.defineProperty) {
            Object.defineProperty(this, 'column', {
              value: column,
              enumerable: true
            });
            Object.defineProperty(this, 'endColumn', {
              value: endColumn,
              enumerable: true
            });
          } else {
            this.column = column;
            this.endColumn = endColumn;
          }
        }
      } catch (nop) {
        /* Ignore if the browser is very particular */
      }
    }

    Exception.prototype = new Error();

    exports['default'] = Exception;
    module.exports = exports['default'];

    });

    unwrapExports(exception);

    var blockHelperMissing = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;



    exports['default'] = function (instance) {
      instance.registerHelper('blockHelperMissing', function (context, options) {
        var inverse = options.inverse,
            fn = options.fn;

        if (context === true) {
          return fn(this);
        } else if (context === false || context == null) {
          return inverse(this);
        } else if (utils.isArray(context)) {
          if (context.length > 0) {
            if (options.ids) {
              options.ids = [options.name];
            }

            return instance.helpers.each(context, options);
          } else {
            return inverse(this);
          }
        } else {
          if (options.data && options.ids) {
            var data = utils.createFrame(options.data);
            data.contextPath = utils.appendContextPath(options.data.contextPath, options.name);
            options = { data: data };
          }

          return fn(context, options);
        }
      });
    };

    module.exports = exports['default'];

    });

    unwrapExports(blockHelperMissing);

    var each = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    // istanbul ignore next

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }





    var _exception2 = _interopRequireDefault(exception);

    exports['default'] = function (instance) {
      instance.registerHelper('each', function (context, options) {
        if (!options) {
          throw new _exception2['default']('Must pass iterator to #each');
        }

        var fn = options.fn,
            inverse = options.inverse,
            i = 0,
            ret = '',
            data = undefined,
            contextPath = undefined;

        if (options.data && options.ids) {
          contextPath = utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
        }

        if (utils.isFunction(context)) {
          context = context.call(this);
        }

        if (options.data) {
          data = utils.createFrame(options.data);
        }

        function execIteration(field, index, last) {
          if (data) {
            data.key = field;
            data.index = index;
            data.first = index === 0;
            data.last = !!last;

            if (contextPath) {
              data.contextPath = contextPath + field;
            }
          }

          ret = ret + fn(context[field], {
            data: data,
            blockParams: utils.blockParams([context[field], field], [contextPath + field, null])
          });
        }

        if (context && typeof context === 'object') {
          if (utils.isArray(context)) {
            for (var j = context.length; i < j; i++) {
              if (i in context) {
                execIteration(i, i, i === context.length - 1);
              }
            }
          } else if (commonjsGlobal.Symbol && context[commonjsGlobal.Symbol.iterator]) {
            var newContext = [];
            var iterator = context[commonjsGlobal.Symbol.iterator]();
            for (var it = iterator.next(); !it.done; it = iterator.next()) {
              newContext.push(it.value);
            }
            context = newContext;
            for (var j = context.length; i < j; i++) {
              execIteration(i, i, i === context.length - 1);
            }
          } else {
            (function () {
              var priorKey = undefined;

              Object.keys(context).forEach(function (key) {
                // We're running the iterations one step out of sync so we can detect
                // the last iteration without have to scan the object twice and create
                // an itermediate keys array.
                if (priorKey !== undefined) {
                  execIteration(priorKey, i - 1);
                }
                priorKey = key;
                i++;
              });
              if (priorKey !== undefined) {
                execIteration(priorKey, i - 1, true);
              }
            })();
          }
        }

        if (i === 0) {
          ret = inverse(this);
        }

        return ret;
      });
    };

    module.exports = exports['default'];

    });

    unwrapExports(each);

    var helperMissing = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    // istanbul ignore next

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }



    var _exception2 = _interopRequireDefault(exception);

    exports['default'] = function (instance) {
      instance.registerHelper('helperMissing', function () /* [args, ]options */{
        if (arguments.length === 1) {
          // A missing field in a {{foo}} construct.
          return undefined;
        } else {
          // Someone is actually trying to call something, blow up.
          throw new _exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
        }
      });
    };

    module.exports = exports['default'];

    });

    unwrapExports(helperMissing);

    var _if = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    // istanbul ignore next

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }





    var _exception2 = _interopRequireDefault(exception);

    exports['default'] = function (instance) {
      instance.registerHelper('if', function (conditional, options) {
        if (arguments.length != 2) {
          throw new _exception2['default']('#if requires exactly one argument');
        }
        if (utils.isFunction(conditional)) {
          conditional = conditional.call(this);
        }

        // Default behavior is to render the positive path if the value is truthy and not empty.
        // The `includeZero` option may be set to treat the condtional as purely not empty based on the
        // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
        if (!options.hash.includeZero && !conditional || utils.isEmpty(conditional)) {
          return options.inverse(this);
        } else {
          return options.fn(this);
        }
      });

      instance.registerHelper('unless', function (conditional, options) {
        if (arguments.length != 2) {
          throw new _exception2['default']('#unless requires exactly one argument');
        }
        return instance.helpers['if'].call(this, conditional, { fn: options.inverse, inverse: options.fn, hash: options.hash });
      });
    };

    module.exports = exports['default'];

    });

    unwrapExports(_if);

    var log = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;

    exports['default'] = function (instance) {
      instance.registerHelper('log', function () /* message, options */{
        var args = [undefined],
            options = arguments[arguments.length - 1];
        for (var i = 0; i < arguments.length - 1; i++) {
          args.push(arguments[i]);
        }

        var level = 1;
        if (options.hash.level != null) {
          level = options.hash.level;
        } else if (options.data && options.data.level != null) {
          level = options.data.level;
        }
        args[0] = level;

        instance.log.apply(instance, args);
      });
    };

    module.exports = exports['default'];

    });

    unwrapExports(log);

    var lookup = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    var dangerousPropertyRegex = /^(constructor|__defineGetter__|__defineSetter__|__lookupGetter__|__proto__)$/;

    exports.dangerousPropertyRegex = dangerousPropertyRegex;

    exports['default'] = function (instance) {
      instance.registerHelper('lookup', function (obj, field) {
        if (!obj) {
          return obj;
        }
        if (dangerousPropertyRegex.test(String(field)) && !Object.prototype.propertyIsEnumerable.call(obj, field)) {
          return undefined;
        }
        return obj[field];
      });
    };

    });

    unwrapExports(lookup);
    var lookup_1 = lookup.dangerousPropertyRegex;

    var _with = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    // istanbul ignore next

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }





    var _exception2 = _interopRequireDefault(exception);

    exports['default'] = function (instance) {
      instance.registerHelper('with', function (context, options) {
        if (arguments.length != 2) {
          throw new _exception2['default']('#with requires exactly one argument');
        }
        if (utils.isFunction(context)) {
          context = context.call(this);
        }

        var fn = options.fn;

        if (!utils.isEmpty(context)) {
          var data = options.data;
          if (options.data && options.ids) {
            data = utils.createFrame(options.data);
            data.contextPath = utils.appendContextPath(options.data.contextPath, options.ids[0]);
          }

          return fn(context, {
            data: data,
            blockParams: utils.blockParams([context], [data && data.contextPath])
          });
        } else {
          return options.inverse(this);
        }
      });
    };

    module.exports = exports['default'];

    });

    unwrapExports(_with);

    var helpers$1 = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    exports.registerDefaultHelpers = registerDefaultHelpers;
    exports.moveHelperToHooks = moveHelperToHooks;
    // istanbul ignore next

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }



    var _helpersBlockHelperMissing2 = _interopRequireDefault(blockHelperMissing);



    var _helpersEach2 = _interopRequireDefault(each);



    var _helpersHelperMissing2 = _interopRequireDefault(helperMissing);



    var _helpersIf2 = _interopRequireDefault(_if);



    var _helpersLog2 = _interopRequireDefault(log);



    var _helpersLookup2 = _interopRequireDefault(lookup);



    var _helpersWith2 = _interopRequireDefault(_with);

    function registerDefaultHelpers(instance) {
      _helpersBlockHelperMissing2['default'](instance);
      _helpersEach2['default'](instance);
      _helpersHelperMissing2['default'](instance);
      _helpersIf2['default'](instance);
      _helpersLog2['default'](instance);
      _helpersLookup2['default'](instance);
      _helpersWith2['default'](instance);
    }

    function moveHelperToHooks(instance, helperName, keepHelper) {
      if (instance.helpers[helperName]) {
        instance.hooks[helperName] = instance.helpers[helperName];
        if (!keepHelper) {
          delete instance.helpers[helperName];
        }
      }
    }

    });

    unwrapExports(helpers$1);
    var helpers_1$1 = helpers$1.registerDefaultHelpers;
    var helpers_2$1 = helpers$1.moveHelperToHooks;

    var inline$2 = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;



    exports['default'] = function (instance) {
      instance.registerDecorator('inline', function (fn, props, container, options) {
        var ret = fn;
        if (!props.partials) {
          props.partials = {};
          ret = function (context, options) {
            // Create a new partials stack frame prior to exec.
            var original = container.partials;
            container.partials = utils.extend({}, original, props.partials);
            var ret = fn(context, options);
            container.partials = original;
            return ret;
          };
        }

        props.partials[options.args[0]] = options.fn;

        return ret;
      });
    };

    module.exports = exports['default'];

    });

    unwrapExports(inline$2);

    var decorators = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    exports.registerDefaultDecorators = registerDefaultDecorators;
    // istanbul ignore next

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }



    var _decoratorsInline2 = _interopRequireDefault(inline$2);

    function registerDefaultDecorators(instance) {
      _decoratorsInline2['default'](instance);
    }

    });

    unwrapExports(decorators);
    var decorators_1 = decorators.registerDefaultDecorators;

    var logger_1 = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;



    var logger = {
      methodMap: ['debug', 'info', 'warn', 'error'],
      level: 'info',

      // Maps a given level value to the `methodMap` indexes above.
      lookupLevel: function lookupLevel(level) {
        if (typeof level === 'string') {
          var levelMap = utils.indexOf(logger.methodMap, level.toLowerCase());
          if (levelMap >= 0) {
            level = levelMap;
          } else {
            level = parseInt(level, 10);
          }
        }

        return level;
      },

      // Can be overridden in the host environment
      log: function log(level) {
        level = logger.lookupLevel(level);

        if (typeof console !== 'undefined' && logger.lookupLevel(logger.level) <= level) {
          var method = logger.methodMap[level];
          if (!console[method]) {
            // eslint-disable-line no-console
            method = 'log';
          }

          for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            message[_key - 1] = arguments[_key];
          }

          console[method].apply(console, message); // eslint-disable-line no-console
        }
      }
    };

    exports['default'] = logger;
    module.exports = exports['default'];

    });

    unwrapExports(logger_1);

    var base = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    exports.HandlebarsEnvironment = HandlebarsEnvironment;
    // istanbul ignore next

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }





    var _exception2 = _interopRequireDefault(exception);







    var _logger2 = _interopRequireDefault(logger_1);

    var VERSION = '4.5.3';
    exports.VERSION = VERSION;
    var COMPILER_REVISION = 8;
    exports.COMPILER_REVISION = COMPILER_REVISION;
    var LAST_COMPATIBLE_COMPILER_REVISION = 7;

    exports.LAST_COMPATIBLE_COMPILER_REVISION = LAST_COMPATIBLE_COMPILER_REVISION;
    var REVISION_CHANGES = {
      1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
      2: '== 1.0.0-rc.3',
      3: '== 1.0.0-rc.4',
      4: '== 1.x.x',
      5: '== 2.0.0-alpha.x',
      6: '>= 2.0.0-beta.1',
      7: '>= 4.0.0 <4.3.0',
      8: '>= 4.3.0'
    };

    exports.REVISION_CHANGES = REVISION_CHANGES;
    var objectType = '[object Object]';

    function HandlebarsEnvironment(helpers, partials, decorators$$1) {
      this.helpers = helpers || {};
      this.partials = partials || {};
      this.decorators = decorators$$1 || {};

      helpers$1.registerDefaultHelpers(this);
      decorators.registerDefaultDecorators(this);
    }

    HandlebarsEnvironment.prototype = {
      constructor: HandlebarsEnvironment,

      logger: _logger2['default'],
      log: _logger2['default'].log,

      registerHelper: function registerHelper(name, fn) {
        if (utils.toString.call(name) === objectType) {
          if (fn) {
            throw new _exception2['default']('Arg not supported with multiple helpers');
          }
          utils.extend(this.helpers, name);
        } else {
          this.helpers[name] = fn;
        }
      },
      unregisterHelper: function unregisterHelper(name) {
        delete this.helpers[name];
      },

      registerPartial: function registerPartial(name, partial) {
        if (utils.toString.call(name) === objectType) {
          utils.extend(this.partials, name);
        } else {
          if (typeof partial === 'undefined') {
            throw new _exception2['default']('Attempting to register a partial called "' + name + '" as undefined');
          }
          this.partials[name] = partial;
        }
      },
      unregisterPartial: function unregisterPartial(name) {
        delete this.partials[name];
      },

      registerDecorator: function registerDecorator(name, fn) {
        if (utils.toString.call(name) === objectType) {
          if (fn) {
            throw new _exception2['default']('Arg not supported with multiple decorators');
          }
          utils.extend(this.decorators, name);
        } else {
          this.decorators[name] = fn;
        }
      },
      unregisterDecorator: function unregisterDecorator(name) {
        delete this.decorators[name];
      }
    };

    var log = _logger2['default'].log;

    exports.log = log;
    exports.createFrame = utils.createFrame;
    exports.logger = _logger2['default'];

    });

    unwrapExports(base);
    var base_1 = base.HandlebarsEnvironment;
    var base_2 = base.VERSION;
    var base_3 = base.COMPILER_REVISION;
    var base_4 = base.LAST_COMPATIBLE_COMPILER_REVISION;
    var base_5 = base.REVISION_CHANGES;
    var base_6 = base.log;
    var base_7 = base.createFrame;
    var base_8 = base.logger;

    var safeString = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    function SafeString(string) {
      this.string = string;
    }

    SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
      return '' + this.string;
    };

    exports['default'] = SafeString;
    module.exports = exports['default'];

    });

    unwrapExports(safeString);

    var runtime = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    exports.checkRevision = checkRevision;
    exports.template = template;
    exports.wrapProgram = wrapProgram;
    exports.resolvePartial = resolvePartial;
    exports.invokePartial = invokePartial;
    exports.noop = noop;
    // istanbul ignore next

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    // istanbul ignore next

    function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }



    var Utils = _interopRequireWildcard(utils);



    var _exception2 = _interopRequireDefault(exception);





    function checkRevision(compilerInfo) {
      var compilerRevision = compilerInfo && compilerInfo[0] || 1,
          currentRevision = base.COMPILER_REVISION;

      if (compilerRevision >= base.LAST_COMPATIBLE_COMPILER_REVISION && compilerRevision <= base.COMPILER_REVISION) {
        return;
      }

      if (compilerRevision < base.LAST_COMPATIBLE_COMPILER_REVISION) {
        var runtimeVersions = base.REVISION_CHANGES[currentRevision],
            compilerVersions = base.REVISION_CHANGES[compilerRevision];
        throw new _exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
      } else {
        // Use the embedded version info since the runtime doesn't know about this revision yet
        throw new _exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
      }
    }

    function template(templateSpec, env) {

      /* istanbul ignore next */
      if (!env) {
        throw new _exception2['default']('No environment passed to template');
      }
      if (!templateSpec || !templateSpec.main) {
        throw new _exception2['default']('Unknown template object: ' + typeof templateSpec);
      }

      templateSpec.main.decorator = templateSpec.main_d;

      // Note: Using env.VM references rather than local var references throughout this section to allow
      // for external users to override these as pseudo-supported APIs.
      env.VM.checkRevision(templateSpec.compiler);

      // backwards compatibility for precompiled templates with compiler-version 7 (<4.3.0)
      var templateWasPrecompiledWithCompilerV7 = templateSpec.compiler && templateSpec.compiler[0] === 7;

      function invokePartialWrapper(partial, context, options) {
        if (options.hash) {
          context = Utils.extend({}, context, options.hash);
          if (options.ids) {
            options.ids[0] = true;
          }
        }
        partial = env.VM.resolvePartial.call(this, partial, context, options);

        var optionsWithHooks = Utils.extend({}, options, { hooks: this.hooks });

        var result = env.VM.invokePartial.call(this, partial, context, optionsWithHooks);

        if (result == null && env.compile) {
          options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
          result = options.partials[options.name](context, optionsWithHooks);
        }
        if (result != null) {
          if (options.indent) {
            var lines = result.split('\n');
            for (var i = 0, l = lines.length; i < l; i++) {
              if (!lines[i] && i + 1 === l) {
                break;
              }

              lines[i] = options.indent + lines[i];
            }
            result = lines.join('\n');
          }
          return result;
        } else {
          throw new _exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
        }
      }

      // Just add water
      var container = {
        strict: function strict(obj, name, loc) {
          if (!obj || !(name in obj)) {
            throw new _exception2['default']('"' + name + '" not defined in ' + obj, { loc: loc });
          }
          return obj[name];
        },
        lookup: function lookup(depths, name) {
          var len = depths.length;
          for (var i = 0; i < len; i++) {
            if (depths[i] && depths[i][name] != null) {
              return depths[i][name];
            }
          }
        },
        lambda: function lambda(current, context) {
          return typeof current === 'function' ? current.call(context) : current;
        },

        escapeExpression: Utils.escapeExpression,
        invokePartial: invokePartialWrapper,

        fn: function fn(i) {
          var ret = templateSpec[i];
          ret.decorator = templateSpec[i + '_d'];
          return ret;
        },

        programs: [],
        program: function program(i, data, declaredBlockParams, blockParams, depths) {
          var programWrapper = this.programs[i],
              fn = this.fn(i);
          if (data || depths || blockParams || declaredBlockParams) {
            programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
          } else if (!programWrapper) {
            programWrapper = this.programs[i] = wrapProgram(this, i, fn);
          }
          return programWrapper;
        },

        data: function data(value, depth) {
          while (value && depth--) {
            value = value._parent;
          }
          return value;
        },
        // An empty object to use as replacement for null-contexts
        nullContext: Object.seal({}),

        noop: env.VM.noop,
        compilerInfo: templateSpec.compiler
      };

      function ret(context) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        var data = options.data;

        ret._setup(options);
        if (!options.partial && templateSpec.useData) {
          data = initData(context, data);
        }
        var depths = undefined,
            blockParams = templateSpec.useBlockParams ? [] : undefined;
        if (templateSpec.useDepths) {
          if (options.depths) {
            depths = context != options.depths[0] ? [context].concat(options.depths) : options.depths;
          } else {
            depths = [context];
          }
        }

        function main(context /*, options*/) {
          return '' + templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths);
        }
        main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
        return main(context, options);
      }
      ret.isTop = true;

      ret._setup = function (options) {
        if (!options.partial) {
          container.helpers = Utils.extend({}, env.helpers, options.helpers);

          if (templateSpec.usePartial) {
            container.partials = Utils.extend({}, env.partials, options.partials);
          }
          if (templateSpec.usePartial || templateSpec.useDecorators) {
            container.decorators = Utils.extend({}, env.decorators, options.decorators);
          }

          container.hooks = {};

          var keepHelperInHelpers = options.allowCallsToHelperMissing || templateWasPrecompiledWithCompilerV7;
          helpers$1.moveHelperToHooks(container, 'helperMissing', keepHelperInHelpers);
          helpers$1.moveHelperToHooks(container, 'blockHelperMissing', keepHelperInHelpers);
        } else {
          container.helpers = options.helpers;
          container.partials = options.partials;
          container.decorators = options.decorators;
          container.hooks = options.hooks;
        }
      };

      ret._child = function (i, data, blockParams, depths) {
        if (templateSpec.useBlockParams && !blockParams) {
          throw new _exception2['default']('must pass block params');
        }
        if (templateSpec.useDepths && !depths) {
          throw new _exception2['default']('must pass parent depths');
        }

        return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
      };
      return ret;
    }

    function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
      function prog(context) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        var currentDepths = depths;
        if (depths && context != depths[0] && !(context === container.nullContext && depths[0] === null)) {
          currentDepths = [context].concat(depths);
        }

        return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
      }

      prog = executeDecorators(fn, prog, container, depths, data, blockParams);

      prog.program = i;
      prog.depth = depths ? depths.length : 0;
      prog.blockParams = declaredBlockParams || 0;
      return prog;
    }

    /**
     * This is currently part of the official API, therefore implementation details should not be changed.
     */

    function resolvePartial(partial, context, options) {
      if (!partial) {
        if (options.name === '@partial-block') {
          partial = options.data['partial-block'];
        } else {
          partial = options.partials[options.name];
        }
      } else if (!partial.call && !options.name) {
        // This is a dynamic partial that returned a string
        options.name = partial;
        partial = options.partials[partial];
      }
      return partial;
    }

    function invokePartial(partial, context, options) {
      // Use the current closure context to save the partial-block if this partial
      var currentPartialBlock = options.data && options.data['partial-block'];
      options.partial = true;
      if (options.ids) {
        options.data.contextPath = options.ids[0] || options.data.contextPath;
      }

      var partialBlock = undefined;
      if (options.fn && options.fn !== noop) {
        (function () {
          options.data = base.createFrame(options.data);
          // Wrapper function to get access to currentPartialBlock from the closure
          var fn = options.fn;
          partialBlock = options.data['partial-block'] = function partialBlockWrapper(context) {
            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            // Restore the partial-block from the closure for the execution of the block
            // i.e. the part inside the block of the partial call.
            options.data = base.createFrame(options.data);
            options.data['partial-block'] = currentPartialBlock;
            return fn(context, options);
          };
          if (fn.partials) {
            options.partials = Utils.extend({}, options.partials, fn.partials);
          }
        })();
      }

      if (partial === undefined && partialBlock) {
        partial = partialBlock;
      }

      if (partial === undefined) {
        throw new _exception2['default']('The partial ' + options.name + ' could not be found');
      } else if (partial instanceof Function) {
        return partial(context, options);
      }
    }

    function noop() {
      return '';
    }

    function initData(context, data) {
      if (!data || !('root' in data)) {
        data = data ? base.createFrame(data) : {};
        data.root = context;
      }
      return data;
    }

    function executeDecorators(fn, prog, container, depths, data, blockParams) {
      if (fn.decorator) {
        var props = {};
        prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
        Utils.extend(prog, props);
      }
      return prog;
    }

    });

    unwrapExports(runtime);
    var runtime_1 = runtime.checkRevision;
    var runtime_2 = runtime.template;
    var runtime_3 = runtime.wrapProgram;
    var runtime_4 = runtime.resolvePartial;
    var runtime_5 = runtime.invokePartial;
    var runtime_6 = runtime.noop;

    var noConflict = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;

    exports['default'] = function (Handlebars) {
      /* istanbul ignore next */
      var root = typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : window,
          $Handlebars = root.Handlebars;
      /* istanbul ignore next */
      Handlebars.noConflict = function () {
        if (root.Handlebars === Handlebars) {
          root.Handlebars = $Handlebars;
        }
        return Handlebars;
      };
    };

    module.exports = exports['default'];

    });

    unwrapExports(noConflict);

    var handlebars_runtime = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    // istanbul ignore next

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    // istanbul ignore next

    function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }



    var base$$1 = _interopRequireWildcard(base);

    // Each of these augment the Handlebars object. No need to setup here.
    // (This is done to easily share code between commonjs and browse envs)



    var _handlebarsSafeString2 = _interopRequireDefault(safeString);



    var _handlebarsException2 = _interopRequireDefault(exception);



    var Utils = _interopRequireWildcard(utils);



    var runtime$$1 = _interopRequireWildcard(runtime);



    var _handlebarsNoConflict2 = _interopRequireDefault(noConflict);

    // For compatibility and usage outside of module systems, make the Handlebars object a namespace
    function create() {
      var hb = new base$$1.HandlebarsEnvironment();

      Utils.extend(hb, base$$1);
      hb.SafeString = _handlebarsSafeString2['default'];
      hb.Exception = _handlebarsException2['default'];
      hb.Utils = Utils;
      hb.escapeExpression = Utils.escapeExpression;

      hb.VM = runtime$$1;
      hb.template = function (spec) {
        return runtime$$1.template(spec, hb);
      };

      return hb;
    }

    var inst = create();
    inst.create = create;

    _handlebarsNoConflict2['default'](inst);

    inst['default'] = inst;

    exports['default'] = inst;
    module.exports = exports['default'];

    });

    unwrapExports(handlebars_runtime);

    var ast = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    var AST = {
      // Public API used to evaluate derived attributes regarding AST nodes
      helpers: {
        // a mustache is definitely a helper if:
        // * it is an eligible helper, and
        // * it has at least one parameter or hash segment
        helperExpression: function helperExpression(node) {
          return node.type === 'SubExpression' || (node.type === 'MustacheStatement' || node.type === 'BlockStatement') && !!(node.params && node.params.length || node.hash);
        },

        scopedId: function scopedId(path$$1) {
          return (/^\.|this\b/.test(path$$1.original)
          );
        },

        // an ID is simple if it only has one part, and that part is not
        // `..` or `this`.
        simpleId: function simpleId(path$$1) {
          return path$$1.parts.length === 1 && !AST.helpers.scopedId(path$$1) && !path$$1.depth;
        }
      }
    };

    // Must be exported as an object rather than the root of the module as the jison lexer
    // must modify the object to operate properly.
    exports['default'] = AST;
    module.exports = exports['default'];

    });

    unwrapExports(ast);

    var parser = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    var handlebars = (function () {
        var parser = { trace: function trace() {},
            yy: {},
            symbols_: { "error": 2, "root": 3, "program": 4, "EOF": 5, "program_repetition0": 6, "statement": 7, "mustache": 8, "block": 9, "rawBlock": 10, "partial": 11, "partialBlock": 12, "content": 13, "COMMENT": 14, "CONTENT": 15, "openRawBlock": 16, "rawBlock_repetition0": 17, "END_RAW_BLOCK": 18, "OPEN_RAW_BLOCK": 19, "helperName": 20, "openRawBlock_repetition0": 21, "openRawBlock_option0": 22, "CLOSE_RAW_BLOCK": 23, "openBlock": 24, "block_option0": 25, "closeBlock": 26, "openInverse": 27, "block_option1": 28, "OPEN_BLOCK": 29, "openBlock_repetition0": 30, "openBlock_option0": 31, "openBlock_option1": 32, "CLOSE": 33, "OPEN_INVERSE": 34, "openInverse_repetition0": 35, "openInverse_option0": 36, "openInverse_option1": 37, "openInverseChain": 38, "OPEN_INVERSE_CHAIN": 39, "openInverseChain_repetition0": 40, "openInverseChain_option0": 41, "openInverseChain_option1": 42, "inverseAndProgram": 43, "INVERSE": 44, "inverseChain": 45, "inverseChain_option0": 46, "OPEN_ENDBLOCK": 47, "OPEN": 48, "mustache_repetition0": 49, "mustache_option0": 50, "OPEN_UNESCAPED": 51, "mustache_repetition1": 52, "mustache_option1": 53, "CLOSE_UNESCAPED": 54, "OPEN_PARTIAL": 55, "partialName": 56, "partial_repetition0": 57, "partial_option0": 58, "openPartialBlock": 59, "OPEN_PARTIAL_BLOCK": 60, "openPartialBlock_repetition0": 61, "openPartialBlock_option0": 62, "param": 63, "sexpr": 64, "OPEN_SEXPR": 65, "sexpr_repetition0": 66, "sexpr_option0": 67, "CLOSE_SEXPR": 68, "hash": 69, "hash_repetition_plus0": 70, "hashSegment": 71, "ID": 72, "EQUALS": 73, "blockParams": 74, "OPEN_BLOCK_PARAMS": 75, "blockParams_repetition_plus0": 76, "CLOSE_BLOCK_PARAMS": 77, "path": 78, "dataName": 79, "STRING": 80, "NUMBER": 81, "BOOLEAN": 82, "UNDEFINED": 83, "NULL": 84, "DATA": 85, "pathSegments": 86, "SEP": 87, "$accept": 0, "$end": 1 },
            terminals_: { 2: "error", 5: "EOF", 14: "COMMENT", 15: "CONTENT", 18: "END_RAW_BLOCK", 19: "OPEN_RAW_BLOCK", 23: "CLOSE_RAW_BLOCK", 29: "OPEN_BLOCK", 33: "CLOSE", 34: "OPEN_INVERSE", 39: "OPEN_INVERSE_CHAIN", 44: "INVERSE", 47: "OPEN_ENDBLOCK", 48: "OPEN", 51: "OPEN_UNESCAPED", 54: "CLOSE_UNESCAPED", 55: "OPEN_PARTIAL", 60: "OPEN_PARTIAL_BLOCK", 65: "OPEN_SEXPR", 68: "CLOSE_SEXPR", 72: "ID", 73: "EQUALS", 75: "OPEN_BLOCK_PARAMS", 77: "CLOSE_BLOCK_PARAMS", 80: "STRING", 81: "NUMBER", 82: "BOOLEAN", 83: "UNDEFINED", 84: "NULL", 85: "DATA", 87: "SEP" },
            productions_: [0, [3, 2], [4, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [13, 1], [10, 3], [16, 5], [9, 4], [9, 4], [24, 6], [27, 6], [38, 6], [43, 2], [45, 3], [45, 1], [26, 3], [8, 5], [8, 5], [11, 5], [12, 3], [59, 5], [63, 1], [63, 1], [64, 5], [69, 1], [71, 3], [74, 3], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [56, 1], [56, 1], [79, 2], [78, 1], [86, 3], [86, 1], [6, 0], [6, 2], [17, 0], [17, 2], [21, 0], [21, 2], [22, 0], [22, 1], [25, 0], [25, 1], [28, 0], [28, 1], [30, 0], [30, 2], [31, 0], [31, 1], [32, 0], [32, 1], [35, 0], [35, 2], [36, 0], [36, 1], [37, 0], [37, 1], [40, 0], [40, 2], [41, 0], [41, 1], [42, 0], [42, 1], [46, 0], [46, 1], [49, 0], [49, 2], [50, 0], [50, 1], [52, 0], [52, 2], [53, 0], [53, 1], [57, 0], [57, 2], [58, 0], [58, 1], [61, 0], [61, 2], [62, 0], [62, 1], [66, 0], [66, 2], [67, 0], [67, 1], [70, 1], [70, 2], [76, 1], [76, 2]],
            performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$) {

                var $0 = $$.length - 1;
                switch (yystate) {
                    case 1:
                        return $$[$0 - 1];
                        break;
                    case 2:
                        this.$ = yy.prepareProgram($$[$0]);
                        break;
                    case 3:
                        this.$ = $$[$0];
                        break;
                    case 4:
                        this.$ = $$[$0];
                        break;
                    case 5:
                        this.$ = $$[$0];
                        break;
                    case 6:
                        this.$ = $$[$0];
                        break;
                    case 7:
                        this.$ = $$[$0];
                        break;
                    case 8:
                        this.$ = $$[$0];
                        break;
                    case 9:
                        this.$ = {
                            type: 'CommentStatement',
                            value: yy.stripComment($$[$0]),
                            strip: yy.stripFlags($$[$0], $$[$0]),
                            loc: yy.locInfo(this._$)
                        };

                        break;
                    case 10:
                        this.$ = {
                            type: 'ContentStatement',
                            original: $$[$0],
                            value: $$[$0],
                            loc: yy.locInfo(this._$)
                        };

                        break;
                    case 11:
                        this.$ = yy.prepareRawBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
                        break;
                    case 12:
                        this.$ = { path: $$[$0 - 3], params: $$[$0 - 2], hash: $$[$0 - 1] };
                        break;
                    case 13:
                        this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], false, this._$);
                        break;
                    case 14:
                        this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], true, this._$);
                        break;
                    case 15:
                        this.$ = { open: $$[$0 - 5], path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
                        break;
                    case 16:
                        this.$ = { path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
                        break;
                    case 17:
                        this.$ = { path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
                        break;
                    case 18:
                        this.$ = { strip: yy.stripFlags($$[$0 - 1], $$[$0 - 1]), program: $$[$0] };
                        break;
                    case 19:
                        var inverse = yy.prepareBlock($$[$0 - 2], $$[$0 - 1], $$[$0], $$[$0], false, this._$),
                            program = yy.prepareProgram([inverse], $$[$0 - 1].loc);
                        program.chained = true;

                        this.$ = { strip: $$[$0 - 2].strip, program: program, chain: true };

                        break;
                    case 20:
                        this.$ = $$[$0];
                        break;
                    case 21:
                        this.$ = { path: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 2], $$[$0]) };
                        break;
                    case 22:
                        this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
                        break;
                    case 23:
                        this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
                        break;
                    case 24:
                        this.$ = {
                            type: 'PartialStatement',
                            name: $$[$0 - 3],
                            params: $$[$0 - 2],
                            hash: $$[$0 - 1],
                            indent: '',
                            strip: yy.stripFlags($$[$0 - 4], $$[$0]),
                            loc: yy.locInfo(this._$)
                        };

                        break;
                    case 25:
                        this.$ = yy.preparePartialBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
                        break;
                    case 26:
                        this.$ = { path: $$[$0 - 3], params: $$[$0 - 2], hash: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 4], $$[$0]) };
                        break;
                    case 27:
                        this.$ = $$[$0];
                        break;
                    case 28:
                        this.$ = $$[$0];
                        break;
                    case 29:
                        this.$ = {
                            type: 'SubExpression',
                            path: $$[$0 - 3],
                            params: $$[$0 - 2],
                            hash: $$[$0 - 1],
                            loc: yy.locInfo(this._$)
                        };

                        break;
                    case 30:
                        this.$ = { type: 'Hash', pairs: $$[$0], loc: yy.locInfo(this._$) };
                        break;
                    case 31:
                        this.$ = { type: 'HashPair', key: yy.id($$[$0 - 2]), value: $$[$0], loc: yy.locInfo(this._$) };
                        break;
                    case 32:
                        this.$ = yy.id($$[$0 - 1]);
                        break;
                    case 33:
                        this.$ = $$[$0];
                        break;
                    case 34:
                        this.$ = $$[$0];
                        break;
                    case 35:
                        this.$ = { type: 'StringLiteral', value: $$[$0], original: $$[$0], loc: yy.locInfo(this._$) };
                        break;
                    case 36:
                        this.$ = { type: 'NumberLiteral', value: Number($$[$0]), original: Number($$[$0]), loc: yy.locInfo(this._$) };
                        break;
                    case 37:
                        this.$ = { type: 'BooleanLiteral', value: $$[$0] === 'true', original: $$[$0] === 'true', loc: yy.locInfo(this._$) };
                        break;
                    case 38:
                        this.$ = { type: 'UndefinedLiteral', original: undefined, value: undefined, loc: yy.locInfo(this._$) };
                        break;
                    case 39:
                        this.$ = { type: 'NullLiteral', original: null, value: null, loc: yy.locInfo(this._$) };
                        break;
                    case 40:
                        this.$ = $$[$0];
                        break;
                    case 41:
                        this.$ = $$[$0];
                        break;
                    case 42:
                        this.$ = yy.preparePath(true, $$[$0], this._$);
                        break;
                    case 43:
                        this.$ = yy.preparePath(false, $$[$0], this._$);
                        break;
                    case 44:
                        $$[$0 - 2].push({ part: yy.id($$[$0]), original: $$[$0], separator: $$[$0 - 1] });this.$ = $$[$0 - 2];
                        break;
                    case 45:
                        this.$ = [{ part: yy.id($$[$0]), original: $$[$0] }];
                        break;
                    case 46:
                        this.$ = [];
                        break;
                    case 47:
                        $$[$0 - 1].push($$[$0]);
                        break;
                    case 48:
                        this.$ = [];
                        break;
                    case 49:
                        $$[$0 - 1].push($$[$0]);
                        break;
                    case 50:
                        this.$ = [];
                        break;
                    case 51:
                        $$[$0 - 1].push($$[$0]);
                        break;
                    case 58:
                        this.$ = [];
                        break;
                    case 59:
                        $$[$0 - 1].push($$[$0]);
                        break;
                    case 64:
                        this.$ = [];
                        break;
                    case 65:
                        $$[$0 - 1].push($$[$0]);
                        break;
                    case 70:
                        this.$ = [];
                        break;
                    case 71:
                        $$[$0 - 1].push($$[$0]);
                        break;
                    case 78:
                        this.$ = [];
                        break;
                    case 79:
                        $$[$0 - 1].push($$[$0]);
                        break;
                    case 82:
                        this.$ = [];
                        break;
                    case 83:
                        $$[$0 - 1].push($$[$0]);
                        break;
                    case 86:
                        this.$ = [];
                        break;
                    case 87:
                        $$[$0 - 1].push($$[$0]);
                        break;
                    case 90:
                        this.$ = [];
                        break;
                    case 91:
                        $$[$0 - 1].push($$[$0]);
                        break;
                    case 94:
                        this.$ = [];
                        break;
                    case 95:
                        $$[$0 - 1].push($$[$0]);
                        break;
                    case 98:
                        this.$ = [$$[$0]];
                        break;
                    case 99:
                        $$[$0 - 1].push($$[$0]);
                        break;
                    case 100:
                        this.$ = [$$[$0]];
                        break;
                    case 101:
                        $$[$0 - 1].push($$[$0]);
                        break;
                }
            },
            table: [{ 3: 1, 4: 2, 5: [2, 46], 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 1: [3] }, { 5: [1, 4] }, { 5: [2, 2], 7: 5, 8: 6, 9: 7, 10: 8, 11: 9, 12: 10, 13: 11, 14: [1, 12], 15: [1, 20], 16: 17, 19: [1, 23], 24: 15, 27: 16, 29: [1, 21], 34: [1, 22], 39: [2, 2], 44: [2, 2], 47: [2, 2], 48: [1, 13], 51: [1, 14], 55: [1, 18], 59: 19, 60: [1, 24] }, { 1: [2, 1] }, { 5: [2, 47], 14: [2, 47], 15: [2, 47], 19: [2, 47], 29: [2, 47], 34: [2, 47], 39: [2, 47], 44: [2, 47], 47: [2, 47], 48: [2, 47], 51: [2, 47], 55: [2, 47], 60: [2, 47] }, { 5: [2, 3], 14: [2, 3], 15: [2, 3], 19: [2, 3], 29: [2, 3], 34: [2, 3], 39: [2, 3], 44: [2, 3], 47: [2, 3], 48: [2, 3], 51: [2, 3], 55: [2, 3], 60: [2, 3] }, { 5: [2, 4], 14: [2, 4], 15: [2, 4], 19: [2, 4], 29: [2, 4], 34: [2, 4], 39: [2, 4], 44: [2, 4], 47: [2, 4], 48: [2, 4], 51: [2, 4], 55: [2, 4], 60: [2, 4] }, { 5: [2, 5], 14: [2, 5], 15: [2, 5], 19: [2, 5], 29: [2, 5], 34: [2, 5], 39: [2, 5], 44: [2, 5], 47: [2, 5], 48: [2, 5], 51: [2, 5], 55: [2, 5], 60: [2, 5] }, { 5: [2, 6], 14: [2, 6], 15: [2, 6], 19: [2, 6], 29: [2, 6], 34: [2, 6], 39: [2, 6], 44: [2, 6], 47: [2, 6], 48: [2, 6], 51: [2, 6], 55: [2, 6], 60: [2, 6] }, { 5: [2, 7], 14: [2, 7], 15: [2, 7], 19: [2, 7], 29: [2, 7], 34: [2, 7], 39: [2, 7], 44: [2, 7], 47: [2, 7], 48: [2, 7], 51: [2, 7], 55: [2, 7], 60: [2, 7] }, { 5: [2, 8], 14: [2, 8], 15: [2, 8], 19: [2, 8], 29: [2, 8], 34: [2, 8], 39: [2, 8], 44: [2, 8], 47: [2, 8], 48: [2, 8], 51: [2, 8], 55: [2, 8], 60: [2, 8] }, { 5: [2, 9], 14: [2, 9], 15: [2, 9], 19: [2, 9], 29: [2, 9], 34: [2, 9], 39: [2, 9], 44: [2, 9], 47: [2, 9], 48: [2, 9], 51: [2, 9], 55: [2, 9], 60: [2, 9] }, { 20: 25, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 36, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 37, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 39: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 4: 38, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 15: [2, 48], 17: 39, 18: [2, 48] }, { 20: 41, 56: 40, 64: 42, 65: [1, 43], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 44, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 5: [2, 10], 14: [2, 10], 15: [2, 10], 18: [2, 10], 19: [2, 10], 29: [2, 10], 34: [2, 10], 39: [2, 10], 44: [2, 10], 47: [2, 10], 48: [2, 10], 51: [2, 10], 55: [2, 10], 60: [2, 10] }, { 20: 45, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 46, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 47, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 41, 56: 48, 64: 42, 65: [1, 43], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [2, 78], 49: 49, 65: [2, 78], 72: [2, 78], 80: [2, 78], 81: [2, 78], 82: [2, 78], 83: [2, 78], 84: [2, 78], 85: [2, 78] }, { 23: [2, 33], 33: [2, 33], 54: [2, 33], 65: [2, 33], 68: [2, 33], 72: [2, 33], 75: [2, 33], 80: [2, 33], 81: [2, 33], 82: [2, 33], 83: [2, 33], 84: [2, 33], 85: [2, 33] }, { 23: [2, 34], 33: [2, 34], 54: [2, 34], 65: [2, 34], 68: [2, 34], 72: [2, 34], 75: [2, 34], 80: [2, 34], 81: [2, 34], 82: [2, 34], 83: [2, 34], 84: [2, 34], 85: [2, 34] }, { 23: [2, 35], 33: [2, 35], 54: [2, 35], 65: [2, 35], 68: [2, 35], 72: [2, 35], 75: [2, 35], 80: [2, 35], 81: [2, 35], 82: [2, 35], 83: [2, 35], 84: [2, 35], 85: [2, 35] }, { 23: [2, 36], 33: [2, 36], 54: [2, 36], 65: [2, 36], 68: [2, 36], 72: [2, 36], 75: [2, 36], 80: [2, 36], 81: [2, 36], 82: [2, 36], 83: [2, 36], 84: [2, 36], 85: [2, 36] }, { 23: [2, 37], 33: [2, 37], 54: [2, 37], 65: [2, 37], 68: [2, 37], 72: [2, 37], 75: [2, 37], 80: [2, 37], 81: [2, 37], 82: [2, 37], 83: [2, 37], 84: [2, 37], 85: [2, 37] }, { 23: [2, 38], 33: [2, 38], 54: [2, 38], 65: [2, 38], 68: [2, 38], 72: [2, 38], 75: [2, 38], 80: [2, 38], 81: [2, 38], 82: [2, 38], 83: [2, 38], 84: [2, 38], 85: [2, 38] }, { 23: [2, 39], 33: [2, 39], 54: [2, 39], 65: [2, 39], 68: [2, 39], 72: [2, 39], 75: [2, 39], 80: [2, 39], 81: [2, 39], 82: [2, 39], 83: [2, 39], 84: [2, 39], 85: [2, 39] }, { 23: [2, 43], 33: [2, 43], 54: [2, 43], 65: [2, 43], 68: [2, 43], 72: [2, 43], 75: [2, 43], 80: [2, 43], 81: [2, 43], 82: [2, 43], 83: [2, 43], 84: [2, 43], 85: [2, 43], 87: [1, 50] }, { 72: [1, 35], 86: 51 }, { 23: [2, 45], 33: [2, 45], 54: [2, 45], 65: [2, 45], 68: [2, 45], 72: [2, 45], 75: [2, 45], 80: [2, 45], 81: [2, 45], 82: [2, 45], 83: [2, 45], 84: [2, 45], 85: [2, 45], 87: [2, 45] }, { 52: 52, 54: [2, 82], 65: [2, 82], 72: [2, 82], 80: [2, 82], 81: [2, 82], 82: [2, 82], 83: [2, 82], 84: [2, 82], 85: [2, 82] }, { 25: 53, 38: 55, 39: [1, 57], 43: 56, 44: [1, 58], 45: 54, 47: [2, 54] }, { 28: 59, 43: 60, 44: [1, 58], 47: [2, 56] }, { 13: 62, 15: [1, 20], 18: [1, 61] }, { 33: [2, 86], 57: 63, 65: [2, 86], 72: [2, 86], 80: [2, 86], 81: [2, 86], 82: [2, 86], 83: [2, 86], 84: [2, 86], 85: [2, 86] }, { 33: [2, 40], 65: [2, 40], 72: [2, 40], 80: [2, 40], 81: [2, 40], 82: [2, 40], 83: [2, 40], 84: [2, 40], 85: [2, 40] }, { 33: [2, 41], 65: [2, 41], 72: [2, 41], 80: [2, 41], 81: [2, 41], 82: [2, 41], 83: [2, 41], 84: [2, 41], 85: [2, 41] }, { 20: 64, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 26: 65, 47: [1, 66] }, { 30: 67, 33: [2, 58], 65: [2, 58], 72: [2, 58], 75: [2, 58], 80: [2, 58], 81: [2, 58], 82: [2, 58], 83: [2, 58], 84: [2, 58], 85: [2, 58] }, { 33: [2, 64], 35: 68, 65: [2, 64], 72: [2, 64], 75: [2, 64], 80: [2, 64], 81: [2, 64], 82: [2, 64], 83: [2, 64], 84: [2, 64], 85: [2, 64] }, { 21: 69, 23: [2, 50], 65: [2, 50], 72: [2, 50], 80: [2, 50], 81: [2, 50], 82: [2, 50], 83: [2, 50], 84: [2, 50], 85: [2, 50] }, { 33: [2, 90], 61: 70, 65: [2, 90], 72: [2, 90], 80: [2, 90], 81: [2, 90], 82: [2, 90], 83: [2, 90], 84: [2, 90], 85: [2, 90] }, { 20: 74, 33: [2, 80], 50: 71, 63: 72, 64: 75, 65: [1, 43], 69: 73, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 72: [1, 79] }, { 23: [2, 42], 33: [2, 42], 54: [2, 42], 65: [2, 42], 68: [2, 42], 72: [2, 42], 75: [2, 42], 80: [2, 42], 81: [2, 42], 82: [2, 42], 83: [2, 42], 84: [2, 42], 85: [2, 42], 87: [1, 50] }, { 20: 74, 53: 80, 54: [2, 84], 63: 81, 64: 75, 65: [1, 43], 69: 82, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 26: 83, 47: [1, 66] }, { 47: [2, 55] }, { 4: 84, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 39: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 47: [2, 20] }, { 20: 85, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 86, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 26: 87, 47: [1, 66] }, { 47: [2, 57] }, { 5: [2, 11], 14: [2, 11], 15: [2, 11], 19: [2, 11], 29: [2, 11], 34: [2, 11], 39: [2, 11], 44: [2, 11], 47: [2, 11], 48: [2, 11], 51: [2, 11], 55: [2, 11], 60: [2, 11] }, { 15: [2, 49], 18: [2, 49] }, { 20: 74, 33: [2, 88], 58: 88, 63: 89, 64: 75, 65: [1, 43], 69: 90, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 65: [2, 94], 66: 91, 68: [2, 94], 72: [2, 94], 80: [2, 94], 81: [2, 94], 82: [2, 94], 83: [2, 94], 84: [2, 94], 85: [2, 94] }, { 5: [2, 25], 14: [2, 25], 15: [2, 25], 19: [2, 25], 29: [2, 25], 34: [2, 25], 39: [2, 25], 44: [2, 25], 47: [2, 25], 48: [2, 25], 51: [2, 25], 55: [2, 25], 60: [2, 25] }, { 20: 92, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 31: 93, 33: [2, 60], 63: 94, 64: 75, 65: [1, 43], 69: 95, 70: 76, 71: 77, 72: [1, 78], 75: [2, 60], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 33: [2, 66], 36: 96, 63: 97, 64: 75, 65: [1, 43], 69: 98, 70: 76, 71: 77, 72: [1, 78], 75: [2, 66], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 22: 99, 23: [2, 52], 63: 100, 64: 75, 65: [1, 43], 69: 101, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 33: [2, 92], 62: 102, 63: 103, 64: 75, 65: [1, 43], 69: 104, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [1, 105] }, { 33: [2, 79], 65: [2, 79], 72: [2, 79], 80: [2, 79], 81: [2, 79], 82: [2, 79], 83: [2, 79], 84: [2, 79], 85: [2, 79] }, { 33: [2, 81] }, { 23: [2, 27], 33: [2, 27], 54: [2, 27], 65: [2, 27], 68: [2, 27], 72: [2, 27], 75: [2, 27], 80: [2, 27], 81: [2, 27], 82: [2, 27], 83: [2, 27], 84: [2, 27], 85: [2, 27] }, { 23: [2, 28], 33: [2, 28], 54: [2, 28], 65: [2, 28], 68: [2, 28], 72: [2, 28], 75: [2, 28], 80: [2, 28], 81: [2, 28], 82: [2, 28], 83: [2, 28], 84: [2, 28], 85: [2, 28] }, { 23: [2, 30], 33: [2, 30], 54: [2, 30], 68: [2, 30], 71: 106, 72: [1, 107], 75: [2, 30] }, { 23: [2, 98], 33: [2, 98], 54: [2, 98], 68: [2, 98], 72: [2, 98], 75: [2, 98] }, { 23: [2, 45], 33: [2, 45], 54: [2, 45], 65: [2, 45], 68: [2, 45], 72: [2, 45], 73: [1, 108], 75: [2, 45], 80: [2, 45], 81: [2, 45], 82: [2, 45], 83: [2, 45], 84: [2, 45], 85: [2, 45], 87: [2, 45] }, { 23: [2, 44], 33: [2, 44], 54: [2, 44], 65: [2, 44], 68: [2, 44], 72: [2, 44], 75: [2, 44], 80: [2, 44], 81: [2, 44], 82: [2, 44], 83: [2, 44], 84: [2, 44], 85: [2, 44], 87: [2, 44] }, { 54: [1, 109] }, { 54: [2, 83], 65: [2, 83], 72: [2, 83], 80: [2, 83], 81: [2, 83], 82: [2, 83], 83: [2, 83], 84: [2, 83], 85: [2, 83] }, { 54: [2, 85] }, { 5: [2, 13], 14: [2, 13], 15: [2, 13], 19: [2, 13], 29: [2, 13], 34: [2, 13], 39: [2, 13], 44: [2, 13], 47: [2, 13], 48: [2, 13], 51: [2, 13], 55: [2, 13], 60: [2, 13] }, { 38: 55, 39: [1, 57], 43: 56, 44: [1, 58], 45: 111, 46: 110, 47: [2, 76] }, { 33: [2, 70], 40: 112, 65: [2, 70], 72: [2, 70], 75: [2, 70], 80: [2, 70], 81: [2, 70], 82: [2, 70], 83: [2, 70], 84: [2, 70], 85: [2, 70] }, { 47: [2, 18] }, { 5: [2, 14], 14: [2, 14], 15: [2, 14], 19: [2, 14], 29: [2, 14], 34: [2, 14], 39: [2, 14], 44: [2, 14], 47: [2, 14], 48: [2, 14], 51: [2, 14], 55: [2, 14], 60: [2, 14] }, { 33: [1, 113] }, { 33: [2, 87], 65: [2, 87], 72: [2, 87], 80: [2, 87], 81: [2, 87], 82: [2, 87], 83: [2, 87], 84: [2, 87], 85: [2, 87] }, { 33: [2, 89] }, { 20: 74, 63: 115, 64: 75, 65: [1, 43], 67: 114, 68: [2, 96], 69: 116, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [1, 117] }, { 32: 118, 33: [2, 62], 74: 119, 75: [1, 120] }, { 33: [2, 59], 65: [2, 59], 72: [2, 59], 75: [2, 59], 80: [2, 59], 81: [2, 59], 82: [2, 59], 83: [2, 59], 84: [2, 59], 85: [2, 59] }, { 33: [2, 61], 75: [2, 61] }, { 33: [2, 68], 37: 121, 74: 122, 75: [1, 120] }, { 33: [2, 65], 65: [2, 65], 72: [2, 65], 75: [2, 65], 80: [2, 65], 81: [2, 65], 82: [2, 65], 83: [2, 65], 84: [2, 65], 85: [2, 65] }, { 33: [2, 67], 75: [2, 67] }, { 23: [1, 123] }, { 23: [2, 51], 65: [2, 51], 72: [2, 51], 80: [2, 51], 81: [2, 51], 82: [2, 51], 83: [2, 51], 84: [2, 51], 85: [2, 51] }, { 23: [2, 53] }, { 33: [1, 124] }, { 33: [2, 91], 65: [2, 91], 72: [2, 91], 80: [2, 91], 81: [2, 91], 82: [2, 91], 83: [2, 91], 84: [2, 91], 85: [2, 91] }, { 33: [2, 93] }, { 5: [2, 22], 14: [2, 22], 15: [2, 22], 19: [2, 22], 29: [2, 22], 34: [2, 22], 39: [2, 22], 44: [2, 22], 47: [2, 22], 48: [2, 22], 51: [2, 22], 55: [2, 22], 60: [2, 22] }, { 23: [2, 99], 33: [2, 99], 54: [2, 99], 68: [2, 99], 72: [2, 99], 75: [2, 99] }, { 73: [1, 108] }, { 20: 74, 63: 125, 64: 75, 65: [1, 43], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 5: [2, 23], 14: [2, 23], 15: [2, 23], 19: [2, 23], 29: [2, 23], 34: [2, 23], 39: [2, 23], 44: [2, 23], 47: [2, 23], 48: [2, 23], 51: [2, 23], 55: [2, 23], 60: [2, 23] }, { 47: [2, 19] }, { 47: [2, 77] }, { 20: 74, 33: [2, 72], 41: 126, 63: 127, 64: 75, 65: [1, 43], 69: 128, 70: 76, 71: 77, 72: [1, 78], 75: [2, 72], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 5: [2, 24], 14: [2, 24], 15: [2, 24], 19: [2, 24], 29: [2, 24], 34: [2, 24], 39: [2, 24], 44: [2, 24], 47: [2, 24], 48: [2, 24], 51: [2, 24], 55: [2, 24], 60: [2, 24] }, { 68: [1, 129] }, { 65: [2, 95], 68: [2, 95], 72: [2, 95], 80: [2, 95], 81: [2, 95], 82: [2, 95], 83: [2, 95], 84: [2, 95], 85: [2, 95] }, { 68: [2, 97] }, { 5: [2, 21], 14: [2, 21], 15: [2, 21], 19: [2, 21], 29: [2, 21], 34: [2, 21], 39: [2, 21], 44: [2, 21], 47: [2, 21], 48: [2, 21], 51: [2, 21], 55: [2, 21], 60: [2, 21] }, { 33: [1, 130] }, { 33: [2, 63] }, { 72: [1, 132], 76: 131 }, { 33: [1, 133] }, { 33: [2, 69] }, { 15: [2, 12], 18: [2, 12] }, { 14: [2, 26], 15: [2, 26], 19: [2, 26], 29: [2, 26], 34: [2, 26], 47: [2, 26], 48: [2, 26], 51: [2, 26], 55: [2, 26], 60: [2, 26] }, { 23: [2, 31], 33: [2, 31], 54: [2, 31], 68: [2, 31], 72: [2, 31], 75: [2, 31] }, { 33: [2, 74], 42: 134, 74: 135, 75: [1, 120] }, { 33: [2, 71], 65: [2, 71], 72: [2, 71], 75: [2, 71], 80: [2, 71], 81: [2, 71], 82: [2, 71], 83: [2, 71], 84: [2, 71], 85: [2, 71] }, { 33: [2, 73], 75: [2, 73] }, { 23: [2, 29], 33: [2, 29], 54: [2, 29], 65: [2, 29], 68: [2, 29], 72: [2, 29], 75: [2, 29], 80: [2, 29], 81: [2, 29], 82: [2, 29], 83: [2, 29], 84: [2, 29], 85: [2, 29] }, { 14: [2, 15], 15: [2, 15], 19: [2, 15], 29: [2, 15], 34: [2, 15], 39: [2, 15], 44: [2, 15], 47: [2, 15], 48: [2, 15], 51: [2, 15], 55: [2, 15], 60: [2, 15] }, { 72: [1, 137], 77: [1, 136] }, { 72: [2, 100], 77: [2, 100] }, { 14: [2, 16], 15: [2, 16], 19: [2, 16], 29: [2, 16], 34: [2, 16], 44: [2, 16], 47: [2, 16], 48: [2, 16], 51: [2, 16], 55: [2, 16], 60: [2, 16] }, { 33: [1, 138] }, { 33: [2, 75] }, { 33: [2, 32] }, { 72: [2, 101], 77: [2, 101] }, { 14: [2, 17], 15: [2, 17], 19: [2, 17], 29: [2, 17], 34: [2, 17], 39: [2, 17], 44: [2, 17], 47: [2, 17], 48: [2, 17], 51: [2, 17], 55: [2, 17], 60: [2, 17] }],
            defaultActions: { 4: [2, 1], 54: [2, 55], 56: [2, 20], 60: [2, 57], 73: [2, 81], 82: [2, 85], 86: [2, 18], 90: [2, 89], 101: [2, 53], 104: [2, 93], 110: [2, 19], 111: [2, 77], 116: [2, 97], 119: [2, 63], 122: [2, 69], 135: [2, 75], 136: [2, 32] },
            parseError: function parseError(str, hash) {
                throw new Error(str);
            },
            parse: function parse(input) {
                var self = this,
                    stack = [0],
                    vstack = [null],
                    lstack = [],
                    table = this.table,
                    yytext = "",
                    yylineno = 0,
                    yyleng = 0,
                    recovering = 0;
                this.lexer.setInput(input);
                this.lexer.yy = this.yy;
                this.yy.lexer = this.lexer;
                this.yy.parser = this;
                if (typeof this.lexer.yylloc == "undefined") this.lexer.yylloc = {};
                var yyloc = this.lexer.yylloc;
                lstack.push(yyloc);
                var ranges = this.lexer.options && this.lexer.options.ranges;
                if (typeof this.yy.parseError === "function") this.parseError = this.yy.parseError;
                function lex() {
                    var token;
                    token = self.lexer.lex() || 1;
                    if (typeof token !== "number") {
                        token = self.symbols_[token] || token;
                    }
                    return token;
                }
                var symbol,
                    preErrorSymbol,
                    state,
                    action,
                    r,
                    yyval = {},
                    p,
                    len,
                    newState,
                    expected;
                while (true) {
                    state = stack[stack.length - 1];
                    if (this.defaultActions[state]) {
                        action = this.defaultActions[state];
                    } else {
                        if (symbol === null || typeof symbol == "undefined") {
                            symbol = lex();
                        }
                        action = table[state] && table[state][symbol];
                    }
                    if (typeof action === "undefined" || !action.length || !action[0]) {
                        var errStr = "";
                        if (!recovering) {
                            expected = [];
                            for (p in table[state]) if (this.terminals_[p] && p > 2) {
                                expected.push("'" + this.terminals_[p] + "'");
                            }
                            if (this.lexer.showPosition) {
                                errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
                            } else {
                                errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1 ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'");
                            }
                            this.parseError(errStr, { text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected });
                        }
                    }
                    if (action[0] instanceof Array && action.length > 1) {
                        throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
                    }
                    switch (action[0]) {
                        case 1:
                            stack.push(symbol);
                            vstack.push(this.lexer.yytext);
                            lstack.push(this.lexer.yylloc);
                            stack.push(action[1]);
                            symbol = null;
                            if (!preErrorSymbol) {
                                yyleng = this.lexer.yyleng;
                                yytext = this.lexer.yytext;
                                yylineno = this.lexer.yylineno;
                                yyloc = this.lexer.yylloc;
                                if (recovering > 0) recovering--;
                            } else {
                                symbol = preErrorSymbol;
                                preErrorSymbol = null;
                            }
                            break;
                        case 2:
                            len = this.productions_[action[1]][1];
                            yyval.$ = vstack[vstack.length - len];
                            yyval._$ = { first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column };
                            if (ranges) {
                                yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
                            }
                            r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
                            if (typeof r !== "undefined") {
                                return r;
                            }
                            if (len) {
                                stack = stack.slice(0, -1 * len * 2);
                                vstack = vstack.slice(0, -1 * len);
                                lstack = lstack.slice(0, -1 * len);
                            }
                            stack.push(this.productions_[action[1]][0]);
                            vstack.push(yyval.$);
                            lstack.push(yyval._$);
                            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                            stack.push(newState);
                            break;
                        case 3:
                            return true;
                    }
                }
                return true;
            }
        };
        /* Jison generated lexer */
        var lexer = (function () {
            var lexer = { EOF: 1,
                parseError: function parseError(str, hash) {
                    if (this.yy.parser) {
                        this.yy.parser.parseError(str, hash);
                    } else {
                        throw new Error(str);
                    }
                },
                setInput: function setInput(input) {
                    this._input = input;
                    this._more = this._less = this.done = false;
                    this.yylineno = this.yyleng = 0;
                    this.yytext = this.matched = this.match = '';
                    this.conditionStack = ['INITIAL'];
                    this.yylloc = { first_line: 1, first_column: 0, last_line: 1, last_column: 0 };
                    if (this.options.ranges) this.yylloc.range = [0, 0];
                    this.offset = 0;
                    return this;
                },
                input: function input() {
                    var ch = this._input[0];
                    this.yytext += ch;
                    this.yyleng++;
                    this.offset++;
                    this.match += ch;
                    this.matched += ch;
                    var lines = ch.match(/(?:\r\n?|\n).*/g);
                    if (lines) {
                        this.yylineno++;
                        this.yylloc.last_line++;
                    } else {
                        this.yylloc.last_column++;
                    }
                    if (this.options.ranges) this.yylloc.range[1]++;

                    this._input = this._input.slice(1);
                    return ch;
                },
                unput: function unput(ch) {
                    var len = ch.length;
                    var lines = ch.split(/(?:\r\n?|\n)/g);

                    this._input = ch + this._input;
                    this.yytext = this.yytext.substr(0, this.yytext.length - len - 1);
                    //this.yyleng -= len;
                    this.offset -= len;
                    var oldLines = this.match.split(/(?:\r\n?|\n)/g);
                    this.match = this.match.substr(0, this.match.length - 1);
                    this.matched = this.matched.substr(0, this.matched.length - 1);

                    if (lines.length - 1) this.yylineno -= lines.length - 1;
                    var r = this.yylloc.range;

                    this.yylloc = { first_line: this.yylloc.first_line,
                        last_line: this.yylineno + 1,
                        first_column: this.yylloc.first_column,
                        last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
                    };

                    if (this.options.ranges) {
                        this.yylloc.range = [r[0], r[0] + this.yyleng - len];
                    }
                    return this;
                },
                more: function more() {
                    this._more = true;
                    return this;
                },
                less: function less(n) {
                    this.unput(this.match.slice(n));
                },
                pastInput: function pastInput() {
                    var past = this.matched.substr(0, this.matched.length - this.match.length);
                    return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
                },
                upcomingInput: function upcomingInput() {
                    var next = this.match;
                    if (next.length < 20) {
                        next += this._input.substr(0, 20 - next.length);
                    }
                    return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
                },
                showPosition: function showPosition() {
                    var pre = this.pastInput();
                    var c = new Array(pre.length + 1).join("-");
                    return pre + this.upcomingInput() + "\n" + c + "^";
                },
                next: function next() {
                    if (this.done) {
                        return this.EOF;
                    }
                    if (!this._input) this.done = true;

                    var token, match, tempMatch, index, lines;
                    if (!this._more) {
                        this.yytext = '';
                        this.match = '';
                    }
                    var rules = this._currentRules();
                    for (var i = 0; i < rules.length; i++) {
                        tempMatch = this._input.match(this.rules[rules[i]]);
                        if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                            match = tempMatch;
                            index = i;
                            if (!this.options.flex) break;
                        }
                    }
                    if (match) {
                        lines = match[0].match(/(?:\r\n?|\n).*/g);
                        if (lines) this.yylineno += lines.length;
                        this.yylloc = { first_line: this.yylloc.last_line,
                            last_line: this.yylineno + 1,
                            first_column: this.yylloc.last_column,
                            last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length };
                        this.yytext += match[0];
                        this.match += match[0];
                        this.matches = match;
                        this.yyleng = this.yytext.length;
                        if (this.options.ranges) {
                            this.yylloc.range = [this.offset, this.offset += this.yyleng];
                        }
                        this._more = false;
                        this._input = this._input.slice(match[0].length);
                        this.matched += match[0];
                        token = this.performAction.call(this, this.yy, this, rules[index], this.conditionStack[this.conditionStack.length - 1]);
                        if (this.done && this._input) this.done = false;
                        if (token) return token;else return;
                    }
                    if (this._input === "") {
                        return this.EOF;
                    } else {
                        return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), { text: "", token: null, line: this.yylineno });
                    }
                },
                lex: function lex() {
                    var r = this.next();
                    if (typeof r !== 'undefined') {
                        return r;
                    } else {
                        return this.lex();
                    }
                },
                begin: function begin(condition) {
                    this.conditionStack.push(condition);
                },
                popState: function popState() {
                    return this.conditionStack.pop();
                },
                _currentRules: function _currentRules() {
                    return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
                },
                topState: function topState() {
                    return this.conditionStack[this.conditionStack.length - 2];
                },
                pushState: function begin(condition) {
                    this.begin(condition);
                } };
            lexer.options = {};
            lexer.performAction = function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {

                function strip(start, end) {
                    return yy_.yytext = yy_.yytext.substring(start, yy_.yyleng - end + start);
                }
                switch ($avoiding_name_collisions) {
                    case 0:
                        if (yy_.yytext.slice(-2) === "\\\\") {
                            strip(0, 1);
                            this.begin("mu");
                        } else if (yy_.yytext.slice(-1) === "\\") {
                            strip(0, 1);
                            this.begin("emu");
                        } else {
                            this.begin("mu");
                        }
                        if (yy_.yytext) return 15;

                        break;
                    case 1:
                        return 15;
                        break;
                    case 2:
                        this.popState();
                        return 15;

                        break;
                    case 3:
                        this.begin('raw');return 15;
                        break;
                    case 4:
                        this.popState();
                        // Should be using `this.topState()` below, but it currently
                        // returns the second top instead of the first top. Opened an
                        // issue about it at https://github.com/zaach/jison/issues/291
                        if (this.conditionStack[this.conditionStack.length - 1] === 'raw') {
                            return 15;
                        } else {
                            strip(5, 9);
                            return 'END_RAW_BLOCK';
                        }

                        break;
                    case 5:
                        return 15;
                        break;
                    case 6:
                        this.popState();
                        return 14;

                        break;
                    case 7:
                        return 65;
                        break;
                    case 8:
                        return 68;
                        break;
                    case 9:
                        return 19;
                        break;
                    case 10:
                        this.popState();
                        this.begin('raw');
                        return 23;

                        break;
                    case 11:
                        return 55;
                        break;
                    case 12:
                        return 60;
                        break;
                    case 13:
                        return 29;
                        break;
                    case 14:
                        return 47;
                        break;
                    case 15:
                        this.popState();return 44;
                        break;
                    case 16:
                        this.popState();return 44;
                        break;
                    case 17:
                        return 34;
                        break;
                    case 18:
                        return 39;
                        break;
                    case 19:
                        return 51;
                        break;
                    case 20:
                        return 48;
                        break;
                    case 21:
                        this.unput(yy_.yytext);
                        this.popState();
                        this.begin('com');

                        break;
                    case 22:
                        this.popState();
                        return 14;

                        break;
                    case 23:
                        return 48;
                        break;
                    case 24:
                        return 73;
                        break;
                    case 25:
                        return 72;
                        break;
                    case 26:
                        return 72;
                        break;
                    case 27:
                        return 87;
                        break;
                    case 28:
                        // ignore whitespace
                        break;
                    case 29:
                        this.popState();return 54;
                        break;
                    case 30:
                        this.popState();return 33;
                        break;
                    case 31:
                        yy_.yytext = strip(1, 2).replace(/\\"/g, '"');return 80;
                        break;
                    case 32:
                        yy_.yytext = strip(1, 2).replace(/\\'/g, "'");return 80;
                        break;
                    case 33:
                        return 85;
                        break;
                    case 34:
                        return 82;
                        break;
                    case 35:
                        return 82;
                        break;
                    case 36:
                        return 83;
                        break;
                    case 37:
                        return 84;
                        break;
                    case 38:
                        return 81;
                        break;
                    case 39:
                        return 75;
                        break;
                    case 40:
                        return 77;
                        break;
                    case 41:
                        return 72;
                        break;
                    case 42:
                        yy_.yytext = yy_.yytext.replace(/\\([\\\]])/g, '$1');return 72;
                        break;
                    case 43:
                        return 'INVALID';
                        break;
                    case 44:
                        return 5;
                        break;
                }
            };
            lexer.rules = [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/, /^(?:\{\{\{\{(?=[^\/]))/, /^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/, /^(?:[^\x00]+?(?=(\{\{\{\{)))/, /^(?:[\s\S]*?--(~)?\}\})/, /^(?:\()/, /^(?:\))/, /^(?:\{\{\{\{)/, /^(?:\}\}\}\})/, /^(?:\{\{(~)?>)/, /^(?:\{\{(~)?#>)/, /^(?:\{\{(~)?#\*?)/, /^(?:\{\{(~)?\/)/, /^(?:\{\{(~)?\^\s*(~)?\}\})/, /^(?:\{\{(~)?\s*else\s*(~)?\}\})/, /^(?:\{\{(~)?\^)/, /^(?:\{\{(~)?\s*else\b)/, /^(?:\{\{(~)?\{)/, /^(?:\{\{(~)?&)/, /^(?:\{\{(~)?!--)/, /^(?:\{\{(~)?![\s\S]*?\}\})/, /^(?:\{\{(~)?\*?)/, /^(?:=)/, /^(?:\.\.)/, /^(?:\.(?=([=~}\s\/.)|])))/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}(~)?\}\})/, /^(?:(~)?\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=([~}\s)])))/, /^(?:false(?=([~}\s)])))/, /^(?:undefined(?=([~}\s)])))/, /^(?:null(?=([~}\s)])))/, /^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/, /^(?:as\s+\|)/, /^(?:\|)/, /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/, /^(?:\[(\\\]|[^\]])*\])/, /^(?:.)/, /^(?:$)/];
            lexer.conditions = { "mu": { "rules": [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44], "inclusive": false }, "emu": { "rules": [2], "inclusive": false }, "com": { "rules": [6], "inclusive": false }, "raw": { "rules": [3, 4, 5], "inclusive": false }, "INITIAL": { "rules": [0, 1, 44], "inclusive": true } };
            return lexer;
        })();
        parser.lexer = lexer;
        function Parser() {
            this.yy = {};
        }Parser.prototype = parser;parser.Parser = Parser;
        return new Parser();
    })();exports["default"] = handlebars;
    module.exports = exports["default"];

    });

    unwrapExports(parser);

    var visitor = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    // istanbul ignore next

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }



    var _exception2 = _interopRequireDefault(exception);

    function Visitor() {
      this.parents = [];
    }

    Visitor.prototype = {
      constructor: Visitor,
      mutating: false,

      // Visits a given value. If mutating, will replace the value if necessary.
      acceptKey: function acceptKey(node, name) {
        var value = this.accept(node[name]);
        if (this.mutating) {
          // Hacky sanity check: This may have a few false positives for type for the helper
          // methods but will generally do the right thing without a lot of overhead.
          if (value && !Visitor.prototype[value.type]) {
            throw new _exception2['default']('Unexpected node type "' + value.type + '" found when accepting ' + name + ' on ' + node.type);
          }
          node[name] = value;
        }
      },

      // Performs an accept operation with added sanity check to ensure
      // required keys are not removed.
      acceptRequired: function acceptRequired(node, name) {
        this.acceptKey(node, name);

        if (!node[name]) {
          throw new _exception2['default'](node.type + ' requires ' + name);
        }
      },

      // Traverses a given array. If mutating, empty respnses will be removed
      // for child elements.
      acceptArray: function acceptArray(array) {
        for (var i = 0, l = array.length; i < l; i++) {
          this.acceptKey(array, i);

          if (!array[i]) {
            array.splice(i, 1);
            i--;
            l--;
          }
        }
      },

      accept: function accept(object) {
        if (!object) {
          return;
        }

        /* istanbul ignore next: Sanity code */
        if (!this[object.type]) {
          throw new _exception2['default']('Unknown type: ' + object.type, object);
        }

        if (this.current) {
          this.parents.unshift(this.current);
        }
        this.current = object;

        var ret = this[object.type](object);

        this.current = this.parents.shift();

        if (!this.mutating || ret) {
          return ret;
        } else if (ret !== false) {
          return object;
        }
      },

      Program: function Program(program) {
        this.acceptArray(program.body);
      },

      MustacheStatement: visitSubExpression,
      Decorator: visitSubExpression,

      BlockStatement: visitBlock,
      DecoratorBlock: visitBlock,

      PartialStatement: visitPartial,
      PartialBlockStatement: function PartialBlockStatement(partial) {
        visitPartial.call(this, partial);

        this.acceptKey(partial, 'program');
      },

      ContentStatement: function ContentStatement() /* content */{},
      CommentStatement: function CommentStatement() /* comment */{},

      SubExpression: visitSubExpression,

      PathExpression: function PathExpression() /* path */{},

      StringLiteral: function StringLiteral() /* string */{},
      NumberLiteral: function NumberLiteral() /* number */{},
      BooleanLiteral: function BooleanLiteral() /* bool */{},
      UndefinedLiteral: function UndefinedLiteral() /* literal */{},
      NullLiteral: function NullLiteral() /* literal */{},

      Hash: function Hash(hash) {
        this.acceptArray(hash.pairs);
      },
      HashPair: function HashPair(pair) {
        this.acceptRequired(pair, 'value');
      }
    };

    function visitSubExpression(mustache) {
      this.acceptRequired(mustache, 'path');
      this.acceptArray(mustache.params);
      this.acceptKey(mustache, 'hash');
    }
    function visitBlock(block) {
      visitSubExpression.call(this, block);

      this.acceptKey(block, 'program');
      this.acceptKey(block, 'inverse');
    }
    function visitPartial(partial) {
      this.acceptRequired(partial, 'name');
      this.acceptArray(partial.params);
      this.acceptKey(partial, 'hash');
    }

    exports['default'] = Visitor;
    module.exports = exports['default'];

    });

    unwrapExports(visitor);

    var whitespaceControl = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    // istanbul ignore next

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }



    var _visitor2 = _interopRequireDefault(visitor);

    function WhitespaceControl() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      this.options = options;
    }
    WhitespaceControl.prototype = new _visitor2['default']();

    WhitespaceControl.prototype.Program = function (program) {
      var doStandalone = !this.options.ignoreStandalone;

      var isRoot = !this.isRootSeen;
      this.isRootSeen = true;

      var body = program.body;
      for (var i = 0, l = body.length; i < l; i++) {
        var current = body[i],
            strip = this.accept(current);

        if (!strip) {
          continue;
        }

        var _isPrevWhitespace = isPrevWhitespace(body, i, isRoot),
            _isNextWhitespace = isNextWhitespace(body, i, isRoot),
            openStandalone = strip.openStandalone && _isPrevWhitespace,
            closeStandalone = strip.closeStandalone && _isNextWhitespace,
            inlineStandalone = strip.inlineStandalone && _isPrevWhitespace && _isNextWhitespace;

        if (strip.close) {
          omitRight(body, i, true);
        }
        if (strip.open) {
          omitLeft(body, i, true);
        }

        if (doStandalone && inlineStandalone) {
          omitRight(body, i);

          if (omitLeft(body, i)) {
            // If we are on a standalone node, save the indent info for partials
            if (current.type === 'PartialStatement') {
              // Pull out the whitespace from the final line
              current.indent = /([ \t]+$)/.exec(body[i - 1].original)[1];
            }
          }
        }
        if (doStandalone && openStandalone) {
          omitRight((current.program || current.inverse).body);

          // Strip out the previous content node if it's whitespace only
          omitLeft(body, i);
        }
        if (doStandalone && closeStandalone) {
          // Always strip the next node
          omitRight(body, i);

          omitLeft((current.inverse || current.program).body);
        }
      }

      return program;
    };

    WhitespaceControl.prototype.BlockStatement = WhitespaceControl.prototype.DecoratorBlock = WhitespaceControl.prototype.PartialBlockStatement = function (block) {
      this.accept(block.program);
      this.accept(block.inverse);

      // Find the inverse program that is involed with whitespace stripping.
      var program = block.program || block.inverse,
          inverse = block.program && block.inverse,
          firstInverse = inverse,
          lastInverse = inverse;

      if (inverse && inverse.chained) {
        firstInverse = inverse.body[0].program;

        // Walk the inverse chain to find the last inverse that is actually in the chain.
        while (lastInverse.chained) {
          lastInverse = lastInverse.body[lastInverse.body.length - 1].program;
        }
      }

      var strip = {
        open: block.openStrip.open,
        close: block.closeStrip.close,

        // Determine the standalone candiacy. Basically flag our content as being possibly standalone
        // so our parent can determine if we actually are standalone
        openStandalone: isNextWhitespace(program.body),
        closeStandalone: isPrevWhitespace((firstInverse || program).body)
      };

      if (block.openStrip.close) {
        omitRight(program.body, null, true);
      }

      if (inverse) {
        var inverseStrip = block.inverseStrip;

        if (inverseStrip.open) {
          omitLeft(program.body, null, true);
        }

        if (inverseStrip.close) {
          omitRight(firstInverse.body, null, true);
        }
        if (block.closeStrip.open) {
          omitLeft(lastInverse.body, null, true);
        }

        // Find standalone else statments
        if (!this.options.ignoreStandalone && isPrevWhitespace(program.body) && isNextWhitespace(firstInverse.body)) {
          omitLeft(program.body);
          omitRight(firstInverse.body);
        }
      } else if (block.closeStrip.open) {
        omitLeft(program.body, null, true);
      }

      return strip;
    };

    WhitespaceControl.prototype.Decorator = WhitespaceControl.prototype.MustacheStatement = function (mustache) {
      return mustache.strip;
    };

    WhitespaceControl.prototype.PartialStatement = WhitespaceControl.prototype.CommentStatement = function (node) {
      /* istanbul ignore next */
      var strip = node.strip || {};
      return {
        inlineStandalone: true,
        open: strip.open,
        close: strip.close
      };
    };

    function isPrevWhitespace(body, i, isRoot) {
      if (i === undefined) {
        i = body.length;
      }

      // Nodes that end with newlines are considered whitespace (but are special
      // cased for strip operations)
      var prev = body[i - 1],
          sibling = body[i - 2];
      if (!prev) {
        return isRoot;
      }

      if (prev.type === 'ContentStatement') {
        return (sibling || !isRoot ? /\r?\n\s*?$/ : /(^|\r?\n)\s*?$/).test(prev.original);
      }
    }
    function isNextWhitespace(body, i, isRoot) {
      if (i === undefined) {
        i = -1;
      }

      var next = body[i + 1],
          sibling = body[i + 2];
      if (!next) {
        return isRoot;
      }

      if (next.type === 'ContentStatement') {
        return (sibling || !isRoot ? /^\s*?\r?\n/ : /^\s*?(\r?\n|$)/).test(next.original);
      }
    }

    // Marks the node to the right of the position as omitted.
    // I.e. {{foo}}' ' will mark the ' ' node as omitted.
    //
    // If i is undefined, then the first child will be marked as such.
    //
    // If mulitple is truthy then all whitespace will be stripped out until non-whitespace
    // content is met.
    function omitRight(body, i, multiple) {
      var current = body[i == null ? 0 : i + 1];
      if (!current || current.type !== 'ContentStatement' || !multiple && current.rightStripped) {
        return;
      }

      var original = current.value;
      current.value = current.value.replace(multiple ? /^\s+/ : /^[ \t]*\r?\n?/, '');
      current.rightStripped = current.value !== original;
    }

    // Marks the node to the left of the position as omitted.
    // I.e. ' '{{foo}} will mark the ' ' node as omitted.
    //
    // If i is undefined then the last child will be marked as such.
    //
    // If mulitple is truthy then all whitespace will be stripped out until non-whitespace
    // content is met.
    function omitLeft(body, i, multiple) {
      var current = body[i == null ? body.length - 1 : i - 1];
      if (!current || current.type !== 'ContentStatement' || !multiple && current.leftStripped) {
        return;
      }

      // We omit the last node if it's whitespace only and not preceded by a non-content node.
      var original = current.value;
      current.value = current.value.replace(multiple ? /\s+$/ : /[ \t]+$/, '');
      current.leftStripped = current.value !== original;
      return current.leftStripped;
    }

    exports['default'] = WhitespaceControl;
    module.exports = exports['default'];

    });

    unwrapExports(whitespaceControl);

    var helpers$3 = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    exports.SourceLocation = SourceLocation;
    exports.id = id;
    exports.stripFlags = stripFlags;
    exports.stripComment = stripComment;
    exports.preparePath = preparePath;
    exports.prepareMustache = prepareMustache;
    exports.prepareRawBlock = prepareRawBlock;
    exports.prepareBlock = prepareBlock;
    exports.prepareProgram = prepareProgram;
    exports.preparePartialBlock = preparePartialBlock;
    // istanbul ignore next

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }



    var _exception2 = _interopRequireDefault(exception);

    function validateClose(open, close) {
      close = close.path ? close.path.original : close;

      if (open.path.original !== close) {
        var errorNode = { loc: open.path.loc };

        throw new _exception2['default'](open.path.original + " doesn't match " + close, errorNode);
      }
    }

    function SourceLocation(source, locInfo) {
      this.source = source;
      this.start = {
        line: locInfo.first_line,
        column: locInfo.first_column
      };
      this.end = {
        line: locInfo.last_line,
        column: locInfo.last_column
      };
    }

    function id(token) {
      if (/^\[.*\]$/.test(token)) {
        return token.substring(1, token.length - 1);
      } else {
        return token;
      }
    }

    function stripFlags(open, close) {
      return {
        open: open.charAt(2) === '~',
        close: close.charAt(close.length - 3) === '~'
      };
    }

    function stripComment(comment) {
      return comment.replace(/^\{\{~?!-?-?/, '').replace(/-?-?~?\}\}$/, '');
    }

    function preparePath(data, parts, loc) {
      loc = this.locInfo(loc);

      var original = data ? '@' : '',
          dig = [],
          depth = 0;

      for (var i = 0, l = parts.length; i < l; i++) {
        var part = parts[i].part,

        // If we have [] syntax then we do not treat path references as operators,
        // i.e. foo.[this] resolves to approximately context.foo['this']
        isLiteral = parts[i].original !== part;
        original += (parts[i].separator || '') + part;

        if (!isLiteral && (part === '..' || part === '.' || part === 'this')) {
          if (dig.length > 0) {
            throw new _exception2['default']('Invalid path: ' + original, { loc: loc });
          } else if (part === '..') {
            depth++;
          }
        } else {
          dig.push(part);
        }
      }

      return {
        type: 'PathExpression',
        data: data,
        depth: depth,
        parts: dig,
        original: original,
        loc: loc
      };
    }

    function prepareMustache(path$$1, params, hash, open, strip, locInfo) {
      // Must use charAt to support IE pre-10
      var escapeFlag = open.charAt(3) || open.charAt(2),
          escaped = escapeFlag !== '{' && escapeFlag !== '&';

      var decorator = /\*/.test(open);
      return {
        type: decorator ? 'Decorator' : 'MustacheStatement',
        path: path$$1,
        params: params,
        hash: hash,
        escaped: escaped,
        strip: strip,
        loc: this.locInfo(locInfo)
      };
    }

    function prepareRawBlock(openRawBlock, contents, close, locInfo) {
      validateClose(openRawBlock, close);

      locInfo = this.locInfo(locInfo);
      var program = {
        type: 'Program',
        body: contents,
        strip: {},
        loc: locInfo
      };

      return {
        type: 'BlockStatement',
        path: openRawBlock.path,
        params: openRawBlock.params,
        hash: openRawBlock.hash,
        program: program,
        openStrip: {},
        inverseStrip: {},
        closeStrip: {},
        loc: locInfo
      };
    }

    function prepareBlock(openBlock, program, inverseAndProgram, close, inverted, locInfo) {
      if (close && close.path) {
        validateClose(openBlock, close);
      }

      var decorator = /\*/.test(openBlock.open);

      program.blockParams = openBlock.blockParams;

      var inverse = undefined,
          inverseStrip = undefined;

      if (inverseAndProgram) {
        if (decorator) {
          throw new _exception2['default']('Unexpected inverse block on decorator', inverseAndProgram);
        }

        if (inverseAndProgram.chain) {
          inverseAndProgram.program.body[0].closeStrip = close.strip;
        }

        inverseStrip = inverseAndProgram.strip;
        inverse = inverseAndProgram.program;
      }

      if (inverted) {
        inverted = inverse;
        inverse = program;
        program = inverted;
      }

      return {
        type: decorator ? 'DecoratorBlock' : 'BlockStatement',
        path: openBlock.path,
        params: openBlock.params,
        hash: openBlock.hash,
        program: program,
        inverse: inverse,
        openStrip: openBlock.strip,
        inverseStrip: inverseStrip,
        closeStrip: close && close.strip,
        loc: this.locInfo(locInfo)
      };
    }

    function prepareProgram(statements, loc) {
      if (!loc && statements.length) {
        var firstLoc = statements[0].loc,
            lastLoc = statements[statements.length - 1].loc;

        /* istanbul ignore else */
        if (firstLoc && lastLoc) {
          loc = {
            source: firstLoc.source,
            start: {
              line: firstLoc.start.line,
              column: firstLoc.start.column
            },
            end: {
              line: lastLoc.end.line,
              column: lastLoc.end.column
            }
          };
        }
      }

      return {
        type: 'Program',
        body: statements,
        strip: {},
        loc: loc
      };
    }

    function preparePartialBlock(open, program, close, locInfo) {
      validateClose(open, close);

      return {
        type: 'PartialBlockStatement',
        name: open.path,
        params: open.params,
        hash: open.hash,
        program: program,
        openStrip: open.strip,
        closeStrip: close && close.strip,
        loc: this.locInfo(locInfo)
      };
    }

    });

    unwrapExports(helpers$3);
    var helpers_1$2 = helpers$3.SourceLocation;
    var helpers_2$2 = helpers$3.id;
    var helpers_3$1 = helpers$3.stripFlags;
    var helpers_4$1 = helpers$3.stripComment;
    var helpers_5$1 = helpers$3.preparePath;
    var helpers_6$1 = helpers$3.prepareMustache;
    var helpers_7$1 = helpers$3.prepareRawBlock;
    var helpers_8$1 = helpers$3.prepareBlock;
    var helpers_9$1 = helpers$3.prepareProgram;
    var helpers_10 = helpers$3.preparePartialBlock;

    var base$2 = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    exports.parseWithoutProcessing = parseWithoutProcessing;
    exports.parse = parse;
    // istanbul ignore next

    function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

    // istanbul ignore next

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }



    var _parser2 = _interopRequireDefault(parser);



    var _whitespaceControl2 = _interopRequireDefault(whitespaceControl);



    var Helpers = _interopRequireWildcard(helpers$3);



    exports.parser = _parser2['default'];

    var yy = {};
    utils.extend(yy, Helpers);

    function parseWithoutProcessing(input, options) {
      // Just return if an already-compiled AST was passed in.
      if (input.type === 'Program') {
        return input;
      }

      _parser2['default'].yy = yy;

      // Altering the shared object here, but this is ok as parser is a sync operation
      yy.locInfo = function (locInfo) {
        return new yy.SourceLocation(options && options.srcName, locInfo);
      };

      var ast = _parser2['default'].parse(input);

      return ast;
    }

    function parse(input, options) {
      var ast = parseWithoutProcessing(input, options);
      var strip = new _whitespaceControl2['default'](options);

      return strip.accept(ast);
    }

    });

    unwrapExports(base$2);
    var base_1$1 = base$2.parseWithoutProcessing;
    var base_2$1 = base$2.parse;
    var base_3$1 = base$2.parser;

    var compiler = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    exports.Compiler = Compiler;
    exports.precompile = precompile;
    exports.compile = compile;
    // istanbul ignore next

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }



    var _exception2 = _interopRequireDefault(exception);





    var _ast2 = _interopRequireDefault(ast);

    var slice = [].slice;

    function Compiler() {}

    // the foundHelper register will disambiguate helper lookup from finding a
    // function in a context. This is necessary for mustache compatibility, which
    // requires that context functions in blocks are evaluated by blockHelperMissing,
    // and then proceed as if the resulting value was provided to blockHelperMissing.

    Compiler.prototype = {
      compiler: Compiler,

      equals: function equals(other) {
        var len = this.opcodes.length;
        if (other.opcodes.length !== len) {
          return false;
        }

        for (var i = 0; i < len; i++) {
          var opcode = this.opcodes[i],
              otherOpcode = other.opcodes[i];
          if (opcode.opcode !== otherOpcode.opcode || !argEquals(opcode.args, otherOpcode.args)) {
            return false;
          }
        }

        // We know that length is the same between the two arrays because they are directly tied
        // to the opcode behavior above.
        len = this.children.length;
        for (var i = 0; i < len; i++) {
          if (!this.children[i].equals(other.children[i])) {
            return false;
          }
        }

        return true;
      },

      guid: 0,

      compile: function compile(program, options) {
        this.sourceNode = [];
        this.opcodes = [];
        this.children = [];
        this.options = options;
        this.stringParams = options.stringParams;
        this.trackIds = options.trackIds;

        options.blockParams = options.blockParams || [];

        options.knownHelpers = utils.extend(Object.create(null), {
          'helperMissing': true,
          'blockHelperMissing': true,
          'each': true,
          'if': true,
          'unless': true,
          'with': true,
          'log': true,
          'lookup': true
        }, options.knownHelpers);

        return this.accept(program);
      },

      compileProgram: function compileProgram(program) {
        var childCompiler = new this.compiler(),
            // eslint-disable-line new-cap
        result = childCompiler.compile(program, this.options),
            guid = this.guid++;

        this.usePartial = this.usePartial || result.usePartial;

        this.children[guid] = result;
        this.useDepths = this.useDepths || result.useDepths;

        return guid;
      },

      accept: function accept(node) {
        /* istanbul ignore next: Sanity code */
        if (!this[node.type]) {
          throw new _exception2['default']('Unknown type: ' + node.type, node);
        }

        this.sourceNode.unshift(node);
        var ret = this[node.type](node);
        this.sourceNode.shift();
        return ret;
      },

      Program: function Program(program) {
        this.options.blockParams.unshift(program.blockParams);

        var body = program.body,
            bodyLength = body.length;
        for (var i = 0; i < bodyLength; i++) {
          this.accept(body[i]);
        }

        this.options.blockParams.shift();

        this.isSimple = bodyLength === 1;
        this.blockParams = program.blockParams ? program.blockParams.length : 0;

        return this;
      },

      BlockStatement: function BlockStatement(block) {
        transformLiteralToPath(block);

        var program = block.program,
            inverse = block.inverse;

        program = program && this.compileProgram(program);
        inverse = inverse && this.compileProgram(inverse);

        var type = this.classifySexpr(block);

        if (type === 'helper') {
          this.helperSexpr(block, program, inverse);
        } else if (type === 'simple') {
          this.simpleSexpr(block);

          // now that the simple mustache is resolved, we need to
          // evaluate it by executing `blockHelperMissing`
          this.opcode('pushProgram', program);
          this.opcode('pushProgram', inverse);
          this.opcode('emptyHash');
          this.opcode('blockValue', block.path.original);
        } else {
          this.ambiguousSexpr(block, program, inverse);

          // now that the simple mustache is resolved, we need to
          // evaluate it by executing `blockHelperMissing`
          this.opcode('pushProgram', program);
          this.opcode('pushProgram', inverse);
          this.opcode('emptyHash');
          this.opcode('ambiguousBlockValue');
        }

        this.opcode('append');
      },

      DecoratorBlock: function DecoratorBlock(decorator) {
        var program = decorator.program && this.compileProgram(decorator.program);
        var params = this.setupFullMustacheParams(decorator, program, undefined),
            path$$1 = decorator.path;

        this.useDecorators = true;
        this.opcode('registerDecorator', params.length, path$$1.original);
      },

      PartialStatement: function PartialStatement(partial) {
        this.usePartial = true;

        var program = partial.program;
        if (program) {
          program = this.compileProgram(partial.program);
        }

        var params = partial.params;
        if (params.length > 1) {
          throw new _exception2['default']('Unsupported number of partial arguments: ' + params.length, partial);
        } else if (!params.length) {
          if (this.options.explicitPartialContext) {
            this.opcode('pushLiteral', 'undefined');
          } else {
            params.push({ type: 'PathExpression', parts: [], depth: 0 });
          }
        }

        var partialName = partial.name.original,
            isDynamic = partial.name.type === 'SubExpression';
        if (isDynamic) {
          this.accept(partial.name);
        }

        this.setupFullMustacheParams(partial, program, undefined, true);

        var indent = partial.indent || '';
        if (this.options.preventIndent && indent) {
          this.opcode('appendContent', indent);
          indent = '';
        }

        this.opcode('invokePartial', isDynamic, partialName, indent);
        this.opcode('append');
      },
      PartialBlockStatement: function PartialBlockStatement(partialBlock) {
        this.PartialStatement(partialBlock);
      },

      MustacheStatement: function MustacheStatement(mustache) {
        this.SubExpression(mustache);

        if (mustache.escaped && !this.options.noEscape) {
          this.opcode('appendEscaped');
        } else {
          this.opcode('append');
        }
      },
      Decorator: function Decorator(decorator) {
        this.DecoratorBlock(decorator);
      },

      ContentStatement: function ContentStatement(content) {
        if (content.value) {
          this.opcode('appendContent', content.value);
        }
      },

      CommentStatement: function CommentStatement() {},

      SubExpression: function SubExpression(sexpr) {
        transformLiteralToPath(sexpr);
        var type = this.classifySexpr(sexpr);

        if (type === 'simple') {
          this.simpleSexpr(sexpr);
        } else if (type === 'helper') {
          this.helperSexpr(sexpr);
        } else {
          this.ambiguousSexpr(sexpr);
        }
      },
      ambiguousSexpr: function ambiguousSexpr(sexpr, program, inverse) {
        var path$$1 = sexpr.path,
            name = path$$1.parts[0],
            isBlock = program != null || inverse != null;

        this.opcode('getContext', path$$1.depth);

        this.opcode('pushProgram', program);
        this.opcode('pushProgram', inverse);

        path$$1.strict = true;
        this.accept(path$$1);

        this.opcode('invokeAmbiguous', name, isBlock);
      },

      simpleSexpr: function simpleSexpr(sexpr) {
        var path$$1 = sexpr.path;
        path$$1.strict = true;
        this.accept(path$$1);
        this.opcode('resolvePossibleLambda');
      },

      helperSexpr: function helperSexpr(sexpr, program, inverse) {
        var params = this.setupFullMustacheParams(sexpr, program, inverse),
            path$$1 = sexpr.path,
            name = path$$1.parts[0];

        if (this.options.knownHelpers[name]) {
          this.opcode('invokeKnownHelper', params.length, name);
        } else if (this.options.knownHelpersOnly) {
          throw new _exception2['default']('You specified knownHelpersOnly, but used the unknown helper ' + name, sexpr);
        } else {
          path$$1.strict = true;
          path$$1.falsy = true;

          this.accept(path$$1);
          this.opcode('invokeHelper', params.length, path$$1.original, _ast2['default'].helpers.simpleId(path$$1));
        }
      },

      PathExpression: function PathExpression(path$$1) {
        this.addDepth(path$$1.depth);
        this.opcode('getContext', path$$1.depth);

        var name = path$$1.parts[0],
            scoped = _ast2['default'].helpers.scopedId(path$$1),
            blockParamId = !path$$1.depth && !scoped && this.blockParamIndex(name);

        if (blockParamId) {
          this.opcode('lookupBlockParam', blockParamId, path$$1.parts);
        } else if (!name) {
          // Context reference, i.e. `{{foo .}}` or `{{foo ..}}`
          this.opcode('pushContext');
        } else if (path$$1.data) {
          this.options.data = true;
          this.opcode('lookupData', path$$1.depth, path$$1.parts, path$$1.strict);
        } else {
          this.opcode('lookupOnContext', path$$1.parts, path$$1.falsy, path$$1.strict, scoped);
        }
      },

      StringLiteral: function StringLiteral(string) {
        this.opcode('pushString', string.value);
      },

      NumberLiteral: function NumberLiteral(number) {
        this.opcode('pushLiteral', number.value);
      },

      BooleanLiteral: function BooleanLiteral(bool) {
        this.opcode('pushLiteral', bool.value);
      },

      UndefinedLiteral: function UndefinedLiteral() {
        this.opcode('pushLiteral', 'undefined');
      },

      NullLiteral: function NullLiteral() {
        this.opcode('pushLiteral', 'null');
      },

      Hash: function Hash(hash) {
        var pairs = hash.pairs,
            i = 0,
            l = pairs.length;

        this.opcode('pushHash');

        for (; i < l; i++) {
          this.pushParam(pairs[i].value);
        }
        while (i--) {
          this.opcode('assignToHash', pairs[i].key);
        }
        this.opcode('popHash');
      },

      // HELPERS
      opcode: function opcode(name) {
        this.opcodes.push({ opcode: name, args: slice.call(arguments, 1), loc: this.sourceNode[0].loc });
      },

      addDepth: function addDepth(depth) {
        if (!depth) {
          return;
        }

        this.useDepths = true;
      },

      classifySexpr: function classifySexpr(sexpr) {
        var isSimple = _ast2['default'].helpers.simpleId(sexpr.path);

        var isBlockParam = isSimple && !!this.blockParamIndex(sexpr.path.parts[0]);

        // a mustache is an eligible helper if:
        // * its id is simple (a single part, not `this` or `..`)
        var isHelper = !isBlockParam && _ast2['default'].helpers.helperExpression(sexpr);

        // if a mustache is an eligible helper but not a definite
        // helper, it is ambiguous, and will be resolved in a later
        // pass or at runtime.
        var isEligible = !isBlockParam && (isHelper || isSimple);

        // if ambiguous, we can possibly resolve the ambiguity now
        // An eligible helper is one that does not have a complex path, i.e. `this.foo`, `../foo` etc.
        if (isEligible && !isHelper) {
          var _name = sexpr.path.parts[0],
              options = this.options;
          if (options.knownHelpers[_name]) {
            isHelper = true;
          } else if (options.knownHelpersOnly) {
            isEligible = false;
          }
        }

        if (isHelper) {
          return 'helper';
        } else if (isEligible) {
          return 'ambiguous';
        } else {
          return 'simple';
        }
      },

      pushParams: function pushParams(params) {
        for (var i = 0, l = params.length; i < l; i++) {
          this.pushParam(params[i]);
        }
      },

      pushParam: function pushParam(val) {
        var value = val.value != null ? val.value : val.original || '';

        if (this.stringParams) {
          if (value.replace) {
            value = value.replace(/^(\.?\.\/)*/g, '').replace(/\//g, '.');
          }

          if (val.depth) {
            this.addDepth(val.depth);
          }
          this.opcode('getContext', val.depth || 0);
          this.opcode('pushStringParam', value, val.type);

          if (val.type === 'SubExpression') {
            // SubExpressions get evaluated and passed in
            // in string params mode.
            this.accept(val);
          }
        } else {
          if (this.trackIds) {
            var blockParamIndex = undefined;
            if (val.parts && !_ast2['default'].helpers.scopedId(val) && !val.depth) {
              blockParamIndex = this.blockParamIndex(val.parts[0]);
            }
            if (blockParamIndex) {
              var blockParamChild = val.parts.slice(1).join('.');
              this.opcode('pushId', 'BlockParam', blockParamIndex, blockParamChild);
            } else {
              value = val.original || value;
              if (value.replace) {
                value = value.replace(/^this(?:\.|$)/, '').replace(/^\.\//, '').replace(/^\.$/, '');
              }

              this.opcode('pushId', val.type, value);
            }
          }
          this.accept(val);
        }
      },

      setupFullMustacheParams: function setupFullMustacheParams(sexpr, program, inverse, omitEmpty) {
        var params = sexpr.params;
        this.pushParams(params);

        this.opcode('pushProgram', program);
        this.opcode('pushProgram', inverse);

        if (sexpr.hash) {
          this.accept(sexpr.hash);
        } else {
          this.opcode('emptyHash', omitEmpty);
        }

        return params;
      },

      blockParamIndex: function blockParamIndex(name) {
        for (var depth = 0, len = this.options.blockParams.length; depth < len; depth++) {
          var blockParams = this.options.blockParams[depth],
              param = blockParams && utils.indexOf(blockParams, name);
          if (blockParams && param >= 0) {
            return [depth, param];
          }
        }
      }
    };

    function precompile(input, options, env) {
      if (input == null || typeof input !== 'string' && input.type !== 'Program') {
        throw new _exception2['default']('You must pass a string or Handlebars AST to Handlebars.precompile. You passed ' + input);
      }

      options = options || {};
      if (!('data' in options)) {
        options.data = true;
      }
      if (options.compat) {
        options.useDepths = true;
      }

      var ast$$1 = env.parse(input, options),
          environment = new env.Compiler().compile(ast$$1, options);
      return new env.JavaScriptCompiler().compile(environment, options);
    }

    function compile(input, options, env) {
      if (options === undefined) options = {};

      if (input == null || typeof input !== 'string' && input.type !== 'Program') {
        throw new _exception2['default']('You must pass a string or Handlebars AST to Handlebars.compile. You passed ' + input);
      }

      options = utils.extend({}, options);
      if (!('data' in options)) {
        options.data = true;
      }
      if (options.compat) {
        options.useDepths = true;
      }

      var compiled = undefined;

      function compileInput() {
        var ast$$1 = env.parse(input, options),
            environment = new env.Compiler().compile(ast$$1, options),
            templateSpec = new env.JavaScriptCompiler().compile(environment, options, undefined, true);
        return env.template(templateSpec);
      }

      // Template is only compiled on first use and cached after that point.
      function ret(context, execOptions) {
        if (!compiled) {
          compiled = compileInput();
        }
        return compiled.call(this, context, execOptions);
      }
      ret._setup = function (setupOptions) {
        if (!compiled) {
          compiled = compileInput();
        }
        return compiled._setup(setupOptions);
      };
      ret._child = function (i, data, blockParams, depths) {
        if (!compiled) {
          compiled = compileInput();
        }
        return compiled._child(i, data, blockParams, depths);
      };
      return ret;
    }

    function argEquals(a, b) {
      if (a === b) {
        return true;
      }

      if (utils.isArray(a) && utils.isArray(b) && a.length === b.length) {
        for (var i = 0; i < a.length; i++) {
          if (!argEquals(a[i], b[i])) {
            return false;
          }
        }
        return true;
      }
    }

    function transformLiteralToPath(sexpr) {
      if (!sexpr.path.parts) {
        var literal = sexpr.path;
        // Casting to string here to make false and 0 literal values play nicely with the rest
        // of the system.
        sexpr.path = {
          type: 'PathExpression',
          data: false,
          depth: 0,
          parts: [literal.original + ''],
          original: literal.original + '',
          loc: literal.loc
        };
      }
    }

    });

    unwrapExports(compiler);
    var compiler_1 = compiler.Compiler;
    var compiler_2 = compiler.precompile;
    var compiler_3 = compiler.compile;

    /* -*- Mode: js; js-indent-level: 2; -*- */
    /*
     * Copyright 2011 Mozilla Foundation and contributors
     * Licensed under the New BSD license. See LICENSE or:
     * http://opensource.org/licenses/BSD-3-Clause
     */

    var intToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

    /**
     * Encode an integer in the range of 0 to 63 to a single base 64 digit.
     */
    var encode = function (number) {
      if (0 <= number && number < intToCharMap.length) {
        return intToCharMap[number];
      }
      throw new TypeError("Must be between 0 and 63: " + number);
    };

    /**
     * Decode a single base 64 character code digit to an integer. Returns -1 on
     * failure.
     */
    var decode = function (charCode) {
      var bigA = 65;     // 'A'
      var bigZ = 90;     // 'Z'

      var littleA = 97;  // 'a'
      var littleZ = 122; // 'z'

      var zero = 48;     // '0'
      var nine = 57;     // '9'

      var plus = 43;     // '+'
      var slash = 47;    // '/'

      var littleOffset = 26;
      var numberOffset = 52;

      // 0 - 25: ABCDEFGHIJKLMNOPQRSTUVWXYZ
      if (bigA <= charCode && charCode <= bigZ) {
        return (charCode - bigA);
      }

      // 26 - 51: abcdefghijklmnopqrstuvwxyz
      if (littleA <= charCode && charCode <= littleZ) {
        return (charCode - littleA + littleOffset);
      }

      // 52 - 61: 0123456789
      if (zero <= charCode && charCode <= nine) {
        return (charCode - zero + numberOffset);
      }

      // 62: +
      if (charCode == plus) {
        return 62;
      }

      // 63: /
      if (charCode == slash) {
        return 63;
      }

      // Invalid base64 digit.
      return -1;
    };

    var base64 = {
    	encode: encode,
    	decode: decode
    };

    /* -*- Mode: js; js-indent-level: 2; -*- */
    /*
     * Copyright 2011 Mozilla Foundation and contributors
     * Licensed under the New BSD license. See LICENSE or:
     * http://opensource.org/licenses/BSD-3-Clause
     *
     * Based on the Base 64 VLQ implementation in Closure Compiler:
     * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
     *
     * Copyright 2011 The Closure Compiler Authors. All rights reserved.
     * Redistribution and use in source and binary forms, with or without
     * modification, are permitted provided that the following conditions are
     * met:
     *
     *  * Redistributions of source code must retain the above copyright
     *    notice, this list of conditions and the following disclaimer.
     *  * Redistributions in binary form must reproduce the above
     *    copyright notice, this list of conditions and the following
     *    disclaimer in the documentation and/or other materials provided
     *    with the distribution.
     *  * Neither the name of Google Inc. nor the names of its
     *    contributors may be used to endorse or promote products derived
     *    from this software without specific prior written permission.
     *
     * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
     * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
     * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
     * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
     * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
     * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
     * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
     * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
     * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
     * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
     * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
     */



    // A single base 64 digit can contain 6 bits of data. For the base 64 variable
    // length quantities we use in the source map spec, the first bit is the sign,
    // the next four bits are the actual value, and the 6th bit is the
    // continuation bit. The continuation bit tells us whether there are more
    // digits in this value following this digit.
    //
    //   Continuation
    //   |    Sign
    //   |    |
    //   V    V
    //   101011

    var VLQ_BASE_SHIFT = 5;

    // binary: 100000
    var VLQ_BASE = 1 << VLQ_BASE_SHIFT;

    // binary: 011111
    var VLQ_BASE_MASK = VLQ_BASE - 1;

    // binary: 100000
    var VLQ_CONTINUATION_BIT = VLQ_BASE;

    /**
     * Converts from a two-complement value to a value where the sign bit is
     * placed in the least significant bit.  For example, as decimals:
     *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
     *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
     */
    function toVLQSigned(aValue) {
      return aValue < 0
        ? ((-aValue) << 1) + 1
        : (aValue << 1) + 0;
    }

    /**
     * Converts to a two-complement value from a value where the sign bit is
     * placed in the least significant bit.  For example, as decimals:
     *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
     *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
     */
    function fromVLQSigned(aValue) {
      var isNegative = (aValue & 1) === 1;
      var shifted = aValue >> 1;
      return isNegative
        ? -shifted
        : shifted;
    }

    /**
     * Returns the base 64 VLQ encoded value.
     */
    var encode$1 = function base64VLQ_encode(aValue) {
      var encoded = "";
      var digit;

      var vlq = toVLQSigned(aValue);

      do {
        digit = vlq & VLQ_BASE_MASK;
        vlq >>>= VLQ_BASE_SHIFT;
        if (vlq > 0) {
          // There are still more digits in this value, so we must make sure the
          // continuation bit is marked.
          digit |= VLQ_CONTINUATION_BIT;
        }
        encoded += base64.encode(digit);
      } while (vlq > 0);

      return encoded;
    };

    /**
     * Decodes the next base 64 VLQ value from the given string and returns the
     * value and the rest of the string via the out parameter.
     */
    var decode$1 = function base64VLQ_decode(aStr, aIndex, aOutParam) {
      var strLen = aStr.length;
      var result = 0;
      var shift = 0;
      var continuation, digit;

      do {
        if (aIndex >= strLen) {
          throw new Error("Expected more digits in base 64 VLQ value.");
        }

        digit = base64.decode(aStr.charCodeAt(aIndex++));
        if (digit === -1) {
          throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
        }

        continuation = !!(digit & VLQ_CONTINUATION_BIT);
        digit &= VLQ_BASE_MASK;
        result = result + (digit << shift);
        shift += VLQ_BASE_SHIFT;
      } while (continuation);

      aOutParam.value = fromVLQSigned(result);
      aOutParam.rest = aIndex;
    };

    var base64Vlq = {
    	encode: encode$1,
    	decode: decode$1
    };

    var util$1 = createCommonjsModule(function (module, exports) {
    /* -*- Mode: js; js-indent-level: 2; -*- */
    /*
     * Copyright 2011 Mozilla Foundation and contributors
     * Licensed under the New BSD license. See LICENSE or:
     * http://opensource.org/licenses/BSD-3-Clause
     */

    /**
     * This is a helper function for getting values from parameter/options
     * objects.
     *
     * @param args The object we are extracting values from
     * @param name The name of the property we are getting.
     * @param defaultValue An optional value to return if the property is missing
     * from the object. If this is not specified and the property is missing, an
     * error will be thrown.
     */
    function getArg(aArgs, aName, aDefaultValue) {
      if (aName in aArgs) {
        return aArgs[aName];
      } else if (arguments.length === 3) {
        return aDefaultValue;
      } else {
        throw new Error('"' + aName + '" is a required argument.');
      }
    }
    exports.getArg = getArg;

    var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
    var dataUrlRegexp = /^data:.+\,.+$/;

    function urlParse(aUrl) {
      var match = aUrl.match(urlRegexp);
      if (!match) {
        return null;
      }
      return {
        scheme: match[1],
        auth: match[2],
        host: match[3],
        port: match[4],
        path: match[5]
      };
    }
    exports.urlParse = urlParse;

    function urlGenerate(aParsedUrl) {
      var url = '';
      if (aParsedUrl.scheme) {
        url += aParsedUrl.scheme + ':';
      }
      url += '//';
      if (aParsedUrl.auth) {
        url += aParsedUrl.auth + '@';
      }
      if (aParsedUrl.host) {
        url += aParsedUrl.host;
      }
      if (aParsedUrl.port) {
        url += ":" + aParsedUrl.port;
      }
      if (aParsedUrl.path) {
        url += aParsedUrl.path;
      }
      return url;
    }
    exports.urlGenerate = urlGenerate;

    /**
     * Normalizes a path, or the path portion of a URL:
     *
     * - Replaces consecutive slashes with one slash.
     * - Removes unnecessary '.' parts.
     * - Removes unnecessary '<dir>/..' parts.
     *
     * Based on code in the Node.js 'path' core module.
     *
     * @param aPath The path or url to normalize.
     */
    function normalize(aPath) {
      var path$$1 = aPath;
      var url = urlParse(aPath);
      if (url) {
        if (!url.path) {
          return aPath;
        }
        path$$1 = url.path;
      }
      var isAbsolute = exports.isAbsolute(path$$1);

      var parts = path$$1.split(/\/+/);
      for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
        part = parts[i];
        if (part === '.') {
          parts.splice(i, 1);
        } else if (part === '..') {
          up++;
        } else if (up > 0) {
          if (part === '') {
            // The first part is blank if the path is absolute. Trying to go
            // above the root is a no-op. Therefore we can remove all '..' parts
            // directly after the root.
            parts.splice(i + 1, up);
            up = 0;
          } else {
            parts.splice(i, 2);
            up--;
          }
        }
      }
      path$$1 = parts.join('/');

      if (path$$1 === '') {
        path$$1 = isAbsolute ? '/' : '.';
      }

      if (url) {
        url.path = path$$1;
        return urlGenerate(url);
      }
      return path$$1;
    }
    exports.normalize = normalize;

    /**
     * Joins two paths/URLs.
     *
     * @param aRoot The root path or URL.
     * @param aPath The path or URL to be joined with the root.
     *
     * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
     *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
     *   first.
     * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
     *   is updated with the result and aRoot is returned. Otherwise the result
     *   is returned.
     *   - If aPath is absolute, the result is aPath.
     *   - Otherwise the two paths are joined with a slash.
     * - Joining for example 'http://' and 'www.example.com' is also supported.
     */
    function join(aRoot, aPath) {
      if (aRoot === "") {
        aRoot = ".";
      }
      if (aPath === "") {
        aPath = ".";
      }
      var aPathUrl = urlParse(aPath);
      var aRootUrl = urlParse(aRoot);
      if (aRootUrl) {
        aRoot = aRootUrl.path || '/';
      }

      // `join(foo, '//www.example.org')`
      if (aPathUrl && !aPathUrl.scheme) {
        if (aRootUrl) {
          aPathUrl.scheme = aRootUrl.scheme;
        }
        return urlGenerate(aPathUrl);
      }

      if (aPathUrl || aPath.match(dataUrlRegexp)) {
        return aPath;
      }

      // `join('http://', 'www.example.com')`
      if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
        aRootUrl.host = aPath;
        return urlGenerate(aRootUrl);
      }

      var joined = aPath.charAt(0) === '/'
        ? aPath
        : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);

      if (aRootUrl) {
        aRootUrl.path = joined;
        return urlGenerate(aRootUrl);
      }
      return joined;
    }
    exports.join = join;

    exports.isAbsolute = function (aPath) {
      return aPath.charAt(0) === '/' || urlRegexp.test(aPath);
    };

    /**
     * Make a path relative to a URL or another path.
     *
     * @param aRoot The root path or URL.
     * @param aPath The path or URL to be made relative to aRoot.
     */
    function relative(aRoot, aPath) {
      if (aRoot === "") {
        aRoot = ".";
      }

      aRoot = aRoot.replace(/\/$/, '');

      // It is possible for the path to be above the root. In this case, simply
      // checking whether the root is a prefix of the path won't work. Instead, we
      // need to remove components from the root one by one, until either we find
      // a prefix that fits, or we run out of components to remove.
      var level = 0;
      while (aPath.indexOf(aRoot + '/') !== 0) {
        var index = aRoot.lastIndexOf("/");
        if (index < 0) {
          return aPath;
        }

        // If the only part of the root that is left is the scheme (i.e. http://,
        // file:///, etc.), one or more slashes (/), or simply nothing at all, we
        // have exhausted all components, so the path is not relative to the root.
        aRoot = aRoot.slice(0, index);
        if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
          return aPath;
        }

        ++level;
      }

      // Make sure we add a "../" for each component we removed from the root.
      return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
    }
    exports.relative = relative;

    var supportsNullProto = (function () {
      var obj = Object.create(null);
      return !('__proto__' in obj);
    }());

    function identity (s) {
      return s;
    }

    /**
     * Because behavior goes wacky when you set `__proto__` on objects, we
     * have to prefix all the strings in our set with an arbitrary character.
     *
     * See https://github.com/mozilla/source-map/pull/31 and
     * https://github.com/mozilla/source-map/issues/30
     *
     * @param String aStr
     */
    function toSetString(aStr) {
      if (isProtoString(aStr)) {
        return '$' + aStr;
      }

      return aStr;
    }
    exports.toSetString = supportsNullProto ? identity : toSetString;

    function fromSetString(aStr) {
      if (isProtoString(aStr)) {
        return aStr.slice(1);
      }

      return aStr;
    }
    exports.fromSetString = supportsNullProto ? identity : fromSetString;

    function isProtoString(s) {
      if (!s) {
        return false;
      }

      var length = s.length;

      if (length < 9 /* "__proto__".length */) {
        return false;
      }

      if (s.charCodeAt(length - 1) !== 95  /* '_' */ ||
          s.charCodeAt(length - 2) !== 95  /* '_' */ ||
          s.charCodeAt(length - 3) !== 111 /* 'o' */ ||
          s.charCodeAt(length - 4) !== 116 /* 't' */ ||
          s.charCodeAt(length - 5) !== 111 /* 'o' */ ||
          s.charCodeAt(length - 6) !== 114 /* 'r' */ ||
          s.charCodeAt(length - 7) !== 112 /* 'p' */ ||
          s.charCodeAt(length - 8) !== 95  /* '_' */ ||
          s.charCodeAt(length - 9) !== 95  /* '_' */) {
        return false;
      }

      for (var i = length - 10; i >= 0; i--) {
        if (s.charCodeAt(i) !== 36 /* '$' */) {
          return false;
        }
      }

      return true;
    }

    /**
     * Comparator between two mappings where the original positions are compared.
     *
     * Optionally pass in `true` as `onlyCompareGenerated` to consider two
     * mappings with the same original source/line/column, but different generated
     * line and column the same. Useful when searching for a mapping with a
     * stubbed out mapping.
     */
    function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
      var cmp = strcmp(mappingA.source, mappingB.source);
      if (cmp !== 0) {
        return cmp;
      }

      cmp = mappingA.originalLine - mappingB.originalLine;
      if (cmp !== 0) {
        return cmp;
      }

      cmp = mappingA.originalColumn - mappingB.originalColumn;
      if (cmp !== 0 || onlyCompareOriginal) {
        return cmp;
      }

      cmp = mappingA.generatedColumn - mappingB.generatedColumn;
      if (cmp !== 0) {
        return cmp;
      }

      cmp = mappingA.generatedLine - mappingB.generatedLine;
      if (cmp !== 0) {
        return cmp;
      }

      return strcmp(mappingA.name, mappingB.name);
    }
    exports.compareByOriginalPositions = compareByOriginalPositions;

    /**
     * Comparator between two mappings with deflated source and name indices where
     * the generated positions are compared.
     *
     * Optionally pass in `true` as `onlyCompareGenerated` to consider two
     * mappings with the same generated line and column, but different
     * source/name/original line and column the same. Useful when searching for a
     * mapping with a stubbed out mapping.
     */
    function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
      var cmp = mappingA.generatedLine - mappingB.generatedLine;
      if (cmp !== 0) {
        return cmp;
      }

      cmp = mappingA.generatedColumn - mappingB.generatedColumn;
      if (cmp !== 0 || onlyCompareGenerated) {
        return cmp;
      }

      cmp = strcmp(mappingA.source, mappingB.source);
      if (cmp !== 0) {
        return cmp;
      }

      cmp = mappingA.originalLine - mappingB.originalLine;
      if (cmp !== 0) {
        return cmp;
      }

      cmp = mappingA.originalColumn - mappingB.originalColumn;
      if (cmp !== 0) {
        return cmp;
      }

      return strcmp(mappingA.name, mappingB.name);
    }
    exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;

    function strcmp(aStr1, aStr2) {
      if (aStr1 === aStr2) {
        return 0;
      }

      if (aStr1 === null) {
        return 1; // aStr2 !== null
      }

      if (aStr2 === null) {
        return -1; // aStr1 !== null
      }

      if (aStr1 > aStr2) {
        return 1;
      }

      return -1;
    }

    /**
     * Comparator between two mappings with inflated source and name strings where
     * the generated positions are compared.
     */
    function compareByGeneratedPositionsInflated(mappingA, mappingB) {
      var cmp = mappingA.generatedLine - mappingB.generatedLine;
      if (cmp !== 0) {
        return cmp;
      }

      cmp = mappingA.generatedColumn - mappingB.generatedColumn;
      if (cmp !== 0) {
        return cmp;
      }

      cmp = strcmp(mappingA.source, mappingB.source);
      if (cmp !== 0) {
        return cmp;
      }

      cmp = mappingA.originalLine - mappingB.originalLine;
      if (cmp !== 0) {
        return cmp;
      }

      cmp = mappingA.originalColumn - mappingB.originalColumn;
      if (cmp !== 0) {
        return cmp;
      }

      return strcmp(mappingA.name, mappingB.name);
    }
    exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;

    /**
     * Strip any JSON XSSI avoidance prefix from the string (as documented
     * in the source maps specification), and then parse the string as
     * JSON.
     */
    function parseSourceMapInput(str) {
      return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ''));
    }
    exports.parseSourceMapInput = parseSourceMapInput;

    /**
     * Compute the URL of a source given the the source root, the source's
     * URL, and the source map's URL.
     */
    function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
      sourceURL = sourceURL || '';

      if (sourceRoot) {
        // This follows what Chrome does.
        if (sourceRoot[sourceRoot.length - 1] !== '/' && sourceURL[0] !== '/') {
          sourceRoot += '/';
        }
        // The spec says:
        //   Line 4: An optional source root, useful for relocating source
        //   files on a server or removing repeated values in the
        //   “sources” entry.  This value is prepended to the individual
        //   entries in the “source” field.
        sourceURL = sourceRoot + sourceURL;
      }

      // Historically, SourceMapConsumer did not take the sourceMapURL as
      // a parameter.  This mode is still somewhat supported, which is why
      // this code block is conditional.  However, it's preferable to pass
      // the source map URL to SourceMapConsumer, so that this function
      // can implement the source URL resolution algorithm as outlined in
      // the spec.  This block is basically the equivalent of:
      //    new URL(sourceURL, sourceMapURL).toString()
      // ... except it avoids using URL, which wasn't available in the
      // older releases of node still supported by this library.
      //
      // The spec says:
      //   If the sources are not absolute URLs after prepending of the
      //   “sourceRoot”, the sources are resolved relative to the
      //   SourceMap (like resolving script src in a html document).
      if (sourceMapURL) {
        var parsed = urlParse(sourceMapURL);
        if (!parsed) {
          throw new Error("sourceMapURL could not be parsed");
        }
        if (parsed.path) {
          // Strip the last path component, but keep the "/".
          var index = parsed.path.lastIndexOf('/');
          if (index >= 0) {
            parsed.path = parsed.path.substring(0, index + 1);
          }
        }
        sourceURL = join(urlGenerate(parsed), sourceURL);
      }

      return normalize(sourceURL);
    }
    exports.computeSourceURL = computeSourceURL;
    });
    var util_1 = util$1.getArg;
    var util_2 = util$1.urlParse;
    var util_3 = util$1.urlGenerate;
    var util_4 = util$1.normalize;
    var util_5 = util$1.join;
    var util_6 = util$1.isAbsolute;
    var util_7 = util$1.relative;
    var util_8 = util$1.toSetString;
    var util_9 = util$1.fromSetString;
    var util_10 = util$1.compareByOriginalPositions;
    var util_11 = util$1.compareByGeneratedPositionsDeflated;
    var util_12 = util$1.compareByGeneratedPositionsInflated;
    var util_13 = util$1.parseSourceMapInput;
    var util_14 = util$1.computeSourceURL;

    /* -*- Mode: js; js-indent-level: 2; -*- */
    /*
     * Copyright 2011 Mozilla Foundation and contributors
     * Licensed under the New BSD license. See LICENSE or:
     * http://opensource.org/licenses/BSD-3-Clause
     */


    var has = Object.prototype.hasOwnProperty;
    var hasNativeMap = typeof Map !== "undefined";

    /**
     * A data structure which is a combination of an array and a set. Adding a new
     * member is O(1), testing for membership is O(1), and finding the index of an
     * element is O(1). Removing elements from the set is not supported. Only
     * strings are supported for membership.
     */
    function ArraySet() {
      this._array = [];
      this._set = hasNativeMap ? new Map() : Object.create(null);
    }

    /**
     * Static method for creating ArraySet instances from an existing array.
     */
    ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
      var set = new ArraySet();
      for (var i = 0, len = aArray.length; i < len; i++) {
        set.add(aArray[i], aAllowDuplicates);
      }
      return set;
    };

    /**
     * Return how many unique items are in this ArraySet. If duplicates have been
     * added, than those do not count towards the size.
     *
     * @returns Number
     */
    ArraySet.prototype.size = function ArraySet_size() {
      return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
    };

    /**
     * Add the given string to this set.
     *
     * @param String aStr
     */
    ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
      var sStr = hasNativeMap ? aStr : util$1.toSetString(aStr);
      var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
      var idx = this._array.length;
      if (!isDuplicate || aAllowDuplicates) {
        this._array.push(aStr);
      }
      if (!isDuplicate) {
        if (hasNativeMap) {
          this._set.set(aStr, idx);
        } else {
          this._set[sStr] = idx;
        }
      }
    };

    /**
     * Is the given string a member of this set?
     *
     * @param String aStr
     */
    ArraySet.prototype.has = function ArraySet_has(aStr) {
      if (hasNativeMap) {
        return this._set.has(aStr);
      } else {
        var sStr = util$1.toSetString(aStr);
        return has.call(this._set, sStr);
      }
    };

    /**
     * What is the index of the given string in the array?
     *
     * @param String aStr
     */
    ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
      if (hasNativeMap) {
        var idx = this._set.get(aStr);
        if (idx >= 0) {
            return idx;
        }
      } else {
        var sStr = util$1.toSetString(aStr);
        if (has.call(this._set, sStr)) {
          return this._set[sStr];
        }
      }

      throw new Error('"' + aStr + '" is not in the set.');
    };

    /**
     * What is the element at the given index?
     *
     * @param Number aIdx
     */
    ArraySet.prototype.at = function ArraySet_at(aIdx) {
      if (aIdx >= 0 && aIdx < this._array.length) {
        return this._array[aIdx];
      }
      throw new Error('No element indexed by ' + aIdx);
    };

    /**
     * Returns the array representation of this set (which has the proper indices
     * indicated by indexOf). Note that this is a copy of the internal array used
     * for storing the members so that no one can mess with internal state.
     */
    ArraySet.prototype.toArray = function ArraySet_toArray() {
      return this._array.slice();
    };

    var ArraySet_1 = ArraySet;

    var arraySet = {
    	ArraySet: ArraySet_1
    };

    /* -*- Mode: js; js-indent-level: 2; -*- */
    /*
     * Copyright 2014 Mozilla Foundation and contributors
     * Licensed under the New BSD license. See LICENSE or:
     * http://opensource.org/licenses/BSD-3-Clause
     */



    /**
     * Determine whether mappingB is after mappingA with respect to generated
     * position.
     */
    function generatedPositionAfter(mappingA, mappingB) {
      // Optimized for most common case
      var lineA = mappingA.generatedLine;
      var lineB = mappingB.generatedLine;
      var columnA = mappingA.generatedColumn;
      var columnB = mappingB.generatedColumn;
      return lineB > lineA || lineB == lineA && columnB >= columnA ||
             util$1.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
    }

    /**
     * A data structure to provide a sorted view of accumulated mappings in a
     * performance conscious manner. It trades a neglibable overhead in general
     * case for a large speedup in case of mappings being added in order.
     */
    function MappingList() {
      this._array = [];
      this._sorted = true;
      // Serves as infimum
      this._last = {generatedLine: -1, generatedColumn: 0};
    }

    /**
     * Iterate through internal items. This method takes the same arguments that
     * `Array.prototype.forEach` takes.
     *
     * NOTE: The order of the mappings is NOT guaranteed.
     */
    MappingList.prototype.unsortedForEach =
      function MappingList_forEach(aCallback, aThisArg) {
        this._array.forEach(aCallback, aThisArg);
      };

    /**
     * Add the given source mapping.
     *
     * @param Object aMapping
     */
    MappingList.prototype.add = function MappingList_add(aMapping) {
      if (generatedPositionAfter(this._last, aMapping)) {
        this._last = aMapping;
        this._array.push(aMapping);
      } else {
        this._sorted = false;
        this._array.push(aMapping);
      }
    };

    /**
     * Returns the flat, sorted array of mappings. The mappings are sorted by
     * generated position.
     *
     * WARNING: This method returns internal data without copying, for
     * performance. The return value must NOT be mutated, and should be treated as
     * an immutable borrow. If you want to take ownership, you must make your own
     * copy.
     */
    MappingList.prototype.toArray = function MappingList_toArray() {
      if (!this._sorted) {
        this._array.sort(util$1.compareByGeneratedPositionsInflated);
        this._sorted = true;
      }
      return this._array;
    };

    var MappingList_1 = MappingList;

    var mappingList = {
    	MappingList: MappingList_1
    };

    /* -*- Mode: js; js-indent-level: 2; -*- */
    /*
     * Copyright 2011 Mozilla Foundation and contributors
     * Licensed under the New BSD license. See LICENSE or:
     * http://opensource.org/licenses/BSD-3-Clause
     */



    var ArraySet$1 = arraySet.ArraySet;
    var MappingList$1 = mappingList.MappingList;

    /**
     * An instance of the SourceMapGenerator represents a source map which is
     * being built incrementally. You may pass an object with the following
     * properties:
     *
     *   - file: The filename of the generated source.
     *   - sourceRoot: A root for all relative URLs in this source map.
     */
    function SourceMapGenerator(aArgs) {
      if (!aArgs) {
        aArgs = {};
      }
      this._file = util$1.getArg(aArgs, 'file', null);
      this._sourceRoot = util$1.getArg(aArgs, 'sourceRoot', null);
      this._skipValidation = util$1.getArg(aArgs, 'skipValidation', false);
      this._sources = new ArraySet$1();
      this._names = new ArraySet$1();
      this._mappings = new MappingList$1();
      this._sourcesContents = null;
    }

    SourceMapGenerator.prototype._version = 3;

    /**
     * Creates a new SourceMapGenerator based on a SourceMapConsumer
     *
     * @param aSourceMapConsumer The SourceMap.
     */
    SourceMapGenerator.fromSourceMap =
      function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
        var sourceRoot = aSourceMapConsumer.sourceRoot;
        var generator = new SourceMapGenerator({
          file: aSourceMapConsumer.file,
          sourceRoot: sourceRoot
        });
        aSourceMapConsumer.eachMapping(function (mapping) {
          var newMapping = {
            generated: {
              line: mapping.generatedLine,
              column: mapping.generatedColumn
            }
          };

          if (mapping.source != null) {
            newMapping.source = mapping.source;
            if (sourceRoot != null) {
              newMapping.source = util$1.relative(sourceRoot, newMapping.source);
            }

            newMapping.original = {
              line: mapping.originalLine,
              column: mapping.originalColumn
            };

            if (mapping.name != null) {
              newMapping.name = mapping.name;
            }
          }

          generator.addMapping(newMapping);
        });
        aSourceMapConsumer.sources.forEach(function (sourceFile) {
          var sourceRelative = sourceFile;
          if (sourceRoot !== null) {
            sourceRelative = util$1.relative(sourceRoot, sourceFile);
          }

          if (!generator._sources.has(sourceRelative)) {
            generator._sources.add(sourceRelative);
          }

          var content = aSourceMapConsumer.sourceContentFor(sourceFile);
          if (content != null) {
            generator.setSourceContent(sourceFile, content);
          }
        });
        return generator;
      };

    /**
     * Add a single mapping from original source line and column to the generated
     * source's line and column for this source map being created. The mapping
     * object should have the following properties:
     *
     *   - generated: An object with the generated line and column positions.
     *   - original: An object with the original line and column positions.
     *   - source: The original source file (relative to the sourceRoot).
     *   - name: An optional original token name for this mapping.
     */
    SourceMapGenerator.prototype.addMapping =
      function SourceMapGenerator_addMapping(aArgs) {
        var generated = util$1.getArg(aArgs, 'generated');
        var original = util$1.getArg(aArgs, 'original', null);
        var source = util$1.getArg(aArgs, 'source', null);
        var name = util$1.getArg(aArgs, 'name', null);

        if (!this._skipValidation) {
          this._validateMapping(generated, original, source, name);
        }

        if (source != null) {
          source = String(source);
          if (!this._sources.has(source)) {
            this._sources.add(source);
          }
        }

        if (name != null) {
          name = String(name);
          if (!this._names.has(name)) {
            this._names.add(name);
          }
        }

        this._mappings.add({
          generatedLine: generated.line,
          generatedColumn: generated.column,
          originalLine: original != null && original.line,
          originalColumn: original != null && original.column,
          source: source,
          name: name
        });
      };

    /**
     * Set the source content for a source file.
     */
    SourceMapGenerator.prototype.setSourceContent =
      function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
        var source = aSourceFile;
        if (this._sourceRoot != null) {
          source = util$1.relative(this._sourceRoot, source);
        }

        if (aSourceContent != null) {
          // Add the source content to the _sourcesContents map.
          // Create a new _sourcesContents map if the property is null.
          if (!this._sourcesContents) {
            this._sourcesContents = Object.create(null);
          }
          this._sourcesContents[util$1.toSetString(source)] = aSourceContent;
        } else if (this._sourcesContents) {
          // Remove the source file from the _sourcesContents map.
          // If the _sourcesContents map is empty, set the property to null.
          delete this._sourcesContents[util$1.toSetString(source)];
          if (Object.keys(this._sourcesContents).length === 0) {
            this._sourcesContents = null;
          }
        }
      };

    /**
     * Applies the mappings of a sub-source-map for a specific source file to the
     * source map being generated. Each mapping to the supplied source file is
     * rewritten using the supplied source map. Note: The resolution for the
     * resulting mappings is the minimium of this map and the supplied map.
     *
     * @param aSourceMapConsumer The source map to be applied.
     * @param aSourceFile Optional. The filename of the source file.
     *        If omitted, SourceMapConsumer's file property will be used.
     * @param aSourceMapPath Optional. The dirname of the path to the source map
     *        to be applied. If relative, it is relative to the SourceMapConsumer.
     *        This parameter is needed when the two source maps aren't in the same
     *        directory, and the source map to be applied contains relative source
     *        paths. If so, those relative source paths need to be rewritten
     *        relative to the SourceMapGenerator.
     */
    SourceMapGenerator.prototype.applySourceMap =
      function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
        var sourceFile = aSourceFile;
        // If aSourceFile is omitted, we will use the file property of the SourceMap
        if (aSourceFile == null) {
          if (aSourceMapConsumer.file == null) {
            throw new Error(
              'SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ' +
              'or the source map\'s "file" property. Both were omitted.'
            );
          }
          sourceFile = aSourceMapConsumer.file;
        }
        var sourceRoot = this._sourceRoot;
        // Make "sourceFile" relative if an absolute Url is passed.
        if (sourceRoot != null) {
          sourceFile = util$1.relative(sourceRoot, sourceFile);
        }
        // Applying the SourceMap can add and remove items from the sources and
        // the names array.
        var newSources = new ArraySet$1();
        var newNames = new ArraySet$1();

        // Find mappings for the "sourceFile"
        this._mappings.unsortedForEach(function (mapping) {
          if (mapping.source === sourceFile && mapping.originalLine != null) {
            // Check if it can be mapped by the source map, then update the mapping.
            var original = aSourceMapConsumer.originalPositionFor({
              line: mapping.originalLine,
              column: mapping.originalColumn
            });
            if (original.source != null) {
              // Copy mapping
              mapping.source = original.source;
              if (aSourceMapPath != null) {
                mapping.source = util$1.join(aSourceMapPath, mapping.source);
              }
              if (sourceRoot != null) {
                mapping.source = util$1.relative(sourceRoot, mapping.source);
              }
              mapping.originalLine = original.line;
              mapping.originalColumn = original.column;
              if (original.name != null) {
                mapping.name = original.name;
              }
            }
          }

          var source = mapping.source;
          if (source != null && !newSources.has(source)) {
            newSources.add(source);
          }

          var name = mapping.name;
          if (name != null && !newNames.has(name)) {
            newNames.add(name);
          }

        }, this);
        this._sources = newSources;
        this._names = newNames;

        // Copy sourcesContents of applied map.
        aSourceMapConsumer.sources.forEach(function (sourceFile) {
          var content = aSourceMapConsumer.sourceContentFor(sourceFile);
          if (content != null) {
            if (aSourceMapPath != null) {
              sourceFile = util$1.join(aSourceMapPath, sourceFile);
            }
            if (sourceRoot != null) {
              sourceFile = util$1.relative(sourceRoot, sourceFile);
            }
            this.setSourceContent(sourceFile, content);
          }
        }, this);
      };

    /**
     * A mapping can have one of the three levels of data:
     *
     *   1. Just the generated position.
     *   2. The Generated position, original position, and original source.
     *   3. Generated and original position, original source, as well as a name
     *      token.
     *
     * To maintain consistency, we validate that any new mapping being added falls
     * in to one of these categories.
     */
    SourceMapGenerator.prototype._validateMapping =
      function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource,
                                                  aName) {
        // When aOriginal is truthy but has empty values for .line and .column,
        // it is most likely a programmer error. In this case we throw a very
        // specific error message to try to guide them the right way.
        // For example: https://github.com/Polymer/polymer-bundler/pull/519
        if (aOriginal && typeof aOriginal.line !== 'number' && typeof aOriginal.column !== 'number') {
            throw new Error(
                'original.line and original.column are not numbers -- you probably meant to omit ' +
                'the original mapping entirely and only map the generated position. If so, pass ' +
                'null for the original mapping instead of an object with empty or null values.'
            );
        }

        if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
            && aGenerated.line > 0 && aGenerated.column >= 0
            && !aOriginal && !aSource && !aName) {
          // Case 1.
          return;
        }
        else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
                 && aOriginal && 'line' in aOriginal && 'column' in aOriginal
                 && aGenerated.line > 0 && aGenerated.column >= 0
                 && aOriginal.line > 0 && aOriginal.column >= 0
                 && aSource) {
          // Cases 2 and 3.
          return;
        }
        else {
          throw new Error('Invalid mapping: ' + JSON.stringify({
            generated: aGenerated,
            source: aSource,
            original: aOriginal,
            name: aName
          }));
        }
      };

    /**
     * Serialize the accumulated mappings in to the stream of base 64 VLQs
     * specified by the source map format.
     */
    SourceMapGenerator.prototype._serializeMappings =
      function SourceMapGenerator_serializeMappings() {
        var previousGeneratedColumn = 0;
        var previousGeneratedLine = 1;
        var previousOriginalColumn = 0;
        var previousOriginalLine = 0;
        var previousName = 0;
        var previousSource = 0;
        var result = '';
        var next;
        var mapping;
        var nameIdx;
        var sourceIdx;

        var mappings = this._mappings.toArray();
        for (var i = 0, len = mappings.length; i < len; i++) {
          mapping = mappings[i];
          next = '';

          if (mapping.generatedLine !== previousGeneratedLine) {
            previousGeneratedColumn = 0;
            while (mapping.generatedLine !== previousGeneratedLine) {
              next += ';';
              previousGeneratedLine++;
            }
          }
          else {
            if (i > 0) {
              if (!util$1.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
                continue;
              }
              next += ',';
            }
          }

          next += base64Vlq.encode(mapping.generatedColumn
                                     - previousGeneratedColumn);
          previousGeneratedColumn = mapping.generatedColumn;

          if (mapping.source != null) {
            sourceIdx = this._sources.indexOf(mapping.source);
            next += base64Vlq.encode(sourceIdx - previousSource);
            previousSource = sourceIdx;

            // lines are stored 0-based in SourceMap spec version 3
            next += base64Vlq.encode(mapping.originalLine - 1
                                       - previousOriginalLine);
            previousOriginalLine = mapping.originalLine - 1;

            next += base64Vlq.encode(mapping.originalColumn
                                       - previousOriginalColumn);
            previousOriginalColumn = mapping.originalColumn;

            if (mapping.name != null) {
              nameIdx = this._names.indexOf(mapping.name);
              next += base64Vlq.encode(nameIdx - previousName);
              previousName = nameIdx;
            }
          }

          result += next;
        }

        return result;
      };

    SourceMapGenerator.prototype._generateSourcesContent =
      function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
        return aSources.map(function (source) {
          if (!this._sourcesContents) {
            return null;
          }
          if (aSourceRoot != null) {
            source = util$1.relative(aSourceRoot, source);
          }
          var key = util$1.toSetString(source);
          return Object.prototype.hasOwnProperty.call(this._sourcesContents, key)
            ? this._sourcesContents[key]
            : null;
        }, this);
      };

    /**
     * Externalize the source map.
     */
    SourceMapGenerator.prototype.toJSON =
      function SourceMapGenerator_toJSON() {
        var map = {
          version: this._version,
          sources: this._sources.toArray(),
          names: this._names.toArray(),
          mappings: this._serializeMappings()
        };
        if (this._file != null) {
          map.file = this._file;
        }
        if (this._sourceRoot != null) {
          map.sourceRoot = this._sourceRoot;
        }
        if (this._sourcesContents) {
          map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
        }

        return map;
      };

    /**
     * Render the source map being generated to a string.
     */
    SourceMapGenerator.prototype.toString =
      function SourceMapGenerator_toString() {
        return JSON.stringify(this.toJSON());
      };

    var SourceMapGenerator_1 = SourceMapGenerator;

    var sourceMapGenerator = {
    	SourceMapGenerator: SourceMapGenerator_1
    };

    var binarySearch = createCommonjsModule(function (module, exports) {
    /* -*- Mode: js; js-indent-level: 2; -*- */
    /*
     * Copyright 2011 Mozilla Foundation and contributors
     * Licensed under the New BSD license. See LICENSE or:
     * http://opensource.org/licenses/BSD-3-Clause
     */

    exports.GREATEST_LOWER_BOUND = 1;
    exports.LEAST_UPPER_BOUND = 2;

    /**
     * Recursive implementation of binary search.
     *
     * @param aLow Indices here and lower do not contain the needle.
     * @param aHigh Indices here and higher do not contain the needle.
     * @param aNeedle The element being searched for.
     * @param aHaystack The non-empty array being searched.
     * @param aCompare Function which takes two elements and returns -1, 0, or 1.
     * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
     *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
     *     closest element that is smaller than or greater than the one we are
     *     searching for, respectively, if the exact element cannot be found.
     */
    function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
      // This function terminates when one of the following is true:
      //
      //   1. We find the exact element we are looking for.
      //
      //   2. We did not find the exact element, but we can return the index of
      //      the next-closest element.
      //
      //   3. We did not find the exact element, and there is no next-closest
      //      element than the one we are searching for, so we return -1.
      var mid = Math.floor((aHigh - aLow) / 2) + aLow;
      var cmp = aCompare(aNeedle, aHaystack[mid], true);
      if (cmp === 0) {
        // Found the element we are looking for.
        return mid;
      }
      else if (cmp > 0) {
        // Our needle is greater than aHaystack[mid].
        if (aHigh - mid > 1) {
          // The element is in the upper half.
          return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
        }

        // The exact needle element was not found in this haystack. Determine if
        // we are in termination case (3) or (2) and return the appropriate thing.
        if (aBias == exports.LEAST_UPPER_BOUND) {
          return aHigh < aHaystack.length ? aHigh : -1;
        } else {
          return mid;
        }
      }
      else {
        // Our needle is less than aHaystack[mid].
        if (mid - aLow > 1) {
          // The element is in the lower half.
          return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
        }

        // we are in termination case (3) or (2) and return the appropriate thing.
        if (aBias == exports.LEAST_UPPER_BOUND) {
          return mid;
        } else {
          return aLow < 0 ? -1 : aLow;
        }
      }
    }

    /**
     * This is an implementation of binary search which will always try and return
     * the index of the closest element if there is no exact hit. This is because
     * mappings between original and generated line/col pairs are single points,
     * and there is an implicit region between each of them, so a miss just means
     * that you aren't on the very start of a region.
     *
     * @param aNeedle The element you are looking for.
     * @param aHaystack The array that is being searched.
     * @param aCompare A function which takes the needle and an element in the
     *     array and returns -1, 0, or 1 depending on whether the needle is less
     *     than, equal to, or greater than the element, respectively.
     * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
     *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
     *     closest element that is smaller than or greater than the one we are
     *     searching for, respectively, if the exact element cannot be found.
     *     Defaults to 'binarySearch.GREATEST_LOWER_BOUND'.
     */
    exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
      if (aHaystack.length === 0) {
        return -1;
      }

      var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack,
                                  aCompare, aBias || exports.GREATEST_LOWER_BOUND);
      if (index < 0) {
        return -1;
      }

      // We have found either the exact element, or the next-closest element than
      // the one we are searching for. However, there may be more than one such
      // element. Make sure we always return the smallest of these.
      while (index - 1 >= 0) {
        if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
          break;
        }
        --index;
      }

      return index;
    };
    });
    var binarySearch_1 = binarySearch.GREATEST_LOWER_BOUND;
    var binarySearch_2 = binarySearch.LEAST_UPPER_BOUND;
    var binarySearch_3 = binarySearch.search;

    /* -*- Mode: js; js-indent-level: 2; -*- */
    /*
     * Copyright 2011 Mozilla Foundation and contributors
     * Licensed under the New BSD license. See LICENSE or:
     * http://opensource.org/licenses/BSD-3-Clause
     */

    // It turns out that some (most?) JavaScript engines don't self-host
    // `Array.prototype.sort`. This makes sense because C++ will likely remain
    // faster than JS when doing raw CPU-intensive sorting. However, when using a
    // custom comparator function, calling back and forth between the VM's C++ and
    // JIT'd JS is rather slow *and* loses JIT type information, resulting in
    // worse generated code for the comparator function than would be optimal. In
    // fact, when sorting with a comparator, these costs outweigh the benefits of
    // sorting in C++. By using our own JS-implemented Quick Sort (below), we get
    // a ~3500ms mean speed-up in `bench/bench.html`.

    /**
     * Swap the elements indexed by `x` and `y` in the array `ary`.
     *
     * @param {Array} ary
     *        The array.
     * @param {Number} x
     *        The index of the first item.
     * @param {Number} y
     *        The index of the second item.
     */
    function swap(ary, x, y) {
      var temp = ary[x];
      ary[x] = ary[y];
      ary[y] = temp;
    }

    /**
     * Returns a random integer within the range `low .. high` inclusive.
     *
     * @param {Number} low
     *        The lower bound on the range.
     * @param {Number} high
     *        The upper bound on the range.
     */
    function randomIntInRange(low, high) {
      return Math.round(low + (Math.random() * (high - low)));
    }

    /**
     * The Quick Sort algorithm.
     *
     * @param {Array} ary
     *        An array to sort.
     * @param {function} comparator
     *        Function to use to compare two items.
     * @param {Number} p
     *        Start index of the array
     * @param {Number} r
     *        End index of the array
     */
    function doQuickSort(ary, comparator, p, r) {
      // If our lower bound is less than our upper bound, we (1) partition the
      // array into two pieces and (2) recurse on each half. If it is not, this is
      // the empty array and our base case.

      if (p < r) {
        // (1) Partitioning.
        //
        // The partitioning chooses a pivot between `p` and `r` and moves all
        // elements that are less than or equal to the pivot to the before it, and
        // all the elements that are greater than it after it. The effect is that
        // once partition is done, the pivot is in the exact place it will be when
        // the array is put in sorted order, and it will not need to be moved
        // again. This runs in O(n) time.

        // Always choose a random pivot so that an input array which is reverse
        // sorted does not cause O(n^2) running time.
        var pivotIndex = randomIntInRange(p, r);
        var i = p - 1;

        swap(ary, pivotIndex, r);
        var pivot = ary[r];

        // Immediately after `j` is incremented in this loop, the following hold
        // true:
        //
        //   * Every element in `ary[p .. i]` is less than or equal to the pivot.
        //
        //   * Every element in `ary[i+1 .. j-1]` is greater than the pivot.
        for (var j = p; j < r; j++) {
          if (comparator(ary[j], pivot) <= 0) {
            i += 1;
            swap(ary, i, j);
          }
        }

        swap(ary, i + 1, j);
        var q = i + 1;

        // (2) Recurse on each half.

        doQuickSort(ary, comparator, p, q - 1);
        doQuickSort(ary, comparator, q + 1, r);
      }
    }

    /**
     * Sort the given array in-place with the given comparator function.
     *
     * @param {Array} ary
     *        An array to sort.
     * @param {function} comparator
     *        Function to use to compare two items.
     */
    var quickSort_1 = function (ary, comparator) {
      doQuickSort(ary, comparator, 0, ary.length - 1);
    };

    var quickSort = {
    	quickSort: quickSort_1
    };

    /* -*- Mode: js; js-indent-level: 2; -*- */
    /*
     * Copyright 2011 Mozilla Foundation and contributors
     * Licensed under the New BSD license. See LICENSE or:
     * http://opensource.org/licenses/BSD-3-Clause
     */



    var ArraySet$2 = arraySet.ArraySet;

    var quickSort$1 = quickSort.quickSort;

    function SourceMapConsumer(aSourceMap, aSourceMapURL) {
      var sourceMap = aSourceMap;
      if (typeof aSourceMap === 'string') {
        sourceMap = util$1.parseSourceMapInput(aSourceMap);
      }

      return sourceMap.sections != null
        ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL)
        : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
    }

    SourceMapConsumer.fromSourceMap = function(aSourceMap, aSourceMapURL) {
      return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
    };

    /**
     * The version of the source mapping spec that we are consuming.
     */
    SourceMapConsumer.prototype._version = 3;

    // `__generatedMappings` and `__originalMappings` are arrays that hold the
    // parsed mapping coordinates from the source map's "mappings" attribute. They
    // are lazily instantiated, accessed via the `_generatedMappings` and
    // `_originalMappings` getters respectively, and we only parse the mappings
    // and create these arrays once queried for a source location. We jump through
    // these hoops because there can be many thousands of mappings, and parsing
    // them is expensive, so we only want to do it if we must.
    //
    // Each object in the arrays is of the form:
    //
    //     {
    //       generatedLine: The line number in the generated code,
    //       generatedColumn: The column number in the generated code,
    //       source: The path to the original source file that generated this
    //               chunk of code,
    //       originalLine: The line number in the original source that
    //                     corresponds to this chunk of generated code,
    //       originalColumn: The column number in the original source that
    //                       corresponds to this chunk of generated code,
    //       name: The name of the original symbol which generated this chunk of
    //             code.
    //     }
    //
    // All properties except for `generatedLine` and `generatedColumn` can be
    // `null`.
    //
    // `_generatedMappings` is ordered by the generated positions.
    //
    // `_originalMappings` is ordered by the original positions.

    SourceMapConsumer.prototype.__generatedMappings = null;
    Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {
      configurable: true,
      enumerable: true,
      get: function () {
        if (!this.__generatedMappings) {
          this._parseMappings(this._mappings, this.sourceRoot);
        }

        return this.__generatedMappings;
      }
    });

    SourceMapConsumer.prototype.__originalMappings = null;
    Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {
      configurable: true,
      enumerable: true,
      get: function () {
        if (!this.__originalMappings) {
          this._parseMappings(this._mappings, this.sourceRoot);
        }

        return this.__originalMappings;
      }
    });

    SourceMapConsumer.prototype._charIsMappingSeparator =
      function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
        var c = aStr.charAt(index);
        return c === ";" || c === ",";
      };

    /**
     * Parse the mappings in a string in to a data structure which we can easily
     * query (the ordered arrays in the `this.__generatedMappings` and
     * `this.__originalMappings` properties).
     */
    SourceMapConsumer.prototype._parseMappings =
      function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
        throw new Error("Subclasses must implement _parseMappings");
      };

    SourceMapConsumer.GENERATED_ORDER = 1;
    SourceMapConsumer.ORIGINAL_ORDER = 2;

    SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
    SourceMapConsumer.LEAST_UPPER_BOUND = 2;

    /**
     * Iterate over each mapping between an original source/line/column and a
     * generated line/column in this source map.
     *
     * @param Function aCallback
     *        The function that is called with each mapping.
     * @param Object aContext
     *        Optional. If specified, this object will be the value of `this` every
     *        time that `aCallback` is called.
     * @param aOrder
     *        Either `SourceMapConsumer.GENERATED_ORDER` or
     *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
     *        iterate over the mappings sorted by the generated file's line/column
     *        order or the original's source/line/column order, respectively. Defaults to
     *        `SourceMapConsumer.GENERATED_ORDER`.
     */
    SourceMapConsumer.prototype.eachMapping =
      function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
        var context = aContext || null;
        var order = aOrder || SourceMapConsumer.GENERATED_ORDER;

        var mappings;
        switch (order) {
        case SourceMapConsumer.GENERATED_ORDER:
          mappings = this._generatedMappings;
          break;
        case SourceMapConsumer.ORIGINAL_ORDER:
          mappings = this._originalMappings;
          break;
        default:
          throw new Error("Unknown order of iteration.");
        }

        var sourceRoot = this.sourceRoot;
        mappings.map(function (mapping) {
          var source = mapping.source === null ? null : this._sources.at(mapping.source);
          source = util$1.computeSourceURL(sourceRoot, source, this._sourceMapURL);
          return {
            source: source,
            generatedLine: mapping.generatedLine,
            generatedColumn: mapping.generatedColumn,
            originalLine: mapping.originalLine,
            originalColumn: mapping.originalColumn,
            name: mapping.name === null ? null : this._names.at(mapping.name)
          };
        }, this).forEach(aCallback, context);
      };

    /**
     * Returns all generated line and column information for the original source,
     * line, and column provided. If no column is provided, returns all mappings
     * corresponding to a either the line we are searching for or the next
     * closest line that has any mappings. Otherwise, returns all mappings
     * corresponding to the given line and either the column we are searching for
     * or the next closest column that has any offsets.
     *
     * The only argument is an object with the following properties:
     *
     *   - source: The filename of the original source.
     *   - line: The line number in the original source.  The line number is 1-based.
     *   - column: Optional. the column number in the original source.
     *    The column number is 0-based.
     *
     * and an array of objects is returned, each with the following properties:
     *
     *   - line: The line number in the generated source, or null.  The
     *    line number is 1-based.
     *   - column: The column number in the generated source, or null.
     *    The column number is 0-based.
     */
    SourceMapConsumer.prototype.allGeneratedPositionsFor =
      function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
        var line = util$1.getArg(aArgs, 'line');

        // When there is no exact match, BasicSourceMapConsumer.prototype._findMapping
        // returns the index of the closest mapping less than the needle. By
        // setting needle.originalColumn to 0, we thus find the last mapping for
        // the given line, provided such a mapping exists.
        var needle = {
          source: util$1.getArg(aArgs, 'source'),
          originalLine: line,
          originalColumn: util$1.getArg(aArgs, 'column', 0)
        };

        needle.source = this._findSourceIndex(needle.source);
        if (needle.source < 0) {
          return [];
        }

        var mappings = [];

        var index = this._findMapping(needle,
                                      this._originalMappings,
                                      "originalLine",
                                      "originalColumn",
                                      util$1.compareByOriginalPositions,
                                      binarySearch.LEAST_UPPER_BOUND);
        if (index >= 0) {
          var mapping = this._originalMappings[index];

          if (aArgs.column === undefined) {
            var originalLine = mapping.originalLine;

            // Iterate until either we run out of mappings, or we run into
            // a mapping for a different line than the one we found. Since
            // mappings are sorted, this is guaranteed to find all mappings for
            // the line we found.
            while (mapping && mapping.originalLine === originalLine) {
              mappings.push({
                line: util$1.getArg(mapping, 'generatedLine', null),
                column: util$1.getArg(mapping, 'generatedColumn', null),
                lastColumn: util$1.getArg(mapping, 'lastGeneratedColumn', null)
              });

              mapping = this._originalMappings[++index];
            }
          } else {
            var originalColumn = mapping.originalColumn;

            // Iterate until either we run out of mappings, or we run into
            // a mapping for a different line than the one we were searching for.
            // Since mappings are sorted, this is guaranteed to find all mappings for
            // the line we are searching for.
            while (mapping &&
                   mapping.originalLine === line &&
                   mapping.originalColumn == originalColumn) {
              mappings.push({
                line: util$1.getArg(mapping, 'generatedLine', null),
                column: util$1.getArg(mapping, 'generatedColumn', null),
                lastColumn: util$1.getArg(mapping, 'lastGeneratedColumn', null)
              });

              mapping = this._originalMappings[++index];
            }
          }
        }

        return mappings;
      };

    var SourceMapConsumer_1 = SourceMapConsumer;

    /**
     * A BasicSourceMapConsumer instance represents a parsed source map which we can
     * query for information about the original file positions by giving it a file
     * position in the generated source.
     *
     * The first parameter is the raw source map (either as a JSON string, or
     * already parsed to an object). According to the spec, source maps have the
     * following attributes:
     *
     *   - version: Which version of the source map spec this map is following.
     *   - sources: An array of URLs to the original source files.
     *   - names: An array of identifiers which can be referrenced by individual mappings.
     *   - sourceRoot: Optional. The URL root from which all sources are relative.
     *   - sourcesContent: Optional. An array of contents of the original source files.
     *   - mappings: A string of base64 VLQs which contain the actual mappings.
     *   - file: Optional. The generated file this source map is associated with.
     *
     * Here is an example source map, taken from the source map spec[0]:
     *
     *     {
     *       version : 3,
     *       file: "out.js",
     *       sourceRoot : "",
     *       sources: ["foo.js", "bar.js"],
     *       names: ["src", "maps", "are", "fun"],
     *       mappings: "AA,AB;;ABCDE;"
     *     }
     *
     * The second parameter, if given, is a string whose value is the URL
     * at which the source map was found.  This URL is used to compute the
     * sources array.
     *
     * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
     */
    function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
      var sourceMap = aSourceMap;
      if (typeof aSourceMap === 'string') {
        sourceMap = util$1.parseSourceMapInput(aSourceMap);
      }

      var version = util$1.getArg(sourceMap, 'version');
      var sources = util$1.getArg(sourceMap, 'sources');
      // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
      // requires the array) to play nice here.
      var names = util$1.getArg(sourceMap, 'names', []);
      var sourceRoot = util$1.getArg(sourceMap, 'sourceRoot', null);
      var sourcesContent = util$1.getArg(sourceMap, 'sourcesContent', null);
      var mappings = util$1.getArg(sourceMap, 'mappings');
      var file = util$1.getArg(sourceMap, 'file', null);

      // Once again, Sass deviates from the spec and supplies the version as a
      // string rather than a number, so we use loose equality checking here.
      if (version != this._version) {
        throw new Error('Unsupported version: ' + version);
      }

      if (sourceRoot) {
        sourceRoot = util$1.normalize(sourceRoot);
      }

      sources = sources
        .map(String)
        // Some source maps produce relative source paths like "./foo.js" instead of
        // "foo.js".  Normalize these first so that future comparisons will succeed.
        // See bugzil.la/1090768.
        .map(util$1.normalize)
        // Always ensure that absolute sources are internally stored relative to
        // the source root, if the source root is absolute. Not doing this would
        // be particularly problematic when the source root is a prefix of the
        // source (valid, but why??). See github issue #199 and bugzil.la/1188982.
        .map(function (source) {
          return sourceRoot && util$1.isAbsolute(sourceRoot) && util$1.isAbsolute(source)
            ? util$1.relative(sourceRoot, source)
            : source;
        });

      // Pass `true` below to allow duplicate names and sources. While source maps
      // are intended to be compressed and deduplicated, the TypeScript compiler
      // sometimes generates source maps with duplicates in them. See Github issue
      // #72 and bugzil.la/889492.
      this._names = ArraySet$2.fromArray(names.map(String), true);
      this._sources = ArraySet$2.fromArray(sources, true);

      this._absoluteSources = this._sources.toArray().map(function (s) {
        return util$1.computeSourceURL(sourceRoot, s, aSourceMapURL);
      });

      this.sourceRoot = sourceRoot;
      this.sourcesContent = sourcesContent;
      this._mappings = mappings;
      this._sourceMapURL = aSourceMapURL;
      this.file = file;
    }

    BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
    BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;

    /**
     * Utility function to find the index of a source.  Returns -1 if not
     * found.
     */
    BasicSourceMapConsumer.prototype._findSourceIndex = function(aSource) {
      var relativeSource = aSource;
      if (this.sourceRoot != null) {
        relativeSource = util$1.relative(this.sourceRoot, relativeSource);
      }

      if (this._sources.has(relativeSource)) {
        return this._sources.indexOf(relativeSource);
      }

      // Maybe aSource is an absolute URL as returned by |sources|.  In
      // this case we can't simply undo the transform.
      var i;
      for (i = 0; i < this._absoluteSources.length; ++i) {
        if (this._absoluteSources[i] == aSource) {
          return i;
        }
      }

      return -1;
    };

    /**
     * Create a BasicSourceMapConsumer from a SourceMapGenerator.
     *
     * @param SourceMapGenerator aSourceMap
     *        The source map that will be consumed.
     * @param String aSourceMapURL
     *        The URL at which the source map can be found (optional)
     * @returns BasicSourceMapConsumer
     */
    BasicSourceMapConsumer.fromSourceMap =
      function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
        var smc = Object.create(BasicSourceMapConsumer.prototype);

        var names = smc._names = ArraySet$2.fromArray(aSourceMap._names.toArray(), true);
        var sources = smc._sources = ArraySet$2.fromArray(aSourceMap._sources.toArray(), true);
        smc.sourceRoot = aSourceMap._sourceRoot;
        smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(),
                                                                smc.sourceRoot);
        smc.file = aSourceMap._file;
        smc._sourceMapURL = aSourceMapURL;
        smc._absoluteSources = smc._sources.toArray().map(function (s) {
          return util$1.computeSourceURL(smc.sourceRoot, s, aSourceMapURL);
        });

        // Because we are modifying the entries (by converting string sources and
        // names to indices into the sources and names ArraySets), we have to make
        // a copy of the entry or else bad things happen. Shared mutable state
        // strikes again! See github issue #191.

        var generatedMappings = aSourceMap._mappings.toArray().slice();
        var destGeneratedMappings = smc.__generatedMappings = [];
        var destOriginalMappings = smc.__originalMappings = [];

        for (var i = 0, length = generatedMappings.length; i < length; i++) {
          var srcMapping = generatedMappings[i];
          var destMapping = new Mapping;
          destMapping.generatedLine = srcMapping.generatedLine;
          destMapping.generatedColumn = srcMapping.generatedColumn;

          if (srcMapping.source) {
            destMapping.source = sources.indexOf(srcMapping.source);
            destMapping.originalLine = srcMapping.originalLine;
            destMapping.originalColumn = srcMapping.originalColumn;

            if (srcMapping.name) {
              destMapping.name = names.indexOf(srcMapping.name);
            }

            destOriginalMappings.push(destMapping);
          }

          destGeneratedMappings.push(destMapping);
        }

        quickSort$1(smc.__originalMappings, util$1.compareByOriginalPositions);

        return smc;
      };

    /**
     * The version of the source mapping spec that we are consuming.
     */
    BasicSourceMapConsumer.prototype._version = 3;

    /**
     * The list of original sources.
     */
    Object.defineProperty(BasicSourceMapConsumer.prototype, 'sources', {
      get: function () {
        return this._absoluteSources.slice();
      }
    });

    /**
     * Provide the JIT with a nice shape / hidden class.
     */
    function Mapping() {
      this.generatedLine = 0;
      this.generatedColumn = 0;
      this.source = null;
      this.originalLine = null;
      this.originalColumn = null;
      this.name = null;
    }

    /**
     * Parse the mappings in a string in to a data structure which we can easily
     * query (the ordered arrays in the `this.__generatedMappings` and
     * `this.__originalMappings` properties).
     */
    BasicSourceMapConsumer.prototype._parseMappings =
      function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
        var generatedLine = 1;
        var previousGeneratedColumn = 0;
        var previousOriginalLine = 0;
        var previousOriginalColumn = 0;
        var previousSource = 0;
        var previousName = 0;
        var length = aStr.length;
        var index = 0;
        var cachedSegments = {};
        var temp = {};
        var originalMappings = [];
        var generatedMappings = [];
        var mapping, str, segment, end, value;

        while (index < length) {
          if (aStr.charAt(index) === ';') {
            generatedLine++;
            index++;
            previousGeneratedColumn = 0;
          }
          else if (aStr.charAt(index) === ',') {
            index++;
          }
          else {
            mapping = new Mapping();
            mapping.generatedLine = generatedLine;

            // Because each offset is encoded relative to the previous one,
            // many segments often have the same encoding. We can exploit this
            // fact by caching the parsed variable length fields of each segment,
            // allowing us to avoid a second parse if we encounter the same
            // segment again.
            for (end = index; end < length; end++) {
              if (this._charIsMappingSeparator(aStr, end)) {
                break;
              }
            }
            str = aStr.slice(index, end);

            segment = cachedSegments[str];
            if (segment) {
              index += str.length;
            } else {
              segment = [];
              while (index < end) {
                base64Vlq.decode(aStr, index, temp);
                value = temp.value;
                index = temp.rest;
                segment.push(value);
              }

              if (segment.length === 2) {
                throw new Error('Found a source, but no line and column');
              }

              if (segment.length === 3) {
                throw new Error('Found a source and line, but no column');
              }

              cachedSegments[str] = segment;
            }

            // Generated column.
            mapping.generatedColumn = previousGeneratedColumn + segment[0];
            previousGeneratedColumn = mapping.generatedColumn;

            if (segment.length > 1) {
              // Original source.
              mapping.source = previousSource + segment[1];
              previousSource += segment[1];

              // Original line.
              mapping.originalLine = previousOriginalLine + segment[2];
              previousOriginalLine = mapping.originalLine;
              // Lines are stored 0-based
              mapping.originalLine += 1;

              // Original column.
              mapping.originalColumn = previousOriginalColumn + segment[3];
              previousOriginalColumn = mapping.originalColumn;

              if (segment.length > 4) {
                // Original name.
                mapping.name = previousName + segment[4];
                previousName += segment[4];
              }
            }

            generatedMappings.push(mapping);
            if (typeof mapping.originalLine === 'number') {
              originalMappings.push(mapping);
            }
          }
        }

        quickSort$1(generatedMappings, util$1.compareByGeneratedPositionsDeflated);
        this.__generatedMappings = generatedMappings;

        quickSort$1(originalMappings, util$1.compareByOriginalPositions);
        this.__originalMappings = originalMappings;
      };

    /**
     * Find the mapping that best matches the hypothetical "needle" mapping that
     * we are searching for in the given "haystack" of mappings.
     */
    BasicSourceMapConsumer.prototype._findMapping =
      function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName,
                                             aColumnName, aComparator, aBias) {
        // To return the position we are searching for, we must first find the
        // mapping for the given position and then return the opposite position it
        // points to. Because the mappings are sorted, we can use binary search to
        // find the best mapping.

        if (aNeedle[aLineName] <= 0) {
          throw new TypeError('Line must be greater than or equal to 1, got '
                              + aNeedle[aLineName]);
        }
        if (aNeedle[aColumnName] < 0) {
          throw new TypeError('Column must be greater than or equal to 0, got '
                              + aNeedle[aColumnName]);
        }

        return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
      };

    /**
     * Compute the last column for each generated mapping. The last column is
     * inclusive.
     */
    BasicSourceMapConsumer.prototype.computeColumnSpans =
      function SourceMapConsumer_computeColumnSpans() {
        for (var index = 0; index < this._generatedMappings.length; ++index) {
          var mapping = this._generatedMappings[index];

          // Mappings do not contain a field for the last generated columnt. We
          // can come up with an optimistic estimate, however, by assuming that
          // mappings are contiguous (i.e. given two consecutive mappings, the
          // first mapping ends where the second one starts).
          if (index + 1 < this._generatedMappings.length) {
            var nextMapping = this._generatedMappings[index + 1];

            if (mapping.generatedLine === nextMapping.generatedLine) {
              mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
              continue;
            }
          }

          // The last mapping for each line spans the entire line.
          mapping.lastGeneratedColumn = Infinity;
        }
      };

    /**
     * Returns the original source, line, and column information for the generated
     * source's line and column positions provided. The only argument is an object
     * with the following properties:
     *
     *   - line: The line number in the generated source.  The line number
     *     is 1-based.
     *   - column: The column number in the generated source.  The column
     *     number is 0-based.
     *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
     *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
     *     closest element that is smaller than or greater than the one we are
     *     searching for, respectively, if the exact element cannot be found.
     *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
     *
     * and an object is returned with the following properties:
     *
     *   - source: The original source file, or null.
     *   - line: The line number in the original source, or null.  The
     *     line number is 1-based.
     *   - column: The column number in the original source, or null.  The
     *     column number is 0-based.
     *   - name: The original identifier, or null.
     */
    BasicSourceMapConsumer.prototype.originalPositionFor =
      function SourceMapConsumer_originalPositionFor(aArgs) {
        var needle = {
          generatedLine: util$1.getArg(aArgs, 'line'),
          generatedColumn: util$1.getArg(aArgs, 'column')
        };

        var index = this._findMapping(
          needle,
          this._generatedMappings,
          "generatedLine",
          "generatedColumn",
          util$1.compareByGeneratedPositionsDeflated,
          util$1.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
        );

        if (index >= 0) {
          var mapping = this._generatedMappings[index];

          if (mapping.generatedLine === needle.generatedLine) {
            var source = util$1.getArg(mapping, 'source', null);
            if (source !== null) {
              source = this._sources.at(source);
              source = util$1.computeSourceURL(this.sourceRoot, source, this._sourceMapURL);
            }
            var name = util$1.getArg(mapping, 'name', null);
            if (name !== null) {
              name = this._names.at(name);
            }
            return {
              source: source,
              line: util$1.getArg(mapping, 'originalLine', null),
              column: util$1.getArg(mapping, 'originalColumn', null),
              name: name
            };
          }
        }

        return {
          source: null,
          line: null,
          column: null,
          name: null
        };
      };

    /**
     * Return true if we have the source content for every source in the source
     * map, false otherwise.
     */
    BasicSourceMapConsumer.prototype.hasContentsOfAllSources =
      function BasicSourceMapConsumer_hasContentsOfAllSources() {
        if (!this.sourcesContent) {
          return false;
        }
        return this.sourcesContent.length >= this._sources.size() &&
          !this.sourcesContent.some(function (sc) { return sc == null; });
      };

    /**
     * Returns the original source content. The only argument is the url of the
     * original source file. Returns null if no original source content is
     * available.
     */
    BasicSourceMapConsumer.prototype.sourceContentFor =
      function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
        if (!this.sourcesContent) {
          return null;
        }

        var index = this._findSourceIndex(aSource);
        if (index >= 0) {
          return this.sourcesContent[index];
        }

        var relativeSource = aSource;
        if (this.sourceRoot != null) {
          relativeSource = util$1.relative(this.sourceRoot, relativeSource);
        }

        var url;
        if (this.sourceRoot != null
            && (url = util$1.urlParse(this.sourceRoot))) {
          // XXX: file:// URIs and absolute paths lead to unexpected behavior for
          // many users. We can help them out when they expect file:// URIs to
          // behave like it would if they were running a local HTTP server. See
          // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
          var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
          if (url.scheme == "file"
              && this._sources.has(fileUriAbsPath)) {
            return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)]
          }

          if ((!url.path || url.path == "/")
              && this._sources.has("/" + relativeSource)) {
            return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
          }
        }

        // This function is used recursively from
        // IndexedSourceMapConsumer.prototype.sourceContentFor. In that case, we
        // don't want to throw if we can't find the source - we just want to
        // return null, so we provide a flag to exit gracefully.
        if (nullOnMissing) {
          return null;
        }
        else {
          throw new Error('"' + relativeSource + '" is not in the SourceMap.');
        }
      };

    /**
     * Returns the generated line and column information for the original source,
     * line, and column positions provided. The only argument is an object with
     * the following properties:
     *
     *   - source: The filename of the original source.
     *   - line: The line number in the original source.  The line number
     *     is 1-based.
     *   - column: The column number in the original source.  The column
     *     number is 0-based.
     *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
     *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
     *     closest element that is smaller than or greater than the one we are
     *     searching for, respectively, if the exact element cannot be found.
     *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
     *
     * and an object is returned with the following properties:
     *
     *   - line: The line number in the generated source, or null.  The
     *     line number is 1-based.
     *   - column: The column number in the generated source, or null.
     *     The column number is 0-based.
     */
    BasicSourceMapConsumer.prototype.generatedPositionFor =
      function SourceMapConsumer_generatedPositionFor(aArgs) {
        var source = util$1.getArg(aArgs, 'source');
        source = this._findSourceIndex(source);
        if (source < 0) {
          return {
            line: null,
            column: null,
            lastColumn: null
          };
        }

        var needle = {
          source: source,
          originalLine: util$1.getArg(aArgs, 'line'),
          originalColumn: util$1.getArg(aArgs, 'column')
        };

        var index = this._findMapping(
          needle,
          this._originalMappings,
          "originalLine",
          "originalColumn",
          util$1.compareByOriginalPositions,
          util$1.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
        );

        if (index >= 0) {
          var mapping = this._originalMappings[index];

          if (mapping.source === needle.source) {
            return {
              line: util$1.getArg(mapping, 'generatedLine', null),
              column: util$1.getArg(mapping, 'generatedColumn', null),
              lastColumn: util$1.getArg(mapping, 'lastGeneratedColumn', null)
            };
          }
        }

        return {
          line: null,
          column: null,
          lastColumn: null
        };
      };

    var BasicSourceMapConsumer_1 = BasicSourceMapConsumer;

    /**
     * An IndexedSourceMapConsumer instance represents a parsed source map which
     * we can query for information. It differs from BasicSourceMapConsumer in
     * that it takes "indexed" source maps (i.e. ones with a "sections" field) as
     * input.
     *
     * The first parameter is a raw source map (either as a JSON string, or already
     * parsed to an object). According to the spec for indexed source maps, they
     * have the following attributes:
     *
     *   - version: Which version of the source map spec this map is following.
     *   - file: Optional. The generated file this source map is associated with.
     *   - sections: A list of section definitions.
     *
     * Each value under the "sections" field has two fields:
     *   - offset: The offset into the original specified at which this section
     *       begins to apply, defined as an object with a "line" and "column"
     *       field.
     *   - map: A source map definition. This source map could also be indexed,
     *       but doesn't have to be.
     *
     * Instead of the "map" field, it's also possible to have a "url" field
     * specifying a URL to retrieve a source map from, but that's currently
     * unsupported.
     *
     * Here's an example source map, taken from the source map spec[0], but
     * modified to omit a section which uses the "url" field.
     *
     *  {
     *    version : 3,
     *    file: "app.js",
     *    sections: [{
     *      offset: {line:100, column:10},
     *      map: {
     *        version : 3,
     *        file: "section.js",
     *        sources: ["foo.js", "bar.js"],
     *        names: ["src", "maps", "are", "fun"],
     *        mappings: "AAAA,E;;ABCDE;"
     *      }
     *    }],
     *  }
     *
     * The second parameter, if given, is a string whose value is the URL
     * at which the source map was found.  This URL is used to compute the
     * sources array.
     *
     * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
     */
    function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
      var sourceMap = aSourceMap;
      if (typeof aSourceMap === 'string') {
        sourceMap = util$1.parseSourceMapInput(aSourceMap);
      }

      var version = util$1.getArg(sourceMap, 'version');
      var sections = util$1.getArg(sourceMap, 'sections');

      if (version != this._version) {
        throw new Error('Unsupported version: ' + version);
      }

      this._sources = new ArraySet$2();
      this._names = new ArraySet$2();

      var lastOffset = {
        line: -1,
        column: 0
      };
      this._sections = sections.map(function (s) {
        if (s.url) {
          // The url field will require support for asynchronicity.
          // See https://github.com/mozilla/source-map/issues/16
          throw new Error('Support for url field in sections not implemented.');
        }
        var offset = util$1.getArg(s, 'offset');
        var offsetLine = util$1.getArg(offset, 'line');
        var offsetColumn = util$1.getArg(offset, 'column');

        if (offsetLine < lastOffset.line ||
            (offsetLine === lastOffset.line && offsetColumn < lastOffset.column)) {
          throw new Error('Section offsets must be ordered and non-overlapping.');
        }
        lastOffset = offset;

        return {
          generatedOffset: {
            // The offset fields are 0-based, but we use 1-based indices when
            // encoding/decoding from VLQ.
            generatedLine: offsetLine + 1,
            generatedColumn: offsetColumn + 1
          },
          consumer: new SourceMapConsumer(util$1.getArg(s, 'map'), aSourceMapURL)
        }
      });
    }

    IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
    IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;

    /**
     * The version of the source mapping spec that we are consuming.
     */
    IndexedSourceMapConsumer.prototype._version = 3;

    /**
     * The list of original sources.
     */
    Object.defineProperty(IndexedSourceMapConsumer.prototype, 'sources', {
      get: function () {
        var sources = [];
        for (var i = 0; i < this._sections.length; i++) {
          for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
            sources.push(this._sections[i].consumer.sources[j]);
          }
        }
        return sources;
      }
    });

    /**
     * Returns the original source, line, and column information for the generated
     * source's line and column positions provided. The only argument is an object
     * with the following properties:
     *
     *   - line: The line number in the generated source.  The line number
     *     is 1-based.
     *   - column: The column number in the generated source.  The column
     *     number is 0-based.
     *
     * and an object is returned with the following properties:
     *
     *   - source: The original source file, or null.
     *   - line: The line number in the original source, or null.  The
     *     line number is 1-based.
     *   - column: The column number in the original source, or null.  The
     *     column number is 0-based.
     *   - name: The original identifier, or null.
     */
    IndexedSourceMapConsumer.prototype.originalPositionFor =
      function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
        var needle = {
          generatedLine: util$1.getArg(aArgs, 'line'),
          generatedColumn: util$1.getArg(aArgs, 'column')
        };

        // Find the section containing the generated position we're trying to map
        // to an original position.
        var sectionIndex = binarySearch.search(needle, this._sections,
          function(needle, section) {
            var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
            if (cmp) {
              return cmp;
            }

            return (needle.generatedColumn -
                    section.generatedOffset.generatedColumn);
          });
        var section = this._sections[sectionIndex];

        if (!section) {
          return {
            source: null,
            line: null,
            column: null,
            name: null
          };
        }

        return section.consumer.originalPositionFor({
          line: needle.generatedLine -
            (section.generatedOffset.generatedLine - 1),
          column: needle.generatedColumn -
            (section.generatedOffset.generatedLine === needle.generatedLine
             ? section.generatedOffset.generatedColumn - 1
             : 0),
          bias: aArgs.bias
        });
      };

    /**
     * Return true if we have the source content for every source in the source
     * map, false otherwise.
     */
    IndexedSourceMapConsumer.prototype.hasContentsOfAllSources =
      function IndexedSourceMapConsumer_hasContentsOfAllSources() {
        return this._sections.every(function (s) {
          return s.consumer.hasContentsOfAllSources();
        });
      };

    /**
     * Returns the original source content. The only argument is the url of the
     * original source file. Returns null if no original source content is
     * available.
     */
    IndexedSourceMapConsumer.prototype.sourceContentFor =
      function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
        for (var i = 0; i < this._sections.length; i++) {
          var section = this._sections[i];

          var content = section.consumer.sourceContentFor(aSource, true);
          if (content) {
            return content;
          }
        }
        if (nullOnMissing) {
          return null;
        }
        else {
          throw new Error('"' + aSource + '" is not in the SourceMap.');
        }
      };

    /**
     * Returns the generated line and column information for the original source,
     * line, and column positions provided. The only argument is an object with
     * the following properties:
     *
     *   - source: The filename of the original source.
     *   - line: The line number in the original source.  The line number
     *     is 1-based.
     *   - column: The column number in the original source.  The column
     *     number is 0-based.
     *
     * and an object is returned with the following properties:
     *
     *   - line: The line number in the generated source, or null.  The
     *     line number is 1-based. 
     *   - column: The column number in the generated source, or null.
     *     The column number is 0-based.
     */
    IndexedSourceMapConsumer.prototype.generatedPositionFor =
      function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
        for (var i = 0; i < this._sections.length; i++) {
          var section = this._sections[i];

          // Only consider this section if the requested source is in the list of
          // sources of the consumer.
          if (section.consumer._findSourceIndex(util$1.getArg(aArgs, 'source')) === -1) {
            continue;
          }
          var generatedPosition = section.consumer.generatedPositionFor(aArgs);
          if (generatedPosition) {
            var ret = {
              line: generatedPosition.line +
                (section.generatedOffset.generatedLine - 1),
              column: generatedPosition.column +
                (section.generatedOffset.generatedLine === generatedPosition.line
                 ? section.generatedOffset.generatedColumn - 1
                 : 0)
            };
            return ret;
          }
        }

        return {
          line: null,
          column: null
        };
      };

    /**
     * Parse the mappings in a string in to a data structure which we can easily
     * query (the ordered arrays in the `this.__generatedMappings` and
     * `this.__originalMappings` properties).
     */
    IndexedSourceMapConsumer.prototype._parseMappings =
      function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
        this.__generatedMappings = [];
        this.__originalMappings = [];
        for (var i = 0; i < this._sections.length; i++) {
          var section = this._sections[i];
          var sectionMappings = section.consumer._generatedMappings;
          for (var j = 0; j < sectionMappings.length; j++) {
            var mapping = sectionMappings[j];

            var source = section.consumer._sources.at(mapping.source);
            source = util$1.computeSourceURL(section.consumer.sourceRoot, source, this._sourceMapURL);
            this._sources.add(source);
            source = this._sources.indexOf(source);

            var name = null;
            if (mapping.name) {
              name = section.consumer._names.at(mapping.name);
              this._names.add(name);
              name = this._names.indexOf(name);
            }

            // The mappings coming from the consumer for the section have
            // generated positions relative to the start of the section, so we
            // need to offset them to be relative to the start of the concatenated
            // generated file.
            var adjustedMapping = {
              source: source,
              generatedLine: mapping.generatedLine +
                (section.generatedOffset.generatedLine - 1),
              generatedColumn: mapping.generatedColumn +
                (section.generatedOffset.generatedLine === mapping.generatedLine
                ? section.generatedOffset.generatedColumn - 1
                : 0),
              originalLine: mapping.originalLine,
              originalColumn: mapping.originalColumn,
              name: name
            };

            this.__generatedMappings.push(adjustedMapping);
            if (typeof adjustedMapping.originalLine === 'number') {
              this.__originalMappings.push(adjustedMapping);
            }
          }
        }

        quickSort$1(this.__generatedMappings, util$1.compareByGeneratedPositionsDeflated);
        quickSort$1(this.__originalMappings, util$1.compareByOriginalPositions);
      };

    var IndexedSourceMapConsumer_1 = IndexedSourceMapConsumer;

    var sourceMapConsumer = {
    	SourceMapConsumer: SourceMapConsumer_1,
    	BasicSourceMapConsumer: BasicSourceMapConsumer_1,
    	IndexedSourceMapConsumer: IndexedSourceMapConsumer_1
    };

    /* -*- Mode: js; js-indent-level: 2; -*- */
    /*
     * Copyright 2011 Mozilla Foundation and contributors
     * Licensed under the New BSD license. See LICENSE or:
     * http://opensource.org/licenses/BSD-3-Clause
     */

    var SourceMapGenerator$1 = sourceMapGenerator.SourceMapGenerator;


    // Matches a Windows-style `\r\n` newline or a `\n` newline used by all other
    // operating systems these days (capturing the result).
    var REGEX_NEWLINE = /(\r?\n)/;

    // Newline character code for charCodeAt() comparisons
    var NEWLINE_CODE = 10;

    // Private symbol for identifying `SourceNode`s when multiple versions of
    // the source-map library are loaded. This MUST NOT CHANGE across
    // versions!
    var isSourceNode = "$$$isSourceNode$$$";

    /**
     * SourceNodes provide a way to abstract over interpolating/concatenating
     * snippets of generated JavaScript source code while maintaining the line and
     * column information associated with the original source code.
     *
     * @param aLine The original line number.
     * @param aColumn The original column number.
     * @param aSource The original source's filename.
     * @param aChunks Optional. An array of strings which are snippets of
     *        generated JS, or other SourceNodes.
     * @param aName The original identifier.
     */
    function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
      this.children = [];
      this.sourceContents = {};
      this.line = aLine == null ? null : aLine;
      this.column = aColumn == null ? null : aColumn;
      this.source = aSource == null ? null : aSource;
      this.name = aName == null ? null : aName;
      this[isSourceNode] = true;
      if (aChunks != null) this.add(aChunks);
    }

    /**
     * Creates a SourceNode from generated code and a SourceMapConsumer.
     *
     * @param aGeneratedCode The generated code
     * @param aSourceMapConsumer The SourceMap for the generated code
     * @param aRelativePath Optional. The path that relative sources in the
     *        SourceMapConsumer should be relative to.
     */
    SourceNode.fromStringWithSourceMap =
      function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
        // The SourceNode we want to fill with the generated code
        // and the SourceMap
        var node = new SourceNode();

        // All even indices of this array are one line of the generated code,
        // while all odd indices are the newlines between two adjacent lines
        // (since `REGEX_NEWLINE` captures its match).
        // Processed fragments are accessed by calling `shiftNextLine`.
        var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
        var remainingLinesIndex = 0;
        var shiftNextLine = function() {
          var lineContents = getNextLine();
          // The last line of a file might not have a newline.
          var newLine = getNextLine() || "";
          return lineContents + newLine;

          function getNextLine() {
            return remainingLinesIndex < remainingLines.length ?
                remainingLines[remainingLinesIndex++] : undefined;
          }
        };

        // We need to remember the position of "remainingLines"
        var lastGeneratedLine = 1, lastGeneratedColumn = 0;

        // The generate SourceNodes we need a code range.
        // To extract it current and last mapping is used.
        // Here we store the last mapping.
        var lastMapping = null;

        aSourceMapConsumer.eachMapping(function (mapping) {
          if (lastMapping !== null) {
            // We add the code from "lastMapping" to "mapping":
            // First check if there is a new line in between.
            if (lastGeneratedLine < mapping.generatedLine) {
              // Associate first line with "lastMapping"
              addMappingWithCode(lastMapping, shiftNextLine());
              lastGeneratedLine++;
              lastGeneratedColumn = 0;
              // The remaining code is added without mapping
            } else {
              // There is no new line in between.
              // Associate the code between "lastGeneratedColumn" and
              // "mapping.generatedColumn" with "lastMapping"
              var nextLine = remainingLines[remainingLinesIndex] || '';
              var code = nextLine.substr(0, mapping.generatedColumn -
                                            lastGeneratedColumn);
              remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn -
                                                  lastGeneratedColumn);
              lastGeneratedColumn = mapping.generatedColumn;
              addMappingWithCode(lastMapping, code);
              // No more remaining code, continue
              lastMapping = mapping;
              return;
            }
          }
          // We add the generated code until the first mapping
          // to the SourceNode without any mapping.
          // Each line is added as separate string.
          while (lastGeneratedLine < mapping.generatedLine) {
            node.add(shiftNextLine());
            lastGeneratedLine++;
          }
          if (lastGeneratedColumn < mapping.generatedColumn) {
            var nextLine = remainingLines[remainingLinesIndex] || '';
            node.add(nextLine.substr(0, mapping.generatedColumn));
            remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn);
            lastGeneratedColumn = mapping.generatedColumn;
          }
          lastMapping = mapping;
        }, this);
        // We have processed all mappings.
        if (remainingLinesIndex < remainingLines.length) {
          if (lastMapping) {
            // Associate the remaining code in the current line with "lastMapping"
            addMappingWithCode(lastMapping, shiftNextLine());
          }
          // and add the remaining lines without any mapping
          node.add(remainingLines.splice(remainingLinesIndex).join(""));
        }

        // Copy sourcesContent into SourceNode
        aSourceMapConsumer.sources.forEach(function (sourceFile) {
          var content = aSourceMapConsumer.sourceContentFor(sourceFile);
          if (content != null) {
            if (aRelativePath != null) {
              sourceFile = util$1.join(aRelativePath, sourceFile);
            }
            node.setSourceContent(sourceFile, content);
          }
        });

        return node;

        function addMappingWithCode(mapping, code) {
          if (mapping === null || mapping.source === undefined) {
            node.add(code);
          } else {
            var source = aRelativePath
              ? util$1.join(aRelativePath, mapping.source)
              : mapping.source;
            node.add(new SourceNode(mapping.originalLine,
                                    mapping.originalColumn,
                                    source,
                                    code,
                                    mapping.name));
          }
        }
      };

    /**
     * Add a chunk of generated JS to this source node.
     *
     * @param aChunk A string snippet of generated JS code, another instance of
     *        SourceNode, or an array where each member is one of those things.
     */
    SourceNode.prototype.add = function SourceNode_add(aChunk) {
      if (Array.isArray(aChunk)) {
        aChunk.forEach(function (chunk) {
          this.add(chunk);
        }, this);
      }
      else if (aChunk[isSourceNode] || typeof aChunk === "string") {
        if (aChunk) {
          this.children.push(aChunk);
        }
      }
      else {
        throw new TypeError(
          "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
        );
      }
      return this;
    };

    /**
     * Add a chunk of generated JS to the beginning of this source node.
     *
     * @param aChunk A string snippet of generated JS code, another instance of
     *        SourceNode, or an array where each member is one of those things.
     */
    SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
      if (Array.isArray(aChunk)) {
        for (var i = aChunk.length-1; i >= 0; i--) {
          this.prepend(aChunk[i]);
        }
      }
      else if (aChunk[isSourceNode] || typeof aChunk === "string") {
        this.children.unshift(aChunk);
      }
      else {
        throw new TypeError(
          "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
        );
      }
      return this;
    };

    /**
     * Walk over the tree of JS snippets in this node and its children. The
     * walking function is called once for each snippet of JS and is passed that
     * snippet and the its original associated source's line/column location.
     *
     * @param aFn The traversal function.
     */
    SourceNode.prototype.walk = function SourceNode_walk(aFn) {
      var chunk;
      for (var i = 0, len = this.children.length; i < len; i++) {
        chunk = this.children[i];
        if (chunk[isSourceNode]) {
          chunk.walk(aFn);
        }
        else {
          if (chunk !== '') {
            aFn(chunk, { source: this.source,
                         line: this.line,
                         column: this.column,
                         name: this.name });
          }
        }
      }
    };

    /**
     * Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
     * each of `this.children`.
     *
     * @param aSep The separator.
     */
    SourceNode.prototype.join = function SourceNode_join(aSep) {
      var newChildren;
      var i;
      var len = this.children.length;
      if (len > 0) {
        newChildren = [];
        for (i = 0; i < len-1; i++) {
          newChildren.push(this.children[i]);
          newChildren.push(aSep);
        }
        newChildren.push(this.children[i]);
        this.children = newChildren;
      }
      return this;
    };

    /**
     * Call String.prototype.replace on the very right-most source snippet. Useful
     * for trimming whitespace from the end of a source node, etc.
     *
     * @param aPattern The pattern to replace.
     * @param aReplacement The thing to replace the pattern with.
     */
    SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
      var lastChild = this.children[this.children.length - 1];
      if (lastChild[isSourceNode]) {
        lastChild.replaceRight(aPattern, aReplacement);
      }
      else if (typeof lastChild === 'string') {
        this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
      }
      else {
        this.children.push(''.replace(aPattern, aReplacement));
      }
      return this;
    };

    /**
     * Set the source content for a source file. This will be added to the SourceMapGenerator
     * in the sourcesContent field.
     *
     * @param aSourceFile The filename of the source file
     * @param aSourceContent The content of the source file
     */
    SourceNode.prototype.setSourceContent =
      function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
        this.sourceContents[util$1.toSetString(aSourceFile)] = aSourceContent;
      };

    /**
     * Walk over the tree of SourceNodes. The walking function is called for each
     * source file content and is passed the filename and source content.
     *
     * @param aFn The traversal function.
     */
    SourceNode.prototype.walkSourceContents =
      function SourceNode_walkSourceContents(aFn) {
        for (var i = 0, len = this.children.length; i < len; i++) {
          if (this.children[i][isSourceNode]) {
            this.children[i].walkSourceContents(aFn);
          }
        }

        var sources = Object.keys(this.sourceContents);
        for (var i = 0, len = sources.length; i < len; i++) {
          aFn(util$1.fromSetString(sources[i]), this.sourceContents[sources[i]]);
        }
      };

    /**
     * Return the string representation of this source node. Walks over the tree
     * and concatenates all the various snippets together to one string.
     */
    SourceNode.prototype.toString = function SourceNode_toString() {
      var str = "";
      this.walk(function (chunk) {
        str += chunk;
      });
      return str;
    };

    /**
     * Returns the string representation of this source node along with a source
     * map.
     */
    SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
      var generated = {
        code: "",
        line: 1,
        column: 0
      };
      var map = new SourceMapGenerator$1(aArgs);
      var sourceMappingActive = false;
      var lastOriginalSource = null;
      var lastOriginalLine = null;
      var lastOriginalColumn = null;
      var lastOriginalName = null;
      this.walk(function (chunk, original) {
        generated.code += chunk;
        if (original.source !== null
            && original.line !== null
            && original.column !== null) {
          if(lastOriginalSource !== original.source
             || lastOriginalLine !== original.line
             || lastOriginalColumn !== original.column
             || lastOriginalName !== original.name) {
            map.addMapping({
              source: original.source,
              original: {
                line: original.line,
                column: original.column
              },
              generated: {
                line: generated.line,
                column: generated.column
              },
              name: original.name
            });
          }
          lastOriginalSource = original.source;
          lastOriginalLine = original.line;
          lastOriginalColumn = original.column;
          lastOriginalName = original.name;
          sourceMappingActive = true;
        } else if (sourceMappingActive) {
          map.addMapping({
            generated: {
              line: generated.line,
              column: generated.column
            }
          });
          lastOriginalSource = null;
          sourceMappingActive = false;
        }
        for (var idx = 0, length = chunk.length; idx < length; idx++) {
          if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
            generated.line++;
            generated.column = 0;
            // Mappings end at eol
            if (idx + 1 === length) {
              lastOriginalSource = null;
              sourceMappingActive = false;
            } else if (sourceMappingActive) {
              map.addMapping({
                source: original.source,
                original: {
                  line: original.line,
                  column: original.column
                },
                generated: {
                  line: generated.line,
                  column: generated.column
                },
                name: original.name
              });
            }
          } else {
            generated.column++;
          }
        }
      });
      this.walkSourceContents(function (sourceFile, sourceContent) {
        map.setSourceContent(sourceFile, sourceContent);
      });

      return { code: generated.code, map: map };
    };

    var SourceNode_1 = SourceNode;

    var sourceNode = {
    	SourceNode: SourceNode_1
    };

    /*
     * Copyright 2009-2011 Mozilla Foundation and contributors
     * Licensed under the New BSD license. See LICENSE.txt or:
     * http://opensource.org/licenses/BSD-3-Clause
     */
    var SourceMapGenerator$2 = sourceMapGenerator.SourceMapGenerator;
    var SourceMapConsumer$1 = sourceMapConsumer.SourceMapConsumer;
    var SourceNode$1 = sourceNode.SourceNode;

    var sourceMap = {
    	SourceMapGenerator: SourceMapGenerator$2,
    	SourceMapConsumer: SourceMapConsumer$1,
    	SourceNode: SourceNode$1
    };

    var codeGen = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;



    var SourceNode = undefined;

    try {
      /* istanbul ignore next */
      {
        // We don't support this in AMD environments. For these environments, we asusme that
        // they are running on the browser and thus have no need for the source-map library.
        var SourceMap = sourceMap;
        SourceNode = SourceMap.SourceNode;
      }
    } catch (err) {}
    /* NOP */

    /* istanbul ignore if: tested but not covered in istanbul due to dist build  */
    if (!SourceNode) {
      SourceNode = function (line, column, srcFile, chunks) {
        this.src = '';
        if (chunks) {
          this.add(chunks);
        }
      };
      /* istanbul ignore next */
      SourceNode.prototype = {
        add: function add(chunks) {
          if (utils.isArray(chunks)) {
            chunks = chunks.join('');
          }
          this.src += chunks;
        },
        prepend: function prepend(chunks) {
          if (utils.isArray(chunks)) {
            chunks = chunks.join('');
          }
          this.src = chunks + this.src;
        },
        toStringWithSourceMap: function toStringWithSourceMap() {
          return { code: this.toString() };
        },
        toString: function toString() {
          return this.src;
        }
      };
    }

    function castChunk(chunk, codeGen, loc) {
      if (utils.isArray(chunk)) {
        var ret = [];

        for (var i = 0, len = chunk.length; i < len; i++) {
          ret.push(codeGen.wrap(chunk[i], loc));
        }
        return ret;
      } else if (typeof chunk === 'boolean' || typeof chunk === 'number') {
        // Handle primitives that the SourceNode will throw up on
        return chunk + '';
      }
      return chunk;
    }

    function CodeGen(srcFile) {
      this.srcFile = srcFile;
      this.source = [];
    }

    CodeGen.prototype = {
      isEmpty: function isEmpty() {
        return !this.source.length;
      },
      prepend: function prepend(source, loc) {
        this.source.unshift(this.wrap(source, loc));
      },
      push: function push(source, loc) {
        this.source.push(this.wrap(source, loc));
      },

      merge: function merge() {
        var source = this.empty();
        this.each(function (line) {
          source.add(['  ', line, '\n']);
        });
        return source;
      },

      each: function each(iter) {
        for (var i = 0, len = this.source.length; i < len; i++) {
          iter(this.source[i]);
        }
      },

      empty: function empty() {
        var loc = this.currentLocation || { start: {} };
        return new SourceNode(loc.start.line, loc.start.column, this.srcFile);
      },
      wrap: function wrap(chunk) {
        var loc = arguments.length <= 1 || arguments[1] === undefined ? this.currentLocation || { start: {} } : arguments[1];

        if (chunk instanceof SourceNode) {
          return chunk;
        }

        chunk = castChunk(chunk, this, loc);

        return new SourceNode(loc.start.line, loc.start.column, this.srcFile, chunk);
      },

      functionCall: function functionCall(fn, type, params) {
        params = this.generateList(params);
        return this.wrap([fn, type ? '.' + type + '(' : '(', params, ')']);
      },

      quotedString: function quotedString(str) {
        return '"' + (str + '').replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\u2028/g, '\\u2028') // Per Ecma-262 7.3 + 7.8.4
        .replace(/\u2029/g, '\\u2029') + '"';
      },

      objectLiteral: function objectLiteral(obj) {
        // istanbul ignore next

        var _this = this;

        var pairs = [];

        Object.keys(obj).forEach(function (key) {
          var value = castChunk(obj[key], _this);
          if (value !== 'undefined') {
            pairs.push([_this.quotedString(key), ':', value]);
          }
        });

        var ret = this.generateList(pairs);
        ret.prepend('{');
        ret.add('}');
        return ret;
      },

      generateList: function generateList(entries) {
        var ret = this.empty();

        for (var i = 0, len = entries.length; i < len; i++) {
          if (i) {
            ret.add(',');
          }

          ret.add(castChunk(entries[i], this));
        }

        return ret;
      },

      generateArray: function generateArray(entries) {
        var ret = this.generateList(entries);
        ret.prepend('[');
        ret.add(']');

        return ret;
      }
    };

    exports['default'] = CodeGen;
    module.exports = exports['default'];

    });

    unwrapExports(codeGen);

    var javascriptCompiler = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    // istanbul ignore next

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }





    var _exception2 = _interopRequireDefault(exception);





    var _codeGen2 = _interopRequireDefault(codeGen);



    function Literal(value) {
      this.value = value;
    }

    function JavaScriptCompiler() {}

    JavaScriptCompiler.prototype = {
      // PUBLIC API: You can override these methods in a subclass to provide
      // alternative compiled forms for name lookup and buffering semantics
      nameLookup: function nameLookup(parent, name /* , type*/) {
        if (lookup.dangerousPropertyRegex.test(name)) {
          var isEnumerable = [this.aliasable('container.propertyIsEnumerable'), '.call(', parent, ',', JSON.stringify(name), ')'];
          return ['(', isEnumerable, '?', _actualLookup(), ' : undefined)'];
        }
        return _actualLookup();

        function _actualLookup() {
          if (JavaScriptCompiler.isValidJavaScriptVariableName(name)) {
            return [parent, '.', name];
          } else {
            return [parent, '[', JSON.stringify(name), ']'];
          }
        }
      },
      depthedLookup: function depthedLookup(name) {
        return [this.aliasable('container.lookup'), '(depths, "', name, '")'];
      },

      compilerInfo: function compilerInfo() {
        var revision = base.COMPILER_REVISION,
            versions = base.REVISION_CHANGES[revision];
        return [revision, versions];
      },

      appendToBuffer: function appendToBuffer(source, location, explicit) {
        // Force a source as this simplifies the merge logic.
        if (!utils.isArray(source)) {
          source = [source];
        }
        source = this.source.wrap(source, location);

        if (this.environment.isSimple) {
          return ['return ', source, ';'];
        } else if (explicit) {
          // This is a case where the buffer operation occurs as a child of another
          // construct, generally braces. We have to explicitly output these buffer
          // operations to ensure that the emitted code goes in the correct location.
          return ['buffer += ', source, ';'];
        } else {
          source.appendToBuffer = true;
          return source;
        }
      },

      initializeBuffer: function initializeBuffer() {
        return this.quotedString('');
      },
      // END PUBLIC API

      compile: function compile(environment, options, context, asObject) {
        this.environment = environment;
        this.options = options;
        this.stringParams = this.options.stringParams;
        this.trackIds = this.options.trackIds;
        this.precompile = !asObject;

        this.name = this.environment.name;
        this.isChild = !!context;
        this.context = context || {
          decorators: [],
          programs: [],
          environments: []
        };

        this.preamble();

        this.stackSlot = 0;
        this.stackVars = [];
        this.aliases = {};
        this.registers = { list: [] };
        this.hashes = [];
        this.compileStack = [];
        this.inlineStack = [];
        this.blockParams = [];

        this.compileChildren(environment, options);

        this.useDepths = this.useDepths || environment.useDepths || environment.useDecorators || this.options.compat;
        this.useBlockParams = this.useBlockParams || environment.useBlockParams;

        var opcodes = environment.opcodes,
            opcode = undefined,
            firstLoc = undefined,
            i = undefined,
            l = undefined;

        for (i = 0, l = opcodes.length; i < l; i++) {
          opcode = opcodes[i];

          this.source.currentLocation = opcode.loc;
          firstLoc = firstLoc || opcode.loc;
          this[opcode.opcode].apply(this, opcode.args);
        }

        // Flush any trailing content that might be pending.
        this.source.currentLocation = firstLoc;
        this.pushSource('');

        /* istanbul ignore next */
        if (this.stackSlot || this.inlineStack.length || this.compileStack.length) {
          throw new _exception2['default']('Compile completed with content left on stack');
        }

        if (!this.decorators.isEmpty()) {
          this.useDecorators = true;

          this.decorators.prepend('var decorators = container.decorators;\n');
          this.decorators.push('return fn;');

          if (asObject) {
            this.decorators = Function.apply(this, ['fn', 'props', 'container', 'depth0', 'data', 'blockParams', 'depths', this.decorators.merge()]);
          } else {
            this.decorators.prepend('function(fn, props, container, depth0, data, blockParams, depths) {\n');
            this.decorators.push('}\n');
            this.decorators = this.decorators.merge();
          }
        } else {
          this.decorators = undefined;
        }

        var fn = this.createFunctionContext(asObject);
        if (!this.isChild) {
          var ret = {
            compiler: this.compilerInfo(),
            main: fn
          };

          if (this.decorators) {
            ret.main_d = this.decorators; // eslint-disable-line camelcase
            ret.useDecorators = true;
          }

          var _context = this.context;
          var programs = _context.programs;
          var decorators = _context.decorators;

          for (i = 0, l = programs.length; i < l; i++) {
            if (programs[i]) {
              ret[i] = programs[i];
              if (decorators[i]) {
                ret[i + '_d'] = decorators[i];
                ret.useDecorators = true;
              }
            }
          }

          if (this.environment.usePartial) {
            ret.usePartial = true;
          }
          if (this.options.data) {
            ret.useData = true;
          }
          if (this.useDepths) {
            ret.useDepths = true;
          }
          if (this.useBlockParams) {
            ret.useBlockParams = true;
          }
          if (this.options.compat) {
            ret.compat = true;
          }

          if (!asObject) {
            ret.compiler = JSON.stringify(ret.compiler);

            this.source.currentLocation = { start: { line: 1, column: 0 } };
            ret = this.objectLiteral(ret);

            if (options.srcName) {
              ret = ret.toStringWithSourceMap({ file: options.destName });
              ret.map = ret.map && ret.map.toString();
            } else {
              ret = ret.toString();
            }
          } else {
            ret.compilerOptions = this.options;
          }

          return ret;
        } else {
          return fn;
        }
      },

      preamble: function preamble() {
        // track the last context pushed into place to allow skipping the
        // getContext opcode when it would be a noop
        this.lastContext = 0;
        this.source = new _codeGen2['default'](this.options.srcName);
        this.decorators = new _codeGen2['default'](this.options.srcName);
      },

      createFunctionContext: function createFunctionContext(asObject) {
        // istanbul ignore next

        var _this = this;

        var varDeclarations = '';

        var locals = this.stackVars.concat(this.registers.list);
        if (locals.length > 0) {
          varDeclarations += ', ' + locals.join(', ');
        }

        // Generate minimizer alias mappings
        //
        // When using true SourceNodes, this will update all references to the given alias
        // as the source nodes are reused in situ. For the non-source node compilation mode,
        // aliases will not be used, but this case is already being run on the client and
        // we aren't concern about minimizing the template size.
        var aliasCount = 0;
        Object.keys(this.aliases).forEach(function (alias) {
          var node = _this.aliases[alias];
          if (node.children && node.referenceCount > 1) {
            varDeclarations += ', alias' + ++aliasCount + '=' + alias;
            node.children[0] = 'alias' + aliasCount;
          }
        });

        var params = ['container', 'depth0', 'helpers', 'partials', 'data'];

        if (this.useBlockParams || this.useDepths) {
          params.push('blockParams');
        }
        if (this.useDepths) {
          params.push('depths');
        }

        // Perform a second pass over the output to merge content when possible
        var source = this.mergeSource(varDeclarations);

        if (asObject) {
          params.push(source);

          return Function.apply(this, params);
        } else {
          return this.source.wrap(['function(', params.join(','), ') {\n  ', source, '}']);
        }
      },
      mergeSource: function mergeSource(varDeclarations) {
        var isSimple = this.environment.isSimple,
            appendOnly = !this.forceBuffer,
            appendFirst = undefined,
            sourceSeen = undefined,
            bufferStart = undefined,
            bufferEnd = undefined;
        this.source.each(function (line) {
          if (line.appendToBuffer) {
            if (bufferStart) {
              line.prepend('  + ');
            } else {
              bufferStart = line;
            }
            bufferEnd = line;
          } else {
            if (bufferStart) {
              if (!sourceSeen) {
                appendFirst = true;
              } else {
                bufferStart.prepend('buffer += ');
              }
              bufferEnd.add(';');
              bufferStart = bufferEnd = undefined;
            }

            sourceSeen = true;
            if (!isSimple) {
              appendOnly = false;
            }
          }
        });

        if (appendOnly) {
          if (bufferStart) {
            bufferStart.prepend('return ');
            bufferEnd.add(';');
          } else if (!sourceSeen) {
            this.source.push('return "";');
          }
        } else {
          varDeclarations += ', buffer = ' + (appendFirst ? '' : this.initializeBuffer());

          if (bufferStart) {
            bufferStart.prepend('return buffer + ');
            bufferEnd.add(';');
          } else {
            this.source.push('return buffer;');
          }
        }

        if (varDeclarations) {
          this.source.prepend('var ' + varDeclarations.substring(2) + (appendFirst ? '' : ';\n'));
        }

        return this.source.merge();
      },

      // [blockValue]
      //
      // On stack, before: hash, inverse, program, value
      // On stack, after: return value of blockHelperMissing
      //
      // The purpose of this opcode is to take a block of the form
      // `{{#this.foo}}...{{/this.foo}}`, resolve the value of `foo`, and
      // replace it on the stack with the result of properly
      // invoking blockHelperMissing.
      blockValue: function blockValue(name) {
        var blockHelperMissing = this.aliasable('container.hooks.blockHelperMissing'),
            params = [this.contextName(0)];
        this.setupHelperArgs(name, 0, params);

        var blockName = this.popStack();
        params.splice(1, 0, blockName);

        this.push(this.source.functionCall(blockHelperMissing, 'call', params));
      },

      // [ambiguousBlockValue]
      //
      // On stack, before: hash, inverse, program, value
      // Compiler value, before: lastHelper=value of last found helper, if any
      // On stack, after, if no lastHelper: same as [blockValue]
      // On stack, after, if lastHelper: value
      ambiguousBlockValue: function ambiguousBlockValue() {
        // We're being a bit cheeky and reusing the options value from the prior exec
        var blockHelperMissing = this.aliasable('container.hooks.blockHelperMissing'),
            params = [this.contextName(0)];
        this.setupHelperArgs('', 0, params, true);

        this.flushInline();

        var current = this.topStack();
        params.splice(1, 0, current);

        this.pushSource(['if (!', this.lastHelper, ') { ', current, ' = ', this.source.functionCall(blockHelperMissing, 'call', params), '}']);
      },

      // [appendContent]
      //
      // On stack, before: ...
      // On stack, after: ...
      //
      // Appends the string value of `content` to the current buffer
      appendContent: function appendContent(content) {
        if (this.pendingContent) {
          content = this.pendingContent + content;
        } else {
          this.pendingLocation = this.source.currentLocation;
        }

        this.pendingContent = content;
      },

      // [append]
      //
      // On stack, before: value, ...
      // On stack, after: ...
      //
      // Coerces `value` to a String and appends it to the current buffer.
      //
      // If `value` is truthy, or 0, it is coerced into a string and appended
      // Otherwise, the empty string is appended
      append: function append() {
        if (this.isInline()) {
          this.replaceStack(function (current) {
            return [' != null ? ', current, ' : ""'];
          });

          this.pushSource(this.appendToBuffer(this.popStack()));
        } else {
          var local = this.popStack();
          this.pushSource(['if (', local, ' != null) { ', this.appendToBuffer(local, undefined, true), ' }']);
          if (this.environment.isSimple) {
            this.pushSource(['else { ', this.appendToBuffer("''", undefined, true), ' }']);
          }
        }
      },

      // [appendEscaped]
      //
      // On stack, before: value, ...
      // On stack, after: ...
      //
      // Escape `value` and append it to the buffer
      appendEscaped: function appendEscaped() {
        this.pushSource(this.appendToBuffer([this.aliasable('container.escapeExpression'), '(', this.popStack(), ')']));
      },

      // [getContext]
      //
      // On stack, before: ...
      // On stack, after: ...
      // Compiler value, after: lastContext=depth
      //
      // Set the value of the `lastContext` compiler value to the depth
      getContext: function getContext(depth) {
        this.lastContext = depth;
      },

      // [pushContext]
      //
      // On stack, before: ...
      // On stack, after: currentContext, ...
      //
      // Pushes the value of the current context onto the stack.
      pushContext: function pushContext() {
        this.pushStackLiteral(this.contextName(this.lastContext));
      },

      // [lookupOnContext]
      //
      // On stack, before: ...
      // On stack, after: currentContext[name], ...
      //
      // Looks up the value of `name` on the current context and pushes
      // it onto the stack.
      lookupOnContext: function lookupOnContext(parts, falsy, strict, scoped) {
        var i = 0;

        if (!scoped && this.options.compat && !this.lastContext) {
          // The depthed query is expected to handle the undefined logic for the root level that
          // is implemented below, so we evaluate that directly in compat mode
          this.push(this.depthedLookup(parts[i++]));
        } else {
          this.pushContext();
        }

        this.resolvePath('context', parts, i, falsy, strict);
      },

      // [lookupBlockParam]
      //
      // On stack, before: ...
      // On stack, after: blockParam[name], ...
      //
      // Looks up the value of `parts` on the given block param and pushes
      // it onto the stack.
      lookupBlockParam: function lookupBlockParam(blockParamId, parts) {
        this.useBlockParams = true;

        this.push(['blockParams[', blockParamId[0], '][', blockParamId[1], ']']);
        this.resolvePath('context', parts, 1);
      },

      // [lookupData]
      //
      // On stack, before: ...
      // On stack, after: data, ...
      //
      // Push the data lookup operator
      lookupData: function lookupData(depth, parts, strict) {
        if (!depth) {
          this.pushStackLiteral('data');
        } else {
          this.pushStackLiteral('container.data(data, ' + depth + ')');
        }

        this.resolvePath('data', parts, 0, true, strict);
      },

      resolvePath: function resolvePath(type, parts, i, falsy, strict) {
        // istanbul ignore next

        var _this2 = this;

        if (this.options.strict || this.options.assumeObjects) {
          this.push(strictLookup(this.options.strict && strict, this, parts, type));
          return;
        }

        var len = parts.length;
        for (; i < len; i++) {
          /* eslint-disable no-loop-func */
          this.replaceStack(function (current) {
            var lookup$$1 = _this2.nameLookup(current, parts[i], type);
            // We want to ensure that zero and false are handled properly if the context (falsy flag)
            // needs to have the special handling for these values.
            if (!falsy) {
              return [' != null ? ', lookup$$1, ' : ', current];
            } else {
              // Otherwise we can use generic falsy handling
              return [' && ', lookup$$1];
            }
          });
          /* eslint-enable no-loop-func */
        }
      },

      // [resolvePossibleLambda]
      //
      // On stack, before: value, ...
      // On stack, after: resolved value, ...
      //
      // If the `value` is a lambda, replace it on the stack by
      // the return value of the lambda
      resolvePossibleLambda: function resolvePossibleLambda() {
        this.push([this.aliasable('container.lambda'), '(', this.popStack(), ', ', this.contextName(0), ')']);
      },

      // [pushStringParam]
      //
      // On stack, before: ...
      // On stack, after: string, currentContext, ...
      //
      // This opcode is designed for use in string mode, which
      // provides the string value of a parameter along with its
      // depth rather than resolving it immediately.
      pushStringParam: function pushStringParam(string, type) {
        this.pushContext();
        this.pushString(type);

        // If it's a subexpression, the string result
        // will be pushed after this opcode.
        if (type !== 'SubExpression') {
          if (typeof string === 'string') {
            this.pushString(string);
          } else {
            this.pushStackLiteral(string);
          }
        }
      },

      emptyHash: function emptyHash(omitEmpty) {
        if (this.trackIds) {
          this.push('{}'); // hashIds
        }
        if (this.stringParams) {
          this.push('{}'); // hashContexts
          this.push('{}'); // hashTypes
        }
        this.pushStackLiteral(omitEmpty ? 'undefined' : '{}');
      },
      pushHash: function pushHash() {
        if (this.hash) {
          this.hashes.push(this.hash);
        }
        this.hash = { values: {}, types: [], contexts: [], ids: [] };
      },
      popHash: function popHash() {
        var hash = this.hash;
        this.hash = this.hashes.pop();

        if (this.trackIds) {
          this.push(this.objectLiteral(hash.ids));
        }
        if (this.stringParams) {
          this.push(this.objectLiteral(hash.contexts));
          this.push(this.objectLiteral(hash.types));
        }

        this.push(this.objectLiteral(hash.values));
      },

      // [pushString]
      //
      // On stack, before: ...
      // On stack, after: quotedString(string), ...
      //
      // Push a quoted version of `string` onto the stack
      pushString: function pushString(string) {
        this.pushStackLiteral(this.quotedString(string));
      },

      // [pushLiteral]
      //
      // On stack, before: ...
      // On stack, after: value, ...
      //
      // Pushes a value onto the stack. This operation prevents
      // the compiler from creating a temporary variable to hold
      // it.
      pushLiteral: function pushLiteral(value) {
        this.pushStackLiteral(value);
      },

      // [pushProgram]
      //
      // On stack, before: ...
      // On stack, after: program(guid), ...
      //
      // Push a program expression onto the stack. This takes
      // a compile-time guid and converts it into a runtime-accessible
      // expression.
      pushProgram: function pushProgram(guid) {
        if (guid != null) {
          this.pushStackLiteral(this.programExpression(guid));
        } else {
          this.pushStackLiteral(null);
        }
      },

      // [registerDecorator]
      //
      // On stack, before: hash, program, params..., ...
      // On stack, after: ...
      //
      // Pops off the decorator's parameters, invokes the decorator,
      // and inserts the decorator into the decorators list.
      registerDecorator: function registerDecorator(paramSize, name) {
        var foundDecorator = this.nameLookup('decorators', name, 'decorator'),
            options = this.setupHelperArgs(name, paramSize);

        this.decorators.push(['fn = ', this.decorators.functionCall(foundDecorator, '', ['fn', 'props', 'container', options]), ' || fn;']);
      },

      // [invokeHelper]
      //
      // On stack, before: hash, inverse, program, params..., ...
      // On stack, after: result of helper invocation
      //
      // Pops off the helper's parameters, invokes the helper,
      // and pushes the helper's return value onto the stack.
      //
      // If the helper is not found, `helperMissing` is called.
      invokeHelper: function invokeHelper(paramSize, name, isSimple) {
        var nonHelper = this.popStack(),
            helper = this.setupHelper(paramSize, name);

        var possibleFunctionCalls = [];

        if (isSimple) {
          // direct call to helper
          possibleFunctionCalls.push(helper.name);
        }
        // call a function from the input object
        possibleFunctionCalls.push(nonHelper);
        if (!this.options.strict) {
          possibleFunctionCalls.push(this.aliasable('container.hooks.helperMissing'));
        }

        var functionLookupCode = ['(', this.itemsSeparatedBy(possibleFunctionCalls, '||'), ')'];
        var functionCall = this.source.functionCall(functionLookupCode, 'call', helper.callParams);
        this.push(functionCall);
      },

      itemsSeparatedBy: function itemsSeparatedBy(items, separator) {
        var result = [];
        result.push(items[0]);
        for (var i = 1; i < items.length; i++) {
          result.push(separator, items[i]);
        }
        return result;
      },
      // [invokeKnownHelper]
      //
      // On stack, before: hash, inverse, program, params..., ...
      // On stack, after: result of helper invocation
      //
      // This operation is used when the helper is known to exist,
      // so a `helperMissing` fallback is not required.
      invokeKnownHelper: function invokeKnownHelper(paramSize, name) {
        var helper = this.setupHelper(paramSize, name);
        this.push(this.source.functionCall(helper.name, 'call', helper.callParams));
      },

      // [invokeAmbiguous]
      //
      // On stack, before: hash, inverse, program, params..., ...
      // On stack, after: result of disambiguation
      //
      // This operation is used when an expression like `{{foo}}`
      // is provided, but we don't know at compile-time whether it
      // is a helper or a path.
      //
      // This operation emits more code than the other options,
      // and can be avoided by passing the `knownHelpers` and
      // `knownHelpersOnly` flags at compile-time.
      invokeAmbiguous: function invokeAmbiguous(name, helperCall) {
        this.useRegister('helper');

        var nonHelper = this.popStack();

        this.emptyHash();
        var helper = this.setupHelper(0, name, helperCall);

        var helperName = this.lastHelper = this.nameLookup('helpers', name, 'helper');

        var lookup$$1 = ['(', '(helper = ', helperName, ' || ', nonHelper, ')'];
        if (!this.options.strict) {
          lookup$$1[0] = '(helper = ';
          lookup$$1.push(' != null ? helper : ', this.aliasable('container.hooks.helperMissing'));
        }

        this.push(['(', lookup$$1, helper.paramsInit ? ['),(', helper.paramsInit] : [], '),', '(typeof helper === ', this.aliasable('"function"'), ' ? ', this.source.functionCall('helper', 'call', helper.callParams), ' : helper))']);
      },

      // [invokePartial]
      //
      // On stack, before: context, ...
      // On stack after: result of partial invocation
      //
      // This operation pops off a context, invokes a partial with that context,
      // and pushes the result of the invocation back.
      invokePartial: function invokePartial(isDynamic, name, indent) {
        var params = [],
            options = this.setupParams(name, 1, params);

        if (isDynamic) {
          name = this.popStack();
          delete options.name;
        }

        if (indent) {
          options.indent = JSON.stringify(indent);
        }
        options.helpers = 'helpers';
        options.partials = 'partials';
        options.decorators = 'container.decorators';

        if (!isDynamic) {
          params.unshift(this.nameLookup('partials', name, 'partial'));
        } else {
          params.unshift(name);
        }

        if (this.options.compat) {
          options.depths = 'depths';
        }
        options = this.objectLiteral(options);
        params.push(options);

        this.push(this.source.functionCall('container.invokePartial', '', params));
      },

      // [assignToHash]
      //
      // On stack, before: value, ..., hash, ...
      // On stack, after: ..., hash, ...
      //
      // Pops a value off the stack and assigns it to the current hash
      assignToHash: function assignToHash(key) {
        var value = this.popStack(),
            context = undefined,
            type = undefined,
            id = undefined;

        if (this.trackIds) {
          id = this.popStack();
        }
        if (this.stringParams) {
          type = this.popStack();
          context = this.popStack();
        }

        var hash = this.hash;
        if (context) {
          hash.contexts[key] = context;
        }
        if (type) {
          hash.types[key] = type;
        }
        if (id) {
          hash.ids[key] = id;
        }
        hash.values[key] = value;
      },

      pushId: function pushId(type, name, child) {
        if (type === 'BlockParam') {
          this.pushStackLiteral('blockParams[' + name[0] + '].path[' + name[1] + ']' + (child ? ' + ' + JSON.stringify('.' + child) : ''));
        } else if (type === 'PathExpression') {
          this.pushString(name);
        } else if (type === 'SubExpression') {
          this.pushStackLiteral('true');
        } else {
          this.pushStackLiteral('null');
        }
      },

      // HELPERS

      compiler: JavaScriptCompiler,

      compileChildren: function compileChildren(environment, options) {
        var children = environment.children,
            child = undefined,
            compiler = undefined;

        for (var i = 0, l = children.length; i < l; i++) {
          child = children[i];
          compiler = new this.compiler(); // eslint-disable-line new-cap

          var existing = this.matchExistingProgram(child);

          if (existing == null) {
            this.context.programs.push(''); // Placeholder to prevent name conflicts for nested children
            var index = this.context.programs.length;
            child.index = index;
            child.name = 'program' + index;
            this.context.programs[index] = compiler.compile(child, options, this.context, !this.precompile);
            this.context.decorators[index] = compiler.decorators;
            this.context.environments[index] = child;

            this.useDepths = this.useDepths || compiler.useDepths;
            this.useBlockParams = this.useBlockParams || compiler.useBlockParams;
            child.useDepths = this.useDepths;
            child.useBlockParams = this.useBlockParams;
          } else {
            child.index = existing.index;
            child.name = 'program' + existing.index;

            this.useDepths = this.useDepths || existing.useDepths;
            this.useBlockParams = this.useBlockParams || existing.useBlockParams;
          }
        }
      },
      matchExistingProgram: function matchExistingProgram(child) {
        for (var i = 0, len = this.context.environments.length; i < len; i++) {
          var environment = this.context.environments[i];
          if (environment && environment.equals(child)) {
            return environment;
          }
        }
      },

      programExpression: function programExpression(guid) {
        var child = this.environment.children[guid],
            programParams = [child.index, 'data', child.blockParams];

        if (this.useBlockParams || this.useDepths) {
          programParams.push('blockParams');
        }
        if (this.useDepths) {
          programParams.push('depths');
        }

        return 'container.program(' + programParams.join(', ') + ')';
      },

      useRegister: function useRegister(name) {
        if (!this.registers[name]) {
          this.registers[name] = true;
          this.registers.list.push(name);
        }
      },

      push: function push(expr) {
        if (!(expr instanceof Literal)) {
          expr = this.source.wrap(expr);
        }

        this.inlineStack.push(expr);
        return expr;
      },

      pushStackLiteral: function pushStackLiteral(item) {
        this.push(new Literal(item));
      },

      pushSource: function pushSource(source) {
        if (this.pendingContent) {
          this.source.push(this.appendToBuffer(this.source.quotedString(this.pendingContent), this.pendingLocation));
          this.pendingContent = undefined;
        }

        if (source) {
          this.source.push(source);
        }
      },

      replaceStack: function replaceStack(callback) {
        var prefix = ['('],
            stack = undefined,
            createdStack = undefined,
            usedLiteral = undefined;

        /* istanbul ignore next */
        if (!this.isInline()) {
          throw new _exception2['default']('replaceStack on non-inline');
        }

        // We want to merge the inline statement into the replacement statement via ','
        var top = this.popStack(true);

        if (top instanceof Literal) {
          // Literals do not need to be inlined
          stack = [top.value];
          prefix = ['(', stack];
          usedLiteral = true;
        } else {
          // Get or create the current stack name for use by the inline
          createdStack = true;
          var _name = this.incrStack();

          prefix = ['((', this.push(_name), ' = ', top, ')'];
          stack = this.topStack();
        }

        var item = callback.call(this, stack);

        if (!usedLiteral) {
          this.popStack();
        }
        if (createdStack) {
          this.stackSlot--;
        }
        this.push(prefix.concat(item, ')'));
      },

      incrStack: function incrStack() {
        this.stackSlot++;
        if (this.stackSlot > this.stackVars.length) {
          this.stackVars.push('stack' + this.stackSlot);
        }
        return this.topStackName();
      },
      topStackName: function topStackName() {
        return 'stack' + this.stackSlot;
      },
      flushInline: function flushInline() {
        var inlineStack = this.inlineStack;
        this.inlineStack = [];
        for (var i = 0, len = inlineStack.length; i < len; i++) {
          var entry = inlineStack[i];
          /* istanbul ignore if */
          if (entry instanceof Literal) {
            this.compileStack.push(entry);
          } else {
            var stack = this.incrStack();
            this.pushSource([stack, ' = ', entry, ';']);
            this.compileStack.push(stack);
          }
        }
      },
      isInline: function isInline() {
        return this.inlineStack.length;
      },

      popStack: function popStack(wrapped) {
        var inline = this.isInline(),
            item = (inline ? this.inlineStack : this.compileStack).pop();

        if (!wrapped && item instanceof Literal) {
          return item.value;
        } else {
          if (!inline) {
            /* istanbul ignore next */
            if (!this.stackSlot) {
              throw new _exception2['default']('Invalid stack pop');
            }
            this.stackSlot--;
          }
          return item;
        }
      },

      topStack: function topStack() {
        var stack = this.isInline() ? this.inlineStack : this.compileStack,
            item = stack[stack.length - 1];

        /* istanbul ignore if */
        if (item instanceof Literal) {
          return item.value;
        } else {
          return item;
        }
      },

      contextName: function contextName(context) {
        if (this.useDepths && context) {
          return 'depths[' + context + ']';
        } else {
          return 'depth' + context;
        }
      },

      quotedString: function quotedString(str) {
        return this.source.quotedString(str);
      },

      objectLiteral: function objectLiteral(obj) {
        return this.source.objectLiteral(obj);
      },

      aliasable: function aliasable(name) {
        var ret = this.aliases[name];
        if (ret) {
          ret.referenceCount++;
          return ret;
        }

        ret = this.aliases[name] = this.source.wrap(name);
        ret.aliasable = true;
        ret.referenceCount = 1;

        return ret;
      },

      setupHelper: function setupHelper(paramSize, name, blockHelper) {
        var params = [],
            paramsInit = this.setupHelperArgs(name, paramSize, params, blockHelper);
        var foundHelper = this.nameLookup('helpers', name, 'helper'),
            callContext = this.aliasable(this.contextName(0) + ' != null ? ' + this.contextName(0) + ' : (container.nullContext || {})');

        return {
          params: params,
          paramsInit: paramsInit,
          name: foundHelper,
          callParams: [callContext].concat(params)
        };
      },

      setupParams: function setupParams(helper, paramSize, params) {
        var options = {},
            contexts = [],
            types = [],
            ids = [],
            objectArgs = !params,
            param = undefined;

        if (objectArgs) {
          params = [];
        }

        options.name = this.quotedString(helper);
        options.hash = this.popStack();

        if (this.trackIds) {
          options.hashIds = this.popStack();
        }
        if (this.stringParams) {
          options.hashTypes = this.popStack();
          options.hashContexts = this.popStack();
        }

        var inverse = this.popStack(),
            program = this.popStack();

        // Avoid setting fn and inverse if neither are set. This allows
        // helpers to do a check for `if (options.fn)`
        if (program || inverse) {
          options.fn = program || 'container.noop';
          options.inverse = inverse || 'container.noop';
        }

        // The parameters go on to the stack in order (making sure that they are evaluated in order)
        // so we need to pop them off the stack in reverse order
        var i = paramSize;
        while (i--) {
          param = this.popStack();
          params[i] = param;

          if (this.trackIds) {
            ids[i] = this.popStack();
          }
          if (this.stringParams) {
            types[i] = this.popStack();
            contexts[i] = this.popStack();
          }
        }

        if (objectArgs) {
          options.args = this.source.generateArray(params);
        }

        if (this.trackIds) {
          options.ids = this.source.generateArray(ids);
        }
        if (this.stringParams) {
          options.types = this.source.generateArray(types);
          options.contexts = this.source.generateArray(contexts);
        }

        if (this.options.data) {
          options.data = 'data';
        }
        if (this.useBlockParams) {
          options.blockParams = 'blockParams';
        }
        return options;
      },

      setupHelperArgs: function setupHelperArgs(helper, paramSize, params, useRegister) {
        var options = this.setupParams(helper, paramSize, params);
        options.loc = JSON.stringify(this.source.currentLocation);
        options = this.objectLiteral(options);
        if (useRegister) {
          this.useRegister('options');
          params.push('options');
          return ['options=', options];
        } else if (params) {
          params.push(options);
          return '';
        } else {
          return options;
        }
      }
    };

    (function () {
      var reservedWords = ('break else new var' + ' case finally return void' + ' catch for switch while' + ' continue function this with' + ' default if throw' + ' delete in try' + ' do instanceof typeof' + ' abstract enum int short' + ' boolean export interface static' + ' byte extends long super' + ' char final native synchronized' + ' class float package throws' + ' const goto private transient' + ' debugger implements protected volatile' + ' double import public let yield await' + ' null true false').split(' ');

      var compilerWords = JavaScriptCompiler.RESERVED_WORDS = {};

      for (var i = 0, l = reservedWords.length; i < l; i++) {
        compilerWords[reservedWords[i]] = true;
      }
    })();

    JavaScriptCompiler.isValidJavaScriptVariableName = function (name) {
      return !JavaScriptCompiler.RESERVED_WORDS[name] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(name);
    };

    function strictLookup(requireTerminal, compiler, parts, type) {
      var stack = compiler.popStack(),
          i = 0,
          len = parts.length;
      if (requireTerminal) {
        len--;
      }

      for (; i < len; i++) {
        stack = compiler.nameLookup(stack, parts[i], type);
      }

      if (requireTerminal) {
        return [compiler.aliasable('container.strict'), '(', stack, ', ', compiler.quotedString(parts[i]), ', ', JSON.stringify(compiler.source.currentLocation), ' )'];
      } else {
        return stack;
      }
    }

    exports['default'] = JavaScriptCompiler;
    module.exports = exports['default'];

    });

    unwrapExports(javascriptCompiler);

    var handlebars = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    // istanbul ignore next

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }



    var _handlebarsRuntime2 = _interopRequireDefault(handlebars_runtime);

    // Compiler imports



    var _handlebarsCompilerAst2 = _interopRequireDefault(ast);







    var _handlebarsCompilerJavascriptCompiler2 = _interopRequireDefault(javascriptCompiler);



    var _handlebarsCompilerVisitor2 = _interopRequireDefault(visitor);



    var _handlebarsNoConflict2 = _interopRequireDefault(noConflict);

    var _create = _handlebarsRuntime2['default'].create;
    function create() {
      var hb = _create();

      hb.compile = function (input, options) {
        return compiler.compile(input, options, hb);
      };
      hb.precompile = function (input, options) {
        return compiler.precompile(input, options, hb);
      };

      hb.AST = _handlebarsCompilerAst2['default'];
      hb.Compiler = compiler.Compiler;
      hb.JavaScriptCompiler = _handlebarsCompilerJavascriptCompiler2['default'];
      hb.Parser = base$2.parser;
      hb.parse = base$2.parse;
      hb.parseWithoutProcessing = base$2.parseWithoutProcessing;

      return hb;
    }

    var inst = create();
    inst.create = create;

    _handlebarsNoConflict2['default'](inst);

    inst.Visitor = _handlebarsCompilerVisitor2['default'];

    inst['default'] = inst;

    exports['default'] = inst;
    module.exports = exports['default'];

    });

    unwrapExports(handlebars);

    var printer = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    exports.print = print;
    exports.PrintVisitor = PrintVisitor;
    // istanbul ignore next

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }



    var _visitor2 = _interopRequireDefault(visitor);

    function print(ast) {
      return new PrintVisitor().accept(ast);
    }

    function PrintVisitor() {
      this.padding = 0;
    }

    PrintVisitor.prototype = new _visitor2['default']();

    PrintVisitor.prototype.pad = function (string) {
      var out = '';

      for (var i = 0, l = this.padding; i < l; i++) {
        out += '  ';
      }

      out += string + '\n';
      return out;
    };

    PrintVisitor.prototype.Program = function (program) {
      var out = '',
          body = program.body,
          i = undefined,
          l = undefined;

      if (program.blockParams) {
        var blockParams = 'BLOCK PARAMS: [';
        for (i = 0, l = program.blockParams.length; i < l; i++) {
          blockParams += ' ' + program.blockParams[i];
        }
        blockParams += ' ]';
        out += this.pad(blockParams);
      }

      for (i = 0, l = body.length; i < l; i++) {
        out += this.accept(body[i]);
      }

      this.padding--;

      return out;
    };

    PrintVisitor.prototype.MustacheStatement = function (mustache) {
      return this.pad('{{ ' + this.SubExpression(mustache) + ' }}');
    };
    PrintVisitor.prototype.Decorator = function (mustache) {
      return this.pad('{{ DIRECTIVE ' + this.SubExpression(mustache) + ' }}');
    };

    PrintVisitor.prototype.BlockStatement = PrintVisitor.prototype.DecoratorBlock = function (block) {
      var out = '';

      out += this.pad((block.type === 'DecoratorBlock' ? 'DIRECTIVE ' : '') + 'BLOCK:');
      this.padding++;
      out += this.pad(this.SubExpression(block));
      if (block.program) {
        out += this.pad('PROGRAM:');
        this.padding++;
        out += this.accept(block.program);
        this.padding--;
      }
      if (block.inverse) {
        if (block.program) {
          this.padding++;
        }
        out += this.pad('{{^}}');
        this.padding++;
        out += this.accept(block.inverse);
        this.padding--;
        if (block.program) {
          this.padding--;
        }
      }
      this.padding--;

      return out;
    };

    PrintVisitor.prototype.PartialStatement = function (partial) {
      var content = 'PARTIAL:' + partial.name.original;
      if (partial.params[0]) {
        content += ' ' + this.accept(partial.params[0]);
      }
      if (partial.hash) {
        content += ' ' + this.accept(partial.hash);
      }
      return this.pad('{{> ' + content + ' }}');
    };
    PrintVisitor.prototype.PartialBlockStatement = function (partial) {
      var content = 'PARTIAL BLOCK:' + partial.name.original;
      if (partial.params[0]) {
        content += ' ' + this.accept(partial.params[0]);
      }
      if (partial.hash) {
        content += ' ' + this.accept(partial.hash);
      }

      content += ' ' + this.pad('PROGRAM:');
      this.padding++;
      content += this.accept(partial.program);
      this.padding--;

      return this.pad('{{> ' + content + ' }}');
    };

    PrintVisitor.prototype.ContentStatement = function (content) {
      return this.pad("CONTENT[ '" + content.value + "' ]");
    };

    PrintVisitor.prototype.CommentStatement = function (comment) {
      return this.pad("{{! '" + comment.value + "' }}");
    };

    PrintVisitor.prototype.SubExpression = function (sexpr) {
      var params = sexpr.params,
          paramStrings = [],
          hash = undefined;

      for (var i = 0, l = params.length; i < l; i++) {
        paramStrings.push(this.accept(params[i]));
      }

      params = '[' + paramStrings.join(', ') + ']';

      hash = sexpr.hash ? ' ' + this.accept(sexpr.hash) : '';

      return this.accept(sexpr.path) + ' ' + params + hash;
    };

    PrintVisitor.prototype.PathExpression = function (id) {
      var path$$1 = id.parts.join('/');
      return (id.data ? '@' : '') + 'PATH:' + path$$1;
    };

    PrintVisitor.prototype.StringLiteral = function (string) {
      return '"' + string.value + '"';
    };

    PrintVisitor.prototype.NumberLiteral = function (number) {
      return 'NUMBER{' + number.value + '}';
    };

    PrintVisitor.prototype.BooleanLiteral = function (bool) {
      return 'BOOLEAN{' + bool.value + '}';
    };

    PrintVisitor.prototype.UndefinedLiteral = function () {
      return 'UNDEFINED';
    };

    PrintVisitor.prototype.NullLiteral = function () {
      return 'NULL';
    };

    PrintVisitor.prototype.Hash = function (hash) {
      var pairs = hash.pairs,
          joinedPairs = [];

      for (var i = 0, l = pairs.length; i < l; i++) {
        joinedPairs.push(this.accept(pairs[i]));
      }

      return 'HASH{' + joinedPairs.join(', ') + '}';
    };
    PrintVisitor.prototype.HashPair = function (pair) {
      return pair.key + '=' + this.accept(pair.value);
    };
    /* eslint-enable new-cap */

    });

    unwrapExports(printer);
    var printer_1 = printer.print;
    var printer_2 = printer.PrintVisitor;

    // USAGE:
    // var handlebars = require('handlebars');
    /* eslint-disable no-var */

    // var local = handlebars.create();

    var handlebars$2 = handlebars['default'];


    handlebars$2.PrintVisitor = printer.PrintVisitor;
    handlebars$2.print = printer.print;

    var lib$1 = handlebars$2;

    // Publish a Node.js require() handler for .handlebars and .hbs files
    function extension(module, filename) {
      var fs$$1 = fs;
      var templateString = fs$$1.readFileSync(filename, 'utf8');
      module.exports = handlebars$2.compile(templateString);
    }
    /* istanbul ignore else */
    if (typeof commonjsRequire !== 'undefined' && commonjsRequire.extensions) {
      commonjsRequire.extensions['.handlebars'] = extension;
      commonjsRequire.extensions['.hbs'] = extension;
    }

    var CHandlebars = /** @class */ (function () {
        function CHandlebars() {
            this.init();
        }
        CHandlebars.prototype.init = function () {
            var self = this;
            lib$1.registerHelper('renderToc', function (array) {
                if (!array.length)
                    return '<!-- toc empty -->';
                return "<nav class=\"toc\">" + self.insetChildrenUl(array) + "</nav>";
            });
        };
        CHandlebars.prototype.compile = function (source) {
            return lib$1.compile(source);
        };
        CHandlebars.prototype.insetChildrenUl = function (toc) {
            var _this = this;
            if (!toc.length)
                return '<!-- empty -->';
            var list = "";
            toc.forEach(function (item) {
                list += "<li><span><i></i><a href=\"" + item.href + "\">" + item.text + "</a></span>" + _this.insetChildrenUl(item.children) + "</li>";
            });
            return "<ul>" + list + "</ul>";
        };
        return CHandlebars;
    }());

    var defaultThemeLayout = path.join(__dirname, '../theme/default/layout.hbs');
    var defaultThemeAssets = path.join(__dirname, '../theme/default/assets');
    var Renderer = /** @class */ (function () {
        function Renderer(toc, ignoreH1, tocDepth, theme) {
            this.headerIndexCounter = 0;
            this.toc = new Array();
            this.ignoreH1 = ignoreH1;
            this.showToc = toc;
            this.tocDepth = tocDepth;
            if (theme) {
                this.themeLayout = path.join(theme, '/layout.hbs');
                this.themeAssets = path.join(theme, '/assets');
            }
            else {
                this.themeLayout = defaultThemeLayout;
                this.themeAssets = defaultThemeAssets;
            }
            this.init();
        }
        Renderer.prototype.init = function () {
            var _this = this;
            var renderer = new marked_1.Renderer();
            renderer.heading = function (text, level) {
                _this.headerIndexCounter++;
                var escapedText = "header-" + level + "-index-" + _this.headerIndexCounter;
                if (_this.showToc) {
                    var allowHeaderLevel = 2;
                    if (!_this.ignoreH1) {
                        allowHeaderLevel = 1;
                    }
                    if (level >= allowHeaderLevel && level < (_this.tocDepth + allowHeaderLevel)) {
                        var item = {
                            index: _this.headerIndexCounter,
                            text: text,
                            level: level,
                            href: "#" + escapedText,
                            children: new Array()
                        };
                        var delta = level - allowHeaderLevel;
                        var target = _this.toc;
                        for (var i = 0; i < delta; i++) {
                            target = target[target.length - 1].children;
                        }
                        target.push(item);
                    }
                }
                return "<h" + level + " id=\"" + escapedText + "\" style=\"z-index: " + (999 - _this.headerIndexCounter) + "\"><span>" + text + "<a class=\"anchor\" href=\"#" + escapedText + "\"><span class=\"iconfont icon-anchor\"></span></a></span></h" + level + ">";
            };
            marked_1.setOptions({
                renderer: renderer,
                highlight: function (code) {
                    return require('highlight.js').highlightAuto(code).value;
                }
            });
        };
        Renderer.prototype.convert = function (source) {
            source = marked_1(source);
            var handlebars = new CHandlebars();
            var layoutRaw = lib.readFileSync(this.themeLayout, { encoding: 'utf8' });
            var template = handlebars.compile(layoutRaw);
            // fs.writeFileSync(path.join(process.cwd(), '/tmpToc/toc.json'), JSON.stringify(this.toc), { encoding: 'utf8' })
            return template({ content: source, toc: this.toc });
        };
        Renderer.prototype.getThemeAssetsPath = function () {
            return this.themeAssets;
        };
        return Renderer;
    }());

    function process$1(options) {
        return __awaiter(this, void 0, void 0, function () {
            var origin, destination, theme, toc, tocDepth, ignoreH1, renderer, mdRaw, result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        origin = options.origin, destination = options.destination, theme = options.theme, toc = options.toc, tocDepth = options.tocDepth, ignoreH1 = options.ignoreH1;
                        renderer = new Renderer(toc, ignoreH1, tocDepth, theme);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        mdRaw = lib.readFileSync(origin, { encoding: 'utf8' });
                        result = renderer.convert(mdRaw);
                        return [4 /*yield*/, lib.remove(destination)];
                    case 2:
                        _a.sent();
                        lib.mkdirpSync(destination);
                        lib.writeFileSync(path.join(destination, 'index.html'), result, { encoding: 'utf8' });
                        lib.copySync(renderer.getThemeAssetsPath(), path.join(destination, 'assets'));
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        throw e_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    }

    const {promisify} = util;


    async function isType(fsStatType, statsMethodName, filePath) {
    	if (typeof filePath !== 'string') {
    		throw new TypeError(`Expected a string, got ${typeof filePath}`);
    	}

    	try {
    		const stats = await promisify(fs[fsStatType])(filePath);
    		return stats[statsMethodName]();
    	} catch (error) {
    		if (error.code === 'ENOENT') {
    			return false;
    		}

    		throw error;
    	}
    }

    function isTypeSync(fsStatType, statsMethodName, filePath) {
    	if (typeof filePath !== 'string') {
    		throw new TypeError(`Expected a string, got ${typeof filePath}`);
    	}

    	try {
    		return fs[fsStatType](filePath)[statsMethodName]();
    	} catch (error) {
    		if (error.code === 'ENOENT') {
    			return false;
    		}

    		throw error;
    	}
    }

    var isFile = isType.bind(null, 'stat', 'isFile');
    var isDirectory = isType.bind(null, 'stat', 'isDirectory');
    var isSymlink = isType.bind(null, 'lstat', 'isSymbolicLink');
    var isFileSync = isTypeSync.bind(null, 'statSync', 'isFile');
    var isDirectorySync = isTypeSync.bind(null, 'statSync', 'isDirectory');
    var isSymlinkSync = isTypeSync.bind(null, 'lstatSync', 'isSymbolicLink');

    var defaultOptions = {
        origin: '',
        destination: '',
        toc: false,
        ignoreH1: true,
        tocDepth: 2
    };
    function mardoc(options) {
        var _this = this;
        var mergeOptions = Object.assign({}, defaultOptions, options);
        var origin = mergeOptions.origin, destination = mergeOptions.destination, toc = mergeOptions.toc, ignoreH1 = mergeOptions.ignoreH1, tocDepth = mergeOptions.tocDepth;
        if (!origin)
            throw new Error('The origin parameter is required');
        if (!((function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, isFile(origin)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); })() && /md$/.test(origin))) {
            throw new Error('The origin must be a markdown file');
        }
        if (!destination)
            throw new Error('The destination parameter is required');
        if (!(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, isDirectory(destination)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); })()) {
            throw new Error('The destination must be a directory path');
        }
        if (tocDepth > 6)
            throw new Error('The depth of the toc should not larger than 6');
        if (typeof toc !== 'boolean')
            throw new Error('The parameter type of the parameter toc is boolean');
        if (typeof ignoreH1 !== 'boolean')
            throw new Error('The parameter type of the parameter ignoreH1 is boolean');
        process$1(mergeOptions).then(function () {
            console.log('convert successfully');
        }).catch(function (e) {
            throw e;
        });
    }

    exports.mardoc = mardoc;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mardoc.umd.js.map
