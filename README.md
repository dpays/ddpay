
# [ddpay](https://github.com/dpays/ddpay) [![Build Status](https://img.shields.io/travis/jnordberg/ddpay.svg?style=flat-square)](https://travis-ci.org/jnordberg/ddpay) [![Coverage Status](https://img.shields.io/coveralls/jnordberg/ddpay.svg?style=flat-square)](https://coveralls.io/github/jnordberg/ddpay?branch=master) [![Package Version](https://img.shields.io/npm/v/ddpay.svg?style=flat-square)](https://www.npmjs.com/package/ddpay) ![License](https://img.shields.io/npm/l/ddpay.svg?style=flat-square)

[dPay blockchain](https://dpays.io) WebSocket RPC client.

* **[Demo](https://comments.dpaydev.io)** ([source](https://github.com/dpays/ddpay/tree/master/examples/comment-feed))
* [Documentation](https://dpays.github.io/ddpay/)
* [Issues](https://github.com/dpays/ddpay/issues)

---


Minimal example
---------------

```typescript
import {Client} from 'ddpay'

const client = new Client('wss://d.dpays.io')

// get blocks using async iterator
for await (const block of client.blockchain.getBlocks()) {
    console.log(`Block ID: ${ block.block_id }`)
}

// get blocks using node-style streams
const stream = client.blockchain.getBlockStream()
stream.on('data', (block) => {
    console.log(`Block ID: ${ block.block_id }`)
})
```
