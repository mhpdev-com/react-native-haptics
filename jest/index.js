/* global jest */

const Haptics = {
  impact: jest.fn(() => Promise.resolve()),
  selection: jest.fn(() => Promise.resolve()),
  notification: jest.fn(() => Promise.resolve()),
  androidHaptics: jest.fn(() => Promise.resolve()),
};

module.exports = Haptics;
