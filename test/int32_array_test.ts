import { cmb } from "@neotype/prelude/cmb.js";
import { cmp, eq, icmpBy, ieqBy, Ordering } from "@neotype/prelude/cmp.js";
import { assert } from "chai";
import * as fc from "fast-check";
import "../src/int32_array.js";

describe("Int32Array", () => {
    specify("[Eq.eq]", () => {
        fc.assert(
            fc.property(fc.int32Array(), fc.int32Array(), (xs, ys) => {
                const t0 = eq(xs, ys);
                assert.strictEqual(
                    t0,
                    ieqBy(xs, ys, (x, y) => x === y),
                );
            }),
        );
    });

    specify("[Ord.cmp]", () => {
        fc.assert(
            fc.property(fc.int32Array(), fc.int32Array(), (xs, ys) => {
                const t0 = cmp(xs, ys);
                assert.strictEqual(
                    t0,
                    icmpBy(xs, ys, (x, y) => Ordering.fromNumber(x - y)),
                );
            }),
        );
    });

    specify("[Semigroup.cmb]", () => {
        fc.assert(
            fc.property(fc.int32Array(), fc.int32Array(), (xs, ys) => {
                const t0 = cmb(xs, ys);
                const exp = new Int32Array(xs.length + ys.length);
                exp.set(xs);
                exp.set(ys, xs.length);
                assert.deepEqual(t0, exp);
                assert.strictEqual(exp.length, xs.length + ys.length);
            }),
        );
    });
});