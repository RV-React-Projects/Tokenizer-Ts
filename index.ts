export { Tokenizer, tokenizer } from './src/tokenizer';
import { tokenizer } from './src/tokenizer';

// Basic examples
console.log('=== Basic Tokenizer Demo ===');

const tokens = tokenizer.encode("hello world");
console.log("Encoded:", tokens);

const text = tokenizer.decode(tokens);
console.log("Decoded:", text);

// Test with unknown words
const tokens2 = tokenizer.encode("this is a test");
console.log("\nEncoded:", tokens2);

const text2 = tokenizer.decode(tokens2);
console.log("Decoded:", text2);

// Show vocabulary info
console.log("\nVocabulary size:", tokenizer.getVocabularySize());

// Add custom token
tokenizer.addToken("custom");
console.log("Added 'custom' token");
console.log("New vocabulary size:", tokenizer.getVocabularySize());

// Test the new token
const tokens3 = tokenizer.encode("hello custom world");
console.log("\nEncoded with custom token:", tokens3);
console.log("Decoded:", tokenizer.decode(tokens3));
