/*
 * Copyright 2010 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

var callbackPoolArmorTest = TestCase('callbackPoolArmorTest');


callbackPoolArmorTest.prototype.testAdd = function() {
  var delegate = {};
  var capturedCallback;
  var capturedOptN;
  delegate.add = function(wrapped, opt_n) {
    capturedCallback = wrapped;
    capturedOptN = opt_n;
    return wrapped;
  };
  var pool = new jstestdriver.plugins.async.CallbackPoolArmor(delegate);

  var callback = function() {};
  var result = pool.add(callback);

  assertSame(callback, capturedCallback)
  assertSame(callback, result);
  assertUndefined(capturedOptN);

  pool.add(callback, 5);

  assertEquals(5, capturedOptN);
};


callbackPoolArmorTest.prototype.testAddUndefinedCallback = function() {
  var delegate = {};
  var delegateCalled = false;
  delegate.add = function(wrapped, opt_n) {
    delegateCalled = true;
  };
  var pool = new jstestdriver.plugins.async.CallbackPoolArmor(delegate);

  pool.add();

  assertFalse(delegateCalled);
};