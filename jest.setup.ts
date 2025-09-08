import '@testing-library/jest-native/extend-expect';

// Only mock NativeAnimatedHelper if the module actually exists in this RN version
(() => {
  const candidates = [
    'react-native/Libraries/Animated/NativeAnimatedHelper',
    'react-native/src/Animated/NativeAnimatedHelper', // fallback in some versions
  ];

  for (const id of candidates) {
    try {
      require.resolve(id);
      jest.mock(id);
      break;
    } catch {
      // keep trying next candidate
    }
  }
})();
