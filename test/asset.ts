import 'mocha'
import * as assert from 'assert'

import {Asset} from './../src'

describe('asset', function() {

    it('should create from string', function() {
        const oneBex = Asset.fromString('1.000 BEX')
        assert.equal(oneDPay.amount, 1)
        assert.equal(oneDPay.symbol, 'BEX')
        const vests = Asset.fromString('0.123456 VESTS')
        assert.equal(vests.amount, 0.123456)
        assert.equal(vests.symbol, 'VESTS')
        const bbd = Asset.from('0.444 BBD')
        assert.equal(bbd.amount, 0.444)
        assert.equal(bbd.symbol, 'BBD')
    })

    it('should convert to string', function() {
        const dpay = new Asset(44.999999, 'BEX')
        assert.equal(dpay.toString(), '45.000 BEX')
        const vests = new Asset(44.999999, 'VESTS')
        assert.equal(vests.toString(), '44.999999 VESTS')
    })

    it('should add and subtract', function() {
        const a = new Asset(44.999, 'BEX')
        assert.equal(a.subtract(1.999).toString(), '43.000 BEX')
        assert.equal(a.add(0.001).toString(), '45.000 BEX')
        assert.equal(Asset.from('1.999 BEX').subtract(a).toString(), '-43.000 BEX')
        assert.equal(Asset.from(a).subtract(a).toString(), '0.000 BEX')
        assert.equal(Asset.from('99.999999 VESTS').add('0.000001 VESTS').toString(), '100.000000 VESTS')
        assert.throws(() => Asset.fromString('100.000 BEX').subtract('100.000000 VESTS'))
        assert.throws(() => Asset.from(100, 'VESTS').add(a))
        assert.throws(() => Asset.from(100).add('1.000000 VESTS'))
    })

    it('should throw on invalid strings', function() {
        assert.throws(() => Asset.fromString('1.000 SNACKS'))
        assert.throws(() => Asset.fromString('I LIKE TURT 0.42'))
        assert.throws(() => Asset.fromString('Infinity BEX'))
        assert.throws(() => Asset.fromString('..0 BEX'))
    })

})

