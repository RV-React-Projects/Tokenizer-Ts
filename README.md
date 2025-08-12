# Tokenizer-JS

A smart and simple text tokenizer that converts text into numerical tokens and back. Built with TypeScript and optimized for Bun runtime.

## 🎯 What It Does

The tokenizer takes any text input and converts it into an array of numbers (tokens), then can convert those numbers back into the original text. Think of it like a simple encoding/decoding system.

## 🔧 How It Works

### 1. **Vocabulary System**

- The tokenizer starts with a built-in vocabulary of common English words
- Each word gets assigned a unique number (ID)
- Unknown words are broken down into individual characters and converted to character codes

### 2. **Encoding Process**

```
Input: "hello world"
↓
Split into words: ["hello", "world"]
↓
Look up in vocabulary: hello→42, world→43
↓
Output: [42, 43]
```

### 3. **Decoding Process**

```
Input: [42, 43]
↓
Look up in reverse vocabulary: 42→hello, 43→world
↓
Join with spaces
↓
Output: "hello world"
```

### 4. **Unknown Word Handling**

```
Input: "xyz" (not in vocabulary)
↓
Split into characters: ["x", "y", "z"]
↓
Convert to character codes: x→120, y→121, z→122
↓
Add offset (1000): [1120, 1121, 1122]
```

## 📚 Built-in Vocabulary

The tokenizer comes with 62+ common words organized by categories:

- **Articles**: a, an, the
- **Prepositions**: in, on, at, to, for, of, with, by, from, up, down
- **Conjunctions**: and, or, but, if, when, while, because, although
- **Common Verbs**: is, are, was, were, be, been, have, has, had, do, does, did
- **Question Words**: what, why, how, who, which, whose, where
- **Common Words**: hello, world, test, text, token, encode, decode, this, that

## 🚀 Quick Start

### Installation

```bash
# Make sure you have Bun installed
curl -fsSL https://bun.sh/install | bash

# Clone the project
git clone <your-repo>
cd Tokenizer-Js

# Install dependencies
bun install
```

### Basic Usage

```bash
# Run the demo
bun start
```

### Programmatic Usage

```typescript
import { tokenizer } from "./index.js";

// Encode text to tokens
const tokens = tokenizer.encode("hello world");
console.log(tokens); // [42, 43]

// Decode tokens back to text
const text = tokenizer.decode(tokens);
console.log(text); // "hello world"
```

## 🛠️ API Reference

### Core Methods

#### `encode(text: string): number[]`

Converts text into an array of token IDs.

```typescript
const tokens = tokenizer.encode("this is a test");
// Returns: [49, 22, 0, 44]
```

**Parameters:**

- `text`: String to encode (required, non-empty)

**Returns:**

- Array of numbers representing the encoded text

**Throws:**

- Error if input is not a string or is empty

#### `decode(tokens: number[]): string`

Converts token IDs back into text.

```typescript
const text = tokenizer.decode([49, 22, 0, 44]);
// Returns: "this is a test"
```

**Parameters:**

- `tokens`: Array of token IDs to decode

**Returns:**

- Decoded text string

**Throws:**

- Error if input is not an array

### Utility Methods

#### `addToken(token: string): void`

Adds a new word to the vocabulary.

```typescript
tokenizer.addToken("custom");
console.log(tokenizer.getVocabularySize()); // Increased by 1
```

#### `getVocabularySize(): number`

Returns the current number of tokens in the vocabulary.

```typescript
const size = tokenizer.getVocabularySize();
console.log(`Vocabulary has ${size} tokens`);
```

#### `hasToken(token: string): boolean`

Checks if a word exists in the vocabulary.

```typescript
if (tokenizer.hasToken("hello")) {
  console.log("'hello' is in vocabulary");
}
```

## 🔍 Understanding the Output

### Example 1: Known Words

```typescript
const input = "hello world";
const tokens = tokenizer.encode(input);
console.log(tokens); // [42, 43]

const decoded = tokenizer.decode(tokens);
console.log(decoded); // "hello world"
console.log(input === decoded); // true ✅
```

### Example 2: Mixed Known/Unknown Words

```typescript
const input = "hello xyz world";
const tokens = tokenizer.encode(input);
console.log(tokens); // [42, 1120, 1121, 1122, 43]

const decoded = tokenizer.decode(tokens);
console.log(decoded); // "hello x y z world"
```

**Note**: Unknown words get broken into individual characters, so "xyz" becomes "x y z" when decoded.

## 🎨 Customization Options

### 1. **Add Custom Vocabulary**

```typescript
// Add domain-specific words
tokenizer.addToken("javascript");
tokenizer.addToken("typescript");
tokenizer.addToken("bun");

// Now these words will be encoded as single tokens
const tokens = tokenizer.encode("hello javascript world");
console.log(tokens); // [42, new_id, 43]
```

### 2. **Modify the Core Class**

You can extend the `Tokenizer` class to add custom behavior:

```typescript
class CustomTokenizer extends Tokenizer {
  constructor() {
    super();
    // Add your custom initialization
  }

  // Override methods or add new ones
  encodeWithMetadata(text: string) {
    const tokens = this.encode(text);
    return {
      tokens,
      wordCount: text.split(/\s+/).length,
      timestamp: Date.now(),
    };
  }
}
```

### 3. **Change the Unknown Word Offset**

```typescript
// In src/tokenizer.ts, modify this line:
private readonly UNKNOWN_OFFSET = 1000; // Change to any number you want
```

## 🏗️ Project Structure

```
Tokenizer-Js/
├── src/
│   └── tokenizer.ts    # Core tokenizer implementation
├── index.ts            # Main exports and demo
├── package.json        # Project configuration
├── tsconfig.json       # TypeScript configuration
└── README.md           # This documentation
```

## 🔧 Technical Details

### **Performance Characteristics**

- **Time Complexity**: O(n) where n is the number of words
- **Space Complexity**: O(v) where v is vocabulary size
- **Lookup Speed**: O(1) for known words using Map data structure

### **Memory Usage**

- Vocabulary stored in two Maps for bidirectional lookup
- Each word takes approximately 8-16 bytes (depending on word length)
- 62 words ≈ 1-2 KB memory usage

### **Encoding Strategy**

- **Known words**: Direct vocabulary lookup
- **Unknown words**: Character-by-character conversion with offset
- **Offset system**: Prevents conflicts between vocabulary IDs and character codes

## 🚨 Limitations & Considerations

### **Current Limitations**

1. **Case sensitivity**: All text is converted to lowercase
2. **Punctuation**: Not handled specially (treated as unknown characters)
3. **Numbers**: Not handled specially (treated as unknown words)
4. **Whitespace**: Multiple spaces are normalized to single spaces

### **When to Use This Tokenizer**

✅ **Good for:**

- Simple text encoding/decoding
- Educational purposes
- Prototyping
- Basic NLP tasks
- Learning tokenization concepts

❌ **Not suitable for:**

- Production NLP systems
- Large-scale text processing
- Advanced language models
- Multi-language support
- Preserving exact formatting

## 🚀 Future Enhancements

Here are some ideas you could implement to make it even better:

### **1. Punctuation Handling**

```typescript
// Add special handling for punctuation
private handlePunctuation(text: string): string[] {
  return text.split(/(\s+|[.,!?;:])/).filter(token => token.length > 0);
}
```

### **2. Number Recognition**

```typescript
// Detect and handle numbers specially
private isNumber(word: string): boolean {
  return /^\d+(\.\d+)?$/.test(word);
}
```

### **3. Multi-language Support**

```typescript
// Add support for different languages
private languageVocabularies = {
  english: englishTokens,
  spanish: spanishTokens,
  french: frenchTokens
};
```

### **4. Compression Features**

```typescript
// Add basic compression for repeated patterns
private compressRepeatedTokens(tokens: number[]): number[] {
  // Implementation for run-length encoding
}
```

## 🧪 Testing Your Changes

After making modifications, test them:

```bash
# Run the demo to see your changes
bun start

# Or create a custom test file
echo 'import { tokenizer } from "./index.js";
console.log("Testing custom changes...");
// Your test code here' > test-custom.ts

bun run test-custom.ts
```

## 🤝 Contributing

Want to improve the tokenizer? Here's how:

1. **Fork the repository**
2. **Make your changes** in `src/tokenizer.ts`
3. **Test thoroughly** with `bun start`
4. **Update documentation** if needed
5. **Submit a pull request**

## 📝 License

This project is open source and available under the MIT License.

## 🆘 Getting Help

**Common Issues:**

1. **"Cannot find module"**: Make sure you're in the right directory
2. **Import errors**: Check that file paths are correct
3. **Type errors**: Ensure TypeScript is properly configured

**Still stuck?**

- Check the console output for error messages
- Verify your Bun installation with `bun --version`
- Review the code in `src/tokenizer.ts`

---

**Happy Tokenizing! 🎉**

_This tokenizer is designed to be simple, educational, and easily customizable. Feel free to experiment and make it your own!_
