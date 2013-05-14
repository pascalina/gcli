/*
 * Copyright 2012, Mozilla Foundation and contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

define(function(require, exports, module) {

'use strict';

var helpers = require('gclitest/helpers');
var mockCommands = require('gclitest/mockCommands');

exports.setup = function(options) {
  mockCommands.setup();
};

exports.shutdown = function(options) {
  mockCommands.shutdown();
};

exports.testNewLine = function(options) {
  helpers.audit(options, [
    {
      setup:    'echo a\\nb',
      check: {
        input:  'echo a\\nb',
        hints:            '',
        markup: 'VVVVVVVVV',
        cursor: 9,
        current: 'message',
        status: 'VALID',
        args: {
          command: { name: 'echo' },
          message: {
            value: 'a\nb',
            arg: ' a\\nb',
            status: 'VALID',
            message: ''
          }
        }
      }
    }
  ]);
};

exports.testTab = function(options) {
  helpers.audit(options, [
    {
      setup:    'echo a\\tb',
      check: {
        input:  'echo a\\tb',
        hints:            '',
        markup: 'VVVVVVVVV',
        cursor: 9,
        current: 'message',
        status: 'VALID',
        args: {
          command: { name: 'echo' },
          message: {
            value: 'a\tb',
            arg: ' a\\tb',
            status: 'VALID',
            message: ''
          }
        }
      }
    }
  ]);
};

exports.testEscape = function(options) {
  helpers.audit(options, [
    {
      // What's typed is actually:
      //         tsrsrsr a\\ b c
      setup:    'tsrsrsr a\\\\ b c',
      check: {
        input:  'tsrsrsr a\\\\ b c',
        hints:                 '',
        markup: 'VVVVVVVVVVVVVVV',
        cursor: 15,
        current: 'p3',
        status: 'VALID',
        options: [ ],
        message: '',
        predictions: [ ],
        unassigned: [ ],
        args: {
          command: { name: 'tsrsrsr' },
          p1: { value: 'a\\', arg: ' a\\\\', status: 'VALID', message: '' },
          p2: { value: 'b', arg: ' b', status: 'VALID', message: '' },
          p3: { value: 'c', arg: ' c', status: 'VALID', message: '' },
        }
      }
    }
  ]);
};



/*



*/
});