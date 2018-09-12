/**
 * @file dPay asset type definitions and helpers.
 * @author dPay Labs <labs@dpays.io>
 * @license
 * Copyright (c) 2017 Johan Nordberg. All Rights Reserved.
 * Copyright (c) 2018 dPay Labs. All Rights Reserved. 
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 *  1. Redistribution of source code must retain the above copyright notice, this
 *     list of conditions and the following disclaimer.
 *
 *  2. Redistribution in binary form must reproduce the above copyright notice,
 *     this list of conditions and the following disclaimer in the documentation
 *     and/or other materials provided with the distribution.
 *
 *  3. Neither the name of the copyright holder nor the names of its contributors
 *     may be used to endorse or promote products derived from this software without
 *     specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 * IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
 * OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * You acknowledge that this software is not designed, licensed or intended for use
 * in the design, construction, operation or maintenance of any military facility.
 */

/**
 * Asset symbol string.
 */
export type AssetSymbol = 'BEX' | 'VESTS'

/**
 * Asset string with amount and symbol, eg `0.123456 VESTS`
 */
export type AssetString = string

export class Asset {

    /**
     * Create a new Asset instance from an AssetString, e.g. `42.000 BEX`.
     */
    public static from(string: AssetString) {
        const [amountString, symbol] = string.split(' ')
        if (['BEX', 'VESTS'].indexOf(symbol) === -1) {
            throw new Error(`Invalid asset symbol: ${ symbol }`)
        }
        const amount = Number.parseFloat(amountString)
        if (!Number.isFinite(amount)) {
            throw new Error(`Invalid asset amount: ${ amountString }`)
        }
        return new Asset(amount, symbol as AssetSymbol)
    }

    constructor(public readonly amount: number, public readonly symbol: AssetSymbol) {}

    /**
     * Return a string representation of this asset, e.g. `42.000 BEX`.
     */
    public toString(): AssetString {
        switch (this.symbol) {
            case 'BEX':
                return `${ this.amount.toFixed(3) } BEX`
            case 'VESTS':
                return `${ this.amount.toFixed(6) } VESTS`
        }
    }
}
