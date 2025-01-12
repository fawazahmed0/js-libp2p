[![libp2p.io](https://img.shields.io/badge/project-libp2p-yellow.svg?style=flat-square)](http://libp2p.io/)
[![Discuss](https://img.shields.io/discourse/https/discuss.libp2p.io/posts.svg?style=flat-square)](https://discuss.libp2p.io)
[![codecov](https://img.shields.io/codecov/c/github/libp2p/js-libp2p.svg?style=flat-square)](https://codecov.io/gh/libp2p/js-libp2p)
[![CI](https://img.shields.io/github/actions/workflow/status/libp2p/js-libp2p/main.yml?branch=main\&style=flat-square)](https://github.com/libp2p/js-libp2p/actions/workflows/main.yml?query=branch%3Amain)

> An insecure connection encrypter

# About

A connection encrypter that does no connection encryption.

This should not be used in production should be used for research purposes only.

## Example

```typescript
import { createLibp2p } from 'libp2p'
import { plaintext } from '@libp2p/plaintext'

const node = await createLibp2p({
  // ...other options
  connectionEncryption: [
    plaintext()
  ]
})
```

# Install

```console
$ npm i @libp2p/plaintext
```

## Browser `<script>` tag

Loading this module through a script tag will make it's exports available as `Libp2pPlaintext` in the global namespace.

```html
<script src="https://unpkg.com/@libp2p/plaintext/dist/index.min.js"></script>
```

# API Docs

- <https://libp2p.github.io/js-libp2p/modules/_libp2p_plaintext.html>

# License

Licensed under either of

- Apache 2.0, ([LICENSE-APACHE](LICENSE-APACHE) / <http://www.apache.org/licenses/LICENSE-2.0>)
- MIT ([LICENSE-MIT](LICENSE-MIT) / <http://opensource.org/licenses/MIT>)

# Contribution

Unless you explicitly state otherwise, any contribution intentionally submitted for inclusion in the work by you, as defined in the Apache-2.0 license, shall be dual licensed as above, without any additional terms or conditions.
