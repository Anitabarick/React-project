import '@testing-library/jest-dom';
import * as matchers from 'vitest-axe/matchers';
import { expect, vi } from 'vitest';

expect.extend(matchers);
window.scrollTo = vi.fn();