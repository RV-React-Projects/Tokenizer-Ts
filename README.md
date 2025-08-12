# Tokenizer-JS

A simple text tokenizer that can encode and decode text.

## Usage

```typescript
import { tokenizer } from './index.js';

// Encode text to tokens
const tokens = tokenizer.encode("hello world");
console.log(tokens); // [16, 17]

// Decode tokens back to text
const text = tokenizer.decode(tokens);
console.log(text); // "hello world"
```

## Installation

```bash
bun install
```

## Run

```bash
bun start
```
