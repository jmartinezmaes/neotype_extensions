/*
 * Copyright 2022-2023 Joshua Martinez-Maes
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Augmentations for `Float64Array`.
 *
 * @remarks
 *
 * ## Importing this module
 *
 * This module's augmentations can be applied by using the following import:
 *
 * ```ts
 * import "@neotype/extensions/float64_array.js";
 * ```
 *
 * ## Comparing `Float64Array`
 *
 * `Float64Array` implements `Eq` and `Ord`.
 *
 * -   Two `Float64Array` are equal when they are the same length and their
 *     respective elements are strictly equal.
 * -   `Float64Array` are compared lexicographically from left to right, and
 *     their elements are ordered from least to greatest.
 *
 * ## Combining `Float64Array` as a semigroup
 *
 * `Float64Array` implements `Semigroup`. When combined, `Float64Array` are
 * concatenated from left to right.
 *
 * @module
 */

import { Semigroup } from "@neotype/prelude/cmb.js";
import { Eq, Ord, Ordering, icmpBy, ieqBy } from "@neotype/prelude/cmp.js";

declare global {
	interface Float64Array {
		[Eq.eq](that: Float64Array): boolean;

		[Ord.cmp](that: Float64Array): Ordering;

		[Semigroup.cmb](that: Float64Array): Float64Array;
	}
}

Float64Array.prototype[Eq.eq] = function (that: Float64Array): boolean {
	return ieqBy(this, that, (lhs, rhs) => lhs === rhs);
};

Float64Array.prototype[Ord.cmp] = function (that: Float64Array): Ordering {
	return icmpBy(this, that, (lhs, rhs) => Ordering.fromNumber(lhs - rhs));
};

Float64Array.prototype[Semigroup.cmb] = function (
	that: Float64Array,
): Float64Array {
	const result = new Float64Array(this.length + that.length);
	result.set(this);
	result.set(that, this.length);
	return result;
};
