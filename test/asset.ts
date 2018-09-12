import 'mocha'

import * as assert from 'assert'
import {Asset} from './../src'

describe('asset', function() {

    it('should create from string', function() {
        const oneBex = Asset.from('1.000 BEX')
        assert.equal(oneDPay.amount, 1)
        assert.equal(oneDPay.symbol, 'BEX')
        const vests = Asset.from('0.123456 VESTS')
        assert.equal(vests.amount, 0.123456)
        assert.equal(vests.symbol, 'VESTS')
    })

    it('should convert to string', function() {
        const dpay = new Asset(44.999999, 'BEX')
        assert.equal(dpay.toString(), '45.000 BEX')
        const vests = new Asset(44.999999, 'VESTS')
        assert.equal(vests.toString(), '44.999999 VESTS')
    })

    it('should throw on invalid strings', function() {
        assert.throws(() => Asset.from('1.000 SNACKS'))
        assert.throws(() => Asset.from('I LIKE TURT 0.42'))
        assert.throws(() => Asset.from('Infinity BEX'))
        assert.throws(() => Asset.from('..0 BEX'))
    })

})

